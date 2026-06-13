# Optimisation des images home pour PageSpeed/LCP (2026-06-13).
# Les assets vivent dans public/assets/ (bypass Astro) et etaient surdimensionnes.
# Rejouable : ecrase les sorties. Sources HD conservees dans PNG/image-a-traiter/.
#
# - Programmes : base 800w (remplace, sert toutes les pages) + variante 400w (srcset).
# - DTV stamp : 627 -> 480 (2x du rendu 240).
# - Hero : re-encode les webp existants a qualite plus basse (overlay charcoal masque).
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "PNG" / "image-a-traiter"
OUT = ROOT / "public" / "assets"


def save_webp(img, path, quality, max_w):
    if img.width > max_w:
        h = round(img.height * max_w / img.width)
        img = img.resize((max_w, h), Image.LANCZOS)
    img.save(path, "WEBP", quality=quality, method=6)
    print(f"  -> {path.name} {img.size} {path.stat().st_size // 1024} KB")


# (source HD, base webp) — base 800w + variante 400w pour le srcset.
PROGRAMS = [
    ("meaw+guest.jpg", "prog-beginners.webp"),
    ("all-classes.jpg", "prog-all-levels.webp"),
    ("coach+guest.jpg", "prog-private.webp"),
    ("woman-classes.jpg", "prog-women.webp"),
    ("kids-and-coach.jpg", "prog-kids.webp"),
    ("fighter2.jpg", "prog-fight-team.webp"),
    ("fight.jpg", "prog-padwork.webp"),
]

print("Programmes (base 800w + 400w) :")
for src_name, base_name in PROGRAMS:
    src = SRC / src_name
    img = Image.open(src).convert("RGB")
    print(f"{src_name} {img.size}")
    save_webp(img.copy(), OUT / base_name, 80, 800)
    save_webp(img.copy(), OUT / base_name.replace(".webp", "-400.webp"), 80, 400)

# DTV stamp : redimensionne le webp existant (asset graphique, pas de source JPG).
print("DTV stamp :")
stamp = Image.open(OUT / "dtv-stamp.webp")
save_webp(stamp, OUT / "dtv-stamp.webp", 82, 480)

# Hero : re-encode les webp existants a qualite plus basse (overlay sombre).
print("Hero (recompression) :")
for name, max_w in [("hero-home-v3.webp", 1080), ("hero-home-v3-768.webp", 768)]:
    h = Image.open(OUT / name).convert("RGB")
    save_webp(h, OUT / name, 72, max_w)
