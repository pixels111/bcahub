let p=0;const lf=document.getElementById('lf'),lpt=document.getElementById('lp');
const iv=setInterval(()=>{p+=Math.random()*18+5;if(p>=100){p=100;clearInterval(iv);setTimeout(()=>document.getElementById('loader').classList.add('done'),300);}lf.style.width=p+'%';lpt.textContent=Math.floor(p)+'%';},80);
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>40));
const burger=document.getElementById('burger'),mNav=document.getElementById('mobileNav');
burger.addEventListener('click',()=>{burger.classList.toggle('open');mNav.classList.toggle('open');});
function closeMobile(){burger.classList.remove('open');mNav.classList.remove('open');}
const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');obs.unobserve(x.target);}}),{threshold:.08});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>obs.observe(el));
// Active TOC
const sections=document.querySelectorAll('.legal-section');
window.addEventListener('scroll',()=>{
  sections.forEach(s=>{
    const r=s.getBoundingClientRect();
    const link=document.querySelector('.toc-list a[href="#'+s.id+'"]');
    if(link) link.classList.toggle('active',r.top<=120&&r.bottom>120);
  });
},{passive:true});
