import os
import shutil
import json
from PIL import Image

src_dir = r"C:\Users\srish\.gemini\antigravity\scratch\chinni-samosa-birthday\photos\Akka Birthday"
dest_dir = r"C:\Users\srish\.gemini\antigravity\scratch\chinni-samosa-birthday\photos"

# Specific storytelling sequence
ordered_names = [
    "chinni .jpeg",
    "Angel.jpeg",
    "lucky me akka.jpeg",
    "cute.jpeg",
    "butterfly.jpeg",
    "sunflower.jpeg",
    "pink.jpeg",
    "pinky.jpeg",
    "pinkyyyy.jpeg",
    "purple.jpeg",
    "rainy.jpeg",
    "snappy.jpeg",
    "oh hello.jpeg",
    "same.jpeg",
    "box.jpeg",
    "small.jpeg",
    "smaller one.jpeg",
    "us as us.jpeg",
    "we love.jpeg",
    "we.jpeg",
    "WhatsApp Image 2026-10-29 at 3.23.33 .jpeg",
    "WhatsApp Image 2026-10-29 at 3.23.33 PM.jpeg",
    "bday girl.jpeg",
    "bdayyyy.jpeg"
]

all_files = [f for f in os.listdir(src_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]

emoji_file = None
for f in all_files:
    if f not in ordered_names:
        emoji_file = f
        break

final_sequence = []
for name in ordered_names:
    if name in all_files:
        final_sequence.append(name)

if emoji_file:
    final_sequence.insert(21, emoji_file)

manifest_entries = []

for idx, fname in enumerate(final_sequence):
    src_file = os.path.join(src_dir, fname)
    slot_num = idx + 1
    dest_name = f"photo-{slot_num:02d}.jpg"
    dest_file = os.path.join(dest_dir, dest_name)

    with Image.open(src_file) as img:
        if img.mode in ('RGBA', 'LA', 'P'):
            bg = Image.new('RGB', img.size, (15, 12, 10))
            if img.mode == 'P':
                img = img.convert('RGBA')
            bg.paste(img, mask=img.split()[3] if len(img.split()) > 3 else None)
            bg.save(dest_file, 'JPEG', quality=95)
        else:
            img.convert('RGB').save(dest_file, 'JPEG', quality=95)
        
        w, h = img.size
        ratio_desc = "Portrait" if h > w else ("Landscape" if w > h else "Square")

    title = fname.replace('.jpeg', '').replace('.jpg', '').strip()
    if fname == emoji_file:
        title = "Forever in My Heart"
    elif title.lower() == "bday girl":
        title = "The Birthday Star"
    elif title.lower() == "bdayyyy":
        title = "Queen Bangaaramuuuu"
    elif title.lower() == "chinni":
        title = "My Chinni Samosa"
    elif title.lower() == "lucky me akka":
        title = "Lucky Me To Have Akka"
    elif title.lower() == "us as us":
        title = "Us, Simply Us"
    elif title.lower() == "we love":
        title = "Pure Sisterly Love"
    elif title.lower() == "we":
        title = "Together Through Everything"
    elif title.lower().startswith("whatsapp"):
        title = f"Precious Memory #{slot_num:02d}"
    else:
        title = title.capitalize()

    category = "candid"
    if "bday" in fname.lower() or slot_num == 25:
        category = "featured"
    elif any(k in fname.lower() for k in ["akka", "us", "we", "chinni"]):
        category = "bond"
    elif any(k in fname.lower() for k in ["angel", "pink", "purple", "cute", "butterfly", "sunflower"]):
        category = "portrait"

    manifest_entries.append({
        "id": slot_num,
        "src": f"photos/{dest_name}",
        "title": title,
        "caption": f"Cherished memory with my dear sister, Bangaaramuuuu ({w}x{h} px).",
        "date": "Memory",
        "category": category
    })

    safe_name = fname.encode('ascii', errors='replace').decode('ascii')
    print(f"[{slot_num:02d}/25] {dest_name} <- {safe_name} ({w}x{h}, {ratio_desc}) -> Title: '{title}' [{category}]")

with open(os.path.join(dest_dir, "manifest_data.json"), "w", encoding="utf-8") as f:
    json.dump(manifest_entries, f, indent=2, ensure_ascii=False)

print("\nAll 25 photos processed and copied to photos/photo-01.jpg .. photo-25.jpg successfully!")
