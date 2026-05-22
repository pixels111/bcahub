/* ── LOADER ── */
let p=0;
const lf=document.getElementById('lf'), lpt=document.getElementById('lp');
const iv=setInterval(()=>{
  p+=Math.random()*18+5;
  if(p>=100){ p=100; clearInterval(iv); setTimeout(()=>document.getElementById('loader').classList.add('done'),300); }
  lf.style.width=p+'%'; lpt.textContent=Math.floor(p)+'%';
},80);
 
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


