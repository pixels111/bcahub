let p=0;const lf=document.getElementById('lf'),lpt=document.getElementById('lp');
const iv=setInterval(()=>{p+=Math.random()*18+5;if(p>=100){p=100;clearInterval(iv);setTimeout(()=>document.getElementById('loader').classList.add('done'),300);}lf.style.width=p+'%';lpt.textContent=Math.floor(p)+'%';},80);
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',scrollY>40));
const burger=document.getElementById('burger'),mNav=document.getElementById('mobileNav');
burger.addEventListener('click',()=>{burger.classList.toggle('open');mNav.classList.toggle('open');});
function closeMobile(){burger.classList.remove('open');mNav.classList.remove('open');}
const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');obs.unobserve(x.target);}}),{threshold:.08});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>obs.observe(el));
// Count-up
const co=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){
  const el=x.target,tgt=+el.dataset.count;let n=0;const step=Math.max(1,Math.ceil(tgt/60));
  const iv=setInterval(()=>{n=Math.min(n+step,tgt);el.textContent=n+(tgt>=2025?'':'+');if(n>=tgt)clearInterval(iv);},28);
  co.unobserve(el);
}}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

//website updates - commit count and last updated date
  const repoOwner = 'pixels111';
  const repoName = 'bcahub';

  // Step 1: Get the default branch
  fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`)
    .then(res => res.json())
    .then(repo => {
      const branch = repo.default_branch;

      // Step 2: Fetch 1 commit and extract total count from the Link header
      return fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=1&sha=${branch}`)
        .then(response => {
          const linkHeader = response.headers.get('Link');
          let totalCommits = 'Unknown';

          if (linkHeader && linkHeader.includes('rel="last"')) {
            const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
            if (match) {
              totalCommits = match[1];
            }
          } else {
            // No pagination, probably < 30 commits
            totalCommits = '30 or fewer';
          }

          document.getElementById('commit-count').textContent = `${totalCommits} updates`;

          // Step 3: Still get the latest commit date
          return response.json();
        });
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const lastDate = new Date(data[0].commit.committer.date);
        document.getElementById('last-updated-date').textContent =
          lastDate.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('commit-count').textContent = 'Unavailable';
      document.getElementById('last-updated-date').textContent = 'Unavailable';
    });

