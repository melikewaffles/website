const flappyBirdButton = document.getElementById('flappyBirdButton');
const flappyCanvas = document.getElementById('flappyCanvas');
const ctx = flappyCanvas.getContext('2d');

// Game assets
const birdImg = new Image();
birdImg.src = 'bird.png'; // Path to bird sprite
const pipeImg = new Image();
pipeImg.src = 'pipe.png'; // Path to pipe image
const groundImg = new Image();
groundImg.src = 'ground.png'; // Path to ground image

let birdY = 150, birdVelocity = 0, gravity = 0.5;
let isGameRunning = false;
let score = 0;

// Obstacle and ground data
let obstacles = [];
const pipeWidth = 52, gapHeight = 120;

// Start Flappy Bird
flappyBirdButton.addEventListener('click', startFlappyBird);

function startFlappyBird() {
    flappyCanvas.style.display = 'block';
    isGameRunning = true;
    obstacles = Array.from({ length: 3 }, (_, i) => ({
        x: flappyCanvas.width + i * 200,
        gapStart: Math.random() * (flappyCanvas.height - gapHeight - 100) + 50,
    }));
    birdY = 150; birdVelocity = 0; score = 0;
    requestAnimationFrame(updateGame);
}

// Update game state
function updateGame() {
    if (!isGameRunning) return;

    ctx.clearRect(0, 0, flappyCanvas.width, flappyCanvas.height);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, flappyCanvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, flappyCanvas.width, flappyCanvas.height);

    // Bird
    birdVelocity += gravity;
    birdY += birdVelocity;

    if (birdY < 0 || birdY > flappyCanvas.height - 50) {
        endGame();
        return;
    }
    ctx.drawImage(birdImg, 50, birdY, 34, 24);

    // Obstacles
    obstacles.forEach(obstacle => {
        ctx.drawImage(pipeImg, obstacle.x, 0, pipeWidth, obstacle.gapStart);
        ctx.drawImage(pipeImg, obstacle.x, obstacle.gapStart + gapHeight, pipeWidth, flappyCanvas.height);
        obstacle.x -= 2;

        // Collision detection
        if (50 < obstacle.x + pipeWidth &&
            50 + 34 > obstacle.x &&
            (birdY < obstacle.gapStart || birdY + 24 > obstacle.gapStart + gapHeight)) {
            endGame();
            return;
        }

        // Reset pipe position
        if (obstacle.x + pipeWidth < 0) {
            obstacle.x = flappyCanvas.width;
            obstacle.gapStart = Math.random() * (flappyCanvas.height - gapHeight - 100) + 50;
            score++;
        }
    });

    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    // Ground
    ctx.drawImage(groundImg, 0, flappyCanvas.height - 50, flappyCanvas.width, 50);

    requestAnimationFrame(updateGame);
}

// End game
function endGame() {
    isGameRunning = false;
    alert(`Game Over! Score: ${score}`);
    flappyCanvas.style.display = 'none';
}

// Jump
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && isGameRunning) birdVelocity = -8;
});
