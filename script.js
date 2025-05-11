// Loader fade-out
window.addEventListener("load", () => {
  document.getElementById("loader").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 600);
});

// Parallax scroll effect for background video
window.addEventListener("scroll", () => {
  const bg = document.getElementById("bg-video");
  const offset = window.pageYOffset;
  bg.style.transform = `translateY(${offset * 0.3}px)`;
});
