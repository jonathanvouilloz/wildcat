# Pipeline frame torn des photos fighters : rasterise docs/frame-fighter.svg
# (580 KB de paths vectorises, inutilisable cote client) en masque bitmap leger
# pour mask-image CSS.
#
# Usage :
#   python tests/process-frame.py render   -> tests/_shots/frame-render.png (inspection)
#   python tests/process-frame.py mask     -> public/assets/textures/torn-frame.png
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SVG = ROOT / "docs" / "frame-fighter.svg"
RENDER = ROOT / "tests" / "_shots" / "frame-render.png"
MASK_OUT = ROOT / "public" / "assets" / "textures" / "torn-frame.png"
W, H = 850, 1134  # ratio natif du viewBox (850.66 x 1134.12)


def render(scale: int = 1) -> Path:
    """Rend le SVG (navigation directe file://, fond gris injecte) via Playwright."""
    from playwright.sync_api import sync_playwright

    RENDER.parent.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": W, "height": H}, device_scale_factor=scale)
        page.goto(SVG.as_uri())
        # Fond gris pour voir ou est l'encre noire (le SVG n'a pas de fond).
        # Document SVG sans <head> -> style via attribut sur la racine.
        page.evaluate(
            "document.documentElement.setAttribute('style', 'background:#888;width:100vw;height:100vh')"
        )
        page.wait_for_timeout(1500)
        page.screenshot(path=str(RENDER))
        browser.close()
    print(f"{RENDER} ok ({W * scale}x{H * scale})")
    return RENDER


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


def mask() -> Path:
    """Deux assets depuis le rendu (bords noirs ronges + poussieres au centre).

    torn-frame.png — masque "papier dechire" : la photo doit S'ARRETER au
    contour interieur du cadre, pas persister dans les interstices de l'anneau
    (sinon mouchete sombre, verifie au proto). Recette :
      removed = encre  U  zones libres connectees a l'exterieur (flood bords)
      keep    = le reste, nettoye des fragments enclaves (ouverture morpho)
      -> bord irregulier net + petits trous d'usure au centre (poussieres).

    photo-scratches.png — les marques blanchies sur fond transparent, pour
    overlay mix-blend screen leger."""
    import numpy as np
    from PIL import Image, ImageFilter

    if not RENDER.exists():
        render(scale=2)
    img = Image.open(RENDER).convert("L").resize((W, H), Image.LANCZOS)
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
    # Seule la composante connexe centrale survit : flood depuis le centre,
    # contraint a keep — vire tous les fragments flottants de l'anneau, le
    # contour dechire du blob reste intact, les trous d'usure interieurs aussi.
    central = np.zeros_like(keep)
    central[H // 2, W // 2] = keep[H // 2, W // 2]
    if not central.any():
        raise SystemExit('Seed centre hors du blob — ajuster le seuil encre.')
    while True:
        grown = _spread(central) & keep
        grown |= central
        if np.array_equal(grown, central):
            break
        central = grown
    keep = central

    MASK_OUT.parent.mkdir(parents=True, exist_ok=True)
    alpha = Image.fromarray((keep * 255).astype(np.uint8), "L").filter(
        ImageFilter.GaussianBlur(0.7)
    )
    rgba = Image.new("RGBA", (W, H), (255, 255, 255, 255))
    rgba.putalpha(alpha)
    rgba.save(MASK_OUT, "PNG", optimize=True)
    print(f"{MASK_OUT.name}: {W}x{H}, {MASK_OUT.stat().st_size / 1024:.0f} KB")

    # Overlay scratches : blanc, alpha = encre (antialias conserve)
    scratches = MASK_OUT.parent / "photo-scratches.png"
    s_rgba = Image.new("RGBA", (W, H), (255, 255, 255, 255))
    s_rgba.putalpha(Image.fromarray((ink_f * 255.0 + 0.5).astype(np.uint8), "L"))
    s_rgba.save(scratches, "PNG", optimize=True)
    print(f"{scratches.name}: {W}x{H}, {scratches.stat().st_size / 1024:.0f} KB")
    return MASK_OUT


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "render"
    if cmd == "render":
        render(scale=2)
    elif cmd == "mask":
        mask()
    else:
        raise SystemExit("Usage: python tests/process-frame.py [render|mask]")
