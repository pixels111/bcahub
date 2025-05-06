document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('click-sound');
  document.querySelectorAll('a, button').forEach(elem => {
    elem.addEventListener('click', () => {
      if(clickSound){
        clickSound.currentTime = 0;
        clickSound.play();
      }
    });
  });
});
