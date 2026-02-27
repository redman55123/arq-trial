/**
 * Persistent scoreboard - tracks time, score, deaths, completion
 */
const Scoreboard = {
    STORAGE_KEY: 'platformer_scoreboard',

    getEntries() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },

    saveEntry(level, levelName, score, timeSeconds, deaths, completed) {
        const entries = this.getEntries();
        const existing = entries.findIndex(e => e.level === level);
        const entry = {
            level,
            levelName,
            score,
            time: timeSeconds,
            deaths,
            completed: !!completed,
            date: new Date().toISOString()
        };
        if (existing >= 0) {
            const prev = entries[existing];
            if (completed && (!prev.completed || score > prev.score || timeSeconds < prev.time)) {
                entries[existing] = entry;
            } else if (!completed && !prev.completed && score > prev.score) {
                entries[existing] = entry;
            } else if (completed && !prev.completed) {
                entries[existing] = entry;
            }
        } else {
            entries.push(entry);
        }
        entries.sort((a, b) => a.level - b.level);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));
    },

    getBestForLevel(level) {
        const entries = this.getEntries().filter(e => e.level === level);
        return entries.length ? entries[0] : null;
    },

    render(element) {
        const entries = this.getEntries();
        if (!element) return;
        if (entries.length === 0) {
            element.innerHTML = '<p class="no-scores">No scores yet. Play a level to get started!</p>';
            return;
        }
        element.innerHTML = entries.map(e => `
            <div class="scoreboard-entry">
                <span><strong>${e.levelName}</strong> ${e.completed ? '✓' : '—'}</span>
                <span>Score: ${e.score} | Time: ${formatTime(e.time)} | Deaths: ${e.deaths}</span>
            </div>
        `).join('');
    }
};

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}
