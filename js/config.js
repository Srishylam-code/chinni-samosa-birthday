/**
 * Chinni Samosa — Cinematic Birthday Surprise Website
 * Central Configuration File
 * 
 * All personal text, photo paths, captions, timeline milestones,
 * letter paragraphs, secret lines, and audio settings can be edited here.
 */

const CONFIG = {
  // Personal Identifiers
  displayName: "Bangaaramuuuu",
  nickname: "Chinni Samosa",

  // Audio Settings: Continuous Multi-Song Playlist
  audio: {
    playlist: [
      {
        id: 1,
        title: "Naan Un Azhaginile (24 Theme)",
        src: "audio/Naan Un Azhaginile BGM - Love Theme 24 Movie by AR Rahman.mp3"
      },
      {
        id: 2,
        title: "Ekkadiki Pothavu Chinnavada BGM",
        src: "audio/Ekkadiki pothavu chinnavada Bgms [Co4g3vmzsXM] (1).mp3"
      },
      {
        id: 3,
        title: "Soulmates Unite — Anirudh",
        src: "audio/Anirudh Ravichander - Soulmates Unite (Instrumental).mp3"
      }
    ],
    defaultVolume: 0.45,      // Optimal playback volume (0.0 to 1.0)
    letterVolume: 0.20,       // Soft volume ducking during the letter screen
    finalVolume: 0.35,        // Gentle volume for the final reveal
    enableSynthesizerFallback: false // Disabled per user instruction: only user's songs
  },

  // Screen 1: The Secret Entrance
  screen1: {
    headline: "Explore the Chinni Samosa's Surprise",
    subtitle: "A little surprise, made with all my love.",
    enterButtonText: "Enter the Surprise ✦",
    sparkleCount: 35
  },

  // Screen 2: Our Little Memories (All 24 Photographs)
  screen2: {
    heading: "Our Little Memories",
    subtitle: "Every picture holds a little piece of happiness.",
    nextButtonText: "Next section of love is waiting for you →",
    // 24 Photo Manifest
    // To replace: add photo-01.jpg through photo-25.jpg in photos/ folder
    // You can also adjust captions, dates, or categories below.
    photos: [
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
            "src": "photos/photo-14.jpg",
            "title": "Timeless Simplicity",
            "caption": "Years may fly past and seasons change, but your genuine essence never fades.",
            "date": "Evergreen",
            "category": "candid"
      },
      {
            "id": 14,
            "src": "photos/photo-15.jpg",
            "title": "Treasured Keepsake",
            "caption": "A wide panoramic memory, locked in time like a treasured vintage film reel.",
            "date": "Golden Hour",
            "category": "candid"
      },
      {
            "id": 15,
            "src": "photos/photo-16.jpg",
            "title": "Nostalgic Whispers",
            "caption": "Little moments that seemed so small back then, but now mean everything.",
            "date": "Precious",
            "category": "candid"
      },
      {
            "id": 16,
            "src": "photos/our-cuties.jpg",
            "title": "Our Cuties",
            "caption": "The sweetest, purest little bundles of happiness that bring endless smiles and joy to our hearts.",
            "date": "Pure Love",
            "category": "bond"
      },
      {
            "id": 17,
            "src": "photos/photo-18.jpg",
            "title": "Unfiltered Us",
            "caption": "No filters, no pretenses — sister living in our hilarious world.",
            "date": "Sisterhood",
            "category": "bond"
      },
      {
            "id": 18,
            "src": "photos/photo-19.jpg",
            "title": "An Inseparable Bond",
            "caption": "Side by side through every storm and every celebration, bound by endless love.",
            "date": "Forever & Always",
            "category": "bond"
      },
      {
            "id": 19,
            "src": "photos/photo-20.jpg",
            "title": "Forever My Anchor",
            "caption": "Thank you for being my constant guide, my safe space, and my greatest cheerleader.",
            "date": "Guiding Light",
            "category": "bond"
      },
      {
            "id": 20,
            "src": "photos/photo-21.jpg",
            "title": "Unspoken Understanding",
            "caption": "When one look across the room is enough for both of us to burst out laughing.",
            "date": "Sweet Talk",
            "category": "candid"
      },
      {
            "id": 21,
            "src": "photos/photo-25.jpg",
            "title": "Queen of Our Hearts — Bangaaramuuuu",
            "caption": "The grand birthday queen herself — loved beyond measure, today and always.",
            "date": "Forever Queen",
            "category": "featured"
      },
      {
            "id": 22,
            "src": "photos/photo-23.jpg",
            "title": "Quiet Strength & Grace",
            "caption": "Admiring the incredible, compassionate, and beautiful woman you have become.",
            "date": "Inspiration",
            "category": "portrait"
      },
      {
            "id": 23,
            "src": "photos/photo-24.jpg",
            "title": "The Birthday Star Shining Bright",
            "caption": "Today is all about celebrating you! May your year ahead be as luminous as your smile.",
            "date": "Birthday Star",
            "category": "featured"
      },
      {
            "id": 24,
            "src": "photos/photo-22.jpg",
            "title": "A Heart Full of Love",
            "caption": "Carrying your warmth with me wherever I go — my dearest Akka.",
            "date": "Pure Heart",
            "category": "bond"
      }
]
  },

  // Screen 3: A Letter From My Heart
  screen3: {
    heading: "A Letter From My Heart",
    subtitle: "I have something special to tell you.",
    waxSealMonogram: "❤️",
    pages: [
      {
            "tag": "A Beautiful Beginning",
            "title": "Happy Birthday, my Bangaaramuuuuuu! ❤️🥹🫂🎂",
            "text": "Sometimes, I wonder how beautiful life is for bringing certain people into our lives so unexpectedly and making them mean more to us than we could ever imagine. You came into my life as my friend's sister, but somewhere along the way, you became my Bangaramuuuu, my Bujji Konda, my Bangaru Konda, and one of the most precious people in my life. ❤️🫶🏻 I never expected that someone who entered my life through a simple connection would become someone I would care about this deeply. But here we are, and honestly, I wouldn't trade this beautiful bond for anything. You are not just someone I call my sister; you are someone my heart genuinely feels connected to. 🥹❤️"
      },
      {
            "tag": "Behind All The Teasing",
            "title": "My Bangaramuuuu ❤️🥺",
            "text": "Bangaramuuuu, you may never fully understand how much you mean to me. ❤️🥺 You probably see me as that little brother who keeps irritating you, teasing you, talking nonsense, and finding new ways to trouble you. 😂🫂 But behind all those silly things is a heart that genuinely cares about you, prays for your happiness, and wants to see you win at every stage of life. No matter how much I tease you or how many silly fights we have, one thing will never change: I will always want to see that beautiful smile on your face. Your happiness matters to me, your tears matter to me, your little achievements matter to me, and even the things you think are too small to share will always matter to me. You are my Bangaru Thalli, and seeing you happy is one of those little things that makes my heart happy too. ❤️✨"
      },
      {
            "tag": "Your Safest Place",
            "title": "My Bujji Konda 🫂❤️",
            "text": "And listen to me carefully, my Bujji Konda. 🫂❤️ I want to become your safest place to run to whenever the world feels too heavy. When you are tired of pretending to be strong, come to me. When you have a thousand thoughts running through your mind and don't know how to explain even one of them, come to me. When your heart feels heavy, when your eyes fill with tears, when people misunderstand you, or when you simply need someone to sit beside you without asking a hundred questions, come to me, Nana. You don't always have to explain yourself, hide your feelings, or pretend that everything is okay with me. You can be happy, sad, angry, confused, silent, or emotional. You don't have to be perfect around me. I want you to feel safe enough to be completely yourself. I may not always have the answers to your problems, but I will always try to listen, understand you, and remind you that you don't have to face everything alone. If the world becomes a place where you feel exhausted, I want my presence to feel like a place where your heart can finally rest. 🥹❤️🫂"
      },
      {
            "tag": "Your Little Peace Finder",
            "title": "My Bangaru Konda ❤️🫶🏻",
            "text": "My Bangaru Konda, I don't just want to be the person who makes you laugh when you're happy. I want to be someone who helps you find your peace when you're hurting. I want to be your little peace finder, the person who reminds you to breathe when everything feels overwhelming, who makes you laugh when you feel like crying, who listens when you need to let everything out, and who reminds you of your worth when life makes you doubt yourself. I want to give you the kind of comfort where you don't have to search for the right words because you already know that I care. I cannot promise that I can remove every sadness from your life, but I can promise that I will never intentionally make your pain heavier. I want to add warmth to your difficult days, laughter to your ordinary days, and a little more happiness to your beautiful days. I want to be one of those people who makes life feel a little less difficult and your heart feel a little more peaceful. ❤️🫶🏻"
      },
      {
            "tag": "My Birthday Wishes For You",
            "title": "My Bangaru Thalli 🥹❤️✨",
            "text": "On your birthday, my Bangaru Thalli, I wish I could give you every beautiful thing your heart has ever wished for. I wish you happiness that doesn't disappear overnight, peace that stays even when life gets complicated, success that makes you proud of yourself, and people who love you with honesty and sincerity. I hope you never have to make yourself smaller to be accepted, never have to beg for the love you deserve, and never forget how special you are. May every dream you keep quietly in your heart find its way into reality. May you have more reasons to smile than reasons to cry, more beautiful memories than painful regrets, and more peaceful nights than restless ones. And whenever life doesn't go according to your plans, I hope you remember that you are capable of getting through difficult days, and you will always have someone cheering for you with all his heart. 🥹❤️✨"
      },
      {
            "tag": "Years From Now",
            "title": "My Chitti Thalli 😂❤️",
            "text": "My Chitti Thalli, one day, years from now, I hope we will look back at all our conversations, silly fights, random jokes, teasing, and little memories and laugh until our stomachs hurt. 😂❤️ I hope our bond keeps growing through every season of life. I hope I get to celebrate your little achievements, your biggest milestones, your happiest moments, and all those ordinary days that become special simply because we shared them. I hope you never feel that you have to hide your happiness or your sadness from me. You can tell me about the things that make you proud, the things that scare you, the dreams you are afraid to speak aloud, and even the thoughts that make no sense to anyone else. I want to know the real you, not just the version of you that smiles for everyone. You deserve to be loved on your best days and treated gently on your worst ones. And I hope I can always be someone who makes you feel that difference. ❤️🫂"
      },
      {
            "tag": "A Special Place in My Heart",
            "title": "Forever Favourite Sister 🎂❤️🥹",
            "text": "Happy Birthday to my Bangaramuuuu, my Bujji Konda, my Bangaru Konda, my Bangaru Thalli, my Chitti Thalli, my Kanna, my Nana — my forever favourite sister. 🎂❤️🥹 If I could wish for one special thing beyond all your dreams coming true, it would be that life always gives you reasons to smile and that you never forget how deeply you are loved. Thank you for being such a precious part of my life. You have a special place in my heart that no one else can take, and I will always cherish the happiness of having you in my world. I hope this new chapter brings you the kind of joy that makes you look back and say, \"Life has been beautiful to me.\" You deserve that and so much more, Bangaramuuuu. ❤️♾️🫂"
      },
      {
            "tag": "A Lifelong Promise From Your Little Brother",
            "title": "Always Here For You 🥹❤️🫂",
            "text": "And whenever you need a reminder of how much you matter, remember this: You have a little brother who wants to be your safest place, your peace finder, your personal troublemaker when you need a laugh, and your biggest supporter when you need strength. When life gets too loud, come to me for a little peace. When your heart feels too heavy, come to me for a little comfort. And when happiness finds you, come to me so I can celebrate it with you. You never have to earn my care by being okay all the time. 🥹❤️🫂\n\nLove you endlessly, my Bangaaramuuuuuu! Happy Birthday, Nanaaaaa! May your smile never lose its magic, may your heart always find peace, and may life be as beautiful to you as the happiness you bring into the lives of the people who love you. ❤️🎂🫶🏻♾️"
      }
],
    paragraphs: [
      "Happy Birthday, my Bangaaramuuuuuu! ❤️🥹🫂🎂",
      "Sometimes, I wonder how beautiful life is for bringing certain people into our lives so unexpectedly and making them mean more to us than we could ever imagine. You came into my life as my friend's sister, but somewhere along the way, you became my Bangaramuuuu, my Bujji Konda, my Bangaru Konda, and one of the most precious people in my life. ❤️🫶🏻 I never expected that someone who entered my life through a simple connection would become someone I would care about this deeply. But here we are, and honestly, I wouldn't trade this beautiful bond for anything. You are not just someone I call my sister; you are someone my heart genuinely feels connected to. 🥹❤️",
      "Bangaramuuuu, you may never fully understand how much you mean to me. ❤️🥺 You probably see me as that little brother who keeps irritating you, teasing you, talking nonsense, and finding new ways to trouble you. 😂🫂 But behind all those silly things is a heart that genuinely cares about you, prays for your happiness, and wants to see you win at every stage of life. No matter how much I tease you or how many silly fights we have, one thing will never change: I will always want to see that beautiful smile on your face. Your happiness matters to me, your tears matter to me, your little achievements matter to me, and even the things you think are too small to share will always matter to me. You are my Bangaru Thalli, and seeing you happy is one of those little things that makes my heart happy too. ❤️✨",
      "And listen to me carefully, my Bujji Konda. 🫂❤️ I want to become your safest place to run to whenever the world feels too heavy. When you are tired of pretending to be strong, come to me. When you have a thousand thoughts running through your mind and don't know how to explain even one of them, come to me. When your heart feels heavy, when your eyes fill with tears, when people misunderstand you, or when you simply need someone to sit beside you without asking a hundred questions, come to me, Nana. You don't always have to explain yourself, hide your feelings, or pretend that everything is okay with me. You can be happy, sad, angry, confused, silent, or emotional. You don't have to be perfect around me. I want you to feel safe enough to be completely yourself. I may not always have the answers to your problems, but I will always try to listen, understand you, and remind you that you don't have to face everything alone. If the world becomes a place where you feel exhausted, I want my presence to feel like a place where your heart can finally rest. 🥹❤️🫂",
      "My Bangaru Konda, I don't just want to be the person who makes you laugh when you're happy. I want to be someone who helps you find your peace when you're hurting. I want to be your little peace finder, the person who reminds you to breathe when everything feels overwhelming, who makes you laugh when you feel like crying, who listens when you need to let everything out, and who reminds you of your worth when life makes you doubt yourself. I want to give you the kind of comfort where you don't have to search for the right words because you already know that I care. I cannot promise that I can remove every sadness from your life, but I can promise that I will never intentionally make your pain heavier. I want to add warmth to your difficult days, laughter to your ordinary days, and a little more happiness to your beautiful days. I want to be one of those people who makes life feel a little less difficult and your heart feel a little more peaceful. ❤️🫶🏻",
      "On your birthday, my Bangaru Thalli, I wish I could give you every beautiful thing your heart has ever wished for. I wish you happiness that doesn't disappear overnight, peace that stays even when life gets complicated, success that makes you proud of yourself, and people who love you with honesty and sincerity. I hope you never have to make yourself smaller to be accepted, never have to beg for the love you deserve, and never forget how special you are. May every dream you keep quietly in your heart find its way into reality. May you have more reasons to smile than reasons to cry, more beautiful memories than painful regrets, and more peaceful nights than restless ones. And whenever life doesn't go according to your plans, I hope you remember that you are capable of getting through difficult days, and you will always have someone cheering for you with all his heart. 🥹❤️✨",
      "My Chitti Thalli, one day, years from now, I hope we will look back at all our conversations, silly fights, random jokes, teasing, and little memories and laugh until our stomachs hurt. 😂❤️ I hope our bond keeps growing through every season of life. I hope I get to celebrate your little achievements, your biggest milestones, your happiest moments, and all those ordinary days that become special simply because we shared them. I hope you never feel that you have to hide your happiness or your sadness from me. You can tell me about the things that make you proud, the things that scare you, the dreams you are afraid to speak aloud, and even the thoughts that make no sense to anyone else. I want to know the real you, not just the version of you that smiles for everyone. You deserve to be loved on your best days and treated gently on your worst ones. And I hope I can always be someone who makes you feel that difference. ❤️🫂",
      "Happy Birthday to my Bangaramuuuu, my Bujji Konda, my Bangaru Konda, my Bangaru Thalli, my Chitti Thalli, my Kanna, my Nana — my forever favourite sister. 🎂❤️🥹 If I could wish for one special thing beyond all your dreams coming true, it would be that life always gives you reasons to smile and that you never forget how deeply you are loved. Thank you for being such a precious part of my life. You have a special place in my heart that no one else can take, and I will always cherish the happiness of having you in my world. I hope this new chapter brings you the kind of joy that makes you look back and say, \"Life has been beautiful to me.\" You deserve that and so much more, Bangaramuuuu. ❤️♾️🫂"
],
    revealButtonText: "Reveal My Last Words ✦",
    secretFinalLine: "And whenever you need a reminder of how much you matter, remember this: You have a little brother who wants to be your safest place, your peace finder, your personal troublemaker when you need a laugh, and your biggest supporter when you need strength. When life gets too loud, come to me for a little peace. When your heart feels too heavy, come to me for a little comfort. And when happiness finds you, come to me so I can celebrate it with you. You never have to earn my care by being okay all the time. 🥹❤️🫂\n\nLove you endlessly, my Bangaaramuuuuuu! Happy Birthday, Nanaaaaa! May your smile never lose its magic, may your heart always find peace, and may life be as beautiful to you as the happiness you bring into the lives of the people who love you. ❤️🎂🫶🏻♾️",
    nextButtonText: "Ready for your birthday wish? →"
  },

  // Screen 4: Make a Wish (Cake & Candlelight)
  screen4: {
    heading: "Make a Wish",
    subtitle: "A moment paused just for you.",
    prompt: "Close your eyes and make a wish.",
    wishButtonText: "Make a Wish ✨",
    wishMessage: "May all your dreams take flight and every wish you whisper today come true. You deserve the entire universe and all the joy in it!",
    wishAuthor: "— With all my love, forever & always",
    nextButtonText: "One Last Surprise →"
  },

  // Screen 5: The Final Surprise (Royal Purple & Gold)
  screen5: {
    headline: "Happy Birthday, Bangaaramuuuu!",
    secondaryMessage: "To my sweetest <strong>Bubu</strong>, my forever <strong>Bujji Konda</strong>, my radiant <strong>Bangaru Konda</strong>, and my darling <strong>Bangaru Thalli</strong> — Happy Birthday! ✨❤️<br><br>To my little <strong>Chitti Thalli</strong>, my purest <strong>Bangaram</strong>, my precious <strong>Kanna</strong>, and my dearest <strong>Nana</strong>, may your year ahead overflow with boundless happiness, radiant health, dreams fulfilled, and reasons to laugh every single day. You are the joy of my life and the queen of our hearts. Always here cheering for you, protecting your smile, and loving you endlessly, my Bangaaramuuuu! 🎂🎉✨❤️♾️",
    featuredPhoto: "photos/photo-13.jpg",
    featuredPhotoLabel: "Oh Hello, Bangaaramuuuu ✨",
    replayButtonText: "Replay Our Journey ↺"
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
