// js/ui/renderGames.js: Render game cards
import { games } from '../data/games.js';

export function renderGames(filteredGames = games) {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = '';
    filteredGames.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('game-card');
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <button onclick="window.location.href='game.html?id=${game.id}'">Play</button>
        `;
        grid.appendChild(card);
    });
}