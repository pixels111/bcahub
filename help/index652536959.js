
let p=0;const lf=document.getElementById('lf'),lpt=document.getElementById('lp');
const iv=setInterval(()=>{p+=Math.random()*18+5;if(p>=100){p=100;clearInterval(iv);setTimeout(()=>document.getElementById('loader').classList.add('done'),300);}lf.style.width=p+'%';lpt.textContent=Math.floor(p)+'%';},80);
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>40));
const burger=document.getElementById('burger'),mNav=document.getElementById('mobileNav');
burger.addEventListener('click',()=>{burger.classList.toggle('open');mNav.classList.toggle('open');});
function closeMobile(){burger.classList.remove('open');mNav.classList.remove('open');}
const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');obs.unobserve(x.target);}}),{threshold:.08});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>obs.observe(el));

// FAQ toggle with aria attributes
function toggleFAQ(btn){
  const item=btn.closest('.faq-item'),ans=item.querySelector('.faq-a'),open=btn.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(q=>{q.classList.remove('open');q.setAttribute('aria-expanded','false');q.nextElementSibling.classList.remove('open');});
  if(!open){btn.classList.add('open');btn.setAttribute('aria-expanded','true');ans.classList.add('open');}
}

// Setup aria-controls for all FAQ questions
document.querySelectorAll('.faq-q').forEach((btn,i)=>{
  if(!btn.id) btn.id='faq-q'+(i+1);
  btn.setAttribute('aria-expanded','false');
  const ans=btn.closest('.faq-item').querySelector('.faq-a');
  if(ans){
    const answerId=btn.id+'-a';
    ans.id=answerId;
    btn.setAttribute('aria-controls',answerId);
  }
});

// Perfect smooth scroll solution
function setupPerfectSmoothScroll(){
  let isProgrammaticNavigation=false;
  let lastProcessedHash='';
  const scrollOffset=20; // Small spacing below header for better readability
  const navLinks=document.querySelectorAll('a[href^="#"]');
  
  function perfectScrollTo(targetEl){
    if(!targetEl)return;
    const header=document.querySelector('nav#nav');
    const headerHeight=header?header.offsetHeight:70;
    const elementPosition=targetEl.getBoundingClientRect().top;
    const offsetPosition=elementPosition+window.pageYOffset-headerHeight-scrollOffset;
    window.scrollTo({top:offsetPosition,behavior:'smooth'});
  }
  
  function highlightElement(targetEl){
    targetEl.classList.add('section-highlight');
    setTimeout(()=>{targetEl.classList.remove('section-highlight');},1500);
  }
  
  function openFAQIfNeeded(hash){
    const btn=document.getElementById(hash);
    if(btn&&btn.classList.contains('faq-q')&&!btn.classList.contains('open')){
      btn.click();
    }
  }
  
  navLinks.forEach(link=>{
    link.addEventListener('click',function(e){
      const targetId=this.getAttribute('href').slice(1);
      const targetEl=document.getElementById(targetId);
      if(targetEl){
        e.preventDefault();
        isProgrammaticNavigation=true;
        lastProcessedHash=targetId;
        openFAQIfNeeded(targetId);
        setTimeout(()=>{perfectScrollTo(targetEl);highlightElement(targetEl);},100);
        history.replaceState(null,null,'#'+targetId);
      }
    });
  });
  
  function processInitialHash(){
    const hash=window.location.hash.slice(1);
    if(hash&&hash!==lastProcessedHash){
      const targetEl=document.getElementById(hash);
      if(targetEl){
        isProgrammaticNavigation=true;
        lastProcessedHash=hash;
        openFAQIfNeeded(hash);
        setTimeout(()=>{perfectScrollTo(targetEl);highlightElement(targetEl);},50);
      }
    }
  }
  
  window.addEventListener('hashchange',()=>{
    const hash=window.location.hash.slice(1);
    if(isProgrammaticNavigation){isProgrammaticNavigation=false;return;}
    if(hash&&hash!==lastProcessedHash){
      const targetEl=document.getElementById(hash);
      if(targetEl){
        lastProcessedHash=hash;
        openFAQIfNeeded(hash);
        setTimeout(()=>{perfectScrollTo(targetEl);highlightElement(targetEl);},50);
      }
    }
  });
  
  window.addEventListener('load',processInitialHash);
  window.addEventListener('DOMContentLoaded',processInitialHash);
}

document.addEventListener('DOMContentLoaded',setupPerfectSmoothScroll);