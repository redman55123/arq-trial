# Platformer Adventure

A 2D platformer game inspired by Super Mario, built with HTML5 Canvas. Features three themed levels (Forest, Desert, Castle) with increasing size and complexity.

## Features

- **3 Levels**: Forest (small), Desert (medium), Castle (large) - each playable individually
- **Themed Graphics**: Colorful visuals with distinct themes per level
- **Controls**: Arrow keys or WASD for movement, Spacebar for jump
- **Mechanics**: Standard run and jump only (single jump)
- **Scoreboard**: Persistent tracking of score, time, deaths, and completion status

## How to Play

1. Open `index.html` in a web browser (or run a local server)
2. Select a level from the menu
3. Move with Arrow keys or WASD, jump with Spacebar
4. Collect coins for points and reach the goal flag to complete the level

## Running Locally

```bash
# Using Python
python3 -m http.server 8080
# Then open http://localhost:8080

# Or using Node.js (npx)
npx serve .
```

## Structure

- `index.html` - Main entry point
- `css/game.css` - Styling
- `js/levels.js` - Level definitions (Forest, Desert, Castle)
- `js/player.js` - Player physics and mechanics
- `js/scoreboard.js` - Persistent scoreboard (localStorage)
- `js/game.js` - Game engine, rendering, input
- `js/main.js` - Menu and initialization
