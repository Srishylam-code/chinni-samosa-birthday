/**
 * Main Application Bootstrapper
 * Initializes all systems and binds global actions for all 5 chapters.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("Initializing Chinni Samosa Cinematic Birthday Experience (5 Chapters)...");

  // 1. Populate dynamic texts from CONFIG
  populateConfigTexts();

  // 2. Initialize Particles Engine
  window.particleEngine = new ParticleEngine('particle-canvas');

  // 3. Initialize Audio Manager
  window.audioManager = new AudioManager();

  // 4. Initialize Gallery (25 Photos & Lightbox)
  window.galleryManager = new GalleryManager();

  // 5. Initialize Letter System
  window.letterManager = new LetterManager();

  // 6. Initialize Cake System
  window.cakeManager = new CakeManager();

  // 7. Initialize Navigation & Transitions
  window.navigationManager = new NavigationManager();

  // 8. Wire Enter Button on Screen 1
  const enterBtn = document.getElementById('enter-surprise-btn');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      // User gesture initializes audio
      if (window.audioManager) {
        window.audioManager.start();
      }
      if (window.navigationManager) {
        window.navigationManager.goToScreen(2);
      }
    });
  }

  console.log("All systems ready for Bangaaramuuuu's surprise!");
});

function populateConfigTexts() {
  if (typeof CONFIG === 'undefined') return;

  // Screen 1: The Secret Entrance
  const s1Headline = document.getElementById('s1-headline');
  const s1Subtitle = document.getElementById('s1-subtitle');
  const enterBtn = document.getElementById('enter-surprise-btn');
  if (s1Headline && CONFIG.screen1 && CONFIG.screen1.headline) {
    s1Headline.innerHTML = CONFIG.screen1.headline.replace("Chinni Samosa's", "<span class='highlight-name'>Chinni Samosa's</span>");
  }
  if (s1Subtitle && CONFIG.screen1 && CONFIG.screen1.subtitle) {
    s1Subtitle.textContent = CONFIG.screen1.subtitle;
  }
  if (enterBtn && CONFIG.screen1 && CONFIG.screen1.enterButtonText) {
    enterBtn.textContent = CONFIG.screen1.enterButtonText;
  }

  // Screen 2: Our Little Memories
  const s2Heading = document.getElementById('s2-heading');
  const s2Subtitle = document.getElementById('s2-subtitle');
  if (s2Heading && CONFIG.screen2 && CONFIG.screen2.heading) {
    s2Heading.textContent = CONFIG.screen2.heading;
  }
  if (s2Subtitle && CONFIG.screen2 && CONFIG.screen2.subtitle) {
    s2Subtitle.textContent = CONFIG.screen2.subtitle;
  }

  // Screen 3: A Letter From My Heart
  const s3Heading = document.getElementById('s3-heading');
  const s3Prompt = document.getElementById('s3-prompt');
  const openLetterBtn = document.getElementById('open-letter-btn');
  const letterConf = CONFIG.screen3 || CONFIG.screen4;
  if (s3Heading && letterConf && letterConf.heading) s3Heading.textContent = letterConf.heading;
  if (s3Prompt && letterConf && letterConf.prompt) s3Prompt.textContent = letterConf.prompt;
  if (openLetterBtn && letterConf && letterConf.openButtonText) openLetterBtn.textContent = letterConf.openButtonText;

  // Screen 4: Make a Wish (Cake & Candlelight)
  const s4Heading = document.getElementById('s4-heading');
  const wishPrompt = document.getElementById('wish-prompt');
  const makeWishBtn = document.getElementById('make-wish-btn');
  const cakeConf = CONFIG.screen4 || CONFIG.screen5;
  if (s4Heading && cakeConf && cakeConf.heading) s4Heading.textContent = cakeConf.heading;
  if (wishPrompt && cakeConf && cakeConf.prompt) wishPrompt.textContent = cakeConf.prompt;
  if (makeWishBtn && cakeConf && cakeConf.wishButtonText) makeWishBtn.textContent = cakeConf.wishButtonText;

  // Screen 5: The Final Surprise
  const s5Headline = document.getElementById('s6-headline') || document.getElementById('s5-headline');
  const s5Message = document.getElementById('s6-message') || document.getElementById('s5-message');
  const finalPhotoImg = document.getElementById('final-photo-img');
  const replayBtn = document.getElementById('replay-journey-btn');
  const finalConf = CONFIG.screen5 || CONFIG.screen6;

  if (s5Headline && finalConf && finalConf.headline) s5Headline.textContent = finalConf.headline;
  if (s5Message && finalConf && finalConf.secondaryMessage) s5Message.innerHTML = finalConf.secondaryMessage;
  if (replayBtn && finalConf && finalConf.replayButtonText) replayBtn.textContent = finalConf.replayButtonText;

  // Featured Photo on Final Screen (Oh Hello Bangaaramuuuu only)
  if (finalPhotoImg) {
    finalPhotoImg.src = (finalConf && finalConf.featuredPhoto) ? finalConf.featuredPhoto : "photos/photo-13.jpg";
    finalPhotoImg.alt = "Oh Hello, Bangaaramuuuu";
  }

  // Audio widget title
  const audioTitle = document.getElementById('audio-title');
  if (audioTitle && CONFIG.audio && CONFIG.audio.trackTitle) {
    audioTitle.textContent = CONFIG.audio.trackTitle;
  }
}
