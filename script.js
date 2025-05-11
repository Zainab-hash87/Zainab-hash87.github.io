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










//2nd page code 
// Zodiac sign calculation
function calculateZodiac() {
  const name = document.getElementById("name").value.trim();
  const birthdate = new Date(document.getElementById("birthdate").value);
  const resultDiv = document.getElementById("result");

  if (!name || isNaN(birthdate.getTime())) {
    resultDiv.innerHTML = `<p>Please enter both your name and birthdate 🌟</p>`;
    resultDiv.className = "result show";
    return;
  }

  const day = birthdate.getDate();
  const month = birthdate.getMonth() + 1;

  let zodiac = "";

  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) zodiac = "Aquarius ♒";
  else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) zodiac = "Pisces ♓";
  else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) zodiac = "Aries ♈";
  else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) zodiac = "Taurus ♉";
  else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) zodiac = "Gemini ♊";
  else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) zodiac = "Cancer ♋";
  else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) zodiac = "Leo ♌";
  else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) zodiac = "Virgo ♍";
  else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) zodiac = "Libra ♎";
  else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) zodiac = "Scorpio ♏";
  else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) zodiac = "Sagittarius ♐";
  else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) zodiac = "Capricorn ♑";

  // Add animation class
  resultDiv.innerHTML = `
    <div class="zodiac-animation">
      <p>Hey <strong>${name}</strong>! 🌌</p>
      <p>Your zodiac sign is: <strong>${zodiac}</strong></p>
    </div>
  `;

  resultDiv.classList.add("show");
}
