// js/ui/search.js: Search logic
export function initSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = games.filter(game => game.title.toLowerCase().includes(query));
        renderGames(filtered);
    });
}