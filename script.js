
// NAV
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));

// HAMBURGER
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => { burger.classList.toggle('open'); mobileNav.classList.toggle('open'); });
function closeMobile() { burger.classList.remove('open'); mobileNav.classList.remove('open'); }

// REVEAL
const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } }), { threshold: 0.1 });
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => obs.observe(el));

// STAGGER
document.querySelectorAll('.features-grid .card, .apps-grid .card, .explore-grid .card').forEach((el,i) => { el.style.transitionDelay = (i * 0.07) + 's'; });

// STARS
let rating = 0;
const stars = document.querySelectorAll('.star'); 
stars.forEach(s => {
  s.addEventListener('mouseover', () => stars.forEach(st => st.classList.toggle('lit', st.dataset.v <= s.dataset.v)));
  s.addEventListener('mouseout', () => stars.forEach(st => st.classList.toggle('lit', st.dataset.v <= rating)));
  s.addEventListener('click', () => { rating = s.dataset.v; document.getElementById('ratingLabel').textContent = ['','⭐ Poor','⭐⭐ Fair','⭐⭐⭐ Good','⭐⭐⭐⭐ Great','⭐⭐⭐⭐⭐ Excellent!'][rating]; });
});

/* =========================
   FEEDBACK FORM SYSTEM
========================= */

const API_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwsDfqSsTPqzPSnDuJi7TGuCF_PRZUvYC1FlCKRCm46PFjNkk_cvP2Df8XxIuXmfua-/exec";

const ratingLabel = document.getElementById("ratingLabel");

const nameInput = document.getElementById("name-input");
const feedbackInput = document.getElementById("feedback-input");
const approveCheckbox = document.getElementById("approve-checkbox");

const feedbackContainer = document.getElementById("feedbackContainer");

const successBox = document.getElementById("fbSuccess");

let selectedRating = 0;
let feedbackList = [];

/* =========================
   STAR RATING
========================= */

const ratingTexts = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent"
};

stars.forEach((star) => {

  star.addEventListener("click", () => {

    selectedRating = Number(star.dataset.v);

    stars.forEach((s, i) => {

      if (i < selectedRating) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }

    });

    ratingLabel.textContent = ratingTexts[selectedRating];

  });

});

/* =========================
   ESCAPE HTML
========================= */

function escapeHtml(text) {

  if (!text) return "";

  return text.replace(/[&<>"']/g, function (m) {

    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[m];

  });

}

/* =========================
   LOAD FEEDBACK
========================= */

async function loadFeedback() {

  const loader =
    document.getElementById("feedbackLoading");

  const container =
    document.getElementById("feedbackContainer");

  try {

    /* SHOW LOADER */

    loader.style.display = "flex";

    container.style.display = "none";

    const res =
      await fetch(
        `${API_ENDPOINT}?action=get`
      );

    if (!res.ok)
      throw new Error("Failed");

    const data =
      await res.json();

    feedbackList =
      data.filter(
        f => f.approved === true
      );

    renderFeedback();

    /* HIDE LOADER */

    loader.style.display = "none";

    container.style.display = "flex";

  } catch (err) {

    console.error(err);

    loader.innerHTML = `

      <p style="
        color:#ef4444;
        text-align:center;
      ">
        Failed to load feedback
      </p>

    `;

  }

}

/* =========================
   RENDER FEEDBACK
========================= */

function renderFeedback() {

  if (!feedbackContainer) return;

  feedbackContainer.innerHTML = "";

  if (!feedbackList.length) {

    feedbackContainer.innerHTML =
      "<p>No feedback available.</p>";

    return;
  }

  const reversed =
    [...feedbackList].reverse();

  /* GROUP INTO 3 */

  for (let i = 0; i < reversed.length; i += 3) {

    const group =
      reversed.slice(i, i + 3);

    const column =
      document.createElement("div");

    column.className = "feedback-column";

    group.forEach((f) => {

      const initials =
        f.name.charAt(0).toUpperCase();

      const starsHtml =
        "★".repeat(f.rating) +
        "☆".repeat(5 - f.rating);

      const card =
        document.createElement("div");

      card.className = "feedback-card";

      card.innerHTML = `

        <div style="
          display:flex;
          align-items:center;
          gap:.75rem;
          margin-bottom:.75rem;
        ">

          <div style="
            width:40px;
            height:40px;
            border-radius:50%;
            background:
            linear-gradient(
              135deg,
              var(--blue),
              var(--cyan)
            );

            display:flex;
            align-items:center;
            justify-content:center;

            color:#fff;
            font-weight:700;
          ">
            ${initials}
          </div>

          <div>

            <div style="
              font-weight:600;
              font-size:.9rem;
            ">
              ${escapeHtml(f.name)}
            </div>

            <div style="
              color:#fbbf24;
              font-size:.8rem;
            ">
              ${starsHtml}
            </div>

          </div>

        </div>

        <p style="
          color:var(--muted2);
          line-height:1.7;
          font-size:.88rem;
        ">
          ${escapeHtml(f.feedback)}
        </p>

      `;

      column.appendChild(card);

    });

    feedbackContainer.appendChild(column);

  }

  setupFeedbackSlider();

}

