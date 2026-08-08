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

/* marquee controller */
(function () {
    "use strict";

    var API_URL =
        "https://script.google.com/macros/s/AKfycbywaNi6QZqgRTJztV3MkqD8Aa5eabhFNDfCh6dMoXrDT58VavKKqz8E9HuM_2DfZLwodQ/exec";

    var FALLBACK_MESSAGE = "For Students, By Students — BCAHub";
    var PX_PER_SECOND = 35;   // 25–45 target
    var MIN_DURATION = 8;     // seconds, so short text never "races"
    var MAX_DURATION = 60;    // seconds, so long text never "crawls" forever

    var viewport = document.getElementById("heroBadgeMarqueeViewport");
    var track = document.getElementById("heroBadgeMarquee");
    var groupA = document.getElementById("badgeMarqueeGroupA");
    var groupB = document.getElementById("badgeMarqueeGroupB");

    if (!viewport || !track || !groupA || !groupB) return;

    function isSafeUrl(url) {
        if (typeof url !== "string") return false;
        var trimmed = url.trim();
        return /^https:\/\//i.test(trimmed) || /^http:\/\//i.test(trimmed);
    }

    function buildItemNode(text, link) {
        var node;
        if (link && isSafeUrl(link)) {
            node = document.createElement("a");
            node.href = link;
        } else {
            node = document.createElement("span");
        }
        node.className = "badge-marquee-item";
        node.textContent = text; // safe: textContent, never innerHTML
        return node;
    }

    function buildSeparator() {
        var sep = document.createElement("span");
        sep.className = "badge-marquee-sep";
        sep.setAttribute("aria-hidden", "true");
        sep.textContent = "|";
        return sep;
    }

    function populateGroup(container, messages, hidden) {
        container.innerHTML = "";
        messages.forEach(function (m) {
            var item = buildItemNode(m.text, m.link);
            if (hidden) {
                item.setAttribute("aria-hidden", "true");
                if (item.tagName === "A") item.tabIndex = -1;
            }
            container.appendChild(item);
            container.appendChild(buildSeparator());
        });
    }

    function recalcDuration() {
        // Width of ONE group (they're identical) drives speed,
        // so short and long content both move at constant px/sec.
        var width = groupA.getBoundingClientRect().width;
        if (!width) return;
        var duration = width / PX_PER_SECOND;
        duration = Math.max(MIN_DURATION, Math.min(MAX_DURATION, duration));
        track.style.setProperty("--marquee-duration", duration.toFixed(2) + "s");
    }

    function renderMessages(messages) {
        populateGroup(groupA, messages, false);
        populateGroup(groupB, messages, true);
        // wait a frame so layout is committed before measuring
        requestAnimationFrame(function () {
            requestAnimationFrame(recalcDuration);
        });
    }

    function setPaused(paused) {
        track.classList.toggle("is-paused", paused);
    }

    // Hover / focus pause — animation-play-state preserves exact position natively
    viewport.addEventListener("mouseenter", function () { setPaused(true); });
    viewport.addEventListener("mouseleave", function () { setPaused(false); });
    viewport.addEventListener("focusin", function () { setPaused(true); });
    viewport.addEventListener("focusout", function () { setPaused(false); });

    // Recompute speed on resize / font load so pacing stays correct
    var resizeTimer;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(recalcDuration, 150);
    });
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(recalcDuration).catch(function () {});
    }

    // Initial state: fallback already in the DOM (server-rendered) and
    // visible immediately. Just make sure its duration is computed.
    requestAnimationFrame(function () {
        requestAnimationFrame(recalcDuration);
    });

    // Fetch real messages; on any failure, silently keep the fallback.
    fetch(API_URL + "?sheet=hero-badge", { method: "GET", cache: "no-store" })
        .then(function (res) {
            if (!res.ok) throw new Error("bad status");
            return res.json();
        })
        .then(function (data) {
            if (!Array.isArray(data)) throw new Error("bad payload");

            var messages = data
                .map(function (row) {
                    if (!row || typeof row.Message !== "string") return null;
                    var text = row.Message.trim();
                    if (!text) return null;
                    var link =
                        typeof row.Link === "string" ? row.Link.trim() : "";
                    return { text: text, link: link };
                })
                .filter(Boolean);

            if (messages.length === 0) {
                throw new Error("no valid messages");
            }

            renderMessages(messages);
        })
        .catch(function () {
            // API failed or returned nothing usable — fallback stays as-is.
            // No error shown to the user.
        });
})();

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

/* ==========================================================
   FOOTER
========================================================== */

const copyrightYear = document.getElementById("copyright-year");

if (copyrightYear) {

    copyrightYear.textContent = new Date().getFullYear();

}
