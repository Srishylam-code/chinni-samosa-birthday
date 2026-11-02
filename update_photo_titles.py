import json
import re

config_path = r"C:\Users\srish\.gemini\antigravity\scratch\chinni-samosa-birthday\js\config.js"

new_photos = [
  {
    "id": 1,
    "src": "photos/photo-01.jpg",
    "title": "The Original Chinni Samosa",
    "caption": "That sweet, innocent smile that started it all — forever my little bundle of joy.",
    "date": "Cherished Beginning",
    "category": "bond"
  },
  {
    "id": 2,
    "src": "photos/photo-02.jpg",
    "title": "An Angel in Disguise",
    "caption": "Pure grace, gentle eyes, and a heart that always brings calm to any storm.",
    "date": "Grace & Light",
    "category": "portrait"
  },
  {
    "id": 3,
    "src": "photos/photo-03.jpg",
    "title": "Blessed With The Best Akka",
    "caption": "Life gave me many things, but having you as my elder sister was its greatest gift.",
    "date": "Unconditional",
    "category": "bond"
  },
  {
    "id": 4,
    "src": "photos/photo-04.jpg",
    "title": "Candid Sweetness",
    "caption": "Caught in between a giggle and a pose — effortlessly charming without even trying.",
    "date": "Sweet Times",
    "category": "portrait"
  },
  {
    "id": 5,
    "src": "photos/photo-05.jpg",
    "title": "Wings of Grace",
    "caption": "Watching you grow, evolve, and spread kindness wherever you flutter by.",
    "date": "Gentle Spirit",
    "category": "portrait"
  },
  {
    "id": 6,
    "src": "photos/photo-06.jpg",
    "title": "Radiant as Sunshine",
    "caption": "Standing tall and turning towards the light, brightening up even the cloudiest days.",
    "date": "Pure Radiance",
    "category": "portrait"
  },
  {
    "id": 7,
    "src": "photos/photo-07.jpg",
    "title": "Blushing Elegance",
    "caption": "Soft, graceful, and carrying that delicate royal charm so naturally.",
    "date": "Elegance",
    "category": "portrait"
  },
  {
    "id": 8,
    "src": "photos/photo-08.jpg",
    "title": "A Spark of Pure Joy",
    "caption": "One of those timeless candid frames that captures your uncontainable happiness.",
    "date": "Golden Laughs",
    "category": "candid"
  },
  {
    "id": 9,
    "src": "photos/photo-09.jpg",
    "title": "Pretty & Poised",
    "caption": "True beauty isn't just about looking lovely — it's the warmth you carry inside.",
    "date": "Timeless",
    "category": "portrait"
  },
  {
    "id": 10,
    "src": "photos/photo-10.jpg",
    "title": "Lavender Serenity",
    "caption": "Calm, dignified, and regal — looking every bit like the queen you are.",
    "date": "Serene",
    "category": "portrait"
  },
  {
    "id": 11,
    "src": "photos/photo-11.jpg",
    "title": "Raindrops & Warm Smiles",
    "caption": "Like a warm cup of tea on a rainy evening — your presence is pure comfort.",
    "date": "Cozy Days",
    "category": "candid"
  },
  {
    "id": 12,
    "src": "photos/photo-12.jpg",
    "title": "Sassy & Playful",
    "caption": "That mischievous spark in your eye when you're about to tease me or crack a silly joke.",
    "date": "Fun Times",
    "category": "candid"
  },
  {
    "id": 13,
    "src": "photos/photo-13.jpg",
    "title": "A Reassuring Hello",
    "caption": "The loving look that says 'Don't worry, I'm right here with you no matter what.'",
    "date": "Safe Space",
    "category": "candid"
  },
  {
    "id": 14,
    "src": "photos/photo-14.jpg",
    "title": "Timeless Simplicity",
    "caption": "Years may fly past and seasons change, but your genuine essence never fades.",
    "date": "Evergreen",
    "category": "candid"
  },
  {
    "id": 15,
    "src": "photos/photo-15.jpg",
    "title": "Treasured Keepsake",
    "caption": "A wide panoramic memory, locked in time like a treasured vintage film reel.",
    "date": "Golden Hour",
    "category": "candid"
  },
  {
    "id": 16,
    "src": "photos/photo-16.jpg",
    "title": "Nostalgic Whispers",
    "caption": "Little moments that seemed so small back then, but now mean everything.",
    "date": "Precious",
    "category": "candid"
  },
  {
    "id": 17,
    "src": "photos/photo-17.jpg",
    "title": "Footprints in Time",
    "caption": "Tracing back the sweetest steps of our childhood and the laughter we shared.",
    "date": "Nostalgia",
    "category": "candid"
  },
  {
    "id": 18,
    "src": "photos/photo-18.jpg",
    "title": "Unfiltered Us",
    "caption": "No filters, no pretenses — just two sisters living in our own hilarious world.",
    "date": "Sisterhood",
    "category": "bond"
  },
  {
    "id": 19,
    "src": "photos/photo-19.jpg",
    "title": "An Inseparable Bond",
    "caption": "Side by side through every storm and every celebration, bound by endless love.",
    "date": "Forever & Always",
    "category": "bond"
  },
  {
    "id": 20,
    "src": "photos/photo-20.jpg",
    "title": "Forever My Anchor",
    "caption": "Thank you for being my constant guide, my safe space, and my greatest cheerleader.",
    "date": "Guiding Light",
    "category": "bond"
  },
  {
    "id": 21,
    "src": "photos/photo-21.jpg",
    "title": "Unspoken Understanding",
    "caption": "When one look across the room is enough for both of us to burst out laughing.",
    "date": "Sweet Talk",
    "category": "candid"
  },
  {
    "id": 22,
    "src": "photos/photo-22.jpg",
    "title": "A Heart Full of Love",
    "caption": "Carrying your warmth with me wherever I go — my dearest Akka.",
    "date": "Pure Heart",
    "category": "bond"
  },
  {
    "id": 23,
    "src": "photos/photo-23.jpg",
    "title": "Quiet Strength & Grace",
    "caption": "Admiring the incredible, compassionate, and beautiful woman you have become.",
    "date": "Inspiration",
    "category": "portrait"
  },
  {
    "id": 24,
    "src": "photos/photo-24.jpg",
    "title": "The Birthday Star Shining Bright",
    "caption": "Today is all about celebrating you! May your year ahead be as luminous as your smile.",
    "date": "Birthday Star",
    "category": "featured"
  },
  {
    "id": 25,
    "src": "photos/photo-25.jpg",
    "title": "Queen of Our Hearts — Bangaaramuuuu",
    "caption": "The grand birthday queen herself — loved beyond measure, today and always.",
    "date": "Forever Queen",
    "category": "featured"
  }
]

photos_js = json.dumps(new_photos, indent=6, ensure_ascii=False)

with open(config_path, "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'photos:\s*\[[\s\S]*?\n    \]'
replacement = f'photos: {photos_js}'

new_content = re.sub(pattern, replacement, content, count=1)

with open(config_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated config.js with 25 beautiful, poetic titles and captions!")
