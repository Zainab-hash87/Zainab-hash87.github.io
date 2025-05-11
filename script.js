// Loader fade-out
window.addEventListener("load", () => {
  document.getElementById("loader").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 600);
});

// Typing animation effect (for the content paragraphs)
document.addEventListener('DOMContentLoaded', function () {
  const paragraphs = document.querySelectorAll('.content p');
  paragraphs.forEach((paragraph, index) => {
    paragraph.style.animationDelay = `${index * 3}s`; // Adjust timing for each paragraph
  });
});
