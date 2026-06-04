# Screenshot des 4 variantes hero de /styleguide (mockups A/B/C/D).
# Usage : python tests/screenshot-heroes.py  (preview server sur :4321)
from playwright.sync_api import sync_playwright

VARIANTS = [
    ("A", ".sg-heroA"),
    ("B", ".sg-heroB"),
    ("C", ".sg-heroC"),
    ("D", ".sg-heroD"),
    ("D2", ".sg-heroD2"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:4321/styleguide", wait_until="networkidle")

    for name, sel in VARIANTS:
        el = page.locator(sel)
        el.scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        el.screenshot(path=f"tests/_shots/hero-{name}.png")
        print(f"hero-{name}.png ok")

    # grand écran (A + le strip forest qui suit — vérif overlap brush)
    wide = browser.new_page(viewport={"width": 1900, "height": 950})
    wide.goto("http://localhost:4321/styleguide", wait_until="networkidle")
    wide.locator(".sg-heroA").scroll_into_view_if_needed()
    wide.wait_for_timeout(300)
    wide.screenshot(path="tests/_shots/hero-A-wide.png")
    print("hero-A-wide.png ok")

    # crop mobile (variante A uniquement — la reco)
    mob = browser.new_page(viewport={"width": 390, "height": 844})
    mob.goto("http://localhost:4321/styleguide", wait_until="networkidle")
    mob.locator(".sg-heroA").scroll_into_view_if_needed()
    mob.wait_for_timeout(300)
    mob.locator(".sg-heroA").screenshot(path="tests/_shots/hero-A-mobile.png")
    print("hero-A-mobile.png ok")

    browser.close()
