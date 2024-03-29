const btn = document.querySelector('button.mobile-menu-button');
const menu = document.querySelector('.mobile-menu');

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});
/**
 * showSlides() displays a slideshow by looping through an array of slide elements
 * and displaying one slide at a time. It sets the display to 'none' for all slides,
 * increments the slideIndex, wraps around when reaching the end, displays the current
 * slide, and calls itself again after 2 seconds using setTimeout().
 */
let slideIndex = 0;
// showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

