# Screenshot des 4 variantes FighterCard guest book de /styleguide (F·A → F·D).
# Usage : python tests/screenshot-fightcards.py  (preview server sur :4321)
from playwright.sync_api import sync_playwright

# Chaque variante = le wrapper de grille qui suit son .sg-vcap
VARIANTS = [
    ("FA-passport", ".fga"),
    ("FB-polaroid", ".fgb"),
    ("FC-stadium", ".fgc"),
    ("FD-ticket", ".fgd"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.goto("http://localhost:4321/styleguide", wait_until="networkidle")

    # compteur agrégé
    counter = page.locator(".fg-counter")
    counter.scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    counter.screenshot(path="tests/_shots/fg-counter.png")
    print("fg-counter.png ok")

    for name, sel in VARIANTS:
        # screenshot du parent grid (les 3 cards ensemble)
        grid = page.locator(sel).first.locator("xpath=..")
        grid.scroll_into_view_if_needed()
        page.wait_for_timeout(400)
        grid.screenshot(path=f"tests/_shots/fg-{name}.png")
        print(f"fg-{name}.png ok")

    browser.close()
