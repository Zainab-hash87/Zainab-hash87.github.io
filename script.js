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
  const calculateBtn = document.getElementById("calculate-btn");
  const dobInput = document.getElementById("dob");
  const zodiacSignElement = document.getElementById("zodiac-sign");
  const resultSection = document.getElementById("result-section");

  const zodiacSigns = [
    { sign: "Aries", start: "03-21", end: "04-19" },
    { sign: "Taurus", start: "04-20", end: "05-20" },
    { sign: "Gemini", start: "05-21", end: "06-20" },
    { sign: "Cancer", start: "06-21", end: "07-22" },
    { sign: "Leo", start: "07-23", end: "08-22" },
    { sign: "Virgo", start: "08-23", end: "09-22" },
    { sign: "Libra", start: "09-23", end: "10-22" },
    { sign: "Scorpio", start: "10-23", end: "11-21" },
    { sign: "Sagittarius", start: "11-22", end: "12-21" },
    { sign: "Capricorn", start: "12-22", end: "01-19" },
    { sign: "Aquarius", start: "01-20", end: "02-18" },
    { sign: "Pisces", start: "02-19", end: "03-20" },
  ];

  function getZodiacSign(dob) {
    const date = new Date(dob);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    for (let i = 0; i < zodiacSigns.length; i++) {
      const sign = zodiacSigns[i];
      if (isBetween(dateString, sign.start, sign.end)) {
        return sign.sign;
      }
    }
    return "Unknown"; // Default if no match
  }

  function isBetween(dateString, start, end) {
    if (start <= end) {
      return dateString >= start && dateString <= end;
    } else {
      return dateString >= start || dateString <= end;
    }
  }

  calculateBtn.addEventListener("click", () => {
    const dob = dobInput.value;
    if (dob) {
      const zodiacSign = getZodiacSign(dob);
      zodiacSignElement.textContent = zodiacSign;
      resultSection.style.opacity = 1; // Show result after calculation
    }
  });
});
