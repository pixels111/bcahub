
// LOADER
let p = 0;
const fill = document.getElementById('loaderFill');
const pct = document.getElementById('loaderPct');
const iv = setInterval(() => {
  p += Math.random() * 18 + 5;
  if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => document.getElementById('loader').classList.add('done'), 300); }
  fill.style.width = p + '%';
  pct.textContent = Math.floor(p) + '%';
}, 80);

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


/* =========================
   ANNOUNCEMENTS
========================= */

const announcements = [


{
  type:"image",
  badge:"APPVERSE",
  title:"New App Released",
  description:"Explore the latest AppVerse application added to BCAHub.",
  media:"pictures/rammagicsquarenotification.png",
  buttonText:"Explore App",
  buttonLink:"#rammagicsquare"
},


{
  type:"image",
  badge:"FEEDBACK",
  title:"Share Your Feedback",
  description:"Help improve BCAHub by submitting your feedback.",
  media:"pictures/social-preview.png",
  buttonText:"Give Feedback",
  buttonLink:"#feedback"
}

];

/* =========================
   ELEMENTS
========================= */

const hubMini =
document.getElementById("hubMini");

const hubPanel =
document.getElementById("hubPanel");

const hubImage =
document.getElementById("hubImage");

const hubVideo =
document.getElementById("hubVideo");
hubVideo.preload = "metadata";

const hubVideoSource =
document.getElementById("hubVideoSource");

const hubBadge =
document.getElementById("hubBadge");

const hubTitle =
document.getElementById("hubTitle");

const hubDescription =
document.getElementById("hubDescription");

const hubButton =
document.getElementById("hubButton");

const hubDots =
document.getElementById("hubDots");

renderAnnouncement(0);
createDots();

let currentAnnouncement = 0;

/* =========================
   SHUFFLE ORDER
========================= */

announcements.sort(
() => Math.random() - 0.5
);
announcements.forEach(item => {

  if(item.type === "image"){

    const img = new Image();

    img.src = item.media;
  }

  if(item.type === "video"){

    const video =
      document.createElement("video");

    video.preload = "auto";

    video.src = item.media;
  }

});
/* =========================
   RENDER
========================= */

function renderAnnouncement(index){

const item =
announcements[index];

hubBadge.textContent =
item.badge;

hubTitle.textContent =
item.title;

hubDescription.textContent =
item.description;

hubButton.textContent =
item.buttonText;

hubButton.href =
item.buttonLink;

/* MEDIA */

hubImage.style.display =
"none";

hubVideo.style.display =
"none";

hubVideo.pause();

if(item.type === "image"){

hubImage.src =
item.media;

hubImage.style.display =
"block";

}

if(item.type === "video"){

  if(hubVideoSource.src !== item.media){

    hubVideoSource.src = item.media;

  }

  hubVideo.style.display = "block";

  hubVideo.play().catch(()=>{});

}
/* DOTS */

document
.querySelectorAll(
".hub-dot"
)
.forEach((dot,i)=>{

dot.classList.toggle(
"active",
i===index
);

});

}

/* =========================
   CREATE DOTS
========================= */

function createDots(){

hubDots.innerHTML = "";

announcements.forEach(
(_,i)=>{

const dot =
document.createElement(
"div"
);

dot.className =
"hub-dot";

if(i===0)
dot.classList.add(
"active"
);

dot.onclick = ()=>{

currentAnnouncement =
i;

renderAnnouncement(
currentAnnouncement
);

};

hubDots.appendChild(
dot
);

});

}

/* =========================
   NEXT
========================= */

function nextAnnouncement(){

currentAnnouncement++;

if(
currentAnnouncement >=
announcements.length
){

currentAnnouncement = 0;

}

renderAnnouncement(
currentAnnouncement
);

}

/* =========================
   PREV
========================= */

function prevAnnouncement(){

currentAnnouncement--;

if(
currentAnnouncement < 0
){

currentAnnouncement =
announcements.length - 1;

}

renderAnnouncement(
currentAnnouncement
);

}

/* =========================
   BUTTONS
========================= */

document
.getElementById(
"hubNext"
)
.onclick =
nextAnnouncement;

document
.getElementById(
"hubPrev"
)
.onclick =
prevAnnouncement;

/* =========================
   OPEN PANEL
========================= */

hubMini.onclick = ()=>{

  hubMini.style.display = "none";

  hubPanel.classList.add("open");

};
/* =========================
   MINIMIZE
========================= */

document
.getElementById("hubMinimize")
.onclick = ()=>{

  hubPanel.classList.remove("open");

  hubMini.style.display = "flex";

};

/* =========================
   CLOSE
========================= */

document
.getElementById(
"hubClose"
)
.onclick = ()=>{

const hideToday =
document.getElementById(
"hubHideToday"
).checked;

if(hideToday){

const tomorrow =
Date.now() +
86400000;

localStorage.setItem(
"hubHideUntil",
tomorrow
);

}

document
.getElementById(
"hubNotify"
)
.style.display =
"none";

};

/* =========================
   SHOW RULES
========================= */

function shouldShow(){

const hideUntil =
localStorage.getItem(
"hubHideUntil"
);

if(
hideUntil &&
Date.now() <
Number(hideUntil)
){

return false;

}

return true;

}

/* =========================
   VISIT DELAY
========================= */

function getDelay(){

const visited =
localStorage.getItem(
"hubVisited"
);

if(!visited){

localStorage.setItem(
"hubVisited",
"true"
);

return 30000;
}

return 10000;

}

/* =========================
   AUTO ROTATE
========================= */

setInterval(()=>{

nextAnnouncement();

},8000);

/* =========================
   INIT
========================= */

if(shouldShow()){

setTimeout(()=>{

document
.getElementById(
"hubNotify"
)
.style.display =
"block";
},getDelay());

}
/* =========================
   TOUCH SWIPE SUPPORT
========================= */

let touchStartX = 0;
let touchEndX = 0;

hubPanel.addEventListener(
  "touchstart",
  (e) => {

    touchStartX =
      e.changedTouches[0].screenX;

  },
  { passive:true }
);

hubPanel.addEventListener(
  "touchend",
  (e) => {

    touchEndX =
      e.changedTouches[0].screenX;

    handleSwipe();

  },
  { passive:true }
);

function handleSwipe(){

  const distance =
    touchStartX - touchEndX;

  /* LEFT SWIPE */

  if(distance > 50){

    nextAnnouncement();

  }

  /* RIGHT SWIPE */

  if(distance < -50){

    prevAnnouncement();

  }

}
/* =========================
   MINIMIZE ON CTA CLICK
========================= */

hubButton.addEventListener(
  "click",
  () => {

    hubPanel.classList.remove(
      "open"
    );

    hubMini.style.display =
      "flex";

  }
);