import os
from PIL import Image, ImageDraw, ImageFont

photos_dir = r"C:\Users\srish\.gemini\antigravity\scratch\chinni-samosa-birthday\photos"
os.makedirs(photos_dir, exist_ok=True)

# Palettes corresponding to cinematic themes
palettes = [
    ((8, 28, 20), (14, 55, 38), (168, 255, 213), (217, 181, 109)),  # Emerald
    ((15, 12, 10), (35, 28, 20), (243, 225, 181), (217, 181, 109)), # Black & Gold
    ((10, 22, 18), (18, 60, 43), (229, 205, 152), (168, 255, 213)), # Forest & Champagne
    ((25, 8, 13), (65, 18, 30), (221, 161, 168), (255, 241, 233)),  # Burgundy & Rose
    ((17, 10, 32), (57, 32, 93), (197, 173, 255), (240, 203, 121)), # Royal Purple
]

# Memory titles for placeholders
titles = [
    "A Golden Smile", "Joyful Moments", "Pure Radiance", "Sisterly Love",
    "Precious Laughs", "Forever Young", "Warmest Hugs", "Sweetest Soul",
    "Giggles & Stories", "Timeless Charm", "The Brightest Star", "Cherished Days",
    "Happiness in a Frame", "Unbreakable Bond", "Endless Conversations", "A Heart of Gold",
    "Little Celebrations", "Sunshine & Grace", "Quiet Adventures", "Kindred Spirits",
    "Laughter in the Air", "A Beautiful Journey", "Treasured Memory", "Guiding Light",
    "Queen of Our Hearts"
]

def create_gradient(width, height, c1, c2):
    base = Image.new('RGB', (width, height), c1)
    top = Image.new('RGB', (width, height), c2)
    mask = Image.new('L', (width, height))
    mask_data = []
    for y in range(height):
        for x in range(width):
            dist = ((x - width/2)**2 + (y - height/2)**2)**0.5
            max_dist = ((width/2)**2 + (height/2)**2)**0.5
            factor = min(255, int((dist / max_dist) * 255))
            mask_data.append(factor)
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

for i in range(1, 26):
    idx_str = f"{i:02d}"
    filename = f"photo-{idx_str}.jpg"
    filepath = os.path.join(photos_dir, filename)

    w, h = 900, 1125
    palette = palettes[(i - 1) % len(palettes)]
    bg_center, bg_edge, accent_bright, accent_gold = palette

    # Create artistic gradient
    img = create_gradient(w, h, bg_center, bg_edge)
    draw = ImageDraw.Draw(img)

    # Decorative border
    draw.rectangle([30, 30, w-30, h-30], outline=accent_gold, width=2)
    draw.rectangle([40, 40, w-40, h-40], outline=(accent_gold[0], accent_gold[1], accent_gold[2], 120), width=1)

    # Corner decorations
    c_len = 30
    corners = [(30, 30), (w-30, 30), (30, h-30), (w-30, h-30)]
    for cx, cy in [(30, 30), (w-30, 30), (30, h-30), (w-30, h-30)]:
        sign_x = 1 if cx == 30 else -1
        sign_y = 1 if cy == 30 else -1
        draw.line([(cx, cy), (cx + sign_x*c_len, cy)], fill=accent_bright, width=3)
        draw.line([(cx, cy), (cx, cy + sign_y*c_len)], fill=accent_bright, width=3)

    # Inner Polaroid frame
    polaroid_margin = 80
    p_left, p_top = polaroid_margin, polaroid_margin
    p_right, p_bottom = w - polaroid_margin, h - polaroid_margin - 80
    draw.rectangle([p_left, p_top, p_right, p_bottom], outline=(255, 255, 255, 60), width=1)
    
    # Inner vignette shading
    inner_box = [p_left + 20, p_top + 20, p_right - 20, p_bottom - 20]
    draw.rectangle(inner_box, outline=accent_bright, width=1)

    # Sparkle / camera motif at center
    cx, cy = w // 2, h // 2 - 80
    r = 60
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=accent_gold, width=2)
    draw.ellipse([cx - 30, cy - 30, cx + 30, cy + 30], outline=accent_bright, width=2)
    # Sparkle rays
    for angle_offset in [0, 45, 90, 135]:
        import math
        rad = math.radians(angle_offset)
        dx = int(math.cos(rad) * 90)
        dy = int(math.sin(rad) * 90)
        draw.line([(cx - dx, cy - dy), (cx + dx, cy + dy)], fill=(accent_bright[0], accent_bright[1], accent_bright[2]), width=1)

    # Texts
    # Using default font or load standard font if available
    font_large = None
    font_med = None
    font_small = None
    try:
        font_large = ImageFont.truetype("arial.ttf", 46)
        font_med = ImageFont.truetype("arial.ttf", 28)
        font_small = ImageFont.truetype("arial.ttf", 20)
    except:
        font_large = ImageFont.load_default()
        font_med = font_large
        font_small = font_large

    title_text = titles[i - 1]
    slot_text = f"PHOTO {idx_str} / 25"
    sub_text = "Chinni Samosa • Bangaaramuuuu"
    instruction_text = f"Temporary Placeholder — Place '{filename}' in photos/"

    # Draw texts centered
    def get_text_width(text, font):
        bbox = draw.textbbox((0, 0), text, font=font)
        return bbox[2] - bbox[0]

    tw = get_text_width(slot_text, font_large)
    draw.text(((w - tw) // 2, cy + 130), slot_text, fill=accent_gold, font=font_large)

    tw = get_text_width(title_text, font_med)
    draw.text(((w - tw) // 2, cy + 200), title_text, fill=accent_bright, font=font_med)

    tw = get_text_width(sub_text, font_small)
    draw.text(((w - tw) // 2, cy + 250), sub_text, fill=(240, 240, 240), font=font_small)

    tw = get_text_width(instruction_text, font_small)
    draw.text(((w - tw) // 2, h - 90), instruction_text, fill=(180, 180, 180), font=font_small)

    img.save(filepath, "JPEG", quality=92)

print("Generated 25 placeholder images successfully.")
