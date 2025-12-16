const canvas = document.getElementById('robotBg');
const ctx = canvas.getContext('2d');

let width, height, particles, connections;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createScene() {
    particles = [];
    const count = 70;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: 2 + Math.random() * 3,
            glow: Math.random() > 0.5 ? '#00ffff' : '#ff00ff'
        });
    }
}
createScene();

function draw() {
    ctx.clearRect(0, 0, width, height);

    // subtle dark overlay
    ctx.fillStyle = 'rgba(3, 0, 20, 0.9)';
    ctx.fillRect(0, 0, width, height);

    // draw grid lines (robotic feel)
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    const step = 80;
    ctx.beginPath();
    for (let x = 0; x < width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }
    ctx.stroke();

    // draw particles
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // glowing node
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, p.glow);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // draw connections (like circuits)
    ctx.lineWidth = 1.2;
    particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
                const alpha = 1 - dist / 140;
                ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.6})`;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(draw);
}
draw();
