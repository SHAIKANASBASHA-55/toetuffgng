// js/analytics/tracking.js: Play count, time spent (basic example, expand as needed)
export function trackPlay(gameId) {
    console.log(`Tracking play for game: ${gameId}`);
    // Add real analytics here, e.g., localStorage or send to server
}

export function trackTimeSpent(gameId, time) {
    console.log(`Time spent on ${gameId}: ${time} seconds`);
}