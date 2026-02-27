/**
 * Main game engine - Canvas rendering, game loop, input
 */
const Game = {
    canvas: null,
    ctx: null,
    player: null,
    level: null,
    levelData: null,
    coins: [],
    collectedCoins: new Set(),
    keys: {},
    score: 0,
    deaths: 0,
    startTime: 0,
    elapsedTime: 0,
    paused: false,
    gameOver: false,
    won: false,
    cameraX: 0,
    canvasWidth: 960,
    canvasHeight: 540,
    themeColors: {
        forest: {
            sky: ['#87CEEB', '#98D8C8', '#7CB342'],
            ground: '#4a7c23',
            platform: '#6d4c2e',
            accent: '#8BC34A',
            coin: '#FFD700',
            finish: '#2E7D32'
        },
        desert: {
            sky: ['#FFE0B2', '#FFCC80', '#FFB74D'],
            ground: '#D4A574',
            platform: '#8D6E63',
            accent: '#FF9800',
            coin: '#FFD700',
            finish: '#E65100'
        },
        castle: {
            sky: ['#B0BEC5', '#90A4AE', '#546E7A'],
            ground: '#455A64',
            platform: '#795548',
            accent: '#7E57C2',
            coin: '#FFD700',
            finish: '#4A148C'
        }
    },

    init() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.setupInput();
    },

    setupInput() {
        const keyMap = {
            'ArrowLeft': 'left', 'ArrowRight': 'right', 'ArrowUp': 'up',
            'KeyA': 'left', 'KeyD': 'right', 'KeyW': 'up',
            'Space': 'jump'
        };
        document.addEventListener('keydown', e => {
            const key = keyMap[e.code];
            if (key && !e.repeat) {
                this.keys[key] = true;
                if (key === 'jump') e.preventDefault();
            }
        });
        document.addEventListener('keyup', e => {
            const key = keyMap[e.code];
            if (key) this.keys[key] = false;
        });
    },

    startLevel(levelNum) {
        this.level = levelNum;
        this.levelData = LEVELS[levelNum];
        if (!this.levelData) return;

        this.player = new Player(
            this.levelData.playerStart.x,
            this.levelData.playerStart.y
        );
        this.player.applyLevelGravity(this.levelData.gravity);

        this.coins = [...this.levelData.coins];
        this.collectedCoins.clear();
        this.score = 0;
        this.deaths = 0;
        this.startTime = Date.now();
        this.elapsedTime = 0;
        this.paused = false;
        this.gameOver = false;
        this.won = false;
        this.cameraX = 0;

        document.getElementById('main-menu').style.display = 'none';
        this.canvas.style.display = 'block';
        document.getElementById('game-hud').style.display = 'flex';
        this.updateHUD();
        this.bindHUDButtons();
        this.loop();
    },

    bindHUDButtons() {
        document.getElementById('pause-btn').onclick = () => this.togglePause();
        document.getElementById('menu-btn').onclick = () => this.quitToMenu();
        document.getElementById('resume-btn').onclick = () => this.togglePause();
        document.getElementById('retry-btn').onclick = () => this.retry();
        document.getElementById('next-level-btn').onclick = () => this.nextLevel();
        document.getElementById('back-menu-btn').onclick = () => this.quitToMenu();
    },

    togglePause() {
        if (this.gameOver || this.won) return;
        this.paused = !this.paused;
        document.getElementById('pause-overlay').style.display = this.paused ? 'flex' : 'none';
    },

    quitToMenu() {
        this.gameOver = true;
        this.canvas.style.display = 'none';
        document.getElementById('game-hud').style.display = 'none';
        document.getElementById('pause-overlay').style.display = 'none';
        document.getElementById('game-overlay').style.display = 'none';
        document.getElementById('main-menu').style.display = 'block';
        Scoreboard.render(document.getElementById('scoreboard-content'));
    },

    retry() {
        this.deaths++;
        this.player.reset(this.levelData.playerStart.x, this.levelData.playerStart.y);
        this.collectedCoins.clear();
        this.coins = [...this.levelData.coins];
        this.gameOver = false;
        this.won = false;
        document.getElementById('game-overlay').style.display = 'none';
    },

    nextLevel() {
        const next = this.level + 1;
        if (LEVELS[next]) {
            this.quitToMenu();
            setTimeout(() => Game.startLevel(next), 100);
        } else {
            this.quitToMenu();
        }
    },

    respawn() {
        this.deaths++;
        this.player.reset(this.levelData.playerStart.x, this.levelData.playerStart.y);
    },

    updateHUD() {
        const scoreEl = document.getElementById('hud-score');
        const timeEl = document.getElementById('hud-time');
        const deathEl = document.getElementById('hud-deaths');
        if (scoreEl) scoreEl.textContent = `Score: ${this.score}`;
        if (timeEl) timeEl.textContent = `Time: ${this.formatTime(this.elapsedTime)}`;
        if (deathEl) deathEl.textContent = `Deaths: ${this.deaths}`;
    },

    formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    },

    showVictory() {
        this.won = true;
        this.elapsedTime = (Date.now() - this.startTime) / 1000;
        Scoreboard.saveEntry(this.level, this.levelData.name, this.score, this.elapsedTime, this.deaths, true);

        document.getElementById('overlay-title').textContent = 'Level Complete!';
        document.getElementById('overlay-stats').innerHTML = `
            <p>Score: ${this.score}</p>
            <p>Time: ${this.formatTime(this.elapsedTime)}</p>
            <p>Deaths: ${this.deaths}</p>
        `;
        document.getElementById('next-level-btn').style.display = LEVELS[this.level + 1] ? 'block' : 'none';
        document.getElementById('game-overlay').style.display = 'flex';
    },

    showGameOver() {
        this.elapsedTime = (Date.now() - this.startTime) / 1000;
        Scoreboard.saveEntry(this.level, this.levelData.name, this.score, this.elapsedTime, this.deaths, false);

        document.getElementById('overlay-title').textContent = 'Game Over';
        document.getElementById('overlay-stats').innerHTML = `
            <p>Score: ${this.score}</p>
            <p>Time: ${this.formatTime(this.elapsedTime)}</p>
            <p>Deaths: ${this.deaths}</p>
        `;
        document.getElementById('next-level-btn').style.display = 'none';
        document.getElementById('game-overlay').style.display = 'flex';
    },

    loop() {
        if (this.gameOver) return;

        if (!this.paused && !this.won) {
            this.elapsedTime = (Date.now() - this.startTime) / 1000;

            if (this.keys['left']) this.player.moveLeft();
            else if (this.keys['right']) this.player.moveRight();
            else this.player.stopX();
            if (this.keys['jump'] || this.keys['up']) this.player.jump();

            this.player.update(this.levelData.platforms, this.levelData.height);

            // Fall off map -> respawn
            if (this.player.y > this.levelData.height + 100) {
                this.respawn();
            }

            // Coin collection
            for (let i = 0; i < this.coins.length; i++) {
                const c = this.coins[i];
                const key = `${c.x},${c.y}`;
                if (this.collectedCoins.has(key)) continue;
                if (this.player.x + this.player.width > c.x && this.player.x < c.x + 24 &&
                    this.player.y + this.player.height > c.y && this.player.y < c.y + 24) {
                    this.collectedCoins.add(key);
                    this.score += 100;
                }
            }

            // Reach finish
            if (this.player.x >= this.levelData.finishX) {
                this.showVictory();
            }

            // Smooth camera
            const targetCam = this.player.x - this.canvasWidth / 2 + this.player.width / 2;
            this.cameraX += (targetCam - this.cameraX) * 0.1;
            this.cameraX = Math.max(0, Math.min(this.cameraX, this.levelData.width - this.canvasWidth));
        }

        this.render();
        requestAnimationFrame(() => this.loop());
    },

    render() {
        const ctx = this.ctx;
        const w = this.canvasWidth;
        const h = this.canvasHeight;
        const cam = this.cameraX;
        const theme = this.themeColors[this.levelData.theme] || this.themeColors.forest;

        // Sky gradient
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, theme.sky[0]);
        grad.addColorStop(0.5, theme.sky[1]);
        grad.addColorStop(1, theme.sky[2]);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Parallax background layers (themed)
        this.drawBackground(ctx, w, h, cam, theme);

        ctx.save();
        ctx.translate(-cam, 0);

        // Platforms
        for (const p of this.levelData.platforms) {
            this.drawPlatform(ctx, p, theme);
        }

        // Coins
        for (const c of this.coins) {
            const key = `${c.x},${c.y}`;
            if (this.collectedCoins.has(key)) continue;
            this.drawCoin(ctx, c.x, c.y);
        }

        // Finish flag
        this.drawFinish(ctx, this.levelData.finishX, this.levelData.height, theme);

        // Player
        this.drawPlayer(ctx);

        ctx.restore();

        this.updateHUD();
    },

    drawBackground(ctx, w, h, cam, theme) {
        const t = Date.now() / 5000;
        ctx.save();

        if (this.levelData.theme === 'forest') {
            // Sun in sky (top-right, fixed on screen)
            const sunX = w - 120;
            const sunY = 90;
            const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 70);
            glow.addColorStop(0, 'rgba(255, 255, 200, 0.9)');
            glow.addColorStop(0.4, 'rgba(255, 220, 100, 0.6)');
            glow.addColorStop(0.7, 'rgba(255, 180, 50, 0.2)');
            glow.addColorStop(1, 'rgba(255, 150, 0, 0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(sunX, sunY, 70, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FFEB3B';
            ctx.beginPath();
            ctx.arc(sunX, sunY, 45, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FFD54F';
            ctx.beginPath();
            ctx.arc(sunX, sunY, 38, 0, Math.PI * 2);
            ctx.fill();

            for (let i = 0; i < 15; i++) {
                const x = (i * 120 - (cam * 0.3) % 140) % (w + 140) - 20;
                ctx.fillStyle = `hsl(140, 40%, ${35 + i % 3 * 5}%)`;
                ctx.beginPath();
                ctx.moveTo(x, h);
                ctx.lineTo(x + 30, h - 80);
                ctx.lineTo(x + 60, h);
                ctx.fill();
            }
        } else if (this.levelData.theme === 'desert') {
            for (let i = 0; i < 20; i++) {
                const x = (i * 80 - (cam * 0.2) % 100) % (w + 100) - 20;
                const peak = 100 + Math.sin(i + t) * 30;
                ctx.fillStyle = `rgba(210, 180, 140, 0.5)`;
                ctx.beginPath();
                ctx.ellipse(x, h - 20, 60, peak, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (this.levelData.theme === 'castle') {
            for (let i = 0; i < 8; i++) {
                const x = (i * 200 - (cam * 0.15) % 220) % (w + 220) - 20;
                ctx.fillStyle = `hsla(0, 0%, ${25 + i % 2 * 10}%, 0.6)`;
                ctx.fillRect(x, h - 150, 80, 150);
                ctx.fillStyle = `hsla(0, 0%, ${20 + i % 2 * 8}%, 0.8)`;
                ctx.fillRect(x + 5, h - 145, 70, 20);
            }
        }

        ctx.restore();
    },

    drawPlatform(ctx, p, theme) {
        const types = {
            ground: { fill: theme.ground, pattern: 'ground' },
            platform: { fill: theme.platform },
            brick: { fill: '#8B4513', pattern: 'brick' },
            wood: { fill: '#6d4c2e', pattern: 'wood' },
            stone: { fill: '#708090' },
            sand: { fill: '#C4A574', pattern: 'sand' }
        };
        const style = types[p.type] || types.platform;
        ctx.fillStyle = style.fill;
        ctx.fillRect(p.x, p.y, p.width, p.height);

        if (style.pattern === 'ground') {
            ctx.fillStyle = this.levelData.theme === 'forest' ? 'rgba(34, 197, 94, 0.4)' :
                this.levelData.theme === 'desert' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0,0,0,0.2)';
            for (let i = 0; i < p.width; i += 24) {
                for (let j = 0; j < p.height; j += 16) {
                    if ((i + j) % 32 === 0) ctx.fillRect(p.x + i, p.y + j, 12, 8);
                }
            }
        } else if (style.pattern === 'brick') {
            ctx.strokeStyle = '#5D3A1A';
            ctx.lineWidth = 2;
            for (let row = 0; row < p.height; row += 14) {
                for (let col = 0; col < p.width; col += 28) {
                    ctx.strokeRect(p.x + col, p.y + row, 28, 14);
                }
            }
        } else if (style.pattern === 'wood') {
            ctx.strokeStyle = 'rgba(0,0,0,0.2)';
            ctx.lineWidth = 1;
            for (let i = 0; i < p.width; i += 15) {
                ctx.beginPath();
                ctx.moveTo(p.x + i, p.y);
                ctx.lineTo(p.x + i, p.y + p.height);
                ctx.stroke();
            }
        } else if (style.pattern === 'sand') {
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            for (let i = 0; i < 8; i++) {
                ctx.fillRect(p.x + 5 + i * 18, p.y + 4, 4, 4);
            }
        }

        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x, p.y, p.width, p.height);
    },

    drawCoin(ctx, x, y) {
        const bounce = Math.sin(Date.now() / 150) * 3;
        ctx.save();
        ctx.translate(x, y + bounce);
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFA500';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.ellipse(12, 12, 10, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.ellipse(12, 12, 6, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    },

    drawFinish(ctx, x, levelH) {
        const theme = this.themeColors[this.levelData.theme];
        ctx.fillStyle = theme.finish;
        ctx.fillRect(x, levelH - 120, 20, 120);
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(x + 20, levelH - 130, 60, 40);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('GOAL', x + 25, levelH - 105);
    },

    drawPlayer(ctx) {
        const p = this.player;
        ctx.save();
        ctx.translate(p.x, p.y);

        if (!p.facingRight) ctx.scale(-1, 1);

        // Body - colorful character
        ctx.fillStyle = '#2196F3';
        ctx.fillRect(4, 16, 28, 24);
        ctx.fillStyle = '#1976D2';
        ctx.fillRect(4, 20, 28, 8);
        ctx.fillStyle = '#FF5722';
        ctx.fillRect(8, 8, 20, 12);
        ctx.fillStyle = '#FFC107';
        ctx.beginPath();
        ctx.arc(18, 12, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(16, 11, 2, 0, Math.PI * 2);
        ctx.arc(22, 11, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#795548';
        ctx.fillRect(6, 40, 10, 8);
        ctx.fillRect(20, 40, 10, 8);

        ctx.restore();
    }
};
