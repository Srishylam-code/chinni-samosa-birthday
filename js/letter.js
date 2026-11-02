/**
 * Letter From My Heart System
 * Supports:
 * 1. 3D Envelope opening animation with ❤️ seal & gentle audio ducking.
 * 2. Paragraph-by-Paragraph Cinematic Story Deck with smooth slide transitions.
 * 3. Interactive Nickname Question after Thought 07:
 *    "Give me a name you call me :"
 * 4. Thought 08 dynamically personalized if name entered:
 *    "Your [Name] is always here for you. 🥹❤️🫂"
 *    If left blank: leaves it as it is!
 * 5. Dot jump navigation, Left/Right arrow keys & touch swipe support.
 * 6. Automatic scroll-to-top to ensure zero cutoffs at all times.
 */

class LetterManager {
  constructor() {
    this.isOpened = false;
    this.currentIndex = 0;
    this.isPromptingNickname = false;
    this.brotherNickname = '';
    this.touchStartX = 0;
    this.touchEndX = 0;

    // DOM references: Envelope & Trigger
    this.envelopeContainer = document.getElementById('envelope-container');
    this.envelope = document.getElementById('envelope');
    this.waxSeal = document.getElementById('wax-seal');
    this.openLetterBtn = document.getElementById('open-letter-btn');

    // DOM references: Card Deck
    this.deckContainer = document.getElementById('letter-deck-container');
    this.pageIndicator = document.getElementById('letter-page-indicator');
    this.activeCard = document.getElementById('letter-active-card');
    this.standardContent = document.getElementById('letter-card-standard-content');
    this.promptContent = document.getElementById('letter-card-prompt-content');
    this.nicknameInput = document.getElementById('brother-nickname-input');
    this.submitNicknameBtn = document.getElementById('submit-nickname-btn');

    this.cardTag = document.getElementById('letter-card-tag');
    this.cardTitle = document.getElementById('letter-card-title');
    this.cardBody = document.getElementById('letter-card-body');
    this.cardPrevBtn = document.getElementById('letter-card-prev-btn');
    this.cardNextBtn = document.getElementById('letter-card-next-btn');
    this.footerPrevBtn = document.getElementById('letter-footer-prev');
    this.footerNextBtn = document.getElementById('letter-footer-next');
    this.deckFinishBtn = document.getElementById('letter-deck-finish');
    this.dotsTrack = document.getElementById('letter-dots-track');

    this.conf = CONFIG.screen3 || {};
    this.pages = this.conf.pages || [];

    this.init();
  }

  init() {
    // Populate wax seal
    if (this.waxSeal) {
      this.waxSeal.textContent = this.conf.waxSealMonogram || '❤️';
    }

    // Render navigation dots
    this.renderDots();

    // Bind event listeners
    this.bindEvents();
  }

  renderDots() {
    if (!this.dotsTrack) return;
    this.dotsTrack.innerHTML = '';

    this.pages.forEach((page, idx) => {
      const dot = document.createElement('button');
      dot.className = `letter-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to Thought ${idx + 1}`);
      dot.setAttribute('title', `${page.tag || `Thought ${idx + 1}`}`);

      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hideNicknamePrompt();
        this.goToPage(idx);
      });

