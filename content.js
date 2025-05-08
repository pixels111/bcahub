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