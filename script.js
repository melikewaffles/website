// Get references to the button and the GIF image
const showGifButton = document.getElementById('showGifButton');
const idiotGif = document.getElementById('idiotGif');

// Add an event listener to the button
showGifButton.addEventListener('click', function() {
    // Show the GIF when the button is clicked
    idiotGif.style.display = 'block';  // Make the GIF visible
});
