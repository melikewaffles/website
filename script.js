// Get references to the button and the canvas
const flappyButton = document.getElementById('flappyButton');
const flappyCanvas = document.getElementById('flappyCanvas');
const ctx = flappyCanvas.getContext('2d');

// Variables for the Flappy Bird game
let birdY = 150; // Bird's vertical position
let birdX = 50; // Bird's horizontal position
let birdVelocity = 0; // Bird's vertical velocity
let gravity = 0.5; // Gravity affecting the bird
let isGameRunning = false;
let obstacles = []; // Array to store obstacles
let score = 0;

// Function to start the game
function startFlappyBird() {
    flappyCanvas.style.display = 'block'; // Show the canvas
    flappyButton.style.display = 'none'; // Hide the button
    isGameRunning = true;

    // Initialize obstacles
    obstacles = [];
    for (let i = 0; i < 3; i++) {
        obstacles.push({
            x: flappyCanvas.width + i * 200,
            gapStart: Math.random() * 200 + 50,
        });
    }

    // Start the game loop
    requestAnimationFrame(updateGame);
}

// Function to update the game state
function updateGame() {
    if (!isGameRunning) return;

    // Clear the canvas
    ctx.clearRect(0, 0, flappyCanvas.width, flappyCanvas.height);

    // Draw the bird
    ctx.fillStyle = 'yellow';
    ctx.fillRect(birdX, birdY, 20, 20);

    // Apply gravity
    birdVelocity += gravity;
    birdY += birdVelocity;

    // Check if the bird hits the ground or flies out of bounds
    if (birdY > flappyCanvas.height - 20 || birdY < 0) {
        endGame();
        return;
    }

    // Draw and update obstacles
    ctx.fillStyle = 'green';
    for (let obstacle of obstacles) {
        // Draw top and bottom pipes
        ctx.fillRect(obstacle.x, 0, 40, obstacle.gapStart);
        ctx.fillRect(obstacle.x, obstacle.gapStart + 100, 40, flappyCanvas.height);

        // Move obstacles to the left
        obstacle.x -= 2;

        // If an obstacle moves off the screen, reposition it
        if (obstacle.x < -40) {
            obstacle.x = flappyCanvas.width;
            obstacle.gapStart = Math.random() * 200 + 50;
            score++;
        }

        // Check for collisions with the bird
        if (
            birdX + 20 > obstacle.x &&
            birdX < obstacle.x + 40 &&
            (birdY < obstacle.gapStart || birdY + 20 > obstacle.gapStart + 100)
        ) {
            endGame();
            return;
        }
    }

    // Draw the score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    // Continue the game loop
    requestAnimationFrame(updateGame);
}

// Function to end the game
function endGame() {
    isGameRunning = false;
    alert(`Game over! Your score: ${score}`);
    birdY = 150;
    birdVelocity = 0;
    flappyCanvas.style.display = 'none'; // Hide the canvas
    flappyButton.style.display = 'block'; // Show the button
}

// Event listener for the button
flappyButton.addEventListener('click', startFlappyBird);

// Event listener for bird "jump" (spacebar or click)
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && isGameRunning) {
        birdVelocity = -8; // Move the bird upward
    }
});
flappyCanvas.addEventListener('click', () => {
    if (isGameRunning) {
        birdVelocity = -8; // Move the bird upward
    }
});
