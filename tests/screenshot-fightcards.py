# Screenshot de la démo Fighter guest book de /styleguide (composant final).
# Usage : python tests/screenshot-fightcards.py  (dev server sur :4321)
from playwright.sync_api import sync_playwright

SHOTS = [
    ("counter", ".fg-counter"),
    ("cards", ".fg-demo-grid"),
    ("stamps", ".fg-stamp-inventory"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 1100}, device_scale_factor=2)
    page.goto("http://localhost:4321/styleguide", wait_until="networkidle")

    for name, sel in SHOTS:
        el = page.locator(sel)
        el.scroll_into_view_if_needed()
        page.wait_for_timeout(400)
        el.screenshot(path=f"tests/_shots/fg-{name}.png")
        print(f"fg-{name}.png ok")

    # page /fighters (empty state tant que le dataset est vide)
    page.goto("http://localhost:4321/en/fighters", wait_until="networkidle")
    page.screenshot(path="tests/_shots/fighters-page.png", full_page=True)
    print("fighters-page.png ok")

    browser.close()
