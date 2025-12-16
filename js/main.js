import { games } from './data/games.js';

const grid = document.getElementById('gamesGrid');
const categoryFilters = document.getElementById('categoryFilters');
const sectionTitle = document.getElementById('sectionTitle');

let currentFilter = 'all';

/* =====================
   RENDER GAMES
===================== */
function renderGames(filter = 'all') {
    grid.innerHTML = '';

    const filtered =
        filter === 'all'
            ? games
            : games.filter(g => g.category === filter);

    if (filtered.length === 0) {
        grid.innerHTML =
            '<p style="text-align:center;font-size:28px;color:#dc2626;">No games in this category yet!</p>';
        return;
    }

    filtered.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}">
            <div class="info">
                <h3>${game.title}</h3>
                <p>${game.category.toUpperCase()}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            window.location.href = `game.html?id=${game.id}`;
        });
        grid.appendChild(card);
    });
}

/* =====================
   CATEGORY FILTERS
===================== */
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.cat-btn.active')?.classList.remove('active');
        btn.classList.add('active');

        currentFilter = btn.dataset.cat;
        renderGames(currentFilter);

        sectionTitle.textContent =
            currentFilter === 'all'
                ? 'All Games'
                : currentFilter.charAt(0).toUpperCase() +
                  currentFilter.slice(1) +
                  ' Games';
    });
});

/* =====================
   SEARCH
===================== */
document.querySelector('.search-bar input').addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    categoryFilters.style.display = 'none';
    sectionTitle.textContent = query ? 'Search Results' : 'All Games';

    grid.innerHTML = '';

    const results = games.filter(g =>
        g.title.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        grid.innerHTML =
            '<p style="text-align:center;font-size:28px;color:#dc2626;">No games found!</p>';
        return;
    }

    results.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.thumbnail}">
            <div class="info">
                <h3>${game.title}</h3>
                <p>${game.category.toUpperCase()}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            window.location.href = `game.html?id=${game.id}`;
        });
        grid.appendChild(card);
    });
});

/* =====================
   FEATURED SLIDER (NETFLIX STYLE)
===================== */
let currentSlide = 0;
const slides = document.querySelectorAll('.featured-slide');

function rotateFeatured() {
    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(rotateFeatured, 5000);

/* =====================
   INIT
===================== */
renderGames();
