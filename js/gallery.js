document.addEventListener('DOMContentLoaded', function () {
  const Gallery = document.getElementById('artist-gallery');
  const Images = Gallery.querySelectorAll('.gallery-image');
  let currentIndex = 0;

  // Function to show the actual image
  function showImage(index) {
    // Hide every image
    Images.forEach(img => img.style.opacity = '0');

    // display original image
    Images[index].style.opacity = '1';
  }

  // Change every 15 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % Images.length; // Looping
    showImage(currentIndex);
  }, 6000); // 6 seconds
});