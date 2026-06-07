/**
 * GLOBAL POLISH ENGINE v13.0
 * System-wide enhancements, animations, and quality-of-life improvements
 */

export interface PolishConfig {
  enableAnimations: boolean;
  enableSoundEffects: boolean;
  enableParticles: boolean;
  enableBlur: boolean;
  enableGlassEffect: boolean;
  enableShadows: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  theme: 'dark' | 'light' | 'auto';
}

class GlobalPolishEngine {
  private config: PolishConfig;

  constructor() {
    this.config = {
      enableAnimations: true,
      enableSoundEffects: false,
      enableParticles: true,
      enableBlur: true,
      enableGlassEffect: true,
      enableShadows: true,
      animationSpeed: 'normal',
      theme: 'dark',
    };

    this.loadConfig();
    this.applyGlobalStyles();
    this.initializeAnimations();
  }

  private loadConfig(): void {
    const saved = localStorage.getItem('polish_config');
    if (saved) {
      this.config = { ...this.config, ...JSON.parse(saved) };
    }
  }

  private saveConfig(): void {
    localStorage.setItem('polish_config', JSON.stringify(this.config));
  }

  private applyGlobalStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      /* Smooth Transitions */
      * {
        transition: ${this.config.enableAnimations ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'};
      }

      /* Scrollbar Styling */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: rgba(15, 23, 42, 0.5);
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(148, 163, 184, 0.5);
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(148, 163, 184, 0.8);
      }

      /* Glass Effect */
      ${this.config.enableGlassEffect ? `
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      ` : ''}

      /* Smooth Shadows */
      ${this.config.enableShadows ? `
        .shadow-smooth {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
        }
      ` : ''}

      /* Animation Speeds */
      ${this.config.animationSpeed === 'slow' ? `
        * { animation-duration: 0.6s !important; }
      ` : this.config.animationSpeed === 'fast' ? `
        * { animation-duration: 0.15s !important; }
      ` : ''}

      /* Focus States */
      button:focus, input:focus, select:focus, textarea:focus {
        outline: 2px solid #f59e0b;
        outline-offset: 2px;
      }

      /* Hover Effects */
      button:hover {
        transform: ${this.config.enableAnimations ? 'translateY(-2px)' : 'none'};
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
      }

      /* Loading Animation */
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .spinner {
        animation: spin 1s linear infinite;
      }

      /* Fade In */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .fade-in {
        animation: fadeIn 0.3s ease-in;
      }

      /* Slide In */
      @keyframes slideInUp {
        from { 
          opacity: 0;
          transform: translateY(20px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
      .slide-in-up {
        animation: slideInUp 0.3s ease-out;
      }

      /* Pulse */
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      /* Bounce */
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .bounce {
        animation: bounce 1s ease-in-out infinite;
      }

      /* Glow Effect */
      .glow {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
      }

      /* Smooth Page Transitions */
      .page-transition {
        animation: fadeIn 0.3s ease-in;
      }
    `;
    document.head.appendChild(style);
  }

  private initializeAnimations(): void {
    if (!this.config.enableAnimations) return;

    // Intersection Observer for lazy animations
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }

  // Get current config
  getConfig(): PolishConfig {
    return { ...this.config };
  }

  // Update config
  updateConfig(updates: Partial<PolishConfig>): void {
    this.config = { ...this.config, ...updates };
    this.saveConfig();
    window.location.reload(); // Reload to apply changes
  }

  // Play sound effect
  playSound(soundName: 'click' | 'success' | 'error' | 'notification'): void {
    if (!this.config.enableSoundEffects) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (soundName) {
      case 'click':
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
      case 'success':
        oscillator.frequency.value = 1200;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;
      case 'error':
        oscillator.frequency.value = 400;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
      case 'notification':
        oscillator.frequency.value = 1000;
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
        break;
    }
  }

  // Create particle effect
  createParticles(x: number, y: number, color: string = '#f59e0b'): void {
    if (!this.config.enableParticles) return;

    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';

      const angle = (Math.PI * 2 * i) / 10;
      const velocity = 5;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      document.body.appendChild(particle);

      let opacity = 1;
      const animate = () => {
        x += vx;
        y += vy;
        opacity -= 0.02;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity.toString();

        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };

      animate();
    }
  }

  // Toast notification
  showToast(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000): void {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 px-6 py-3 bg-slate-900 border border-slate-800 text-white text-sm font-mono rounded-none slide-in-up z-50';

    const bgColor = type === 'success' ? 'border-green-500/50 bg-green-500/10' : 
                    type === 'error' ? 'border-red-500/50 bg-red-500/10' : 
                    'border-blue-500/50 bg-blue-500/10';

    toast.className = `fixed bottom-6 right-6 px-6 py-3 border text-white text-sm font-mono rounded-none slide-in-up z-50 ${bgColor}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // Enable/disable theme
  setTheme(theme: 'dark' | 'light' | 'auto'): void {
    this.config.theme = theme;
    this.saveConfig();

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }
}

export const PolishEngine = new GlobalPolishEngine();
