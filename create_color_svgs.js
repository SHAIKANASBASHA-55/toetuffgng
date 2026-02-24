const fs = require('fs');
const path = require('path');

const newGamesData = [
    { id: 'chess', emoji: '♟️', c1: '#4b6cb7', c2: '#182848' },
    { id: 'carrom', emoji: '🎯', c1: '#ff9966', c2: '#ff5e62' },
    { id: 'archery', emoji: '🏹', c1: '#56ab2f', c2: '#a8e063' },
    { id: 'snake', emoji: '🐍', c1: '#11998e', c2: '#38ef7d' },
    { id: 'tetris', emoji: '🧱', c1: '#fc4a1a', c2: '#f7b733' },
    { id: 'pong', emoji: '🏓', c1: '#8E2DE2', c2: '#4A00E0' },
    { id: 'tictactoe', emoji: '❌', c1: '#ee0979', c2: '#ff6a00' },
    { id: 'memory', emoji: '🧠', c1: '#f2709c', c2: '#ff9472' },
    { id: 'breakout', emoji: '🧱', c1: '#00c6ff', c2: '#0072ff' },
    { id: 'sudoku', emoji: '🔢', c1: '#FDC830', c2: '#F37335' },
    { id: 'minesweeper', emoji: '💣', c1: '#cb2d3e', c2: '#ef473a' },
    { id: 'flappy', emoji: '🐦', c1: '#1c92d2', c2: '#f2fcfe' },
    { id: 'simonsays', emoji: '🔴', c1: '#3a7bd5', c2: '#3a6073' },
    { id: 'twozerofoureight', emoji: '2️⃣', c1: '#ffb347', c2: '#ffcc33' },
    { id: 'checkers', emoji: '🔴', c1: '#e52d27', c2: '#b31217' },
    { id: 'math', emoji: '➕', c1: '#1D976C', c2: '#93F9B9' },
    { id: 'wordle', emoji: '🔤', c1: '#1e130c', c2: '#9a8478' },
    { id: 'typing', emoji: '⌨️', c1: '#2193b0', c2: '#6dd5ed' },
    { id: 'clicker', emoji: '🍪', c1: '#B9935A', c2: '#E7C9A5' },
    { id: 'spaceinvaders', emoji: '👾', c1: '#141E30', c2: '#243B55' }
];

const assetsDir = path.join(__dirname, 'assets');

if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

newGamesData.forEach(g => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
        <linearGradient id="grad-${g.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${g.c1};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${g.c2};stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#grad-${g.id})"/>
    <text x="50%" y="54%" font-size="200" dominant-baseline="middle" text-anchor="middle">${g.emoji}</text>
</svg>`;
    fs.writeFileSync(path.join(assetsDir, `${g.id}.svg`), svg);
});
console.log("Colorful emojis SVGs created!");
