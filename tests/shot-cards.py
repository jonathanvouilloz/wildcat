# Screenshots des Card explorations du styleguide (desktop + mobile).
# Usage : python tests/shot-cards.py  (dev server requis — port dans URL)
import os

from playwright.sync_api import sync_playwright

URL = "http://localhost:4324/styleguide"
OUT = "tests/.shots"


def shoot(page, width, suffix, height):
    page.goto(URL, wait_until="networkidle")
    caps = page.locator(".cx-cap")
    n = caps.count()
    print(f"[{suffix}] {n} cx-cap captions")
    for i in range(n):
        cap = caps.nth(i)
        cap.scroll_into_view_if_needed()
        page.wait_for_timeout(300)
        box = cap.bounding_box()
        scroll_y = page.evaluate("window.scrollY")
        abs_y = box["y"] + scroll_y
        page.screenshot(
            path=f"{OUT}/cards-{chr(65 + i)}-{suffix}.png",
            full_page=True,
            clip={"x": 0, "y": abs_y - 10, "width": width, "height": height},
        )
        print(f"  -> cards-{chr(65 + i)}-{suffix}.png")


with sync_playwright() as p:
    browser = p.chromium.launch()
    os.makedirs(OUT, exist_ok=True)

    page = browser.new_page(viewport={"width": 1280, "height": 900})
    shoot(page, 1280, "desktop", 1250)
    page.close()

    page = browser.new_page(viewport={"width": 390, "height": 844})
    shoot(page, 390, "mobile", 1400)

    browser.close()
print("OK")
