// PACMAN - HTML5 Canvas Game
// Levels: 1 (small), 2 (medium), 3 (large with power-ups)

const CELL_SIZE = 20;
const DIRECTIONS = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };

// Level definitions: 0=empty, 1=wall, 2=pellet, 3=powerup (level 3 only)
const LEVELS = {
    1: { // Small simple maze
        rows: 15,
        cols: 19,
        ghostCount: 2,
        maze: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,2,1,1,2,1,2,1,1,2,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,2,1],
            [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,2,1,1,0,1,0,1,1,2,1,1,1,1,1],
            [1,2,2,2,2,2,1,1,0,1,0,1,1,2,2,2,2,2,1],
            [1,1,1,1,1,2,1,1,0,0,0,1,1,2,1,1,1,1,1],
            [1,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,1],
            [1,2,1,2,1,1,1,2,2,2,2,2,1,1,1,2,1,2,1],
            [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,2,1,1,2,1,2,1,1,2,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]
    },
    2: { // Medium maze with more obstacles
        rows: 19,
        cols: 23,
        ghostCount: 4,
        maze: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,2,1,2,1,2,1,1,1,1,2,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,2,2,1,1,1,2,2,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,2,2,1,1,1,2,2,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,2,1,2,1,2,1,1,1,1,2,1,1,1,2,1],
            [1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]
    },
    3: { // Large complex maze with power-ups
        rows: 23,
        cols: 27,
        ghostCount: 6,
        maze: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,2,1,2,1,2,1,2,1,1,1,1,2,1,1,1,1,1,2,1],
            [1,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,1,1,1,2,2,1,1,1,2,2,1,1,1,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,2,2,1,1,1,2,2,1,1,1,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,1,1,1,2,2,1,1,1,2,2,1,1,1,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,2,2,1,1,1,2,2,1,1,1,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,1],
            [1,2,1,1,1,1,2,1,2,1,2,1,2,1,2,1,1,1,1,2,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]
    }
};

