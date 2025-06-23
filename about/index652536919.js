document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('nav ul a'); // Select all menu links
    // Highlight the active menu item based on the current URL
    menuLinks.forEach(link => {
      if (link.href === window.location.href) {
        link.classList.add('active'); // Add 'active' class to the matching link
      } else {
        link.classList.remove('active'); // Remove 'active' class from non-matching links
      }
    });
  });
  function showSidebar(){
    document.querySelector('.sidebar').classList.add('active');
    document.querySelector('.socials-container').style.display = 'none';
  }
  function hideSidebar(){
    document.querySelector('.sidebar').classList.remove('active');
    document.querySelector('.socials-container').style.display = 'flex';
  }

  
// Live Clock
function updateClock() {
  const now = new Date();
  const options = {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true
  };
  document.getElementById('current-time').textContent = now.toLocaleString('en-IN', options);
}
setInterval(updateClock, 1000);
updateClock();


  const repoOwner = 'sethu369';
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
    // Perfect smooth scroll solution with refresh protection
function setupPerfectSmoothScroll() {
  let isProgrammaticNavigation = false;
  let lastProcessedHash = '';
  const scrollOffset = 20; // Small offset from top

  // Get all navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  // Scroll to element with perfect positioning
  function perfectScrollTo(targetEl) {
    if (!targetEl) return;
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const elementPosition = targetEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - scrollOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // Highlight element
  function highlightElement(targetEl) {
    targetEl.classList.add('section-highlight');
    setTimeout(() => {
      targetEl.classList.remove('section-highlight');
    }, 1500);
  }

  // Handle link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      
      if (targetEl) {
        e.preventDefault();
        isProgrammaticNavigation = true;
        lastProcessedHash = targetId;
        
        perfectScrollTo(targetEl);
        highlightElement(targetEl);
        
        // Update URL without adding to history
        history.replaceState(null, null, `#${targetId}`);
      }
    });
  });

  // Handle initial hash
  function processInitialHash() {
    const hash = window.location.hash.slice(1);
    if (hash && hash !== lastProcessedHash) {
      const targetEl = document.getElementById(hash);
      if (targetEl) {
        isProgrammaticNavigation = true;
        lastProcessedHash = hash;
        
        // Small delay to ensure proper positioning
        setTimeout(() => {
          perfectScrollTo(targetEl);
          highlightElement(targetEl);
        }, 50);
      }
    }
  }

  // Handle hash changes
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    
    if (isProgrammaticNavigation) {
      isProgrammaticNavigation = false;
      return;
    }
    
    if (hash && hash !== lastProcessedHash) {
      const targetEl = document.getElementById(hash);
      if (targetEl) {
        lastProcessedHash = hash;
        setTimeout(() => {
          perfectScrollTo(targetEl);
          highlightElement(targetEl);
        }, 50);
      }
    }
  });

  // Clear hash on full page refresh
  window.addEventListener('beforeunload', () => {
    if (performance.navigation.type === 1) { // Type 1 is page reload
      history.replaceState(null, null, ' ');
    }
  });

  // Initialize
  window.addEventListener('load', processInitialHash);
  window.addEventListener('DOMContentLoaded', processInitialHash);
}

// Initialize the perfect smooth scrolling
document.addEventListener('DOMContentLoaded', setupPerfectSmoothScroll);