// Fade-in animation on load
document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  content.classList.add("show");
});

// Parallax scroll effect
window.addEventListener("scroll", () => {
  const bg = document.body;
  const offset = window.pageYOffset;
  bg.style.backgroundPositionY = offset * 0.4 + "px";
});







document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });

  // Optional: Parallax effect for background
  window.addEventListener("scroll", () => {
    document.body.style.backgroundPositionY = window.scrollY * 0.4 + "px";
  });
});
