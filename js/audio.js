/**
 * Persistent Background Music Controller
 * Continuous multi-song playlist engine that seamlessly plays consecutive tracks,
 * ducks volume for the letter screen, and manages UI indicators.
 */

class AudioManager {
  constructor() {
    this.audioElement = new Audio();
    this.audioElement.loop = false; // Must be false so 'ended' event fires!
    this.audioElement.preload = 'auto';

    this.isPlaying = false;
    this.isMuted = false;
    this.currentVolume = (CONFIG.audio && CONFIG.audio.defaultVolume) || 0.45;
    this.targetVolume = this.currentVolume;
    this.fadeInterval = null;

    // Continuous Playlist
    this.playlist = (CONFIG.audio && CONFIG.audio.playlist && CONFIG.audio.playlist.length > 0)
      ? CONFIG.audio.playlist
      : [
          {
            title: "Naan Un Azhaginile (24 Theme)",
            src: "audio/Naan Un Azhaginile BGM - Love Theme 24 Movie by AR Rahman.mp3"
          },
          {
            title: "Ekkadiki Pothavu Chinnavada BGM",
            src: "audio/Ekkadiki pothavu chinnavada Bgms [Co4g3vmzsXM] (1).mp3"
          },
          {
            title: "Soulmates Unite — Anirudh",
            src: "audio/Anirudh Ravichander - Soulmates Unite (Instrumental).mp3"
          }
        ];
    this.currentTrackIndex = 0;

    // UI elements
    this.widgetEl = document.getElementById('audio-widget');
    this.toggleBtn = document.getElementById('audio-toggle-btn');
    this.nextBtn = document.getElementById('audio-next-btn');
    this.statusEl = document.getElementById('audio-status');
    this.titleEl = document.getElementById('audio-title');
    this.volumeSlider = document.getElementById('volume-slider');

    this.init();
  }

  init() {
    this.loadTrack(this.currentTrackIndex);

    // Continuous Playlist Trigger: when one song finishes, immediately play the next!
    this.audioElement.addEventListener('ended', () => {
      console.log('Track finished. Moving continuously to next song in playlist...');
      this.playNextTrack();
    });

    // Error handling: if a filename fails, try next in playlist
    this.audioElement.addEventListener('error', (e) => {
      console.warn('Audio playback error on track:', this.getCurrentTrack(), e);
      setTimeout(() => {
        if (this.isPlaying) {
          this.playNextTrack();
        }
      }, 1000);
    });

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.togglePlayPause());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playNextTrack();
      });
    }

    if (this.titleEl) {
      this.titleEl.style.cursor = 'pointer';
      this.titleEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playNextTrack();
      });
    }

    if (this.volumeSlider) {
      this.volumeSlider.value = this.currentVolume;
      this.volumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.setVolume(val);
      });
    }
  }

  getCurrentTrack() {
    return this.playlist[this.currentTrackIndex] || null;
  }

  loadTrack(index) {
    if (index < 0 || index >= this.playlist.length) {
      index = 0;
    }
    this.currentTrackIndex = index;
    const track = this.playlist[this.currentTrackIndex];
    if (!track) return;

    this.audioElement.src = encodeURI(track.src);
    this.audioElement.volume = this.currentVolume;

    if (this.titleEl) {
      this.titleEl.textContent = track.title || 'Birthday Melody';
      this.titleEl.title = `Click to skip • Now playing: ${track.title}`;
    }
  }

  playNextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.loadTrack(this.currentTrackIndex);
    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.updateUI(true);
        })
        .catch(err => {
          console.warn('Playback error playing next track:', err);
        });
    }
  }

  start() {
    if (this.isPlaying) return;

    this.loadTrack(this.currentTrackIndex);
    const playPromise = this.audioElement.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.fadeIn(CONFIG.audio.defaultVolume || 0.45, 1200);
          this.updateUI(true);
        })
        .catch((err) => {
          console.warn('Audio play waiting for user interaction:', err);
        });
    }
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    const promise = this.audioElement.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          this.isPlaying = true;
          this.updateUI(true);
        })
        .catch(err => {
          console.warn('Play error:', err);
        });
    }
  }

  pause() {
    this.audioElement.pause();
    this.isPlaying = false;
    this.updateUI(false);
  }

  setVolume(volume, durationMs = 0) {
    this.targetVolume = Math.max(0, Math.min(1, volume));

    if (durationMs <= 0) {
      this.currentVolume = this.targetVolume;
      this.audioElement.volume = this.currentVolume;
      if (this.volumeSlider) {
        this.volumeSlider.value = this.currentVolume;
      }
      return;
    }

    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const steps = 25;
    const stepDuration = durationMs / steps;
    const diff = (this.targetVolume - this.currentVolume) / steps;

    this.fadeInterval = setInterval(() => {
      this.currentVolume += diff;
      if (
        (diff > 0 && this.currentVolume >= this.targetVolume) ||
        (diff < 0 && this.currentVolume <= this.targetVolume)
      ) {
        this.currentVolume = this.targetVolume;
        clearInterval(this.fadeInterval);
      }
      this.audioElement.volume = Math.max(0, Math.min(1, this.currentVolume));
      if (this.volumeSlider) {
        this.volumeSlider.value = this.currentVolume;
      }
    }, stepDuration);
  }

  fadeIn(targetVol = CONFIG.audio.defaultVolume, duration = 1200) {
    this.setVolume(targetVol, duration);
  }

  fadeOut(duration = 1500) {
    this.setVolume(0.05, duration);
  }

  duckForLetter() {
    this.setVolume(CONFIG.audio.letterVolume || 0.20, 1200);
  }

  restoreVolume() {
    this.setVolume(CONFIG.audio.defaultVolume || 0.45, 1200);
  }

  updateUI(playing) {
    if (this.widgetEl) {
      if (playing) {
        this.widgetEl.classList.add('playing');
        if (this.statusEl) this.statusEl.textContent = 'Playing';
      } else {
        this.widgetEl.classList.remove('playing');
        if (this.statusEl) this.statusEl.textContent = 'Paused';
      }
    }
  }
}

// Global instance
window.audioManager = null;