const GHOST_COLORS = ['#FF0040', '#FF69B4', '#00FFFF', '#FF8C00', '#FF00FF', '#00FF88'];

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentLevel = 1;
        this.score = 0;
        this.lives = 3;
        this.highScores = JSON.parse(localStorage.getItem('pacmanHighScores') || '{}');
        this.pellets = [];
        this.ghosts = [];
        this.pacman = null;
        this.maze = [];
        this.cellSize = CELL_SIZE;
        this.animateId = null;
        this.powerUpActive = false;
        this.powerUpTimer = 0;
        this.invincible = false;
        this.invincibleTimer = 0;
        this.mouthAngle = 0;
        this.mouthDirection = 1;
        this.gameOver = false;
        this.won = false;
        this.nextDir = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const keyMap = {
            'ArrowUp': 'up', 'KeyW': 'up',
            'ArrowDown': 'down', 'KeyS': 'down',
            'ArrowLeft': 'left', 'KeyA': 'left',
            'ArrowRight': 'right', 'KeyD': 'right'
        };
        document.addEventListener('keydown', (e) => {
            if (keyMap[e.code]) {
                e.preventDefault();
                this.nextDir = keyMap[e.code];
            }
            if (e.code === 'KeyR' && this.gameOver) this.restart();
        });
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', () => this.startLevel(parseInt(btn.dataset.level)));
        });
        document.getElementById('play-again-btn').addEventListener('click', () => this.restart());
        document.getElementById('level-select-btn').addEventListener('click', () => this.showMenu());
        document.getElementById('level-select-header-btn').addEventListener('click', () => this.showMenu());
        document.querySelectorAll('.dpad-btn').forEach(btn => {
            btn.addEventListener('touchstart', (e) => { e.preventDefault(); this.nextDir = btn.dataset.dir; });
            btn.addEventListener('mousedown', (e) => { e.preventDefault(); this.nextDir = btn.dataset.dir; });
        });
    }

    loadHighScores() {
        this.highScores = JSON.parse(localStorage.getItem('pacmanHighScores') || '{}');
    }

    saveHighScore(level, score) {
        const current = this.highScores[level] || 0;
        if (score > current) {
            this.highScores[level] = score;
            localStorage.setItem('pacmanHighScores', JSON.stringify(this.highScores));
        }
    }

    showMenu() {
        document.getElementById('menu-screen').classList.add('active');
        document.getElementById('game-screen').classList.remove('active');
        if (this.animateId) cancelAnimationFrame(this.animateId);
    }

    startLevel(level) {
        this.currentLevel = level;
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.won = false;
        this.powerUpActive = false;
        this.powerUpTimer = 0;
        this.nextDir = null;
        document.getElementById('menu-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        document.getElementById('game-over-overlay').classList.add('hidden');
        this.initLevel();
        this.updateUI();
        this.gameLoop();
    }

    initLevel() {
        const config = LEVELS[this.currentLevel];
        this.maze = config.maze.map(row => [...row]);
        const rows = config.rows;
        const cols = config.cols;
        const maxDim = Math.max(rows * this.cellSize, cols * this.cellSize);
        const scale = Math.min(1, 480 / maxDim, window.innerWidth / maxDim);
        this.cellSize = Math.floor(CELL_SIZE * scale);
        this.canvas.width = cols * this.cellSize;
        this.canvas.height = rows * this.cellSize;

        this.pellets = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (this.maze[y][x] === 2 || this.maze[y][x] === 3) {
                    this.pellets.push({ x, y, isPowerUp: this.maze[y][x] === 3 });
                }
            }
        }

        let pacmanX = 1, pacmanY = 1;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (this.maze[y][x] !== 1 && this.maze[y][x] !== 0) {
                    pacmanX = x;
                    pacmanY = y;
                    break;
                }
            }
            if (pacmanX !== 1 || pacmanY !== 1) break;
        }

        this.pacman = {
            x: pacmanX,
            y: pacmanY,
            dir: 'right',
            nextDir: null,
            pixelX: pacmanX * this.cellSize,
            pixelY: pacmanY * this.cellSize
        };

        this.ghosts = [];
        const spawns = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (this.maze[y][x] === 0 && (x > cols/2 - 2 && x < cols/2 + 2)) continue;
                if (this.maze[y][x] !== 1) spawns.push({ x, y });
            }
        }
        const used = new Set();
        for (let i = 0; i < config.ghostCount && i < spawns.length; i++) {
            const idx = Math.floor(Math.random() * spawns.length);
            const s = spawns[idx];
            const key = `${s.x},${s.y}`;
            if (!used.has(key) && (s.x !== this.pacman.x || s.y !== this.pacman.y)) {
                used.add(key);
                this.ghosts.push({
                    x: s.x, y: s.y,
                    pixelX: s.x * this.cellSize,
                    pixelY: s.y * this.cellSize,
                    dir: ['up','down','left','right'][Math.floor(Math.random()*4)],
                    color: GHOST_COLORS[i % GHOST_COLORS.length],
                    scared: false
                });
            } else i--;
        }
    }

    canMove(x, y) {
        const cols = this.maze[0].length;
        const rows = this.maze.length;
        if (x < 0 || x >= cols || y < 0 || y >= rows) return false;
        return this.maze[y][x] !== 1;
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('current-level-display').textContent = this.currentLevel;
        document.getElementById('high-score').textContent = this.highScores[this.currentLevel] || 0;
    }

    gameLoop() {
        if (this.gameOver || this.won) {
            this.showGameOver();
            return;
        }
        this.update();
        this.draw();
        this.animateId = requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        const config = LEVELS[this.currentLevel];
        const cols = config.cols;
        const rows = config.rows;

        if (this.powerUpActive) {
            this.powerUpTimer--;
            if (this.powerUpTimer <= 0) this.powerUpActive = false;
        }
        if (this.invincible) {
            this.invincibleTimer--;
            if (this.invincibleTimer <= 0) this.invincible = false;
        }

        if (this.nextDir) {
            const d = DIRECTIONS[this.nextDir];
            const nx = this.pacman.x + d.x;
            const ny = this.pacman.y + d.y;
            if (this.canMove(nx, ny)) this.pacman.nextDir = this.nextDir;
            this.nextDir = null;
        }

        if (this.pacman.nextDir) {
            const d = DIRECTIONS[this.pacman.nextDir];
            const nx = this.pacman.x + d.x;
            const ny = this.pacman.y + d.y;
            if (this.canMove(nx, ny)) {
                this.pacman.dir = this.pacman.nextDir;
                this.pacman.x = nx;
                this.pacman.y = ny;
                this.pacman.nextDir = null;
            }
        } else {
            const d = DIRECTIONS[this.pacman.dir];
            const nx = this.pacman.x + d.x;
            const ny = this.pacman.y + d.y;
            if (this.canMove(nx, ny)) {
                this.pacman.x = nx;
                this.pacman.y = ny;
            }
        }

        this.pacman.pixelX = this.pacman.x * this.cellSize;
        this.pacman.pixelY = this.pacman.y * this.cellSize;

        const pelletIdx = this.pellets.findIndex(p => p.x === this.pacman.x && p.y === this.pacman.y);
        if (pelletIdx >= 0) {
            const p = this.pellets[pelletIdx];
            this.pellets.splice(pelletIdx, 1);
            this.score += p.isPowerUp ? 50 : 10;
            if (p.isPowerUp) {
                this.powerUpActive = true;
                this.powerUpTimer = 150;
                this.ghosts.forEach(g => g.scared = true);
            }
        }

        if (this.pellets.length === 0) {
            this.won = true;
            this.saveHighScore(this.currentLevel, this.score);
            return;
        }

        this.ghosts.forEach(ghost => {
            if (this.powerUpTimer <= 0) ghost.scared = false;
            let choices = ['up','down','left','right'].filter(dir => {
                const d = DIRECTIONS[dir];
                return this.canMove(ghost.x + d.x, ghost.y + d.y);
            });
            if (choices.length > 0 && !ghost.scared) {
                const towardPacman = choices.filter(dir => {
                    const d = DIRECTIONS[dir];
                    const nx = ghost.x + d.x, ny = ghost.y + d.y;
                    const dist = Math.abs(nx - this.pacman.x) + Math.abs(ny - this.pacman.y);
                    const cdist = Math.abs(ghost.x - this.pacman.x) + Math.abs(ghost.y - this.pacman.y);
                    return dist < cdist;
                });
                if (towardPacman.length > 0 && Math.random() < 0.7)
                    choices = towardPacman;
            }
            if (choices.length > 0) {
                const idx = Math.floor(Math.random() * choices.length);
                ghost.dir = choices[idx];
                const d = DIRECTIONS[ghost.dir];
                ghost.x += d.x;
                ghost.y += d.y;
            }
            ghost.pixelX = ghost.x * this.cellSize;
            ghost.pixelY = ghost.y * this.cellSize;

            if (!this.invincible && Math.floor(ghost.x) === Math.floor(this.pacman.x) && Math.floor(ghost.y) === Math.floor(this.pacman.y)) {
                if (ghost.scared) {
                    const validRespawns = [];
                    for (let gy = 0; gy < rows; gy++) for (let gx = 0; gx < cols; gx++) {
                        if (this.maze[gy][gx] === 0 || this.maze[gy][gx] === 2) validRespawns.push({ x: gx, y: gy });
                    }
                    if (validRespawns.length > 0) {
                        const r = validRespawns[Math.floor(Math.random() * validRespawns.length)];
                        ghost.x = r.x;
                        ghost.y = r.y;
                    }
                    ghost.pixelX = ghost.x * this.cellSize;
                    ghost.pixelY = ghost.y * this.cellSize;
                    this.score += 200;
                } else {
                    this.lives--;
                    if (this.lives <= 0) this.gameOver = true;
                    else {
                        this.invincible = true;
                        this.invincibleTimer = 90;
                        this.pacman.x = 1;
                        this.pacman.y = 1;
                        this.pacman.pixelX = this.pacman.x * this.cellSize;
                        this.pacman.pixelY = this.pacman.y * this.cellSize;
                        this.ghosts.forEach(g => {
                            const valid = [];
                            for (let gy = 0; gy < config.rows; gy++) for (let gx = 0; gx < config.cols; gx++) {
                                if (this.maze[gy][gx] !== 1 && (Math.abs(gx - 1) + Math.abs(gy - 1)) > 4)
                                    valid.push({ x: gx, y: gy });
                            }
                            if (valid.length) {
                                const r = valid[Math.floor(Math.random() * valid.length)];
                                g.x = r.x; g.y = r.y;
                                g.pixelX = g.x * this.cellSize;
                                g.pixelY = g.y * this.cellSize;
                            }
                        });
                    }
                }
            }
        });

        this.mouthAngle += 0.15 * this.mouthDirection;
        if (this.mouthAngle > 0.4) this.mouthDirection = -1;
        if (this.mouthAngle < 0) this.mouthDirection = 1;
    }

    draw() {
        const cs = this.cellSize;
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const config = LEVELS[this.currentLevel];
        for (let y = 0; y < config.rows; y++) {
            for (let x = 0; x < config.cols; x++) {
                if (this.maze[y][x] === 1) {
                    this.ctx.fillStyle = '#2121DE';
                    this.ctx.strokeStyle = '#4A4AFF';
                    this.ctx.lineWidth = 2;
                    this.ctx.fillRect(x * cs, y * cs, cs, cs);
                    this.ctx.strokeRect(x * cs, y * cs, cs, cs);
                }
            }
        }

        this.pellets.forEach(p => {
            this.ctx.fillStyle = p.isPowerUp ? '#FF00FF' : '#FFD700';
            const r = p.isPowerUp ? cs * 0.35 : cs * 0.2;
            this.ctx.beginPath();
            this.ctx.arc(p.x * cs + cs/2, p.y * cs + cs/2, r, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ghosts.forEach(ghost => {
            this.ctx.fillStyle = ghost.scared ? '#2222FF' : ghost.color;
            const gx = ghost.pixelX + cs/2, gy = ghost.pixelY + cs/2;
            this.ctx.beginPath();
            this.ctx.arc(gx, gy - cs*0.1, cs*0.4, Math.PI, 0);
            this.ctx.lineTo(gx + cs*0.35, gy + cs*0.3);
            this.ctx.quadraticCurveTo(gx + cs*0.4, gy + cs*0.5, gx, gy + cs*0.4);
            this.ctx.quadraticCurveTo(gx - cs*0.4, gy + cs*0.5, gx - cs*0.35, gy + cs*0.3);
            this.ctx.closePath();
            this.ctx.fill();
            if (!ghost.scared) {
                this.ctx.fillStyle = '#fff';
                this.ctx.beginPath();
                this.ctx.arc(gx - cs*0.15, gy - cs*0.15, cs*0.12, 0, Math.PI*2);
                this.ctx.arc(gx + cs*0.15, gy - cs*0.15, cs*0.12, 0, Math.PI*2);
                this.ctx.fill();
                this.ctx.fillStyle = '#00f';
                this.ctx.beginPath();
                this.ctx.arc(gx - cs*0.15, gy - cs*0.15, cs*0.05, 0, Math.PI*2);
                this.ctx.arc(gx + cs*0.15, gy - cs*0.15, cs*0.05, 0, Math.PI*2);
                this.ctx.fill();
            }
        });

        const px = this.pacman.pixelX + cs/2;
        const py = this.pacman.pixelY + cs/2;
        if (this.invincible && Math.floor(this.invincibleTimer / 5) % 2 === 0) return;
        const angleOffset = { up: -Math.PI/2, down: Math.PI/2, left: Math.PI, right: 0 }[this.pacman.dir];
        const start = angleOffset - this.mouthAngle * Math.PI;
        const end = angleOffset + this.mouthAngle * Math.PI;
        this.ctx.fillStyle = '#FFE135';
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(px, py);
        this.ctx.arc(px, py, cs*0.45, start, end);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    showGameOver() {
        if (this.animateId) cancelAnimationFrame(this.animateId);
        const overlay = document.getElementById('game-over-overlay');
        overlay.classList.remove('hidden');
        document.getElementById('game-over-title').textContent = this.won ? 'Vitória!' : 'Fim de Jogo';
        document.getElementById('game-over-message').textContent = this.won
            ? `Pontuação: ${this.score}`
            : `Pontuação final: ${this.score}`;
        this.updateUI();
    }

    restart() {
        this.startLevel(this.currentLevel);
    }
}

const game = new Game();
game.updateUI();