/* =========================
   setupFeedbackSlider
========================= */

function setupFeedbackSlider() {

  const container =
    document.getElementById("feedbackContainer");

  const prev =
    document.getElementById("prevFeedback");


  const next =
    document.getElementById("nextFeedback");

  const end =
    document.getElementById("feedbackEnd");

  if (!container) return;

  function slideWidth() {

    const slide =
      container.querySelector(".feedback-column");

    if (!slide) return 300;

    return slide.offsetWidth + 16;

  }

  next.onclick = () => {

    container.scrollBy({
      left:slideWidth(),
      behavior:"smooth"
    });

  };

  prev.onclick = () => {

    container.scrollBy({
      left:-slideWidth(),
      behavior:"smooth"
    });

  };

  container.addEventListener("scroll", () => {

    const reachedEnd =

      container.scrollLeft +
      container.clientWidth >=
      container.scrollWidth - 5;

    if (reachedEnd) {

      end.style.display = "block";

    } else {

      end.style.display = "none";

    }

  });

}

/* =========================
   SUBMIT FEEDBACK
========================= */

async function submitFeedback() {

  const name = nameInput.value.trim();

  const feedback = feedbackInput.value.trim();

  const approved = approveCheckbox.checked;

  if (!selectedRating) {
    alert("Please select rating");
    return;
  }

  if (name.length < 2) {
    alert("Please enter valid name");
    return;
  }

  if (!feedback) {
    alert("Please enter feedback");
    return;
  }

  if (!approved) {
    alert("Please approve public display");
    return;
  }

  const btn = document.querySelector(".btn-primary");

  btn.disabled = true;

  btn.innerHTML = "Submitting...";

  try {

    const formData = new URLSearchParams();

    formData.append("name", name);
    formData.append("rating", selectedRating);
    formData.append("feedback", feedback);
    formData.append("approved", "true");

    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Submit failed");

   successBox.style.display = "block";

setTimeout(() => {

  successBox.style.display = "none";

}, 4000);

    nameInput.value = "";
    feedbackInput.value = "";
    approveCheckbox.checked = false;

    selectedRating = 0;

    stars.forEach((s) => s.classList.remove("active"));

    ratingLabel.textContent = "Click to rate";

    await loadFeedback();

  } catch (err) {

    console.error(err);

    alert("Failed to submit feedback");

  }

  btn.disabled = false;

  btn.innerHTML =
    '<i class="fas fa-paper-plane"></i> Submit Feedback';

}

/* =========================
   INIT
========================= */

loadFeedback();

const cycleText = document.querySelector(".cycle-text");

if(cycleText){

  const words = [
    "Resources",
    "Content",
    "Website",
    "AppVerse"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect(){

    const currentWord = words[wordIndex];

    if(!deleting){

      cycleText.textContent =
        currentWord.substring(0, charIndex + 1) + "|";

      charIndex++;

      if(charIndex === currentWord.length){

        blinkCursor(() => {

          deleting = true;
          typeEffect();

        });

        return;
      }

    }else{

      cycleText.textContent =
        currentWord.substring(0, charIndex - 1) + "|";

      charIndex--;

      if(charIndex === 0){

        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

    }

    setTimeout(
      typeEffect,
      deleting ? 35 : 120
    );
  }

  function blinkCursor(callback){

    let count = 0;

    const blink = setInterval(() => {

      cycleText.textContent =
        count % 2 === 0
          ? words[wordIndex]
          : words[wordIndex] + "|";

      count++;

      if(count === 6){

        clearInterval(blink);
        callback();

      }

    }, 250);

  }

  typeEffect();

}