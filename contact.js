document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const response = document.getElementById('form-response');
  const menuLinks = document.querySelectorAll('nav ul a'); // Select all menu links

  // Highlight the active menu item based on the current URL
  menuLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active'); // Add 'active' class to the matching link
    } else {
      link.classList.remove('active'); // Remove 'active' class from non-matching links
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    response.style.color = 'blue';
    response.textContent = 'Sending your message...';

    const formData = new FormData(form);

    fetch('https://formspree.io/f/meoggyga', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        response.style.color = 'green';
        response.textContent = 'Thanks for contacting us! We will get back to you soon.';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(() => {
      response.style.color = 'red';
      response.textContent = 'Oops! Something went wrong. Please try again.';
    });
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
  
