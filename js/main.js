import { games } from './data/games.js?v=6';

const grid = document.getElementById('gamesGrid');
const categoryFilters = document.getElementById('categoryFilters');
const sectionTitle = document.getElementById('sectionTitle');
let currentFilter = 'all';

function renderGames(filter = 'all', searchQuery = '') {
    grid.innerHTML = '';

    let filtered = filter === 'all' ? games : games.filter(g => g.category === filter);

    if (searchQuery) {
        filtered = filtered.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
        sectionTitle.textContent = searchQuery ? 'Search Results' : (filter === 'all' ? 'All Games' : filter.charAt(0).toUpperCase() + filter.slice(1) + ' Games');
    } else {
        sectionTitle.textContent = filter === 'all' ? 'All Games' : filter.charAt(0).toUpperCase() + filter.slice(1) + ' Games';
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align:center; font-size:24px; color:#64748b; font-weight:700; grid-column:1/-1;">No games found!</p>';
        return;
    }

    filtered.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.onclick = () => window.location.href = `game.html?id=${game.id}`;
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}">
            <div class="info">
                <h3>${game.title}</h3>
                <p>${game.category}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Category buttons
const catBtns = document.querySelectorAll('.cat-btn');
if (catBtns.length > 0) {
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const activeBtn = document.querySelector('.cat-btn.active');
            if (activeBtn) activeBtn.classList.remove('active');
            btn.classList.add('active');

            // clear search when category is clicked
            const searchInput = document.querySelector('.search-container input');
            if (searchInput) searchInput.value = '';

            currentFilter = btn.dataset.cat;
            renderGames(currentFilter);
        });
    });
}

// Search
const searchInput = document.querySelector('.search-container input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        renderGames(currentFilter, query);
    });
}

// Home button click (logo)
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Initial render
if (grid) {
    renderGames();
}