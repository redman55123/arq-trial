/**
 * Level definitions - Forest, Desert, Castle
 * Levels progressively increase in size and complexity
 * Platform format: { x, y, width, height, type }
 * type: 'ground' | 'platform' | 'brick' | 'wood' | 'stone' | 'sand'
 */

const LEVELS = {
    1: {
        name: 'Forest',
        theme: 'forest',
        width: 3200,
        height: 480,
        gravity: 0.6,
        playerStart: { x: 80, y: 350 },
        finishX: 3000,
        platforms: [
            // Ground layer - forest grass
            { x: 0, y: 400, width: 800, height: 80, type: 'ground' },
            { x: 800, y: 420, width: 400, height: 60, type: 'ground' },
            { x: 1200, y: 400, width: 600, height: 80, type: 'ground' },
            { x: 1800, y: 430, width: 500, height: 50, type: 'ground' },
            { x: 2300, y: 400, width: 800, height: 80, type: 'ground' },
            { x: 3100, y: 400, width: 100, height: 80, type: 'ground' },
            // Platforms - tree stumps / wooden
            { x: 200, y: 320, width: 120, height: 20, type: 'wood' },
            { x: 450, y: 280, width: 100, height: 20, type: 'wood' },
            { x: 650, y: 340, width: 80, height: 20, type: 'wood' },
            { x: 950, y: 300, width: 150, height: 20, type: 'wood' },
            { x: 1200, y: 260, width: 100, height: 20, type: 'wood' },
            { x: 1450, y: 320, width: 120, height: 20, type: 'wood' },
            { x: 1700, y: 280, width: 100, height: 20, type: 'wood' },
            { x: 2000, y: 340, width: 140, height: 20, type: 'wood' },
            { x: 2250, y: 260, width: 100, height: 20, type: 'wood' },
            { x: 2550, y: 320, width: 120, height: 20, type: 'wood' },
            { x: 2800, y: 280, width: 100, height: 20, type: 'wood' },
        ],
        coins: [
            { x: 250, y: 260 }, { x: 500, y: 220 }, { x: 700, y: 280 },
            { x: 1000, y: 240 }, { x: 1250, y: 200 }, { x: 1500, y: 260 },
            { x: 1750, y: 220 }, { x: 2050, y: 280 }, { x: 2300, y: 200 },
            { x: 2600, y: 260 }, { x: 2850, y: 220 }
        ]
    },
    2: {
        name: 'Desert',
        theme: 'desert',
        width: 4800,
        height: 560,
        gravity: 0.6,
        playerStart: { x: 80, y: 420 },
        finishX: 4550,
        platforms: [
            // Ground - sand dunes
            { x: 0, y: 440, width: 600, height: 120, type: 'ground' },
            { x: 600, y: 460, width: 400, height: 100, type: 'ground' },
            { x: 1000, y: 440, width: 800, height: 120, type: 'ground' },
            { x: 1800, y: 470, width: 500, height: 90, type: 'ground' },
            { x: 2300, y: 440, width: 600, height: 120, type: 'ground' },
            { x: 2900, y: 460, width: 700, height: 100, type: 'ground' },
            { x: 3600, y: 440, width: 500, height: 120, type: 'ground' },
            { x: 4100, y: 460, width: 500, height: 100, type: 'ground' },
            { x: 4600, y: 440, width: 200, height: 120, type: 'ground' },
            // Platforms - sandstone blocks
            { x: 150, y: 360, width: 140, height: 24, type: 'sand' },
            { x: 400, y: 300, width: 120, height: 24, type: 'sand' },
            { x: 650, y: 380, width: 100, height: 24, type: 'sand' },
            { x: 850, y: 320, width: 160, height: 24, type: 'sand' },
            { x: 1100, y: 360, width: 120, height: 24, type: 'sand' },
            { x: 1300, y: 280, width: 140, height: 24, type: 'sand' },
            { x: 1550, y: 350, width: 100, height: 24, type: 'sand' },
            { x: 1750, y: 300, width: 180, height: 24, type: 'sand' },
            { x: 2050, y: 370, width: 120, height: 24, type: 'sand' },
            { x: 2300, y: 310, width: 140, height: 24, type: 'sand' },
            { x: 2550, y: 360, width: 100, height: 24, type: 'sand' },
            { x: 2750, y: 290, width: 150, height: 24, type: 'sand' },
            { x: 3000, y: 350, width: 120, height: 24, type: 'sand' },
            { x: 3250, y: 280, width: 160, height: 24, type: 'sand' },
            { x: 3500, y: 360, width: 100, height: 24, type: 'sand' },
            { x: 3750, y: 300, width: 140, height: 24, type: 'sand' },
            { x: 4000, y: 370, width: 120, height: 24, type: 'sand' },
            { x: 4250, y: 310, width: 150, height: 24, type: 'sand' },
            { x: 4450, y: 360, width: 100, height: 24, type: 'sand' },
        ],
        coins: [
            { x: 200, y: 300 }, { x: 450, y: 240 }, { x: 700, y: 320 },
            { x: 900, y: 260 }, { x: 1150, y: 300 }, { x: 1350, y: 220 },
            { x: 1600, y: 290 }, { x: 1800, y: 240 }, { x: 2100, y: 310 },
            { x: 2350, y: 250 }, { x: 2600, y: 300 }, { x: 2800, y: 230 },
            { x: 3050, y: 290 }, { x: 3300, y: 220 }, { x: 3550, y: 300 },
            { x: 3800, y: 240 }, { x: 4050, y: 310 }, { x: 4300, y: 250 }
        ]
    },
    3: {
        name: 'Castle',
        theme: 'castle',
        width: 6400,
        height: 640,
        gravity: 0.6,
        playerStart: { x: 80, y: 500 },
        finishX: 6100,
        platforms: [
            // Ground - castle stone
            { x: 0, y: 540, width: 800, height: 100, type: 'ground' },
            { x: 800, y: 560, width: 500, height: 80, type: 'ground' },
            { x: 1300, y: 540, width: 900, height: 100, type: 'ground' },
            { x: 2200, y: 570, width: 600, height: 70, type: 'ground' },
            { x: 2800, y: 540, width: 800, height: 100, type: 'ground' },
            { x: 3600, y: 560, width: 700, height: 80, type: 'ground' },
            { x: 4300, y: 540, width: 900, height: 100, type: 'ground' },
            { x: 5200, y: 570, width: 500, height: 70, type: 'ground' },
            { x: 5700, y: 540, width: 500, height: 100, type: 'ground' },
            // Platforms - castle bricks and stone
            { x: 120, y: 440, width: 160, height: 28, type: 'brick' },
            { x: 400, y: 380, width: 140, height: 28, type: 'brick' },
            { x: 650, y: 460, width: 120, height: 28, type: 'stone' },
            { x: 900, y: 400, width: 180, height: 28, type: 'brick' },
            { x: 1150, y: 340, width: 140, height: 28, type: 'stone' },
            { x: 1400, y: 420, width: 160, height: 28, type: 'brick' },
            { x: 1650, y: 360, width: 120, height: 28, type: 'stone' },
            { x: 1900, y: 440, width: 180, height: 28, type: 'brick' },
            { x: 2150, y: 380, width: 140, height: 28, type: 'brick' },
            { x: 2400, y: 320, width: 160, height: 28, type: 'stone' },
            { x: 2650, y: 400, width: 120, height: 28, type: 'brick' },
            { x: 2900, y: 340, width: 180, height: 28, type: 'brick' },
            { x: 3150, y: 420, width: 140, height: 28, type: 'stone' },
            { x: 3400, y: 360, width: 160, height: 28, type: 'brick' },
            { x: 3650, y: 440, width: 120, height: 28, type: 'brick' },
            { x: 3900, y: 380, width: 180, height: 28, type: 'stone' },
            { x: 4150, y: 320, width: 140, height: 28, type: 'brick' },
            { x: 4400, y: 400, width: 160, height: 28, type: 'brick' },
            { x: 4650, y: 340, width: 120, height: 28, type: 'stone' },
            { x: 4900, y: 420, width: 180, height: 28, type: 'brick' },
            { x: 5150, y: 360, width: 140, height: 28, type: 'brick' },
            { x: 5400, y: 440, width: 160, height: 28, type: 'stone' },
            { x: 5650, y: 380, width: 120, height: 28, type: 'brick' },
            { x: 5900, y: 340, width: 140, height: 28, type: 'brick' },
        ],
        coins: [
            { x: 170, y: 380 }, { x: 450, y: 320 }, { x: 710, y: 400 },
            { x: 950, y: 340 }, { x: 1200, y: 280 }, { x: 1450, y: 360 },
            { x: 1700, y: 300 }, { x: 1950, y: 380 }, { x: 2200, y: 320 },
            { x: 2450, y: 260 }, { x: 2700, y: 340 }, { x: 2950, y: 280 },
            { x: 3200, y: 360 }, { x: 3450, y: 300 }, { x: 3700, y: 380 },
            { x: 3950, y: 320 }, { x: 4200, y: 260 }, { x: 4450, y: 340 },
            { x: 4700, y: 280 }, { x: 4950, y: 360 }, { x: 5200, y: 300 },
            { x: 5450, y: 380 }, { x: 5700, y: 320 }, { x: 5950, y: 260 }
        ]
    }
};
