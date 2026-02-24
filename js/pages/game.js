// js/pages/game.js: game.html logic (iframe, fullscreen)
import { games } from '../data/games.js?v=4';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');
    const game = games.find(g => g.id === gameId);

    if (game) {
        document.getElementById('gameTitle').textContent = game.title;
        document.getElementById('gameIframe').src = game.url;
    }

    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const iframe = document.getElementById('gameIframe');

    fullscreenBtn.addEventListener('click', () => {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) { // Firefox
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { // IE/Edge
            iframe.msRequestFullscreen();
        }
    });
});