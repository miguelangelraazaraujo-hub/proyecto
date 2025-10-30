document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('artist-gallery');
    const images = gallery.querySelectorAll('.gallery-image');
    let currentIndex = 0;

    // Function to show the actual image
    function showImage(index) {
        // Hide every image
        images.forEach(img => img.style.opacity = '0');

        // display original image
        images[index].style.opacity = '1';
    }

    // Change every 15 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length; // Looping
        showImage(currentIndex);
    }, 10000); // 10 seconds
});