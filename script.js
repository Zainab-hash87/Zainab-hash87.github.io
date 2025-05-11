// Loader fade-out (optional future loader support)
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 600);
  }
});

// Typewriter delay for paragraphs
document.addEventListener('DOMContentLoaded', () => {
  const paragraphs = document.querySelectorAll('.content p');
  paragraphs.forEach((p, index) => {
    p.style.animationDelay = `${1 + index * 2.5}s`;
  });
});
