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
function showSidebar() {
  document.querySelector('.sidebar').classList.add('active');
  document.querySelectorAll('.socials-container').forEach(el => el.classList.add('hidden'));
}

function hideSidebar() {
  document.querySelector('.sidebar').classList.remove('active');
  document.querySelectorAll('.socials-container').forEach(el => el.classList.remove('hidden'));
}

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