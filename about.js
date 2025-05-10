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

          document.getElementById('commit-count').textContent = `${totalCommits} commits`;

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
</script>
  