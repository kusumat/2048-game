# 2048 Game

A fully functional 2048 game with smooth animations and modern design.

## Features

- **Smooth Animations**: Fluid tile movements, appearances, and merging animations
- **Full Game Logic**: Complete implementation of the 2048 game mechanics
- **Keyboard Controls**: Use arrow keys to play on desktop
- **Touch Support**: Swipe gestures for mobile devices
- **Score Tracking**: Current score and persistent best score
- **Responsive Design**: Works beautifully on both desktop and mobile
- **Modern UI**: Beautiful gradient background and clean design

## How to Play

1. Use arrow keys (desktop) or swipe (mobile) to move tiles
2. When two tiles with the same number touch, they merge into one
3. Reach the 2048 tile to win!
4. The game ends when you can't make any more moves

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser
3. Start playing!

Alternatively, you can run a local server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .

# Then open http://localhost:8000
```

## Game Controls

### Desktop
- **↑** - Move tiles up
- **↓** - Move tiles down  
- **←** - Move tiles left
- **→** - Move tiles right

### Mobile
- **Swipe Up** - Move tiles up
- **Swipe Down** - Move tiles down
- **Swipe Left** - Move tiles left
- **Swipe Right** - Move tiles right

## Technical Details

- **Pure HTML/CSS/JavaScript**: No external dependencies
- **Responsive Design**: Adapts to different screen sizes
- **Local Storage**: Best score is saved locally
- **Smooth Animations**: CSS transitions and keyframe animations
- **Touch Support**: Native touch event handling

## License

This project is open source and available under the [MIT License](LICENSE).
