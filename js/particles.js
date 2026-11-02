/**
 * Atmospheric Particle & Lighting System
 * Custom canvas engine supporting screen-specific palettes and celebratory bursts.
 */

class ParticleEngine {
  constructor(canvasId = 'particle-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.burstParticles = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.currentScreen = 1;
    this.isRunning = true;
    this.animationFrameId = null;

    // Palette configuration per screen (5 screens)
    this.themes = {
      1: { count: 50, colors: ['rgba(168, 255, 213, ', 'rgba(8, 127, 91, ', 'rgba(217, 181, 109, '], speedY: -0.3, speedX: 0.2 },
      2: { count: 60, colors: ['rgba(217, 181, 109, ', 'rgba(243, 225, 181, ', 'rgba(255, 235, 180, '], speedY: -0.25, speedX: 0.15 },
      3: { count: 50, colors: ['rgba(221, 161, 168, ', 'rgba(255, 241, 233, ', 'rgba(122, 31, 56, '], speedY: -0.25, speedX: 0.1 },
      4: { count: 65, colors: ['rgba(255, 217, 138, ', 'rgba(255, 167, 38, ', 'rgba(168, 255, 213, '], speedY: -0.65, speedX: 0.2 },
      5: { count: 70, colors: ['rgba(252, 208, 104, ', 'rgba(255, 148, 71, ', 'rgba(255, 230, 175, ', 'rgba(226, 82, 43, '], speedY: -0.35, speedX: 0.25 }
    };

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initParticles();
    this.loop();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }

  setTheme(screenNum) {
    this.currentScreen = screenNum;
    this.initParticles();
  }

  initParticles() {
    const theme = this.themes[this.currentScreen] || this.themes[1];
    this.particles = [];
    const count = window.innerWidth < 768 ? Math.floor(theme.count * 0.6) : theme.count;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2.2 + 0.8,
        colorPrefix: theme.colors[Math.floor(Math.random() * theme.colors.length)],
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseVal: Math.random() * Math.PI,
        vx: (Math.random() - 0.5) * 0.4 + theme.speedX,
        vy: (Math.random() - 0.5) * 0.3 + theme.speedY
      });
    }
  }

  triggerCelebrationBurst(originX = this.width / 2, originY = this.height / 2) {
    const burstColors = [
      'rgba(255, 217, 138, ',
      'rgba(252, 208, 104, ',
      'rgba(255, 148, 71, ',
      'rgba(226, 82, 43, ',
      'rgba(255, 248, 233, '
    ];

    const particleCount = window.innerWidth < 768 ? 60 : 120;
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 6.5 + 2;
      this.burstParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        gravity: 0.08,
        friction: 0.96,
        radius: Math.random() * 3 + 1.2,
        colorPrefix: burstColors[Math.floor(Math.random() * burstColors.length)],
        alpha: 1,
        decay: Math.random() * 0.015 + 0.008
      });
    }
  }

  loop() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update & draw background drifting particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.pulseVal += p.pulseSpeed;
      const currentAlpha = Math.max(0.05, Math.min(0.9, p.alpha + Math.sin(p.pulseVal) * 0.3));

      // Wrap around bounds
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.height + 10;
      if (p.y > this.height + 10) p.y = -10;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.colorPrefix}${currentAlpha})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `${p.colorPrefix}0.6)`;
      this.ctx.fill();
    }

    // Update & draw celebration burst particles
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const bp = this.burstParticles[i];
      bp.vx *= bp.friction;
      bp.vy *= bp.friction;
      bp.vy += bp.gravity;
      bp.x += bp.vx;
      bp.y += bp.vy;
      bp.alpha -= bp.decay;

      if (bp.alpha <= 0) {
        this.burstParticles.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${bp.colorPrefix}${bp.alpha})`;
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = `${bp.colorPrefix}0.8)`;
      this.ctx.fill();
    }

    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }
}

window.particleEngine = null;
