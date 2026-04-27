
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

// FEEDBACK
function submitFeedback() {
  if (!rating) { alert('Please select a rating first!'); return; }
  document.getElementById('fbSuccess').style.display = 'block';
  document.getElementById('fbName').value = '';
  document.getElementById('fbText').value = '';
  rating = 0;
  stars.forEach(s => s.classList.remove('lit'));
  document.getElementById('ratingLabel').textContent = 'Click to rate';
}
