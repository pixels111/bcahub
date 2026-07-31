/* ── NAV SCROLL ── */
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>40));

/* ── HAMBURGER ── */
const burger=document.getElementById('burger'), mNav=document.getElementById('mobileNav');
burger.addEventListener('click',()=>{ burger.classList.toggle('open'); mNav.classList.toggle('open'); });
function closeMobile(){ burger.classList.remove('open'); mNav.classList.remove('open'); }

/* ── REVEAL ON SCROLL ── */
const obs=new IntersectionObserver(e=>e.forEach(x=>{
  if(x.isIntersecting){ x.target.classList.add('on'); obs.unobserve(x.target); }
}),{threshold:0.08});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>obs.observe(el));