      this.dotsTrack.appendChild(dot);
    });
  }

  bindEvents() {
    // Open envelope
    if (this.envelopeContainer) {
      this.envelopeContainer.addEventListener('click', () => this.openLetter());
    }
    if (this.openLetterBtn) {
      this.openLetterBtn.addEventListener('click', () => this.openLetter());
    }

    // Prev / Next card navigation
    if (this.cardPrevBtn) {
      this.cardPrevBtn.addEventListener('click', () => this.prevPage());
    }
    if (this.footerPrevBtn) {
      this.footerPrevBtn.addEventListener('click', () => this.prevPage());
    }
    if (this.cardNextBtn) {
      this.cardNextBtn.addEventListener('click', () => this.nextPage());
    }
    if (this.footerNextBtn) {
      this.footerNextBtn.addEventListener('click', () => this.nextPage());
    }

    // Nickname submission
    if (this.submitNicknameBtn) {
      this.submitNicknameBtn.addEventListener('click', () => this.handleNicknameSubmit());
    }
    if (this.nicknameInput) {
      this.nicknameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleNicknameSubmit();
        }
      });
      // Auto-capitalize to ALL CAPS live as she types
      this.nicknameInput.addEventListener('input', () => {
        if (this.nicknameInput.value) {
          this.nicknameInput.value = this.nicknameInput.value.toUpperCase();
        }
      });
      this.nicknameInput.addEventListener('blur', () => {
        if (this.nicknameInput.value) {
          this.nicknameInput.value = this.nicknameInput.value.trim().toUpperCase();
        }
      });
    }

    // Keyboard arrow navigation
    window.addEventListener('keydown', (e) => {
      const screen3 = document.getElementById('screen-3');
      if (!screen3 || !screen3.classList.contains('active')) return;
      if (this.isPromptingNickname) return; // Don't hijack arrow keys while typing

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        this.nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevPage();
      }
    });

    // Touch swipe navigation
    if (this.activeCard) {
      this.activeCard.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.activeCard.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        if (!this.isPromptingNickname) {
          this.handleSwipe();
        }
      }, { passive: true });
    }
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.nextPage();
      } else {
        this.prevPage();
      }
    }
  }

  openLetter() {
    if (this.isOpened) return;
    this.isOpened = true;

    // Flap animation
    if (this.envelope) {
      this.envelope.classList.add('open');
    }

    // Duck audio volume
    if (window.audioManager) {
      window.audioManager.duckForLetter();
    }

    // Hide open button
    if (this.openLetterBtn) {
      this.openLetterBtn.style.opacity = '0';
      this.openLetterBtn.style.pointerEvents = 'none';
    }

    setTimeout(() => {
      if (this.envelopeContainer) {
        this.envelopeContainer.style.display = 'none';
      }
      if (this.deckContainer) {
        this.deckContainer.style.display = 'flex';
      }

      this.updateCardContent(0, 'none');
      this.scrollToTop();
    }, 650);
  }

  showNicknamePrompt() {
    this.isPromptingNickname = true;

    if (this.activeCard) {
      this.activeCard.classList.add('slide-next');
      setTimeout(() => {
        if (this.standardContent) this.standardContent.style.display = 'none';
        if (this.promptContent) this.promptContent.style.display = 'flex';

        if (this.pageIndicator) {
          this.pageIndicator.textContent = "A Special Question ✦";
        }

        // Adjust navigation buttons for the prompt
        if (this.cardNextBtn) this.cardNextBtn.disabled = true;
        if (this.footerNextBtn) this.footerNextBtn.style.display = 'none';
        if (this.deckFinishBtn) this.deckFinishBtn.style.display = 'none';
        if (this.cardPrevBtn) this.cardPrevBtn.disabled = false;
        if (this.footerPrevBtn) this.footerPrevBtn.disabled = false;

        this.activeCard.classList.remove('slide-next');
        this.activeCard.classList.add('settle-in');

        setTimeout(() => {
          this.activeCard.classList.remove('settle-in');
          if (this.nicknameInput) {
            this.nicknameInput.focus();
          }
        }, 350);

        this.scrollToTop();
      }, 200);
    }
  }

  hideNicknamePrompt() {
    this.isPromptingNickname = false;
    if (this.promptContent) this.promptContent.style.display = 'none';
    if (this.standardContent) this.standardContent.style.display = 'flex';
  }

  handleNicknameSubmit() {
    let name = this.nicknameInput ? this.nicknameInput.value.trim().toUpperCase() : '';

    // If left blank, brotherNickname is empty so original text is preserved!
    this.brotherNickname = name;

    // Trigger sparkle burst around button
    if (window.particleEngine && this.submitNicknameBtn) {
      const rect = this.submitNicknameBtn.getBoundingClientRect();
      window.particleEngine.triggerCelebrationBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    // Transition smoothly to Thought 08!
    setTimeout(() => {
      this.hideNicknamePrompt();
      this.goToPage(7, 'next');
    }, 450);
  }

  goToPage(index, direction = 'next') {
    if (index < 0 || index >= this.pages.length) return;

    this.hideNicknamePrompt();

    if (this.activeCard) {
      const animClass = direction === 'prev' ? 'slide-prev' : 'slide-next';
      this.activeCard.classList.add(animClass);

      setTimeout(() => {
        this.currentIndex = index;
        this.updateCardContent(index, direction);
        this.activeCard.classList.remove(animClass);
        this.activeCard.classList.add('settle-in');

        setTimeout(() => {
          this.activeCard.classList.remove('settle-in');
        }, 400);

        this.scrollToTop();
      }, 200);
    } else {
      this.currentIndex = index;
      this.updateCardContent(index, direction);
      this.scrollToTop();
    }
  }

  nextPage() {
    if (this.isPromptingNickname) {
      this.handleNicknameSubmit();
      return;
    }

    // If moving from Thought 07 (index 6) to Thought 08 (index 7):
    if (this.currentIndex === 6) {
      this.showNicknamePrompt();
      return;
    }

    if (this.currentIndex < this.pages.length - 1) {
      this.goToPage(this.currentIndex + 1, 'next');
    }
  }

  prevPage() {
    if (this.isPromptingNickname) {
      // Go back to Thought 07
      this.hideNicknamePrompt();
      this.goToPage(6, 'prev');
      return;
    }

    if (this.currentIndex > 0) {
      this.goToPage(this.currentIndex - 1, 'prev');
    }
  }

  updateCardContent(index, direction) {
    const page = this.pages[index];
    if (!page) return;

    const formattedIndex = String(index + 1).padStart(2, '0');
    const totalCount = String(this.pages.length).padStart(2, '0');

    // Page indicator
    if (this.pageIndicator) {
      this.pageIndicator.textContent = `Thought ${formattedIndex} / ${totalCount}`;
    }

    // Tag
    if (this.cardTag) {
      this.cardTag.textContent = page.tag || `Thought ${formattedIndex}`;
    }

    // Specialized Personalization for Thought 08 (Final Thought)
    if (index === 7) {
      let nick = this.brotherNickname ? this.brotherNickname.trim().toUpperCase() : '';

      if (nick) {
        // Sister typed a nickname (e.g. "Panda"):
        if (this.cardTag) {
          this.cardTag.textContent = `A Lifelong Promise From Your ${nick}`;
        }
        if (this.cardTitle) {
          this.cardTitle.textContent = `Your ${nick} is always here for you. 🥹❤️🫂`;
        }
        if (this.cardBody) {
          let bodyText = page.text || '';
          bodyText = bodyText.replace(
            "You have a little brother who wants to be your safest place",
            `Your ${nick} wants to be your safest place`
          );
          if (!bodyText.includes(`Forever your ${nick}`)) {
            bodyText += `\n\n— Forever your ${nick} ❤️🎂🫶🏻♾️`;
          }
          this.cardBody.textContent = bodyText;
        }
      } else {
        // Left blank: leave it as it is in the original text!
        if (this.cardTitle) {
          this.cardTitle.textContent = page.title || 'A Lifelong Promise From Your Little Brother 🥹❤️🫂';
        }
        if (this.cardBody) {
          this.cardBody.textContent = page.text || '';
        }
      }
    } else {
      if (this.cardTitle) {
        this.cardTitle.textContent = page.title || '';
      }
      if (this.cardBody) {
        this.cardBody.textContent = page.text || '';
      }
    }

    // Prev / Next button states
    const isFirst = index === 0;
    const isLast = index === this.pages.length - 1;

    if (this.cardPrevBtn) this.cardPrevBtn.disabled = isFirst;
    if (this.footerPrevBtn) this.footerPrevBtn.disabled = isFirst;

    if (isLast) {
      if (this.cardNextBtn) this.cardNextBtn.disabled = true;
      if (this.footerNextBtn) this.footerNextBtn.style.display = 'none';
      if (this.deckFinishBtn) this.deckFinishBtn.style.display = 'inline-flex';

      // Sparkle burst celebration on final promise
      if (window.particleEngine && direction !== 'none') {
        const rect = this.activeCard.getBoundingClientRect();
        window.particleEngine.triggerCelebrationBurst(rect.left + rect.width / 2, rect.top + rect.height / 3);
      }
    } else {
      if (this.cardNextBtn) this.cardNextBtn.disabled = false;
      if (this.footerNextBtn) this.footerNextBtn.style.display = 'inline-flex';
      if (this.deckFinishBtn) this.deckFinishBtn.style.display = 'none';
    }

    // Update dots
    if (this.dotsTrack) {
      const dots = this.dotsTrack.querySelectorAll('.letter-dot');
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }

  scrollToTop() {
    const screen3 = document.getElementById('screen-3');
    if (screen3) {
      screen3.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  reset() {
    this.isOpened = false;
    this.currentIndex = 0;
    this.isPromptingNickname = false;
    this.brotherNickname = '';

    this.hideNicknamePrompt();

    if (this.envelope) this.envelope.classList.remove('open');
    if (this.envelopeContainer) this.envelopeContainer.style.display = 'block';
    if (this.deckContainer) this.deckContainer.style.display = 'none';
    if (this.openLetterBtn) {
      this.openLetterBtn.style.opacity = '1';
      this.openLetterBtn.style.pointerEvents = 'auto';
    }
    if (this.nicknameInput) {
      this.nicknameInput.value = '';
    }
    this.scrollToTop();
  }
}

window.letterManager = null;
