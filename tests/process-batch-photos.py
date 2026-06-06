# Conversion du batch photos 2026-06-06 (PNG/image-a-traiter) -> public/assets webp.
# Rejouable : ecrase les sorties. Source haute resolution conservee dans PNG/.
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "PNG" / "image-a-traiter"
OUT = ROOT / "public" / "assets"

# (source, cible, largeur max)
JOBS = [
    ("life-camp.jpg", "camp-life.webp", 1800),          # /stay-train#life
    ("meaw.jpg", "meaw-portrait.webp", 1200),           # fiche Meaw /about/coaches
    ("meaw+guest.jpg", "prog-beginners.webp", 1100),    # card Beginner /classes
    ("all-classes.jpg", "prog-all-levels.webp", 1100),  # card All-Levels
    ("coach+guest.jpg", "prog-private.webp", 1400),     # card Private Sessions
    ("woman-classes.jpg", "prog-women.webp", 1100),     # card Women's
    ("kids-and-coach.jpg", "prog-kids.webp", 1100),     # card Kids & Family
    ("fighter2.jpg", "prog-fight-team.webp", 1080),     # card Fight Team
]

for src_name, out_name, max_w in JOBS:
    src = SRC / src_name
    img = Image.open(src).convert("RGB")
    if img.width > max_w:
        h = round(img.height * max_w / img.width)
        img = img.resize((max_w, h), Image.LANCZOS)
    out = OUT / out_name
    img.save(out, "WEBP", quality=82, method=6)
    print(f"{src_name} {Image.open(src).size} -> {out_name} {img.size} {out.stat().st_size // 1024} KB")
