# Screenshot du hero de prod (/en/) + transition values -> dtv.
# Usage : python tests/screenshot-home-hero.py  (server statique sur :4399 —
# pas 4321 : un `astro dev` peut occuper ::1 et intercepter localhost)
from playwright.sync_api import sync_playwright

BASE = "http://localhost:4399"

with sync_playwright() as p:
    browser = p.chromium.launch()

    # desktop : hero + début de la ValueStrip (transition brush)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{BASE}/en/", wait_until="networkidle")
    page.screenshot(path="tests/_shots/home-hero-desktop.png")
    # bas du hero : texte + brush + transition values -> dtv
    page.locator(".values").scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    page.screenshot(path="tests/_shots/home-transition.png")
    print("desktop ok")

    # mobile
    mob = browser.new_page(viewport={"width": 390, "height": 844})
    mob.goto(f"{BASE}/en/", wait_until="networkidle")
    mob.screenshot(path="tests/_shots/home-hero-mobile.png")
    print("mobile ok")

    # FR (lockup EN + sub FR)
    fr = browser.new_page(viewport={"width": 1440, "height": 900})
    fr.goto(f"{BASE}/fr/", wait_until="networkidle")
    fr.screenshot(path="tests/_shots/home-hero-fr.png")
    print("fr ok")

    browser.close()
