document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('click-sound');
  const form = document.getElementById('contactForm');
  const response = document.getElementById('form-response');

  // Play sound on clicks
  document.querySelectorAll('a, button').forEach(elem => {
    elem.addEventListener('click', () => {
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }
    });
  });

  // Form submission handler for Formsubmit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show loading message
    response.style.color = 'blue';
    response.textContent = 'Sending your message...';

    // Wait a moment, then submit form to Formsubmit
    setTimeout(() => {
      response.style.color = 'green';
      response.textContent = 'Thanks for contacting us! We will get back to you soon.';
      form.submit(); // Actually sends the form to Formsubmit
    }, 1000); // 1 second delay before submission
  });
});