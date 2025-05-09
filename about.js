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

// Fetch commit count from GitHub API
fetch('https://api.github.com/repos/sethu369/bcahub/commits')
  .then(res => res.json())
  .then(data => {
    document.getElementById('commit-count').textContent = data.length + ' updates';
  })
  .catch(err => {
    document.getElementById('commit-count').textContent = 'Unavailable';
    console.error(err);
  });