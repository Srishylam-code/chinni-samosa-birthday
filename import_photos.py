import os
import sys
import shutil
from PIL import Image

def import_photos(source_dir):
    source_dir = source_dir.strip().strip('"').strip("'")
    if not os.path.exists(source_dir):
        print(f"Error: Directory '{source_dir}' does not exist.")
        return False

    dest_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "photos")
    os.makedirs(dest_dir, exist_ok=True)

    valid_exts = ('.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff')
    found_files = []

    for root, _, files in os.walk(source_dir):
        for f in files:
            if f.lower().endswith(valid_exts):
                found_files.append(os.path.join(root, f))

    # Natural sort
    found_files.sort(key=lambda x: [int(c) if c.isdigit() else c.lower() for c in os.path.basename(x).split('.')])

    if not found_files:
        print(f"No image files found in '{source_dir}'.")
        return False

    print(f"Found {len(found_files)} images in '{source_dir}'. Importing up to 25 photos with ZERO cropping...")

    count = min(25, len(found_files))
    for i in range(count):
        src_path = found_files[i]
        target_name = f"photo-{i+1:02d}.jpg"
        dest_path = os.path.join(dest_dir, target_name)

        try:
            # Open with Pillow to ensure valid RGB JPEG format without changing dimensions or cropping
            with Image.open(src_path) as img:
                # Convert RGBA/P to RGB if needed
                if img.mode in ('RGBA', 'LA', 'P'):
                    bg = Image.new('RGB', img.size, (15, 12, 10))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    bg.paste(img, mask=img.split()[3] if len(img.split()) > 3 else None)
                    bg.save(dest_path, 'JPEG', quality=95)
                else:
                    img.convert('RGB').save(dest_path, 'JPEG', quality=95)

                w, h = img.size
                print(f"  [{i+1:02d}/25] {os.path.basename(src_path)} -> {target_name} ({w}x{h} px, preserved 100%)")
        except Exception as e:
            # Fallback to direct copy if Pillow fails
            shutil.copy2(src_path, dest_path)
            print(f"  [{i+1:02d}/25] Copied directly: {os.path.basename(src_path)} -> {target_name}")

    print(f"\nSuccessfully imported {count} photos into '{dest_dir}' with ZERO cropping!")
    print("Refresh http://localhost:8000 to see your photographs live!")
    return True

if __name__ == "__main__":
    if len(sys.argv) > 1:
        folder = sys.argv[1]
    else:
        folder = input("Enter the full path to your folder containing the 25 photos: ")
    import_photos(folder)
