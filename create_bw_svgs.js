const fs = require('fs');
const path = require('path');

const newGamesData = [
    { id: 'chess', title: 'Classic Chess' },
    { id: 'carrom', title: 'Carrom Clash' },
    { id: 'archery', title: 'Archery Master' },
    { id: 'snake', title: 'Retro Snake' },
    { id: 'tetris', title: 'Block Puzzle' },
    { id: 'pong', title: 'Retro Pong' },
    { id: 'tictactoe', title: 'Tic Tac Toe' },
    { id: 'memory', title: 'Memory Match' },
    { id: 'breakout', title: 'Breakout' },
    { id: 'sudoku', title: 'Sudoku Pro' },
    { id: 'minesweeper', title: 'Minesweeper' },
    { id: 'flappy', title: 'Flappy Cube' },
    { id: 'simonsays', title: 'Simon Says' },
    { id: 'twozerofoureight', title: '2048 Classic' },
    { id: 'checkers', title: 'Checkers' },
    { id: 'math', title: 'Math Genius' },
    { id: 'wordle', title: 'Word Guess' },
    { id: 'typing', title: 'Speed Typer' },
    { id: 'clicker', title: 'Cookie Clicker' },
    { id: 'spaceinvaders', title: 'Space Invaders' }
];

const svgs = {
    chess: `<rect x="160" y="100" width="80" height="80" fill="#1a1a1a" rx="10"/>
            <polygon points="170,140 230,140 200,80" fill="#e0e5ec"/>
            <circle cx="200" cy="80" r="10" fill="#e0e5ec"/>`,
    carrom: `<rect x="150" y="80" width="100" height="100" fill="#1a1a1a" rx="10"/>
             <circle cx="165" cy="95" r="8" fill="#e0e5ec"/>
             <circle cx="235" cy="95" r="8" fill="#e0e5ec"/>
             <circle cx="165" cy="165" r="8" fill="#e0e5ec"/>
             <circle cx="235" cy="165" r="8" fill="#e0e5ec"/>
             <circle cx="200" cy="130" r="15" fill="#e0e5ec"/>`,
    archery: `<circle cx="200" cy="130" r="50" fill="#1a1a1a"/>
              <circle cx="200" cy="130" r="35" fill="#e0e5ec"/>
              <circle cx="200" cy="130" r="20" fill="#1a1a1a"/>
              <circle cx="200" cy="130" r="8" fill="#e0e5ec"/>
              <line x1="140" y1="190" x2="210" y2="120" stroke="#a3b1c6" stroke-width="6"/>`,
    snake: `<rect x="140" y="100" width="80" height="20" fill="#1a1a1a" rx="5"/>
            <rect x="200" y="100" width="20" height="60" fill="#1a1a1a" rx="5"/>
            <rect x="180" y="140" width="20" height="60" fill="#1a1a1a" rx="5"/>
            <circle cx="240" cy="160" r="10" fill="#5a5a5a"/>`,
    tetris: `<rect x="170" y="90" width="30" height="30" fill="#1a1a1a" rx="4"/>
             <rect x="170" y="120" width="30" height="30" fill="#1a1a1a" rx="4"/>
             <rect x="170" y="150" width="30" height="30" fill="#1a1a1a" rx="4"/>
             <rect x="200" y="150" width="30" height="30" fill="#5a5a5a" rx="4"/>`,
    pong: `<rect x="140" y="100" width="15" height="60" fill="#1a1a1a" rx="4"/>
           <rect x="245" y="80" width="15" height="60" fill="#1a1a1a" rx="4"/>
           <circle cx="190" cy="130" r="10" fill="#5a5a5a"/>
           <line x1="200" y1="80" x2="200" y2="180" stroke="#1a1a1a" stroke-width="4" stroke-dasharray="10 10"/>`,
    tictactoe: `<rect x="185" y="80" width="10" height="100" fill="#1a1a1a" rx="2"/>
                <rect x="215" y="80" width="10" height="100" fill="#1a1a1a" rx="2"/>
                <rect x="150" y="115" width="100" height="10" fill="#1a1a1a" rx="2"/>
                <rect x="150" y="145" width="100" height="10" fill="#1a1a1a" rx="2"/>
                <circle cx="165" cy="95" r="12" fill="none" stroke="#5a5a5a" stroke-width="6"/>
                <path d="M230 130 l20 20 m0 -20 l-20 20" stroke="#1a1a1a" stroke-width="6"/>`,
    memory: `<rect x="150" y="90" width="45" height="70" fill="#1a1a1a" rx="6"/>
             <rect x="205" y="90" width="45" height="70" fill="#5a5a5a" rx="6"/>
             <circle cx="172.5" cy="125" r="8" fill="#e0e5ec"/>`,
    breakout: `<rect x="150" y="160" width="60" height="12" fill="#1a1a1a" rx="4"/>
               <circle cx="190" cy="140" r="8" fill="#5a5a5a"/>
               <rect x="130" y="80" width="30" height="15" fill="#1a1a1a" rx="2"/>
               <rect x="165" y="80" width="30" height="15" fill="#5a5a5a" rx="2"/>
               <rect x="200" y="80" width="30" height="15" fill="#1a1a1a" rx="2"/>
               <rect x="235" y="80" width="30" height="15" fill="#5a5a5a" rx="2"/>
               <rect x="145" y="100" width="30" height="15" fill="#5a5a5a" rx="2"/>
               <rect x="180" y="100" width="30" height="15" fill="#1a1a1a" rx="2"/>
               <rect x="215" y="100" width="30" height="15" fill="#5a5a5a" rx="2"/>`,
    sudoku: `<rect x="150" y="80" width="100" height="100" fill="none" stroke="#1a1a1a" stroke-width="6" rx="6"/>
             <line x1="183" y1="80" x2="183" y2="180" stroke="#5a5a5a" stroke-width="4"/>
             <line x1="216" y1="80" x2="216" y2="180" stroke="#5a5a5a" stroke-width="4"/>
             <line x1="150" y1="113" x2="250" y2="113" stroke="#5a5a5a" stroke-width="4"/>
             <line x1="150" y1="146" x2="250" y2="146" stroke="#5a5a5a" stroke-width="4"/>
             <text x="160" y="105" font-family="Nunito" font-size="20" font-weight="900" fill="#1a1a1a">5</text>
             <text x="225" y="170" font-family="Nunito" font-size="20" font-weight="900" fill="#1a1a1a">9</text>`,
    minesweeper: `<circle cx="200" cy="130" r="35" fill="#1a1a1a"/>
                  <rect x="190" y="80" width="20" height="20" fill="#5a5a5a" rx="4"/>
                  <path d="M200 80 Q210 60 230 70" fill="none" stroke="#1a1a1a" stroke-width="4"/>
                  <circle cx="230" cy="70" r="6" fill="#5a5a5a"/>`,
    flappy: `<rect x="160" y="110" width="40" height="40" fill="#1a1a1a" rx="8"/>
             <circle cx="185" cy="125" r="8" fill="#e0e5ec"/>
             <circle cx="188" cy="125" r="3" fill="#1a1a1a"/>
             <polygon points="195,135 215,140 195,145" fill="#5a5a5a"/>
             <rect x="230" y="90" width="30" height="100" fill="none" stroke="#1a1a1a" stroke-width="6" rx="4"/>`,
    simonsays: `<circle cx="200" cy="130" r="50" fill="none" stroke="#1a1a1a" stroke-width="12"/>
                <line x1="150" y1="130" x2="250" y2="130" stroke="#1a1a1a" stroke-width="8"/>
                <line x1="200" y1="80" x2="200" y2="180" stroke="#1a1a1a" stroke-width="8"/>
                <path d="M200 84 A46 46 0 0 1 246 130 L200 130 Z" fill="#5a5a5a"/>`,
    twozerofoureight: `<rect x="150" y="80" width="45" height="45" fill="#5a5a5a" rx="8"/>
                       <rect x="205" y="80" width="45" height="45" fill="#1a1a1a" rx="8"/>
                       <rect x="150" y="135" width="45" height="45" fill="#1a1a1a" rx="8"/>
                       <rect x="205" y="135" width="45" height="45" fill="#5a5a5a" rx="8"/>
                       <text x="172.5" y="110" font-family="Nunito" font-size="20" font-weight="900" fill="#e0e5ec" text-anchor="middle">2</text>
                       <text x="227.5" y="110" font-family="Nunito" font-size="20" font-weight="900" fill="#e0e5ec" text-anchor="middle">0</text>
                       <text x="172.5" y="165" font-family="Nunito" font-size="20" font-weight="900" fill="#e0e5ec" text-anchor="middle">4</text>
                       <text x="227.5" y="165" font-family="Nunito" font-size="20" font-weight="900" fill="#e0e5ec" text-anchor="middle">8</text>`,
    checkers: `<rect x="150" y="80" width="25" height="25" fill="#1a1a1a"/>
               <rect x="200" y="80" width="25" height="25" fill="#1a1a1a"/>
               <rect x="175" y="105" width="25" height="25" fill="#1a1a1a"/>
               <rect x="225" y="105" width="25" height="25" fill="#1a1a1a"/>
               <rect x="150" y="130" width="25" height="25" fill="#1a1a1a"/>
               <rect x="200" y="130" width="25" height="25" fill="#1a1a1a"/>
               <rect x="175" y="155" width="25" height="25" fill="#1a1a1a"/>
               <rect x="225" y="155" width="25" height="25" fill="#1a1a1a"/>
               <circle cx="162.5" cy="142.5" r="10" fill="#e0e5ec" stroke="#5a5a5a" stroke-width="4"/>
               <circle cx="212.5" cy="92.5" r="10" fill="#5a5a5a" stroke="#1a1a1a" stroke-width="4"/>`,
    math: `<text x="200" y="145" font-family="Nunito" font-size="70" font-weight="900" fill="#1a1a1a" text-anchor="middle">±=</text>`,
    wordle: `<rect x="135" y="110" width="22" height="22" fill="#5a5a5a" rx="4"/>
             <rect x="165" y="110" width="22" height="22" fill="#1a1a1a" rx="4"/>
             <rect x="195" y="110" width="22" height="22" fill="#5a5a5a" rx="4"/>
             <rect x="225" y="110" width="22" height="22" fill="none" stroke="#1a1a1a" stroke-width="4" rx="4"/>
             <rect x="255" y="110" width="22" height="22" fill="none" stroke="#1a1a1a" stroke-width="4" rx="4"/>`,
    typing: `<rect x="140" y="100" width="120" height="60" fill="none" stroke="#1a1a1a" stroke-width="6" rx="8"/>
             <rect x="150" y="110" width="15" height="15" fill="#5a5a5a" rx="3"/>
             <rect x="175" y="110" width="15" height="15" fill="#5a5a5a" rx="3"/>
             <rect x="200" y="110" width="15" height="15" fill="#5a5a5a" rx="3"/>
             <rect x="225" y="110" width="15" height="15" fill="#5a5a5a" rx="3"/>
             <rect x="160" y="135" width="80" height="15" fill="#1a1a1a" rx="3"/>`,
    clicker: `<circle cx="200" cy="130" r="40" fill="#1a1a1a"/>
              <circle cx="185" cy="115" r="6" fill="#e0e5ec"/>
              <circle cx="215" cy="125" r="8" fill="#e0e5ec"/>
              <circle cx="190" cy="150" r="7" fill="#e0e5ec"/>
              <polygon points="220,140 240,170 230,175 250,190" fill="#5a5a5a" stroke="#e0e5ec" stroke-width="2"/>`,
    spaceinvaders: `<rect x="160" y="100" width="20" height="20" fill="#1a1a1a"/>
                    <rect x="220" y="100" width="20" height="20" fill="#1a1a1a"/>
                    <rect x="170" y="120" width="60" height="20" fill="#1a1a1a"/>
                    <rect x="150" y="140" width="100" height="20" fill="#1a1a1a"/>
                    <rect x="180" y="140" width="15" height="15" fill="#e0e5ec"/>
                    <rect x="205" y="140" width="15" height="15" fill="#e0e5ec"/>
                    <rect x="170" y="160" width="20" height="20" fill="#1a1a1a"/>
                    <rect x="210" y="160" width="20" height="20" fill="#1a1a1a"/>`
};

