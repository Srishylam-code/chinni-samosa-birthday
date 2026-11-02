import json
import re

config_path = r"C:\Users\srish\.gemini\antigravity\scratch\chinni-samosa-birthday\js\config.js"

updated_photos = [
  {
    "id": 1,
    "src": "photos/photo-01.jpg",
    "title": "The Original Chinni Samosa",
    "caption": "The sweet, innocent face that started it all — forever my little Chinni Samosa no matter how much we grow up.",
    "date": "Sweetest Beginning",
    "category": "bond"
  },
  {
    "id": 2,
    "src": "photos/photo-02.jpg",
    "title": "My Guardian Angel",
    "caption": "You have always looked out for me with quiet strength, gentle advice, and a heart made of pure gold.",
    "date": "Pure Grace",
    "category": "portrait"
  },
  {
    "id": 3,
    "src": "photos/photo-03.jpg",
    "title": "Lucky Me to Have You, Akka",
    "caption": "Of all the gifts life could have given me, having you as my elder sister will always be the greatest one.",
    "date": "Forever Blessed",
    "category": "bond"
  },
  {
    "id": 4,
    "src": "photos/photo-04.jpg",
    "title": "Effortlessly Charming",
    "caption": "That natural, candid spark — you never have to try to look lovely, you just light up the frame effortlessly.",
    "date": "Candid Joy",
    "category": "portrait"
  },
  {
    "id": 5,
    "src": "photos/photo-05.jpg",
    "title": "Wings of Grace",
    "caption": "Watching you bloom into such a strong, independent, and kind-hearted woman fills my heart with so much pride.",
    "date": "Gentle Spirit",
    "category": "portrait"
  },
  {
    "id": 6,
    "src": "photos/photo-06.jpg",
    "title": "Sunflower Radiance",
    "caption": "Just like a sunflower turns towards the light, you bring warmth and vibrant optimism to everyone around you.",
    "date": "Golden Sunshine",
    "category": "portrait"
  },
  {
    "id": 7,
    "src": "photos/photo-07.jpg",
    "title": "Pretty in Pink",
    "caption": "Looking so graceful, elegant, and regal — you carry every tradition with such effortless poise.",
    "date": "Royal Charm",
    "category": "portrait"
  },
  {
    "id": 8,
    "src": "photos/photo-08.jpg",
    "title": "A Pinky Promise",
    "caption": "A lifelong promise that through every up and down, your sibling will always stand right beside you.",
    "date": "Sisterly Vow",
    "category": "bond"
  },
  {
    "id": 9,
    "src": "photos/photo-09.jpg",
    "title": "Dressed in Confidence",
    "caption": "Bright, striking, and absolutely glowing. You make every ordinary day feel like a special occasion.",
    "date": "Striking Beauty",
    "category": "portrait"
  },
  {
    "id": 10,
    "src": "photos/photo-10.jpg",
    "title": "Lavender Serenity",
    "caption": "A picture of calm poise. Thank you for being the patient, peaceful anchor whenever life gets chaotic.",
    "date": "Serene & Regal",
    "category": "portrait"
  },
  {
    "id": 11,
    "src": "photos/photo-11.jpg",
    "title": "Rainy Day Comfort",
    "caption": "Like the fresh scent of earth after rain — your comforting presence always brings peace and clarity.",
    "date": "Cozy Memories",
    "category": "candid"
  },
  {
    "id": 12,
    "src": "photos/photo-12.jpg",
    "title": "Snappy & Mischievous",
    "caption": "That playful glint in your eye! Nobody can make me laugh as hard or tease me as lovingly as you do.",
    "date": "Playful Moments",
    "category": "candid"
  },
  {
    "id": 13,
    "src": "photos/photo-13.jpg",
    "title": "Oh Hello, Gorgeous!",
    "caption": "Caught mid-expression with that cheerful vibe that immediately puts a smile on everyone's face.",
    "date": "Candid Spark",
    "category": "candid"
  },
  {
    "id": 14,
    "src": "photos/photo-14.jpg",
    "title": "Same Smile, Forever Akka",
    "caption": "Years fly by, trends come and go, but that warm, familiar smile is the one constant I will always cherish.",
    "date": "Timeless",
    "category": "candid"
  },
  {
    "id": 15,
    "src": "photos/photo-15.jpg",
    "title": "Unboxing Our Memories",
    "caption": "A wide cinematic frame capturing a moment of anticipation, laughter, and stories only we understand.",
    "date": "Film Keepsake",
    "category": "candid"
  },
  {
    "id": 16,
    "src": "photos/photo-16.jpg",
    "title": "Little Footsteps",
    "caption": "Remembering the early days when we were small — the games, the mischief, and the very first chapters of our bond.",
    "date": "Childhood Wonder",
    "category": "candid"
  },
  {
    "id": 17,
    "src": "photos/photo-17.jpg",
    "title": "The Sweetest Yesterday",
    "caption": "Looking back at the younger days reminds me that our sisterhood has been life's sweetest journey from day one.",
    "date": "Nostalgic Echoes",
    "category": "candid"
  },
  {
    "id": 18,
    "src": "photos/photo-18.jpg",
    "title": "Us, Simply Us",
    "caption": "No filters, no posing, no pretenses — just the two of us being our silly, genuine, authentic selves.",
    "date": "Authentic Bond",
    "category": "bond"
  },
  {
    "id": 19,
    "src": "photos/photo-19.jpg",
    "title": "Wrapped in Love",
    "caption": "Whenever you hug me or hold my hand, the whole world feels safe, warm, and full of reassurance.",
    "date": "Unconditional",
    "category": "bond"
  },
  {
    "id": 20,
    "src": "photos/photo-20.jpg",
    "title": "The Inseparable Duo",
    "caption": "Side by side or miles apart, we share an unspoken wavelength that distance can never fade.",
    "date": "Always Connected",
    "category": "bond"
  },
  {
    "id": 21,
    "src": "photos/photo-21.jpg",
    "title": "A Shared Giggle",
    "caption": "One of those candid snapshots from our chats where a single sentence had us laughing for ten minutes straight.",
    "date": "Daily Joy",
    "category": "candid"
  },
  {
    "id": 22,
    "src": "photos/photo-22.jpg",
    "title": "Two Hearts, One Soul",
    "caption": "More than just an elder sister, you are my confidante, my protector, and my favorite person in the world.",
    "date": "Deepest Affection",
    "category": "bond"
  },
  {
    "id": 23,
    "src": "photos/photo-23.jpg",
    "title": "Quiet Strength & Grace",
    "caption": "You handle every challenge with such quiet dignity. Thank you for always showing me what real strength looks like.",
    "date": "Inspirational",
    "category": "portrait"
  },
  {
    "id": 24,
    "src": "photos/photo-24.jpg",
    "title": "The Birthday Star Shining Bright",
    "caption": "Today is all about celebrating the light and joy you bring to all of our lives. Shine on, birthday girl!",
    "date": "Birthday Celebration",
    "category": "featured"
  },
  {
    "id": 25,
    "src": "photos/photo-25.jpg",
    "title": "Queen Bangaaramuuuu",
    "caption": "To the undisputed queen of our hearts — wishing you a year filled with grand laughter, boundless love, and dreams fulfilled!",
    "date": "Forever Bangaaramuuuu",
    "category": "featured"
  }
]

photos_js = json.dumps(updated_photos, indent=6, ensure_ascii=False)

with open(config_path, "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'photos:\s*\[[\s\S]*?\n    \]'
replacement = f'photos: {photos_js}'

new_content = re.sub(pattern, replacement, content, count=1)

with open(config_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated config.js with rich personal captions matching each photo!")
