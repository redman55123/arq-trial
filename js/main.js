/**
 * Entry point - menu, level select, scoreboard init
 */
document.addEventListener('DOMContentLoaded', () => {
    Game.init();

    // Level select buttons
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const level = parseInt(btn.dataset.level, 10);
            if (LEVELS[level]) {
                Game.startLevel(level);
            }
        });
    });

    // Render scoreboard on load
    Scoreboard.render(document.getElementById('scoreboard-content'));
});
