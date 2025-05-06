document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('click-sound');

  // Play click sound on all anchor and button clicks
  document.querySelectorAll('a, button').forEach(elem => {
    elem.addEventListener('click', () => {
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }
    });
  });

  // Ensure the side navigation is hidden on page load
  const sideNav = document.getElementById("mySidenav");
  sideNav.style.width = "0"; // Always hidden initially
});

function toggleNav() {
  const sideNav = document.getElementById("mySidenav");
  if (sideNav.style.width === "250px") {
    sideNav.style.width = "0";
  } else {
    sideNav.style.width = "250px";
  }
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function toggleDropdown(element) {
  const parent = element.parentElement;
  parent.classList.toggle("open");
}
