# Pipeline frame torn des photos fighters : rasterise un SVG de cadre scratch
# (centaines de KB de paths vectorises, inutilisable cote client) en masque
# bitmap leger pour mask-image CSS.
#
# Usage :
#   python tests/process-frame.py render <svg> <slug>  -> tests/_shots/frame-{slug}.png
#   python tests/process-frame.py mask   <svg> <slug>  -> public/assets/textures/torn-{slug}.png
#                                                         (+ scratches-{slug}.png)
# Historique : torn-frame.png / photo-scratches.png = docs/frame-fighter.svg (slug "frame").
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEXTURES = ROOT / "public" / "assets" / "textures"
MAX_W = 900  # raster ~900px de large, suffisant pour des cards ~420px @2x


def _dims(svg: Path) -> tuple[int, int]:
    """Largeur/hauteur de raster depuis le viewBox (ratio natif conserve)."""
    head = svg.read_text(encoding="utf-8")[:500]
    m = re.search(r'viewBox="([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)"', head)
    if not m:
        raise SystemExit(f"viewBox introuvable dans {svg}")
    vw, vh = float(m.group(3)) - float(m.group(1)), float(m.group(4)) - float(m.group(2))
    w = min(MAX_W, round(vw)) if vw >= MAX_W else MAX_W
    return w, round(w * vh / vw)


def render(svg: Path, slug: str, scale: int = 2) -> Path:
    """Rend le SVG (navigation directe file://, fond gris injecte) via Playwright."""
    from playwright.sync_api import sync_playwright

    w, h = _dims(svg)
    out = ROOT / "tests" / "_shots" / f"frame-{slug}.png"
    out.parent.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=scale)
        page.goto(svg.as_uri())
        # Fond gris pour voir ou est l'encre noire (le SVG n'a pas de fond).
        # Document SVG sans <head> -> style via attribut sur la racine.
        page.evaluate(
            "document.documentElement.setAttribute('style', 'background:#888;width:100vw;height:100vh')"
        )
        page.wait_for_timeout(1500)
        page.screenshot(path=str(out))
        browser.close()
    print(f"{out} ok ({w * scale}x{h * scale})")
    return out


def _spread(mask, n: int = 1):
    """Dilatation binaire 4-connexe de n pixels (numpy pur)."""
    import numpy as np

    out = mask
    for _ in range(n):
        out = (
            out
            | np.roll(out, 1, 0)
            | np.roll(out, -1, 0)
            | np.roll(out, 1, 1)
            | np.roll(out, -1, 1)
        )
    return out


def _shrink(mask, n: int = 1):
    """Erosion binaire 4-connexe de n pixels (numpy pur)."""
    import numpy as np

    out = mask
    for _ in range(n):
        out = (
            out
            & np.roll(out, 1, 0)
            & np.roll(out, -1, 0)
            & np.roll(out, 1, 1)
            & np.roll(out, -1, 1)
        )
    return out


def mask(svg: Path, slug: str) -> Path:
    """Deux assets depuis le rendu (bords noirs ronges + poussieres au centre).

    torn-{slug}.png — masque "papier dechire" : la photo doit S'ARRETER au
    contour interieur du cadre, pas persister dans les interstices de l'anneau
    (sinon mouchete sombre, verifie au proto). Recette :
      removed = encre  U  zones libres connectees a l'exterieur (flood bords)
      keep    = composante connexe centrale uniquement
      -> bord irregulier net + petits trous d'usure au centre (poussieres).

    scratches-{slug}.png — les marques blanchies sur fond transparent, pour
    overlay mix-blend screen leger."""
    import numpy as np
    from PIL import Image, ImageFilter

    rendered = ROOT / "tests" / "_shots" / f"frame-{slug}.png"
    if not rendered.exists():
        render(svg, slug)
    img = Image.open(rendered).convert("L")
    w, h = _dims(svg)
    img = img.resize((w, h), Image.LANCZOS)
    arr = np.asarray(img, dtype=np.float64)
    # Fond gris 0x88 ~136, paths noirs ~0 : normalise [noir..gris] -> [0..1]
    ink_f = np.clip((136.0 - arr) / 136.0, 0.0, 1.0)
    ink = ink_f > 0.45

    # Zones libres connectees a l'exterieur (flood depuis les bords)
    free = ~ink
    ext = np.zeros_like(free)
    ext[0, :] = free[0, :]
    ext[-1, :] = free[-1, :]
    ext[:, 0] |= free[:, 0]
    ext[:, -1] |= free[:, -1]
    while True:
        grown = _spread(ext) & free
        grown |= ext
        if np.array_equal(grown, ext):
            break
        ext = grown

    keep = free & ~ext
    if keep[h // 2, w // 2]:
        # Cadre plein : seule la composante connexe centrale survit (flood
        # depuis le centre) — vire les fragments flottants de l'anneau, le
        # contour dechire du blob et les trous d'usure interieurs restent.
        central = np.zeros_like(keep)
        central[h // 2, w // 2] = True
        while True:
            grown = _spread(central) & keep
            grown |= central
            if np.array_equal(grown, central):
                break
            central = grown
        keep = central
        keep_f = keep.astype(np.float64)
    else:
        # Cadre filaire (griffures fines, pas de mur ferme — ex. test-1) :
        # inversion simple, les griffures entaillent la photo en negatif.
        print(f"  (cadre filaire detecte pour {slug} -> inversion simple)")
        keep_f = 1.0 - ink_f

    TEXTURES.mkdir(parents=True, exist_ok=True)
    mask_out = TEXTURES / f"torn-{slug}.png"
    alpha = Image.fromarray((keep_f * 255.0 + 0.5).astype(np.uint8), "L").filter(
        ImageFilter.GaussianBlur(0.7)
    )
    rgba = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    rgba.putalpha(alpha)
    rgba.save(mask_out, "PNG", optimize=True)
    print(f"{mask_out.name}: {w}x{h}, {mask_out.stat().st_size / 1024:.0f} KB")

    # Overlay scratches : blanc, alpha = encre (antialias conserve)
    scratches = TEXTURES / f"scratches-{slug}.png"
    s_rgba = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    s_rgba.putalpha(Image.fromarray((ink_f * 255.0 + 0.5).astype(np.uint8), "L"))
    s_rgba.save(scratches, "PNG", optimize=True)
    print(f"{scratches.name}: {w}x{h}, {scratches.stat().st_size / 1024:.0f} KB")
    return mask_out


if __name__ == "__main__":
    if len(sys.argv) != 4:
        raise SystemExit("Usage: python tests/process-frame.py [render|mask] <svg> <slug>")
    cmd, svg_path, slug = sys.argv[1], Path(sys.argv[2]), sys.argv[3]
    if cmd == "render":
        render(svg_path, slug)
    elif cmd == "mask":
        mask(svg_path, slug)
    else:
        raise SystemExit("Commande inconnue (render|mask)")
