#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Audit interne du build statique Astro : liens cassés, ancres mortes, sitemap."""
import os, re, sys, html

# console Windows en cp1252 : sans ça le rapport plante sur les flèches →
sys.stdout.reconfigure(encoding="utf-8")
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "dist", "client"))

class Extractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []   # (attr, value)
        self.ids = set()
        self.names = set()
        self.alternates = []  # (hreflang, href)
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if "id" in d and d["id"]:
            self.ids.add(d["id"])
        if tag == "a" and "name" in d and d["name"]:
            self.names.add(d["name"])
        # hreflang alternates
        if tag == "link" and d.get("rel") == "alternate" and "hreflang" in d:
            self.alternates.append((d.get("hreflang"), d.get("href")))
        for attr in ("href", "src", "action"):
            if attr in d and d[attr] is not None:
                self.links.append((attr, d[attr]))

def parse_file(path):
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        data = f.read()
    p = Extractor()
    p.feed(data)
    return p

# Build map of all html pages -> parsed, keyed by url path ("/en/about/" etc.)
pages = {}        # url_path -> Extractor
file_for_url = {} # url_path -> filesystem path
all_files = set() # set of relative fs paths (posix) that exist

for dirpath, dirs, files in os.walk(ROOT):
    for fn in files:
        full = os.path.join(dirpath, fn)
        rel = os.path.relpath(full, ROOT).replace("\\", "/")
        all_files.add("/" + rel)

def url_to_fs(url_path):
    """Return candidate fs paths (as /-prefixed posix rel) for a URL path."""
    up = url_path
    if up == "":
        up = "/"
    # direct file
    cands = []
    if up.endswith("/"):
        cands.append(up + "index.html")
    else:
        cands.append(up)                 # exact file (e.g. /robots.txt, .xml)
        cands.append(up + "/index.html") # dir without trailing slash
        cands.append(up + ".html")
    return cands

# Parse all html pages
for f in sorted(all_files):
    if f.endswith(".html"):
        ext = parse_file(ROOT + f)
        # derive url path
        if f.endswith("/index.html"):
            urlp = f[:-len("index.html")]  # keeps trailing slash
        else:
            urlp = f
        pages[urlp] = ext
        file_for_url[urlp] = f

# ---- Auditing ----
broken_links = []     # (src_page, link, reason)
dead_anchors = []     # (src_page, link, target, anchor)
empty_hash = []       # (src_page, attr)
external_suspect = [] # (src_page, link)
external_ok = set()   # informational external domains

IGNORE_PREFIX = ("/studio", "/api/")

def is_ignored(path):
    return any(path == p or path.startswith(p + "/") or path.startswith(p) for p in IGNORE_PREFIX)

for urlp, ext in pages.items():
    src_file = file_for_url[urlp]
    for attr, raw in ext.links:
        val = html.unescape(raw).strip()
        if val == "":
            continue
        low = val.lower()
        # schemes to skip but note
        if low.startswith(("mailto:", "tel:", "javascript:", "data:")):
            continue
        if low.startswith(("http://", "https://", "//")):
            # external
            dom = urlsplit(val if not val.startswith("//") else "http:" + val).netloc.lower()
            if (not dom) or "example.com" in dom or "example.org" in dom or "placeholder" in low or "todo" in low or "yourdomain" in low:
                external_suspect.append((src_file, attr, val))
            else:
                external_ok.add(dom)
            continue
        # empty hash placeholder
        if val == "#":
            empty_hash.append((src_file, attr))
            continue
        # internal
        sp = urlsplit(val)
        path = unquote(sp.path)
        frag = sp.fragment
        if val.startswith("#"):
            # same-page anchor
            target_urlp = urlp
            anchor = val[1:]
        else:
            # resolve relative to current page dir
            if path.startswith("/"):
                resolved = path
            else:
                base_dir = os.path.dirname(src_file)  # e.g. /en/about
                resolved = os.path.normpath(base_dir + "/" + path).replace("\\", "/")
                if not resolved.startswith("/"):
                    resolved = "/" + resolved
            # ignore studio/api
            if is_ignored(resolved):
                continue
            # find existing fs file
            cands = url_to_fs(resolved)
            found = None
            for c in cands:
                if c in all_files:
                    found = c
                    break
            if found is None:
                broken_links.append((src_file, val, "target not found: " + resolved))
                continue
            # map found file -> its urlp for anchor check
            if found.endswith("/index.html"):
                target_urlp = found[:-len("index.html")]
            else:
                target_urlp = found
            anchor = frag
        # anchor check
        if anchor:
            tgt = pages.get(target_urlp)
            if tgt is None:
                # target not an html page we parsed (e.g. xml/asset) -> can't check
                pass
            else:
                if anchor not in tgt.ids and anchor not in tgt.names:
                    dead_anchors.append((src_file, val, target_urlp, anchor))

