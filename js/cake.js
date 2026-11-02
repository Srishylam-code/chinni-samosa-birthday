/**
 * Cake & Make-a-Wish Interaction System
 * Handles candle extinguishing, particle celebrations, and wish revelation.
 */

class CakeManager {
  constructor() {
    this.isWished = false;

    // DOM references
    this.cakeWrapper = document.getElementById('cake-wrapper');
    this.makeWishBtn = document.getElementById('make-wish-btn');
    this.wishCard = document.getElementById('wish-card');
    this.wishPrompt = document.getElementById('wish-prompt');
    this.wishMessageEl = document.getElementById('wish-message');
    this.wishAuthorEl = document.getElementById('wish-author');

    this.init();
  }

  init() {
    const conf = CONFIG.screen4 || CONFIG.screen5 || {};
    if (this.wishMessageEl && conf.wishMessage) {
      this.wishMessageEl.textContent = `“${conf.wishMessage}”`;
    }

    if (this.wishAuthorEl && conf.wishAuthor) {
      this.wishAuthorEl.textContent = conf.wishAuthor;
    }

    if (this.makeWishBtn) {
      this.makeWishBtn.addEventListener('click', () => this.makeWish());
    }
  }

  makeWish() {
    if (this.isWished) return;
    this.isWished = true;

    // Extinguish candles with puff of smoke
    if (this.cakeWrapper) {
      this.cakeWrapper.classList.add('extinguished');
    }

    // Trigger golden celebratory particle burst
    if (window.particleEngine) {
      const rect = this.cakeWrapper.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + 50; // top of candles
      window.particleEngine.triggerCelebrationBurst(originX, originY);
      setTimeout(() => {
        window.particleEngine.triggerCelebrationBurst(originX - 100, originY + 50);
        window.particleEngine.triggerCelebrationBurst(originX + 100, originY + 50);
      }, 300);
    }

    // Hide wish button & prompt
    if (this.makeWishBtn) {
      this.makeWishBtn.style.display = 'none';
    }
    if (this.wishPrompt) {
      this.wishPrompt.style.opacity = '0';
    }

    // Reveal wish card after slight suspense
    setTimeout(() => {
      if (this.wishCard) {
        this.wishCard.style.display = 'block';
      }
    }, 600);
  }

  reset() {
    this.isWished = false;
    if (this.cakeWrapper) {
      this.cakeWrapper.classList.remove('extinguished');
    }
    if (this.makeWishBtn) {
      this.makeWishBtn.style.display = 'inline-flex';
    }
    if (this.wishPrompt) {
      this.wishPrompt.style.opacity = '1';
    }
    if (this.wishCard) {
      this.wishCard.style.display = 'none';
    }
  }
}

window.cakeManager = null;