const assetsDir = path.join(__dirname, 'assets');

newGamesData.forEach(g => {
    let iconSvg = svgs[g.id] || `<circle cx="200" cy="130" r="40" fill="#1a1a1a"/>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
    <defs>
        <filter id="clay" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-8" dy="-8" stdDeviation="15" flood-color="#ffffff" flood-opacity="1" result="shadow1" />
            <feDropShadow dx="12" dy="12" stdDeviation="15" flood-color="#a3b1c6" flood-opacity="0.6" result="shadow2" />
            <feComposite in2="shadow1" operator="in" />
            <feMerge>
                <feMergeNode in="shadow1"/>
                <feMergeNode in="shadow2"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <filter id="innerPress" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="6" dy="6" stdDeviation="8" flood-color="#a3b1c6" flood-opacity="0.8" />
        </filter>
    </defs>
    <rect width="400" height="300" fill="#e0e5ec"/>
    <rect x="30" y="30" width="340" height="240" rx="30" fill="#e0e5ec" filter="url(#clay)"/>
    <rect x="50" y="50" width="300" height="180" rx="20" fill="#e0e5ec" filter="url(#innerPress)" opacity="0.3"/>
    
    ${iconSvg}

    <text x="200" y="250" font-family="Nunito, sans-serif" font-size="32" font-weight="900" fill="#1a1a1a" text-anchor="middle" letter-spacing="1">${g.title}</text>
    <rect x="150" y="260" width="100" height="4" rx="2" fill="#1a1a1a" filter="url(#clay)" opacity="0.8"/>
</svg>`;
    fs.writeFileSync(path.join(assetsDir, `${g.id}.svg`), svg);
});

console.log("Created 20 B&W Clay SVGs WITH BEAUTIFUL VECTOR ICONS!");
