// js/pages/home.js: index.html logic
import { renderGames } from '../ui/renderGames.js';
import { initSearch } from '../ui/search.js';
import { initFilter } from '../ui/filter.js';
import { hideLoader } from '../ui/loader.js';

document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    initSearch();
    initFilter();
    hideLoader();
});