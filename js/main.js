import { games } from './data/games.js';

const grid = document.getElementById('gamesGrid');
const categoryFilters = document.getElementById('categoryFilters');
const sectionTitle = document.getElementById('sectionTitle');
let currentFilter = 'all';

function renderGames(filter = 'all') {
    grid.innerHTML = '';
    const filtered = filter === 'all' ? games : games.filter(g => g.category === filter);

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="text-align:center; font-size:28px; color:#dc2626;">No games in this category yet!</p>';
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
        card.onclick = () => window.location.href = `game.html?id=${game.id}`;
        grid.appendChild(card);
    });
}

// Category buttons
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.cat-btn.active').classList.remove('active');
        btn.classList.add('active');
        currentFilter = btn.dataset.cat;
        renderGames(currentFilter);
        sectionTitle.textContent = currentFilter === 'all' ? 'All Games' : currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1) + ' Games';
    });
});

// Sidebar
document.querySelectorAll('.sidebar li').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.sidebar li.active')?.classList.remove('active');
        item.classList.add('active');

        const text = item.textContent.trim().toLowerCase();
        if (text === 'home' || text === 'library' || text === 'downloads') {
            categoryFilters.style.display = 'none';
            sectionTitle.textContent = 'All Games';
            renderGames('all');
        } else if (text === 'category') {
            categoryFilters.style.display = 'flex';
            sectionTitle.textContent = 'Categories';
            renderGames(currentFilter);
        }
    });
});

// Search
document.querySelector('.search-bar input').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    categoryFilters.style.display = 'none';
    sectionTitle.textContent = query ? 'Search Results' : 'All Games';
    grid.innerHTML = '';
    const results = games.filter(g => g.title.toLowerCase().includes(query));
    if (results.length === 0) grid.innerHTML = '<p style="text-align:center; font-size:28px; color:#dc2626;">No games found!</p>';
    results.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `<img src="${game.thumbnail}"><div class="info"><h3>${game.title}</h3><p>${game.category.toUpperCase()}</p></div>`;
        card.onclick = () => window.location.href = `game.html?id=${game.id}`;
        grid.appendChild(card);
    });
});
// Add this at the end of main.js
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
        document.getElementById('particles-bg').style.transform = 'scale(1.1)';
        setTimeout(() => {
            document.getElementById('particles-bg').style.transform = 'scale(1)';
        }, 300);
    });
});
// Initial
const featuredItems = document.querySelectorAll('.featured-item');
let featuredIndex = 0;

setInterval(() => {
  featuredItems[featuredIndex].classList.remove('active');
  featuredIndex = (featuredIndex + 1) % featuredItems.length;
  featuredItems[featuredIndex].classList.add('active');
}, 5000);

renderGames();