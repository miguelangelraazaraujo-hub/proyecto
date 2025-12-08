document.addEventListener('DOMContentLoaded', function () {
  const GALLERY = document.getElementById('artist-gallery');
  const IMAGES = GALLERY.querySelectorAll('.gallery-image');
  let currentIndex = 0;

  // Function to show the actual image
  function showImage(index) {
    // Hide every image
    IMAGES.forEach(img => img.style.opacity = '0');

    // display original image
    IMAGES[index].style.opacity = '1';
  }

  // Change every 15 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % IMAGES.length; // Looping
    showImage(currentIndex);
  }, 6000); // 6 seconds
});