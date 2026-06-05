# Test E2E des composants interactifs DTV + Train (vanilla JS).
# Cible le dev server :4321 par défaut — override : WC_BASE=http://localhost:4322
# (utile pour tester un `npm run preview` quand le dev server est occupé/wedgé).
import os
import sys
sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = os.environ.get("WC_BASE", "http://localhost:4321")
print(f"[debug] BASE = {BASE}")
results = []


def check(name, cond, detail=""):
    results.append((name, bool(cond), detail))
    print(("PASS " if cond else "FAIL ") + name + (" — " + detail if detail else ""))


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))

    # ---------- 1. Quiz éligibilité (wizard multistep) ----------
    r = page.goto(f"{BASE}/en/dtv-visa/eligibility", wait_until="networkidle")
    print(f"[debug] eligibility status={r.status if r else '?'} title={page.title()!r}")
    quiz = page.locator("[data-dtv-quiz]")
    if quiz.count() == 0:
        print("[debug] section#quiz:", page.locator("#quiz").count(),
              "| body contains 'quiz':", "quiz" in page.content().lower())
        print("[debug] page errors so far:", errors[:2])
    check("quiz: present", quiz.count() == 1)
    fieldsets = quiz.locator("fieldset")
    n = fieldsets.count()
    check("quiz: ~6 questions (DOM)", n >= 5, f"{n} fieldsets")
    # mode wizard activé : dots de progression + une seule question visible
    check("quiz: mode wizard actif", page.locator("[data-dtv-quiz].js-wizard").count() == 1)
    dots = quiz.locator("[data-quiz-dot]")
    check("quiz: dots de progression", dots.count() == n, f"{dots.count()} dots / {n} questions")
    visible_q = sum(1 for i in range(n) if fieldsets.nth(i).is_visible())
    check("quiz: 1 seule question visible", visible_q == 1, f"{visible_q} visibles")
    # répondre : 1re option de la question COURANTE → auto-advance (~250ms)
    for step in range(n):
        cur = quiz.locator("fieldset.is-current")
        check_ok = cur.count() == 1
        if not check_ok:
            check(f"quiz: étape {step + 1} courante", False, f"{cur.count()} .is-current")
            break
        cur.locator("input[type=radio]").first.check()
        page.wait_for_timeout(450)  # > délai d'auto-advance (250ms)
    # bouton Back visible après la 1re étape... (on est à la fin : il l'est)
    back = quiz.locator("[data-quiz-back]")
    check("quiz: bouton Back présent", back.count() == 1)
    submit = quiz.locator("button[type=submit]")
    check("quiz: submit visible sur la dernière étape",
          submit.count() >= 1 and submit.first.is_visible())
    if submit.count():
        submit.first.click()
    page.wait_for_timeout(400)
    verdicts = quiz.locator("[data-verdict]")
    visible = [v for v in range(verdicts.count()) if verdicts.nth(v).is_visible()]
    check("quiz: verdict affiché", len(visible) >= 1, f"{len(visible)} visible(s)")
    if visible:
        v = verdicts.nth(visible[0])
        check("quiz: CTA dans le verdict", v.locator("a").count() >= 1)
    # le formulaire laisse place au verdict ; « Start over » le restaure
    check("quiz: formulaire masqué après verdict",
          not quiz.locator("[data-quiz-form]").first.is_visible())
    reset = quiz.locator("[data-quiz-reset]")
    check("quiz: Start over visible", reset.count() == 1 and reset.first.is_visible())
    if reset.count():
        reset.first.click()
        page.wait_for_timeout(300)
        check("quiz: reset → retour étape 1",
              quiz.locator("fieldset.is-current").count() == 1
              and quiz.locator("[data-quiz-form]").first.is_visible()
              and len([v for v in range(verdicts.count()) if verdicts.nth(v).is_visible()]) == 0)

    # ---------- 2. Checklist documents ----------
    page.goto(f"{BASE}/en/dtv-visa/how-to-apply", wait_until="networkidle")
    cl = page.locator("[data-checklist]")
    check("checklist: present", cl.count() == 1)
    boxes = cl.locator("input[type=checkbox]")
    nb = boxes.count()
    check("checklist: ~10 items", nb >= 8, f"{nb} checkboxes")
    pct = cl.locator("[data-pct]")
    before = pct.inner_text() if pct.count() else ""
    boxes.nth(0).check(); boxes.nth(1).check(); boxes.nth(2).check()
    page.wait_for_timeout(300)
    after = pct.inner_text() if pct.count() else ""
    check("checklist: progression maj", before != after, f"'{before}' → '{after}'")
    # persistance localStorage
    page.reload(wait_until="networkidle")
    page.wait_for_timeout(300)
    cl = page.locator("[data-checklist]")
    checked = cl.locator("input[type=checkbox]:checked").count()
    check("checklist: persistance localStorage", checked == 3, f"{checked}/3 après reload")
    reset = cl.locator("[data-reset]")
    if reset.count():
        reset.first.click()
        page.wait_for_timeout(200)
        check("checklist: reset", cl.locator("input[type=checkbox]:checked").count() == 0)

    # ---------- 3. Estimateur budget ----------
    page.goto(f"{BASE}/en/dtv-visa/long-stay-training", wait_until="networkidle")
    est = page.locator("[data-estimator]")
    check("estimator: present", est.count() == 1)
    rng = est.locator("[data-est-range]")
    base_txt = rng.inner_text() if rng.count() else ""
    check("estimator: fourchette rendue (no-JS fallback inclus)", len(base_txt.strip()) > 0, base_txt.strip()[:60])
    selects = est.locator("select")
    ns = selects.count()
    check("estimator: 3 selects", ns == 3, f"{ns}")
    # changer hébergement + durée → la fourchette doit changer
    selects.nth(2).select_option(index=2)
    page.wait_for_timeout(300)
    txt2 = rng.inner_text() if rng.count() else ""
    check("estimator: recalcul au changement", txt2 != base_txt, f"'{base_txt[:40]}' → '{txt2[:40]}'")
    total = est.locator("[data-est-total]")
    check("estimator: total séjour affiché", total.count() >= 1 and len(total.first.inner_text().strip()) > 0)

    # ---------- 4. Filtre FAQ ----------
    page.goto(f"{BASE}/en/dtv-visa/faq", wait_until="networkidle")
    items = page.locator("[data-faq-item]")
    ni = items.count()
    check("faq: ~30 questions", ni >= 25, f"{ni} items")
    inp = page.locator("[data-faq-input]")
    check("faq: input présent", inp.count() == 1)
    inp.fill("tax")
    page.wait_for_timeout(500)  # debounce 150ms
    vis = sum(1 for i in range(ni) if items.nth(i).is_visible())
    check("faq: filtre réduit la liste", 0 < vis < ni, f"{vis}/{ni} visibles pour 'tax'")
    cnt = page.locator("[data-faq-count]")
    check("faq: compteur aria-live", cnt.count() >= 1 and len(cnt.first.inner_text().strip()) > 0,
          cnt.first.inner_text().strip() if cnt.count() else "")
    inp.fill("zzzqqqxxx")
    page.wait_for_timeout(500)
    empty = page.locator("[data-faq-empty]")
    check("faq: état vide + CTA", empty.count() >= 1 and empty.first.is_visible())
    clear = page.locator("[data-faq-clear]")
    if clear.count():
        clear.first.click()
        page.wait_for_timeout(400)
        vis = sum(1 for i in range(ni) if items.nth(i).is_visible())
        check("faq: clear restaure tout", vis == ni, f"{vis}/{ni}")

    # ---------- 5. FirstClassChecklist (/classes/beginners — réutilise DocChecklist) ----------
    page.goto(f"{BASE}/en/classes/beginners", wait_until="networkidle")
    fcl = page.locator("[data-checklist]")
    check("firstclass: present", fcl.count() == 1)
    check("firstclass: storageKey dédiée",
          fcl.get_attribute("data-storage-key") == "wc-firstclass-checklist-v1")
    fboxes = fcl.locator("input[type=checkbox]")
    nfb = fboxes.count()
    check("firstclass: 8 items", nfb == 8, f"{nfb} checkboxes")
    fpct = fcl.locator("[data-pct]")
    fbefore = fpct.inner_text() if fpct.count() else ""
    fboxes.nth(0).check(); fboxes.nth(1).check()
    page.wait_for_timeout(300)
    fafter = fpct.inner_text() if fpct.count() else ""
    check("firstclass: progression maj", fbefore != fafter, f"'{fbefore}' → '{fafter}'")
    # persistance localStorage (clé propre, indépendante de la checklist DTV)
    page.reload(wait_until="networkidle")
    page.wait_for_timeout(300)
    fcl = page.locator("[data-checklist]")
    fchecked = fcl.locator("input[type=checkbox]:checked").count()
    check("firstclass: persistance localStorage", fchecked == 2, f"{fchecked}/2 après reload")
    # tout cocher → état done + CTA book
    fboxes = fcl.locator("input[type=checkbox]")
    for i in range(fboxes.count()):
        if not fboxes.nth(i).is_checked():
            fboxes.nth(i).check()
    page.wait_for_timeout(300)
    done = fcl.locator("[data-done]")
    check("firstclass: état done + CTA", done.count() == 1 and done.first.is_visible()
          and done.first.locator("a").count() >= 1)
    freset = fcl.locator("[data-reset]")
    if freset.count():
        freset.first.click()
        page.wait_for_timeout(200)
        check("firstclass: reset", fcl.locator("input[type=checkbox]:checked").count() == 0)
    # contenu SEO clé : byline Meaw + Article JSON-LD (pas de FAQPage)
    check("beginners: byline Meaw visible", page.locator(".byline").count() == 1
          and "Meaw" in page.locator(".byline").inner_text())
    ld = page.locator('script[type="application/ld+json"]').all_inner_texts()
    check("beginners: Article JSON-LD", any('"Article"' in s for s in ld))
    check("beginners: pas de FAQPage JSON-LD", not any('"FAQPage"' in s for s in ld))

    # ---------- 6. Pillar /classes re-cadré (maillage Train) ----------
    page.goto(f"{BASE}/en/classes", wait_until="networkidle")
    check("classes: section #camp présente", page.locator("#camp").count() == 1)
    beg_links = page.locator('main a[href*="/classes/beginners"]')
    check("classes: liens vers /classes/beginners", beg_links.count() >= 2,
          f"{beg_links.count()} liens (card + FAQ)")
    check("classes: card Fight Team → /fighters",
          page.locator('#programs a[href$="/fighters"]').count() == 1)
    ld = page.locator('script[type="application/ld+json"]').all_inner_texts()
    check("classes: pas de FAQPage JSON-LD", not any('"FAQPage"' in s for s in ld))
    # nav mega-menu : entrée Beginner repointée
    check("nav: Beginner Muay Thai → /classes/beginners",
          page.locator('header.nav a[href$="/classes/beginners"]').count() >= 1)

    # ---------- 7. Pillar /stay-train re-cadré (batch Stay 2026-06-05) ----------
    page.goto(f"{BASE}/en/stay-train", wait_until="networkidle")
    # .first : robuste face aux h1 du dev-toolbar Astro (shadow DOM percé par Playwright)
    stay_h1 = page.locator("main h1").first.inner_text().lower()
    check("stay: H1 contient 'camp' + 'Thailand'",
          "camp" in stay_h1 and "thailand" in stay_h1)
    for anchor in ["packages", "accommodation", "life"]:
        check(f"stay: ancre #{anchor}", page.locator(f"#{anchor}").count() == 1)
    # table d'honnêteté : 2 cards, 3 items chacune
    check("stay: table inclus/à organiser", page.locator(".pack-card").count() == 2
          and page.locator(".pack-list li").count() == 6)
    # FAQ : 6 questions, accordéon fonctionnel, 3 liens de maillage
    faq = page.locator(".faq details")
    check("stay: FAQ 6 questions", faq.count() == 6)
    faq.nth(1).locator("summary").click()
    page.wait_for_timeout(150)
    check("stay: FAQ accordéon s'ouvre", faq.nth(1).get_attribute("open") is not None)
    check("stay: FAQ lien → beginners",
          page.locator('.faq a[href*="/classes/beginners"]').count() == 1)
    check("stay: FAQ lien → long-stay-training",
          page.locator('.faq a[href*="/dtv-visa/long-stay-training"]').count() == 1)
    check("stay: FAQ lien → dtv pillar",
          page.locator('.faq a[href$="/dtv-visa"]').count() >= 1)
    # FAQPage JSON-LD : présent ici (porteur unique du silo Stay)
    ld = page.locator('script[type="application/ld+json"]').all_inner_texts()
    check("stay: FAQPage JSON-LD présent", any('"FAQPage"' in s for s in ld))
    # nav mega : entrées Stay repointées (ancres + long-stay → dtv)
    check("nav: Packages → #packages",
          page.locator('header.nav a[href$="/stay-train#packages"]').count() >= 1)
    check("nav: Where to Stay → #accommodation",
          page.locator('header.nav a[href$="/stay-train#accommodation"]').count() >= 1)
    check("nav: entrées → #life", page.locator('header.nav a[href$="/stay-train#life"]').count() >= 3)
    check("nav: Long-Stay → /dtv-visa/long-stay-training",
          page.locator('header.nav a[href$="/dtv-visa/long-stay-training"]').count() >= 1)
    # FR : H1 re-anglé "camp … Thaïlande" + "stage" présent en H2
    page.goto(f"{BASE}/fr/stay-train", wait_until="networkidle")
    fr_h1 = page.locator("main h1").first.inner_text().lower()
    check("stay FR: H1 'camp … thaïlande'", "camp" in fr_h1 and "thaïlande" in fr_h1)
    h2s = " ".join(page.locator("h2").all_inner_texts()).lower()
    check("stay FR: 'stage' présent en H2", "stage" in h2s)

    # ---------- 8. Pages FR + erreurs JS ----------
    for path in ["/fr/dtv-visa/eligibility", "/fr/dtv-visa/faq", "/fr/dtv-visa/muay-thai",
                 "/fr/dtv-visa/how-to-apply", "/fr/dtv-visa/long-stay-training",
                 "/fr/classes/beginners", "/fr/classes", "/fr/stay-train"]:
        r = page.goto(f"{BASE}{path}", wait_until="networkidle")
        check(f"FR 200: {path}", r and r.status == 200)
    check("zéro erreur JS console (toutes pages)", len(errors) == 0, "; ".join(errors[:3]))

    browser.close()

fails = [r for r in results if not r[1]]
print(f"\n=== {len(results) - len(fails)}/{len(results)} PASS ===")
sys.exit(1 if fails else 0)
