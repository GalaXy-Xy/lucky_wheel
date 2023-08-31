import React, { useEffect, useRef } from 'react';

const Confetti = ({ isActive, duration = 3000 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = Math.random() * 3 + 2;
        this.size = Math.random() * 8 + 4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.gravity = 0.1;
        this.opacity = 1;
        this.fadeSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.rotation += this.rotationSpeed;
        this.opacity -= this.fadeSpeed;

        // Add some wind effect
        this.vx += (Math.random() - 0.5) * 0.5;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        // Draw confetti piece
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);

        // Add some shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size / 3, this.size / 3);

        ctx.restore();
      }

      isDead() {
        return this.opacity <= 0 || this.y > canvas.height;
      }
    }

    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles
      if (particles.length < 100) {
        particles.push(new Particle());
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw();

        // Remove dead particles
        if (particle.isDead()) {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    // Stop animation after duration
    const stopTimer = setTimeout(() => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    }, duration);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      clearTimeout(stopTimer);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive, duration]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ position: 'fixed', top: 0, left: 0 }}
    />
  );
};

export default Confetti;
