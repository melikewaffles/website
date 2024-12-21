// Get references to the buttons and counter values
const likeButton = document.getElementById('likeButton');
const dislikeButton = document.getElementById('dislikeButton');
const counterButton = document.getElementById('counterButton');
const resetButton = document.getElementById('resetButton');  // Reset button

const likeCountDisplay = document.getElementById('likeCount');
const dislikeCountDisplay = document.getElementById('dislikeCount');
const counterDisplay = document.getElementById('counterValue');

// Initialize counters from localStorage (or set to 0 if not available)
let likeCount = localStorage.getItem('likeCount') ? parseInt(localStorage.getItem('likeCount')) : 0;
let dislikeCount = localStorage.getItem('dislikeCount') ? parseInt(localStorage.getItem('dislikeCount')) : 0;
let counter = localStorage.getItem('counter') ? parseInt(localStorage.getItem('counter')) : 0;

// Display the current counter values
likeCountDisplay.textContent = likeCount;
dislikeCountDisplay.textContent = dislikeCount;
counterDisplay.textContent = counter;

// Function to increase the like counter
likeButton.addEventListener('click', function() {
    likeCount++;  // Increment the like counter
    likeCountDisplay.textContent = likeCount;  // Update the like counter on the page
    localStorage.setItem('likeCount', likeCount);  // Save the like counter to localStorage
});

// Function to increase the dislike counter
dislikeButton.addEventListener('click', function() {
    dislikeCount++;  // Increment the dislike counter
    dislikeCountDisplay.textContent = dislikeCount;  // Update the dislike counter on the page
    localStorage.setItem('dislikeCount', dislikeCount);  // Save the dislike counter to localStorage
});

// Function to increase the general counter
counterButton.addEventListener('click', function() {
    counter++;  // Increment the general counter
    counterDisplay.textContent = counter;  // Update the general counter on the page
    localStorage.setItem('counter', counter);  // Save the general counter to localStorage
});

// Function to reset the like and dislike counters
resetButton.addEventListener('click', function() {
    likeCount = 0;  // Reset the like counter
    dislikeCount = 0;  // Reset the dislike counter
    likeCountDisplay.textContent = likeCount;  // Update the display for likes
    dislikeCountDisplay.textContent = dislikeCount;  // Update the display for dislikes
    localStorage.removeItem('likeCount');  // Remove the like count from localStorage
    localStorage.removeItem('dislikeCount');  // Remove the dislike count from localStorage
});
