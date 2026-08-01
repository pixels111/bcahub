const startYear = 2025;
const currentYear = new Date().getFullYear();

document.getElementById("copyright-year").textContent =
    startYear === currentYear ? startYear : `${startYear}–${currentYear}`;