// Get references to the button and the counter value
const button = document.getElementById('counterButton');
const counterDisplay = document.getElementById('counterValue');

// Initialize the counter value
let counter = 0;

// Function to increase the counter
button.addEventListener('click', function() {
    counter++;  // Increment the counter
    counterDisplay.textContent = counter;  // Update the counter on the page
});
