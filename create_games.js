const fs = require('fs');
const path = require('path');

const newGamesData = [
    { id: 'pong', title: 'Retro Pong', cat: 'arcade', color: '#10b981' },
    { id: 'tictactoe', title: 'Tic Tac Toe', cat: 'board', color: '#f59e0b' },
    { id: 'memory', title: 'Memory Match', cat: 'puzzle', color: '#8b5cf6' },
    { id: 'breakout', title: 'Breakout', cat: 'arcade', color: '#ef4444' },
    { id: 'sudoku', title: 'Sudoku Pro', cat: 'puzzle', color: '#3b82f6' },
    { id: 'minesweeper', title: 'Minesweeper', cat: 'puzzle', color: '#64748b' },
    { id: 'flappy', title: 'Flappy Cube', cat: 'arcade', color: '#06b6d4' },
    { id: 'simonsays', title: 'Simon Says', cat: 'puzzle', color: '#ec4899' },
    { id: 'twozerofoureight', title: '2048 Classic', cat: 'puzzle', color: '#f97316' },
    { id: 'checkers', title: 'Checkers', cat: 'board', color: '#dc2626' },
    { id: 'math', title: 'Math Genius', cat: 'puzzle', color: '#14b8a6' },
    { id: 'wordle', title: 'Word Guess', cat: 'puzzle', color: '#22c55e' },
    { id: 'typing', title: 'Speed Typer', cat: 'arcade', color: '#84cc16' },
    { id: 'clicker', title: 'Cookie Clicker', cat: 'arcade', color: '#d97706' },
    { id: 'spaceinvaders', title: 'Space Invaders', cat: 'arcade', color: '#6366f1' }
];

const gamesDir = path.join(__dirname, 'games');
const assetsDir = path.join(__dirname, 'assets');

if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

let gamesJsAdditions = ``;

newGamesData.forEach(g => {
    // create dir
    const dir = path.join(gamesDir, g.id);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // create game html
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${g.title}</title>
    <style>
        body { margin: 0; background: #e2e8f0; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif; }
        .game-box { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; }
        h1 { color: ${g.color}; font-size: 32px; margin-bottom: 20px; font-weight: 800; font-family: 'Nunito', sans-serif; }
        p { color: #64748b; font-size: 18px; margin-bottom: 30px; font-family: 'Nunito', sans-serif;}
        button { background: ${g.color}; color: white; border: none; padding: 12px 24px; font-size: 18px; border-radius: 8px; cursor: pointer; transition: 0.2s; font-family: 'Nunito', sans-serif; font-weight: bold;}
        button:hover { opacity: 0.9; transform: translateY(-2px); }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
    <div class="game-box">
        <h1>${g.title}</h1>
        <p>Welcome to ${g.title}! Press start to play.</p>
        <button onclick="alert('Game coming soon!')">Start Game</button>
    </div>
</body>
</html>`;
    fs.writeFileSync(path.join(dir, 'index.html'), html);

    // create svg
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
    <rect width="400" height="300" fill="${g.color}"/>
    <rect x="20" y="20" width="360" height="260" fill="none" stroke="white" stroke-width="4" stroke-dasharray="10 10" opacity="0.3" rx="15"/>
    <text x="200" y="150" font-family="Nunito, sans-serif" font-size="40" font-weight="900" fill="white" text-anchor="middle" letter-spacing="1">${g.title}</text>
    <text x="200" y="195" font-family="Nunito, sans-serif" font-size="16" font-weight="700" fill="white" opacity="0.8" text-anchor="middle" letter-spacing="1">${g.cat.toUpperCase()}</text>
</svg>`;
    fs.writeFileSync(path.join(assetsDir, `${g.id}.svg`), svg);

    gamesJsAdditions += `    ,{
        id: '${g.id}',
        title: '${g.title}',
        thumbnail: 'assets/${g.id}.svg',
        url: 'games/${g.id}/index.html',
        category: '${g.cat}'
    }
`;
});

// Update games.js safely
const gamesJsPath = path.join(__dirname, 'js', 'data', 'games.js');
let gamesJsContent = fs.readFileSync(gamesJsPath, 'utf8');
gamesJsContent = gamesJsContent.replace(/\s*\];?\s*$/, '\\n' + gamesJsAdditions + '];');
fs.writeFileSync(gamesJsPath, gamesJsContent);

console.log("Created 15 games!");
