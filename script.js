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
