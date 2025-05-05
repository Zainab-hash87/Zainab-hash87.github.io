// Optional 3D hover effect
const hero = document.querySelector('.hero');

hero.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth - e.pageX * 2) / 90;
  const y = (window.innerHeight - e.pageY * 2) / 90;
  hero.style.transform = `translate(-50%, -50%) rotateX(${y}deg) rotateY(${x}deg)`;
});

hero.addEventListener('mouseleave', () => {
  hero.style.transform = 'translate(-50%, -50%) rotateX(0deg) rotateY(0deg)';
});
