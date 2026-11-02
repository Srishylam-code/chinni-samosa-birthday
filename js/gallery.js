/**
 * Cinematic Polaroid Deck Gallery System
 * Presents 24 personal photographs one by one with smooth slide transitions,
 * auto-play slideshow, surprise sequencing (no upcoming thumbnails),
 * and progressive chapter advance unlocking.
 */

class GalleryManager {
  constructor() {
    this.photos = CONFIG.screen2.photos || [];
    this.currentIndex = 0;
    this.hasViewedAll = false;
    this.isAutoPlaying = false;
    this.autoPlayInterval = null;
    this.autoPlayDuration = 5500; // 5.5 seconds per slide
    this.touchStartX = 0;
    this.touchEndX = 0;

    // DOM references for Polaroid Deck
    this.activeCard = document.getElementById('active-polaroid');
    this.deckImg = document.getElementById('deck-img');
    this.deckTitle = document.getElementById('deck-title');
    this.deckCaption = document.getElementById('deck-caption');
    this.deckCounter = document.getElementById('deck-counter');
    this.prevBtn = document.getElementById('deck-prev-btn');
    this.nextBtn = document.getElementById('deck-next-btn');
    this.autoPlayBtn = document.getElementById('deck-autoplay-btn');
    this.autoPlayIcon = document.getElementById('autoplay-icon');
    this.autoPlayText = document.getElementById('autoplay-text');
    this.progressBar = document.getElementById('deck-progress-bar');
    this.advanceBtn = document.getElementById('gallery-advance-btn') || document.querySelector('.deck-advance-btn');

    // Lightbox references
    this.lightboxEl = document.getElementById('photo-lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxCounter = document.getElementById('lightbox-counter');
    this.lightboxTitle = document.getElementById('lightbox-title');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    this.lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
    this.lightboxNextBtn = document.getElementById('lightbox-next-btn');

    this.init();
  }

  init() {
    this.updateCardContent(0, 'none');
    this.bindEvents();
    this.bindLightboxEvents();
  }

  bindEvents() {
    const ensureAudio = () => {
      if (window.audioManager && !window.audioManager.isPlaying) {
        window.audioManager.start();
      }
    };

    // Next / Prev button clicks
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        ensureAudio();
        this.stopAutoPlay();
        this.nextPhoto();
      });
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        ensureAudio();
        this.stopAutoPlay();
        this.prevPhoto();
      });
    }

    // Auto-play slideshow toggle
    if (this.autoPlayBtn) {
      this.autoPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        ensureAudio();
        this.toggleAutoPlay();
      });
    }

    // Click active card to open in Lightbox
    if (this.activeCard) {
      this.activeCard.addEventListener('click', () => {
        ensureAudio();
        this.stopAutoPlay();
        this.openLightbox(this.currentIndex);
      });
    }

    // Keyboard navigation (when Lightbox is not active)
    window.addEventListener('keydown', (e) => {
      if (this.lightboxEl && this.lightboxEl.classList.contains('active')) return;
      
      // Only when on Screen 2
      const screen2 = document.getElementById('screen-2');
      if (!screen2 || !screen2.classList.contains('active')) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        this.stopAutoPlay();
        this.nextPhoto();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.stopAutoPlay();
        this.prevPhoto();
      }
    });

    // Touch Swipe Support on mobile
    if (this.activeCard) {
      this.activeCard.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.activeCard.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, { passive: true });
    }
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 45) {
      this.stopAutoPlay();
      if (diff > 0) {
        this.nextPhoto(); // swiped left -> next
      } else {
        this.prevPhoto(); // swiped right -> prev
      }
    }
  }

  nextPhoto() {
    const nextIdx = (this.currentIndex + 1) % this.photos.length;
    this.goToPhoto(nextIdx, 'next');
  }

  prevPhoto() {
    const prevIdx = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.goToPhoto(prevIdx, 'prev');
  }

  goToPhoto(index, direction = 'next') {
    if (index === this.currentIndex && direction !== 'none') return;

    if (this.activeCard) {
      // Trigger slide out
      const animClass = direction === 'prev' ? 'slide-prev' : 'slide-next';
      this.activeCard.classList.add(animClass);

      setTimeout(() => {
        this.currentIndex = index;
        this.updateCardContent(index, direction);
        this.activeCard.classList.remove(animClass);
        this.activeCard.classList.add('settle-in');

        setTimeout(() => {
          this.activeCard.classList.remove('settle-in');
        }, 450);
      }, 200);
    } else {
      this.currentIndex = index;
      this.updateCardContent(index, direction);
    }
  }

  updateCardContent(index, direction) {
    const photo = this.photos[index];
    if (!photo) return;

    const formattedIndex = String(index + 1).padStart(2, '0');
    const totalCount = String(this.photos.length).padStart(2, '0');

    if (this.deckImg) {
      this.deckImg.src = photo.src;
      this.deckImg.alt = photo.title || 'Memory photo';
    }

    if (this.deckCounter) {
      this.deckCounter.textContent = `${formattedIndex} / ${totalCount}`;
    }

    if (this.deckTitle) {
      this.deckTitle.textContent = photo.title || `Memory #${formattedIndex}`;
    }

    if (this.deckCaption) {
      this.deckCaption.textContent = photo.caption || '';
    }

    // Update Progress Bar
    if (this.progressBar) {
      const percentage = ((index + 1) / this.photos.length) * 100;
      this.progressBar.style.width = `${percentage}%`;
    }

    // Advance Button Logic: Only reveal once all 24 images have been scrolled to!
    const isLastPhoto = index === this.photos.length - 1;
    if (isLastPhoto) {
      this.hasViewedAll = true;
      if (this.advanceBtn) {
        this.advanceBtn.style.display = 'inline-flex';
        this.advanceBtn.style.opacity = '1';
        this.advanceBtn.classList.add('pulse-glow');

        // Trigger celebratory sparkle burst when reaching the final photo
        if (window.particleEngine && direction !== 'none') {
          const rect = this.advanceBtn.getBoundingClientRect();
          window.particleEngine.triggerCelebrationBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      }
    } else {
      if (this.advanceBtn) {
        if (this.hasViewedAll) {
          // Keep accessible once unlocked
          this.advanceBtn.style.display = 'inline-flex';
        } else {
          // Strictly hidden until she completes all photos!
          this.advanceBtn.style.display = 'none';
        }
      }
    }
  }

  toggleAutoPlay() {
    if (this.isAutoPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  startAutoPlay() {
    this.isAutoPlaying = true;
    if (this.autoPlayIcon) this.autoPlayIcon.textContent = '❚❚';
    if (this.autoPlayText) this.autoPlayText.textContent = 'Pause';
    if (this.autoPlayBtn) this.autoPlayBtn.classList.add('playing');

    this.autoPlayInterval = setInterval(() => {
      // If reached the end of slideshow, stop autoplay so she can read the advance button!
      if (this.currentIndex === this.photos.length - 1) {
        this.stopAutoPlay();
        return;
      }
      this.nextPhoto();
    }, this.autoPlayDuration);
  }

  stopAutoPlay() {
    this.isAutoPlaying = false;
    if (this.autoPlayIcon) this.autoPlayIcon.textContent = '▶';
    if (this.autoPlayText) this.autoPlayText.textContent = 'Auto Play';
    if (this.autoPlayBtn) this.autoPlayBtn.classList.remove('playing');

    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  bindLightboxEvents() {
    if (this.lightboxCloseBtn) {
      this.lightboxCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeLightbox();
      });
    }

    if (this.lightboxNextBtn) {
      this.lightboxNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.lightboxNext();
      });
    }

    if (this.lightboxPrevBtn) {
      this.lightboxPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.lightboxPrev();
      });
    }

    // Close on backdrop click
    if (this.lightboxEl) {
      this.lightboxEl.addEventListener('click', (e) => {
        if (e.target === this.lightboxEl) {
          this.closeLightbox();
        }
      });
    }

    // Lightbox keyboard arrows & Escape
    window.addEventListener('keydown', (e) => {
      if (!this.lightboxEl || !this.lightboxEl.classList.contains('active')) return;

      if (e.key === 'Escape') {
        this.closeLightbox();
      } else if (e.key === 'ArrowRight') {
        this.lightboxNext();
      } else if (e.key === 'ArrowLeft') {
        this.lightboxPrev();
      }
    });
  }

  openLightbox(index) {
    this.currentIndex = index;
    this.updateLightboxContent();
    if (this.lightboxEl) this.lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    if (this.lightboxEl) this.lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
    // Sync deck to where lightbox was browsing
    this.updateCardContent(this.currentIndex, 'none');
  }

  lightboxNext() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    this.updateLightboxContent();
  }

  lightboxPrev() {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.updateLightboxContent();
  }

  updateLightboxContent() {
    const photo = this.photos[this.currentIndex];
    if (!photo) return;

    const formattedIndex = String(this.currentIndex + 1).padStart(2, '0');
    const totalCount = String(this.photos.length).padStart(2, '0');

    if (this.lightboxImg) {
      this.lightboxImg.style.opacity = '0';
      setTimeout(() => {
        this.lightboxImg.src = photo.src;
        this.lightboxImg.alt = photo.title || 'Enlarged photo';
        if (this.lightboxCounter) this.lightboxCounter.textContent = `${formattedIndex} / ${totalCount}`;
        if (this.lightboxTitle) this.lightboxTitle.textContent = photo.title || `Memory #${formattedIndex}`;
        if (this.lightboxCaption) this.lightboxCaption.textContent = photo.caption || '';
        this.lightboxImg.style.opacity = '1';
      }, 150);
    }
  }

  reset() {
    this.stopAutoPlay();
    this.currentIndex = 0;
    this.hasViewedAll = false;
    if (this.advanceBtn) {
      this.advanceBtn.style.display = 'none';
      this.advanceBtn.classList.remove('pulse-glow');
    }
    this.updateCardContent(0, 'none');
  }
}

window.galleryManager = null;