# ---- hreflang alternates ----
hreflang_broken = []
for urlp, ext in pages.items():
    src_file = file_for_url[urlp]
    for lang, href in ext.alternates:
        if not href:
            hreflang_broken.append((src_file, lang, href, "empty href"))
            continue
        sp = urlsplit(href)
        path = unquote(sp.path)
        if not path:
            continue
        if is_ignored(path):
            continue
        cands = url_to_fs(path)
        if not any(c in all_files for c in cands):
            hreflang_broken.append((src_file, lang, href, "target not found: " + path))

# ---- sitemap ----
sitemap_issues = []
sitemap_urls = []
import glob
for sm in glob.glob(ROOT + "/sitemap*.xml"):
    with open(sm, "r", encoding="utf-8", errors="replace") as f:
        txt = f.read()
    locs = re.findall(r"<loc>(.*?)</loc>", txt)
    for loc in locs:
        loc = html.unescape(loc.strip())
        sitemap_urls.append((os.path.basename(sm), loc))

# verify each sitemap URL (skip the sitemap-index pointing to other sitemaps)
for smname, loc in sitemap_urls:
    sp = urlsplit(loc)
    path = unquote(sp.path)
    if path.endswith(".xml"):
        # points to another sitemap file
        base = os.path.basename(path)
        if not os.path.exists(ROOT + "/" + base):
            sitemap_issues.append((smname, loc, "sitemap file missing: " + base))
        continue
    if is_ignored(path):
        sitemap_issues.append((smname, loc, "points to ignored path"))
        continue
    cands = url_to_fs(path)
    if not any(c in all_files for c in cands):
        sitemap_issues.append((smname, loc, "no built page for: " + path))

# also: pages built but missing from sitemap (info)
built_page_paths = set(p for p in pages if not is_ignored(p))
sitemap_page_paths = set()
for smname, loc in sitemap_urls:
    sp = urlsplit(loc)
    path = unquote(sp.path)
    if path.endswith(".xml"):
        continue
    if not path.endswith("/"):
        path = path + "/"
    sitemap_page_paths.add(path)
missing_from_sitemap = sorted(built_page_paths - sitemap_page_paths)

# ---- Report ----
def section(title):
    print("\n" + "=" * 70)
    print(title)
    print("=" * 70)

section("LIENS CASSÉS (page → lien → problème)")
if broken_links:
    for s, l, r in sorted(set(broken_links)):
        print(f"  {s}\n     -> {l}\n     [{r}]")
else:
    print("  AUCUN — clean.")

section("ANCRES MORTES (page → lien → ancre inexistante)")
if dead_anchors:
    for s, l, t, a in sorted(set(dead_anchors)):
        print(f"  {s}\n     -> {l}   (#{a} absent de {t})")
else:
    print("  AUCUNE — clean.")

section('LIENS href="#" VIDES (placeholder mort)')
if empty_hash:
    from collections import Counter
    c = Counter(s for s, a in empty_hash)
    for s, n in sorted(c.items()):
        print(f"  {s}  ({n}×)")
else:
    print("  AUCUN — clean.")

section("LIENS HREFLANG / ALTERNATE CASSÉS")
if hreflang_broken:
    for s, lang, href, r in sorted(set(hreflang_broken)):
        print(f"  {s}  [{lang}] -> {href}  [{r}]")
else:
    print("  AUCUN — clean.")

section("SITEMAP : incohérences")
if sitemap_issues:
    for s, l, r in sorted(set(sitemap_issues)):
        print(f"  {s}: {l}\n     [{r}]")
else:
    print("  AUCUNE — toutes les URLs sitemap correspondent à des pages buildées.")
print(f"\n  (info) {len(sitemap_urls)} entrées <loc> au total dans les sitemaps.")
if missing_from_sitemap:
    print("  (info) Pages buildées ABSENTES du sitemap :")
    for p in missing_from_sitemap:
        print(f"     {p}")
else:
    print("  (info) Toutes les pages buildées (hors /studio /api) sont dans le sitemap.")

section("LIENS EXTERNES (info — domaines référencés)")
for d in sorted(external_ok):
    print(f"  {d}")

print()
