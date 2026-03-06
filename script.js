class Game2048 {
    constructor() {
        this.grid = [];
        this.score = 0;
        this.bestScore = localStorage.getItem('bestScore') || 0;
        this.size = 4;
        this.tileContainer = document.getElementById('tile-container');
        this.scoreElement = document.getElementById('score');
        this.bestScoreElement = document.getElementById('best-score');
        this.gameMessage = document.getElementById('game-message');
        this.messageTitle = document.getElementById('message-title');
        this.messageText = document.getElementById('message-text');
        
        this.init();
        this.bindEvents();
    }
    
    init() {
        // Initialize empty grid
        this.grid = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.score = 0;
        this.updateScore();
        this.clearTiles();
        
        // Add two initial tiles
        this.addNewTile();
        this.addNewTile();
        this.updateDisplay();
    }
    
    bindEvents() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                this.handleMove(e.key);
            }
        });
        
        // Touch controls
        let touchStartX = 0;
        let touchStartY = 0;
        
        this.tileContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        this.tileContainer.addEventListener('touchend', (e) => {
            if (!touchStartX || !touchStartY) return;
            
            let touchEndX = e.changedTouches[0].clientX;
            let touchEndY = e.changedTouches[0].clientY;
            
            let dx = touchEndX - touchStartX;
            let dy = touchEndY - touchStartY;
            
            // Determine swipe direction
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 0) {
                    this.handleMove('ArrowRight');
                } else {
                    this.handleMove('ArrowLeft');
                }
            } else {
                if (dy > 0) {
                    this.handleMove('ArrowDown');
                } else {
                    this.handleMove('ArrowUp');
                }
            }
            
            touchStartX = 0;
            touchStartY = 0;
        }, { passive: true });
        
        // Button controls
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.init();
            this.hideMessage();
        });
        
        document.getElementById('retry-btn').addEventListener('click', () => {
            this.init();
            this.hideMessage();
        });
    }
    
    handleMove(direction) {
        let moved = false;
        const previousGrid = this.grid.map(row => [...row]);
        
        switch(direction) {
            case 'ArrowLeft':
                moved = this.moveLeft();
                break;
            case 'ArrowRight':
                moved = this.moveRight();
                break;
            case 'ArrowUp':
                moved = this.moveUp();
                break;
            case 'ArrowDown':
                moved = this.moveDown();
                break;
        }
        
        if (moved) {
            this.addNewTile();
            this.updateDisplay();
            
            if (this.checkWin()) {
                this.showMessage('You Win!', 'Congratulations! You reached 2048!');
            } else if (this.checkGameOver()) {
                this.showMessage('Game Over!', `Final score: ${this.score}`);
            }
        }
    }
    
    moveLeft() {
        let moved = false;
        
        for (let row = 0; row < this.size; row++) {
            let newRow = this.grid[row].filter(val => val !== 0);
            
            // Merge tiles
            for (let i = 0; i < newRow.length - 1; i++) {
                if (newRow[i] === newRow[i + 1]) {
                    newRow[i] *= 2;
                    this.score += newRow[i];
                    newRow.splice(i + 1, 1);
                }
            }
            
            // Fill with zeros
            while (newRow.length < this.size) {
                newRow.push(0);
            }
            
            // Check if row changed
            if (JSON.stringify(this.grid[row]) !== JSON.stringify(newRow)) {
                moved = true;
                this.grid[row] = newRow;
            }
        }
        
        return moved;
    }
    
    moveRight() {
        let moved = false;
        
        for (let row = 0; row < this.size; row++) {
            let newRow = this.grid[row].filter(val => val !== 0);
            
            // Merge tiles from right
            for (let i = newRow.length - 1; i > 0; i--) {
                if (newRow[i] === newRow[i - 1]) {
                    newRow[i] *= 2;
                    this.score += newRow[i];
                    newRow.splice(i - 1, 1);
                    i--;
                }
            }
            
            // Fill with zeros at the beginning
            while (newRow.length < this.size) {
                newRow.unshift(0);
            }
            
            // Check if row changed
            if (JSON.stringify(this.grid[row]) !== JSON.stringify(newRow)) {
                moved = true;
                this.grid[row] = newRow;
            }
        }
        
        return moved;
    }
    
    moveUp() {
        let moved = false;
        
        for (let col = 0; col < this.size; col++) {
            let column = [];
            for (let row = 0; row < this.size; row++) {
                if (this.grid[row][col] !== 0) {
                    column.push(this.grid[row][col]);
                }
            }
            
            // Merge tiles
            for (let i = 0; i < column.length - 1; i++) {
                if (column[i] === column[i + 1]) {
                    column[i] *= 2;
                    this.score += column[i];
                    column.splice(i + 1, 1);
                }
            }
            
            // Fill with zeros
            while (column.length < this.size) {
                column.push(0);
            }
            
            // Update grid
            for (let row = 0; row < this.size; row++) {
                if (this.grid[row][col] !== column[row]) {
                    moved = true;
                    this.grid[row][col] = column[row];
                }
            }
        }
        
        return moved;
    }
    
    moveDown() {
        let moved = false;
        
        for (let col = 0; col < this.size; col++) {
            let column = [];
            for (let row = 0; row < this.size; row++) {
                if (this.grid[row][col] !== 0) {
                    column.push(this.grid[row][col]);
                }
            }
            
            // Merge tiles from bottom
            for (let i = column.length - 1; i > 0; i--) {
                if (column[i] === column[i - 1]) {
                    column[i] *= 2;
                    this.score += column[i];
                    column.splice(i - 1, 1);
                    i--;
                }
            }
            
            // Fill with zeros at the beginning
            while (column.length < this.size) {
                column.unshift(0);
            }
            
            // Update grid
            for (let row = 0; row < this.size; row++) {
                if (this.grid[row][col] !== column[row]) {
                    moved = true;
                    this.grid[row][col] = column[row];
                }
            }
        }
        
        return moved;
    }
    
    addNewTile() {
        const emptyCells = [];
        
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    }
    
    updateDisplay() {
        this.clearTiles();
        
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] !== 0) {
                    this.createTile(this.grid[row][col], row, col);
                }
            }
        }
        
        this.updateScore();
    }
    
    createTile(value, row, col) {
        const tile = document.createElement('div');
        tile.className = `tile tile-${value}`;
        tile.textContent = value;
        tile.style.left = `${col * 110}px`;
        tile.style.top = `${row * 110}px`;
        
        this.tileContainer.appendChild(tile);
    }
    
    clearTiles() {
        this.tileContainer.innerHTML = '';
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
        
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore', this.bestScore);
        }
        
        this.bestScoreElement.textContent = this.bestScore;
    }
    
    checkWin() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }
    
    checkGameOver() {
        // Check for empty cells
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 0) {
                    return false;
                }
            }
        }
        
        // Check for possible merges
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const current = this.grid[row][col];
                
                // Check right neighbor
                if (col < this.size - 1 && this.grid[row][col + 1] === current) {
                    return false;
                }
                
                // Check bottom neighbor
                if (row < this.size - 1 && this.grid[row + 1][col] === current) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    showMessage(title, text) {
        this.messageTitle.textContent = title;
        this.messageText.textContent = text;
        this.gameMessage.classList.add('show');
    }
    
    hideMessage() {
        this.gameMessage.classList.remove('show');
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Game2048();
});
