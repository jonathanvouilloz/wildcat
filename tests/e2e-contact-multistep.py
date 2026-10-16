# Test E2E du ContactForm multistep + lectures conseillées du modal (2026-10-16).
# Cible le dev server :4321 par défaut — override : WC_BASE=http://localhost:4322
# Les envois (Web3Forms, /api/inquiry) sont interceptés : aucun email ne part.
import os
import sys
sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

BASE = os.environ.get("WC_BASE", "http://localhost:4321")
results = []


def check(name, cond, detail=""):
    results.append((name, bool(cond), detail))
    print(("PASS " if cond else "FAIL ") + name + (" — " + detail if detail else ""))


def visible_step(page, scope="form[data-cform]"):
    return page.eval_on_selector(
        scope, "f => [...f.querySelectorAll('.step')].filter(s => !s.hidden).map(s => s.dataset.step).join(',')"
    )


def open_reco(page):
    return page.eval_on_selector(
        "dialog[data-wa-modal]",
        "d => { const g = [...d.querySelectorAll('[data-reco]')].find(x => !x.hidden); "
        "return g ? g.dataset.reco + ' ' + [...g.querySelectorAll('a')].map(a => a.getAttribute('href')).join(' ') : '' }",
    )


def fill_contact(page):
    page.fill("#ct-name", "Test Person")
    page.fill("#ct-email", "test@example.com")
    page.check("input[name=consent]")


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    sent = []
    page.route("**/api.web3forms.com/**", lambda r: (sent.append("w3f"), r.fulfill(status=200, body="{}")))
    page.route("**/api/inquiry", lambda r: (sent.append("inq"), r.fulfill(status=204)))

    # 1. Parcours cours, première fois
    page.goto(f"{BASE}/en/contact")
    check("contact: démarre à l'étape 1", visible_step(page) == "1", visible_step(page))
    page.click("label.icard:has(input[value=class])")
    page.wait_for_timeout(400)
    check("clic sur une card → étape 2", visible_step(page) == "2", visible_step(page))
    check("étape 2 : champs cours visibles", page.is_visible("#ct-cls-level"))
    check("étape 2 : champs dtv cachés", not page.is_visible("#ct-dtv-package"))
    page.select_option("#ct-cls-level", "first-time")
    page.click(".step[data-step='2'] [data-next]")
    check("Suivant → étape 3", visible_step(page) == "3")
    page.click(".step[data-step='3'] [data-back]")
    check("Retour → étape 2", visible_step(page) == "2")
    page.click(".step[data-step='2'] [data-next]")
    fill_contact(page)
    check("message facultatif hors « general »", not page.eval_on_selector("#ct-msg", "e => e.required"))
    page.click(".step[data-step='3'] button[type=submit]")
    page.wait_for_timeout(500)
    check("submit → modal ouvert", page.eval_on_selector("dialog[data-wa-modal]", "d => d.open"))
    reco = open_reco(page)
    check("recos cours première fois", reco.startswith("class-first-time") and "/en/classes/beginners" in reco, reco)
    check("envois interceptés (email + inquiry)", "w3f" in sent and "inq" in sent, ",".join(sent))
    page.click("dialog[data-wa-modal] .wamodal-dismiss")
    page.wait_for_timeout(200)
    check("fermeture du modal → retour étape 1", visible_step(page) == "1", visible_step(page))

    # 2. « Something else » saute l'étape 2 et exige le message
    page.click("label.icard:has(input[value=general])")
    page.wait_for_timeout(400)
    check("general → étape 3 directe", visible_step(page) == "3", visible_step(page))
    check("general : message requis", page.eval_on_selector("#ct-msg", "e => e.required"))
    page.click(".step[data-step='3'] [data-back]")
    check("general : Retour → étape 1", visible_step(page) == "1")

    # 3. Clavier : Entrée à l'étape 1 avance sans soumettre
    page.focus("input[name=intent][value=dtv]")
    page.keyboard.press("Space")
    page.keyboard.press("Enter")
    check("clavier : Entrée → étape 2 (dtv)", visible_step(page) == "2" and page.is_visible("#ct-dtv-package"))

    # 4. Deep-link ?intent=dtv → étape 2, recos DTV en FR
    page.goto(f"{BASE}/fr/contact?intent=dtv")
    check("?intent=dtv → étape 2", visible_step(page) == "2", visible_step(page))
    page.click(".step[data-step='2'] [data-next]")
    fill_contact(page)
    page.click(".step[data-step='3'] button[type=submit]")
    page.wait_for_timeout(500)
    reco = open_reco(page)
    check("recos dtv FR", reco.startswith("dtv") and "/fr/dtv-visa/how-to-apply" in reco, reco)

    # 5. Pages transactionnelles : formulaire #ask présélectionné
    for path, intent in [
        ("/en/classes", "class"),
        ("/en/classes/beginners", "class"),
        ("/en/dtv-visa/how-to-apply", "dtv"),
        ("/en/dtv-visa/eligibility", "dtv"),
        ("/en/stay-train/scooter-rental", "scooter"),
    ]:
        page.goto(f"{BASE}{path}")
        ok = page.is_visible("#ask form[data-cform]")
        checked = page.eval_on_selector("#ask", "s => s.querySelector('input[name=intent]:checked')?.value")
        check(f"{path}: #ask démarre à l'étape 2 ({intent})", ok and checked == intent and visible_step(page, "#ask form") == "2",
              f"{checked} / {visible_step(page, '#ask form')}")

    # 6. Article : formulaire de fin selon la catégorie
    page.goto(f"{BASE}/en/blog/dtv-visa-proof-of-funds")
    checked = page.eval_on_selector("#ask", "s => s.querySelector('input[name=intent]:checked')?.value")
    check("article visa → formulaire dtv", checked == "dtv", str(checked))

    # 7. Mobile : pas de débordement horizontal
    page.set_viewport_size({"width": 360, "height": 780})
    page.goto(f"{BASE}/en/contact")
    over = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    check("mobile 360 : zéro overflow /contact", over <= 0, f"{over}px")
    page.click("label.icard:has(input[value=stay])")
    page.wait_for_timeout(400)
    over = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    check("mobile 360 : zéro overflow étape 2 stay", over <= 0, f"{over}px")

    check("aucune erreur JS", not errors, " | ".join(errors[:3]))
    browser.close()

failed = [r for r in results if not r[1]]
print(f"\n{len(results) - len(failed)}/{len(results)} PASS")
sys.exit(1 if failed else 0)
