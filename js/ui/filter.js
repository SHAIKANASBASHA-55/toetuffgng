// js/ui/filter.js: Category filter
import { games } from '../data/games.js';
import { renderGames } from './renderGames.js';

export function initFilter() {
    const filterSelect = document.getElementById('categoryFilter');
    filterSelect.addEventListener('change', (e) => {
        const category = e.target.value;
        const filtered = category ? games.filter(game => game.category === category) : games;
        renderGames(filtered);
    });
}