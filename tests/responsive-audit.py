# Audit responsive : détecte l'overflow horizontal + les éléments fautifs
# sur toutes les pages, à plusieurs largeurs mobiles/tablette.
# Cible le dev server live (CLAUDE.md) : WC_BASE=http://localhost:4321
# Output : rapport console + JSON tests/.responsive-audit.json + screenshots tests/shots-responsive/
import json
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = os.environ.get("WC_BASE", "http://localhost:4321")
SHOTS = os.path.join(os.path.dirname(__file__), "shots-responsive")
os.makedirs(SHOTS, exist_ok=True)

PAGES = [
    "/", "/about", "/about/coaches",
    "/classes", "/classes/beginners",
    "/dtv-visa", "/dtv-visa/eligibility", "/dtv-visa/how-to-apply",
    "/dtv-visa/muay-thai", "/dtv-visa/long-stay-training", "/dtv-visa/faq",
    "/stay-train", "/stay-train/scooter-rental",
    "/fighters", "/contact",
    "/blog",
]
LANGS = ["en", "fr"]
# articles : slugs traduits par locale
LANG_PAGES = {
    "en": ["/blog/burning-season-chiang-mai", "/blog/muay-thai-for-women"],
    "fr": ["/blog/saison-des-brulis-chiang-mai", "/blog/muay-thai-pour-les-femmes"],
}
VIEWPORTS = [(360, 800), (390, 844), (768, 1024)]

# Pour chaque élément plus large que le viewport (ou dépassant à droite/gauche),
# remonte un sélecteur lisible + ses dimensions. Limité aux ~15 pires.
JS_FIND_OFFENDERS = """
() => {
  const vw = document.documentElement.clientWidth;
  const docW = document.documentElement.scrollWidth;
  const out = { vw, docW, overflow: docW > vw, offenders: [] };
  if (!out.overflow) return out;
  const seen = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    if (r.right > vw + 1 || r.left < -1) {
      // ignore les enfants d'un fautif déjà noté (on veut la racine du débordement)
      if (seen.some(p => p.contains(el))) continue;
      seen.push(el);
      let sel = el.tagName.toLowerCase();
      if (el.id) sel += '#' + el.id;
      else if (el.classList.length) sel += '.' + [...el.classList].slice(0, 3).join('.');
      const path = [];
      let a = el.parentElement;
      while (a && a !== document.body && path.length < 3) {
        let s = a.tagName.toLowerCase();
        if (a.id) s += '#' + a.id;
        else if (a.classList.length) s += '.' + a.classList[0];
        path.unshift(s);
        a = a.parentElement;
      }
      out.offenders.push({
        sel, path: path.join(' > '),
        left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width),
      });
      if (out.offenders.length >= 15) break;
    }
  }
  return out;
}
"""

report = []
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for w, h in VIEWPORTS:
        page = browser.new_page(viewport={"width": w, "height": h})
        for lang in LANGS:
            for path in PAGES + LANG_PAGES.get(lang, []):
                url = f"{BASE}/{lang}{'' if path == '/' else path}"
                try:
                    r = page.goto(url, wait_until="networkidle", timeout=30000)
                except Exception as e:
                    report.append({"url": url, "vw": w, "error": str(e)[:120]})
                    print(f"ERR  {w:>4}px {lang} {path} — {str(e)[:80]}")
                    continue
                if not r or r.status != 200:
                    report.append({"url": url, "vw": w, "error": f"status {r.status if r else '?'}"})
                    print(f"ERR  {w:>4}px {lang} {path} — status {r.status if r else '?'}")
                    continue
                res = page.evaluate(JS_FIND_OFFENDERS)
                entry = {"url": url, "path": path, "lang": lang, "vw": w, **res}
                report.append(entry)
                if res["overflow"]:
                    shot = f"{lang}-{(path.strip('/').replace('/', '_') or 'home')}-{w}.png"
                    page.screenshot(path=os.path.join(SHOTS, shot), full_page=True)
                    entry["shot"] = shot
                    tops = ", ".join(f"{o['sel']}({o['width']}px)" for o in res["offenders"][:4])
                    print(f"FAIL {w:>4}px {lang} {path} — doc {res['docW']}px > vp {res['vw']}px : {tops}")
                else:
                    print(f"PASS {w:>4}px {lang} {path}")
        page.close()
    browser.close()

out = os.path.join(os.path.dirname(__file__), ".responsive-audit.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump(report, f, ensure_ascii=False, indent=1)

fails = [e for e in report if e.get("overflow")]
errs = [e for e in report if e.get("error")]
print(f"\n=== {len(report)} checks — {len(fails)} overflow, {len(errs)} erreurs ===")
print(f"JSON: {out}")
