# Outil d'authoring — traçage des squelettes "handwriting" du SVG texte Wildcat.
# Rend le SVG texte (fills gris) + les spines candidates (rouge) et screenshot,
# pour itérer sur les paths de masque de la variante B du loader.
# Usage : python tests/trace-spines.py [out.png]
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
TEXT_SVG = Path(r"C:\Users\jojo-\Downloads\SVG\texte-svgFichier 223.svg").read_text(encoding="utf-8")

# Spines candidates (itérées au screenshot) — 1 stroke par lettre, suit le ductus.
SPINES_FILE = ROOT / "tests" / "spines.txt"
spines = SPINES_FILE.read_text(encoding="utf-8") if SPINES_FILE.exists() else ""

# Deux modes :
#  - trace : fills gris + spines rouges fines (alignement)
#  - mask  : fills rouges dessous (= manque) + fills noirs masqués par spines épaisses (= couvert)
MODE = sys.argv[2] if len(sys.argv) > 2 else "mask"
if MODE == "trace":
    svg = TEXT_SVG.replace(".cls-1{fill:#231f20;}", ".cls-1{fill:#bbb;}")
    svg = svg.replace("</svg>", f'<g fill="none" stroke="red" stroke-width="6" stroke-linecap="round" opacity="0.85">{spines}</g></svg>')
else:
    import re
    paths = re.findall(r'<path class="cls-1" d="[^"]+"/>', TEXT_SVG)
    letters = "".join(paths)
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 781.05 193.43">'
        f'<defs><mask id="sp-mask"><g fill="none" stroke="#fff" stroke-width="34" stroke-linecap="round" stroke-linejoin="round">{spines}</g></mask></defs>'
        f'<g fill="#e33">{letters}</g>'
        f'<g fill="#222" mask="url(#sp-mask)">{letters}</g>'
        "</svg>"
    )

html = f"""<!doctype html><html><body style="margin:0;background:#fff">
<div style="width:1500px;padding:30px">{svg}</div>
</body></html>"""

out = sys.argv[1] if len(sys.argv) > 1 else str(ROOT / "tests" / "trace-spines.png")
tmp = ROOT / "tests" / "_trace-spines.html"
tmp.write_text(html, encoding="utf-8")

with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": 1560, "height": 480})
    page.goto(tmp.as_uri())
    page.screenshot(path=out)
    b.close()
print("OK ->", out)
