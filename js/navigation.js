/**
 * Navigation & Cinematic Transition System
 * Coordinates screen changes, chapter indicators, ambient palette shifts,
 * and transition curtain animations across all 5 chapters.
 */

class NavigationManager {
  constructor() {
    this.currentScreen = 1;
    this.totalScreens = 5;
    this.isTransitioning = false;

    // Distinct background gradients for all 5 chapters
    this.ambientGradients = {
      1: 'radial-gradient(circle at 50% 40%, rgba(8, 127, 91, 0.5) 0%, rgba(7, 38, 26, 0.85) 50%, #03150E 100%)',
      2: 'radial-gradient(circle at 50% 35%, rgba(217, 181, 109, 0.32) 0%, rgba(26, 20, 10, 0.85) 55%, #080808 100%)',
      3: 'radial-gradient(circle at 50% 45%, rgba(101, 28, 48, 0.55) 0%, rgba(50, 11, 22, 0.88) 55%, #150409 100%)',
      4: 'radial-gradient(circle at 50% 50%, rgba(255, 167, 38, 0.28) 0%, rgba(11, 101, 69, 0.45) 50%, #03180F 100%)',
      5: 'radial-gradient(ellipse at 50% 85%, rgba(226, 82, 43, 0.48) 0%, rgba(150, 45, 35, 0.42) 30%, rgba(55, 16, 26, 0.88) 65%, #0D0408 100%)'
    };

    // DOM references
    this.curtain = document.getElementById('transition-curtain');
    this.ambientBg = document.getElementById('ambient-gradient');
    this.dots = document.querySelectorAll('.chapter-dot');
    this.counterEl = document.getElementById('chapter-counter');

    this.init();
  }

  init() {
    // Set initial data-screen on body
    document.body.setAttribute('data-screen', '1');
    this.bindEvents();
    this.updateNavigationUI();
  }

  bindEvents() {
    // Chapter dots click
    this.dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetScreen = parseInt(dot.getAttribute('data-screen'), 10);
        if (targetScreen !== this.currentScreen && !this.isTransitioning) {
          this.goToScreen(targetScreen);
        }
      });
    });

    // Next button triggers with [data-next-screen]
    document.querySelectorAll('[data-next-screen]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = parseInt(btn.getAttribute('data-next-screen'), 10);
        this.goToScreen(target);
      });
    });

    // Back button triggers with [data-prev-screen]
    document.querySelectorAll('[data-prev-screen]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = parseInt(btn.getAttribute('data-prev-screen'), 10);
        this.goToScreen(target);
      });
    });

    // Replay journey button
    const replayBtn = document.getElementById('replay-journey-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        this.replayJourney();
      });
    }

    // Keyboard navigation (when lightbox is closed)
    window.addEventListener('keydown', (e) => {
      const lightbox = document.getElementById('photo-lightbox');
      if (lightbox && lightbox.classList.contains('active')) return;

      if (e.key === 'PageDown' || e.key === 'ArrowDown') {
        if (this.currentScreen < this.totalScreens) {
          this.goToScreen(this.currentScreen + 1);
        }
      } else if (e.key === 'PageUp' || e.key === 'ArrowUp') {
        if (this.currentScreen > 1) {
          this.goToScreen(this.currentScreen - 1);
        }
      }
    });
  }

  goToScreen(targetScreen) {
    if (this.isTransitioning || targetScreen === this.currentScreen) return;
    if (targetScreen < 1 || targetScreen > this.totalScreens) return;

    this.isTransitioning = true;
    const fromScreen = this.currentScreen;
    const toScreen = targetScreen;

    // Trigger audio actions on transition
    if (window.audioManager) {
      if (toScreen === 2) {
        if (!window.audioManager.isPlaying) {
          window.audioManager.start();
        } else {
          window.audioManager.restoreVolume();
        }
      }
      if (toScreen === 3) {
        // Duck audio during Letter
        window.audioManager.duckForLetter();
      } else if (fromScreen === 3 && toScreen !== 5) {
        // Restore audio after Letter
        window.audioManager.restoreVolume();
      }
      if (toScreen === 5) {
        // Gentle volume for Final Reveal
        window.audioManager.setVolume(CONFIG.audio.finalVolume || 0.35, 2000);
      }
    }

    // Step 1: Animate curtain beam sweep
    if (this.curtain) {
      this.curtain.classList.add('animating');
      setTimeout(() => this.curtain.classList.add('sweep'), 50);
    }

    // Step 2: Swap active screen class at midpoint of curtain sweep
    setTimeout(() => {
      const currentEl = document.getElementById(`screen-${fromScreen}`);
      const nextEl = document.getElementById(`screen-${toScreen}`);

      if (currentEl) {
        currentEl.classList.remove('active');
        currentEl.classList.add('exiting');
      }

      if (nextEl) {
        nextEl.classList.add('active');
        nextEl.scrollTop = 0; // reset scroll to top
      }

      // Dynamically update body data-screen for instant CSS variable theme shift!
      document.body.setAttribute('data-screen', String(toScreen));

      // Update ambient gradient
      if (this.ambientBg && this.ambientGradients[toScreen]) {
        this.ambientBg.style.background = this.ambientGradients[toScreen];
      }

      // Update particle system theme
      if (window.particleEngine) {
        window.particleEngine.setTheme(toScreen);
      }

      // Celebration burst if navigating to screen 5
      if (toScreen === 5 && window.particleEngine) {
        window.particleEngine.triggerCelebrationBurst(window.innerWidth / 2, window.innerHeight * 0.4);
      }

      this.currentScreen = toScreen;
      this.updateNavigationUI();

      // Clean up exiting class
      setTimeout(() => {
        if (currentEl) currentEl.classList.remove('exiting');
      }, 400);

    }, 350);

    // Step 3: Fade out curtain
    setTimeout(() => {
      if (this.curtain) {
        this.curtain.classList.remove('animating', 'sweep');
      }
      this.isTransitioning = false;
    }, 850);
  }

  updateNavigationUI() {
    this.dots.forEach(dot => {
      const dotScreen = parseInt(dot.getAttribute('data-screen'), 10);
      if (dotScreen === this.currentScreen) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    if (this.counterEl) {
      this.counterEl.textContent = `Chapter 0${this.currentScreen} / 0${this.totalScreens}`;
    }

    const navBar = document.getElementById('chapter-navigation');
    if (navBar) {
      navBar.style.opacity = this.currentScreen === 1 ? '0.7' : '1';
    }
  }

  replayJourney() {
    // Reset all sub-managers to initial pristine state
    if (window.letterManager) window.letterManager.reset();
    if (window.cakeManager) window.cakeManager.reset();

    if (window.audioManager) {
      window.audioManager.restoreVolume();
    }

    this.goToScreen(1);
  }
}

window.navigationManager = null;
