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
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'flex'
}
function hideSidebar(){
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'none'
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

  // Get accurate commit count
  fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`)
    .then(res => res.json())
    .then(repoData => {
      const branch = repoData.default_branch;
      const commitsUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=1&sha=${branch}`;

      fetch(commitsUrl, { method: 'GET' })
        .then(response => {
          const count = response.headers.get('Link')?.match(/&page=(\d+)>; rel="last"/);
          if (count) {
            document.getElementById('commit-count').textContent = `${count[1]} commits`;
          } else {
            document.getElementById('commit-count').textContent = `1 commit`;
          }

          return response.json();
        })
        .then(data => {
          const lastDate = new Date(data[0].commit.committer.date);
          document.getElementById('last-updated-date').textContent =
            lastDate.toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
        })
        .catch(err => {
          console.error('Error getting commits:', err);
          document.getElementById('commit-count').textContent = 'Unavailable';
          document.getElementById('last-updated-date').textContent = 'Unavailable';
        });
    });
