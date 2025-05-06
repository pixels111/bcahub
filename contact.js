document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('click-sound');
  const form = document.getElementById('contactForm');
  const response = document.getElementById('form-response');

  document.querySelectorAll('a, button').forEach(elem => {
    elem.addEventListener('click', () => {
      if(clickSound){
        clickSound.currentTime = 0;
        clickSound.play();
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Just simulate sending form
    response.style.color = 'green';
    response.textContent = 'Thanks for contacting us, ' + form.name.value + '! We will get back to you soon.';
    form.reset();
  });
});
