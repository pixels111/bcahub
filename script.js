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

/* ==========================================================
   GLOBAL API
========================================================== */

const API = "https://script.google.com/macros/s/AKfycbye0bNpmPZ6xAjygP5hkTERRJQKfoZqh2X6GiL8xD2MQbIbv0cQ8XQLjfkPPXtoK373sw/exec";

/* ==========================================================
   PART 1
   FILE TYPE DETECTION
========================================================== */

const FILE_EXT_GROUPS = {

    image: ["png","jpg","jpeg","gif","webp","svg","bmp"],
    video: ["mp4","mov","avi","mkv","webm"],
    audio: ["mp3","wav","ogg","m4a"]

};

function detectFileType(item){

    if(!item || typeof item !== "object"){

        return "unknown";

    }

    if(item.fileType){

        return String(item.fileType).toLowerCase();

    }

    if(item.type){

        return String(item.type).toLowerCase();

    }

    if(item.Type){

        return String(item.Type).toLowerCase();

    }

    const text = (
        (item.name || "") +
        " " +
        (item.Title || "") +
        " " +
        (item.link || "") +
        " " +
        (item.Link || "")
    ).toLowerCase();

    const ext = text.match(/\.([a-z0-9]{2,5})(?:[?"'\s]|$)/);

    if(ext){

        const value = ext[1];

        for(const group in FILE_EXT_GROUPS){

            if(FILE_EXT_GROUPS[group].includes(value)){

                return group;

            }

        }

        if([
            "pdf",
            "doc",
            "docx",
            "ppt",
            "pptx",
            "xls",
            "xlsx",
            "zip",
            "rar",
            "txt"
        ].includes(value)){

            return value;

        }

    }

    return "unknown";

}

/* ==========================================================
   FILE ICON STYLES
========================================================== */

let narGradCounter = 0;

const FILE_ICON_STYLES = {

    pdf:     {label:"PDF",bar:"#ee2b26"},
    doc:     {label:"DOC",bar:"#185ABD",bluePage:true},
    docx:    {label:"DOCX",bar:"#185ABD",bluePage:true},
    ppt:     {label:"PPT",bar:"#fb923c"},
    pptx:    {label:"PPTX",bar:"#fb923c"},
    xls:     {label:"XLS",bar:"#22c55e"},
    xlsx:    {label:"XLSX",bar:"#22c55e"},
    zip:     {label:"ZIP",bar:"#8a6ff0"},
    rar:     {label:"RAR",bar:"#8a6ff0"},
    txt:     {label:"TXT",bar:"#6b7280"},
    image:   {label:"IMG",bar:"#22d3ee"},
    video:   {label:"VID",bar:"#f472b6"},
    audio:   {label:"AUD",bar:"#60a5fa"},
    unknown: {label:"FILE",bar:"#9a9aa5"}

};
/* ==========================================================
   PART 2A
   SVG FILE ICON GENERATOR
========================================================== */

function createFileIconSvg(fileType){

    const style =
        FILE_ICON_STYLES[fileType] ||
        FILE_ICON_STYLES.unknown;

    let pageFill = "#f4f6fb";
    let foldFill = "#d8dde8";

    const labelY =
        style.label.length > 3 ? 163 : 168;

    const labelSize =
        style.label.length > 3 ? 32 : 42;

    if(style.bluePage){

        narGradCounter++;

        const gradId =
            "narDocGrad" + narGradCounter;

        pageFill = `url(#${gradId})`;

        foldFill = "#7cc4ff";

        return `

<svg
viewBox="0 0 200 220"
xmlns="http://www.w3.org/2000/svg"
preserveAspectRatio="xMidYMid meet">

<defs>

<linearGradient
id="${gradId}"
x1="0"
y1="0"
x2="0"
y2="1">

<stop offset="0%" stop-color="#2a9bf5"/>
<stop offset="100%" stop-color="#0d6fe0"/>

</linearGradient>

</defs>

<path
d="M20 14
C20 8.5 24.5 4 30 4
L128 4
L180 56
L180 206
C180 211.5 175.5 216 170 216
L30 216
C24.5 216 20 211.5 20 206Z"
fill="${pageFill}"/>

<path
d="M128 4
L180 56
L138 56
C132.5 56 128 51.5 128 46Z"
fill="${foldFill}"/>

<rect
x="46"
y="76"
width="86"
height="9"
rx="4.5"
fill="#b7bcc7"/>

<rect
x="46"
y="98"
width="70"
height="9"
rx="4.5"
fill="#b7bcc7"/>

<rect
x="14"
y="128"
width="172"
height="58"
rx="8"
fill="${style.bar}"/>

<text
x="100"
y="${labelY}"
text-anchor="middle"
font-family="Poppins,sans-serif"
font-size="${labelSize}"
font-weight="800"
fill="#ffffff">

${style.label}

</text>

</svg>

`;

    }

    return `

<svg
viewBox="0 0 200 220"
xmlns="http://www.w3.org/2000/svg"
preserveAspectRatio="xMidYMid meet">

<path
d="M20 14
C20 8.5 24.5 4 30 4
L128 4
L180 56
L180 206
C180 211.5 175.5 216 170 216
L30 216
C24.5 216 20 211.5 20 206Z"
fill="${pageFill}"/>

<path
d="M128 4
L180 56
L138 56
C132.5 56 128 51.5 128 46Z"
fill="${foldFill}"/>

<rect
x="46"
y="76"
width="86"
height="9"
rx="4.5"
fill="#b7bcc7"/>

<rect
x="46"
y="98"
width="70"
height="9"
rx="4.5"
fill="#b7bcc7"/>

<rect
x="14"
y="128"
width="172"
height="58"
rx="8"
fill="${style.bar}"/>

<text
x="100"
y="${labelY}"
text-anchor="middle"
font-family="Poppins,sans-serif"
font-size="${labelSize}"
font-weight="800"
fill="#ffffff">

${style.label}

</text>

</svg>

`;

}

/* ==========================================================
   PART 2B
   RESOURCE CARD
========================================================== */

function createResourceCard(resource){

    const fileType = detectFileType(resource);

    return `

<article class="nar-card">

    <div class="nar-thumb">

        ${createFileIconSvg(fileType)}

    </div>

    <div class="nar-body">

        <div class="nar-top">

            <div class="nar-heading">

                <h3 class="nar-title">

                    ${resource.Title || "Untitled Resource"}

                </h3>

                <p class="nar-type">

                    ${resource["Resource Type"] || "Resource"}

                </p>

            </div>

            <span class="nar-author">

                Uploaded by

                <strong>

                    ${resource["Upload By"] || "Unknown"}

                </strong>

            </span>

        </div>

        <div class="nar-info">

            <span>

                <i class="fas fa-graduation-cap"></i>

                ${resource.Semester || "-"}

            </span>

            <span>

                <i class="fas fa-file"></i>

                ${resource.Pages || "-"}

            </span>

            <span>

                <i class="fas fa-calendar"></i>

                ${resource.uploadDate || "-"}

            </span>

        </div>

        <a
            href="${resource.Link || "#"}"
            class="nar-button">

            <i class="fas fa-download"></i>

            Get Resource

        </a>

    </div>

</article>

`;

}

/* ==========================================================
   PART 3
   NEWLY ADDED RESOURCES MODAL
========================================================== */

async function openResourcesModal() {

    const modal = document.getElementById("nar-modal");
    const container = document.getElementById("nar-content");

    if (!modal || !container) {

        console.error("Newly Added Resources modal not found.");

        return;

    }

    modal.classList.add("show");
    document.body.style.overflow = "hidden";

    container.innerHTML = `

        <div class="nar-loading">

            <i class="fas fa-spinner fa-spin"></i>

            <h3>Checking for newly added resources...</h3>

            <p>Please wait while we fetch the latest uploads.</p>

        </div>

    `;

    try {

        const response = await fetch(
            `${API}?sheet=new-resource-list`
        );

        if (!response.ok) {

            throw new Error("Failed to fetch resources.");

        }

        const resources = await response.json();

        if (!Array.isArray(resources) || resources.length === 0) {

            container.innerHTML = `

                <div class="nar-empty">

                    <i class="fas fa-folder-open"></i>

                    <h3>You're all caught up!</h3>

                    <p>No new resources have been added yet.</p>

                </div>

            `;

            return;

        }

        let html = "";

        resources.forEach(resource => {

            html += createResourceCard(resource);

        });

        container.innerHTML = html;

        requestAnimationFrame(() => {

            document
                .querySelectorAll(".nar-card")
                .forEach((card, index) => {

                    card.style.animationDelay =
                        `${index * 60}ms`;

                });

        });

    }

    catch (error) {

        console.error(error);

        container.innerHTML = `

            <div class="nar-error">

                <i class="fas fa-exclamation-circle"></i>

                <h3>Unable to load resources</h3>

                <p>Please try again later.</p>

            </div>

        `;

    }

}

/* ==========================================================
   CLOSE MODAL
========================================================== */

function closeResourcesModal() {

    const modal = document.getElementById("nar-modal");

    if (!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";

}

/* ==========================================================
   MODAL EVENTS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("nar-modal");
    const closeBtn = document.getElementById("nar-close");

    if (!modal) return;

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeResourcesModal
        );

    }

    modal.addEventListener("click", e => {

        if (e.target === modal) {

            closeResourcesModal();

        }

    });

    document.addEventListener("keydown", e => {

        if (
            e.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeResourcesModal();

        }

    });

});

/* ==========================================================
   FOOTER
========================================================== */

const copyrightYear = document.getElementById("copyright-year");

if (copyrightYear) {

    copyrightYear.textContent = new Date().getFullYear();

}
