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
    document.querySelector('.sidebar').classList.add('active');
    document.querySelector('.socials-container').style.display = 'none';
  }
  function hideSidebar(){
    document.querySelector('.sidebar').classList.remove('active');
    document.querySelector('.socials-container').style.display = 'flex';
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


  // Elements and handlers
  const formTypeSelect = document.getElementById('formType');
  const forms = {
    'contact': document.getElementById('contact'),
    'broken-link': document.getElementById('broken-link'),
    'resource-add': document.getElementById('resource-add'),
    'spelling-mistake': document.getElementById('spelling-mistake'),
    'change-del-sub': document.getElementById('change-del-sub'),
    'change-syllabus': document.getElementById('change-syllabus'),
    'feedback': document.getElementById('feedback'),
  };
  const successMsg = document.getElementById('success-msg');
  let popupTimeout = null;
  successMsg.style.display = 'none';

  // Popup message function
  function showPopup(message, color = "#2ecc40") {
    successMsg.textContent = message;
    successMsg.style.display = 'block';
    successMsg.style.background = color;
    successMsg.style.color = "#fff";
    successMsg.style.padding = "14px";
    successMsg.style.borderRadius = "10px";
    successMsg.style.textAlign = "center";
    successMsg.style.position = "fixed";
    successMsg.style.left = "50%";
    successMsg.style.top = "30px";
    successMsg.style.transform = "translateX(-50%)";
    successMsg.style.zIndex = "9999";
    clearTimeout(popupTimeout);
    popupTimeout = setTimeout(() => {
      successMsg.style.display = 'none';
    }, 3000);
  }

  // Helper to show message below submit button
  function showFormMessage(form, message, color = "#2ecc40") {
    const msgDiv = form.querySelector('.form-message');
    if (msgDiv) {
      msgDiv.textContent = message;
      msgDiv.style.display = 'block';
      msgDiv.style.background = color;
      msgDiv.style.color = "#fff";
      msgDiv.style.padding = "10px";
      msgDiv.style.borderRadius = "8px";
      msgDiv.style.marginTop = "16px";
      msgDiv.style.textAlign = "center";
      msgDiv.style.fontSize = "1em";
    }
  }
  function hideFormMessage(form) {
    const msgDiv = form.querySelector('.form-message');
    if (msgDiv) msgDiv.style.display = 'none';
  }

  // Hide all forms
  function hideAllForms() {
    for (let key in forms) {
      forms[key].classList.add('hidden');
    }
    successMsg.style.display = 'none';
  }

  // Show the selected form
  function showFormById(formId) {
    hideAllForms();
    if (forms[formId]) {
      forms[formId].classList.remove('hidden');
      formTypeSelect.value = formId;
    }
  }

  // Handle dropdown selection
  formTypeSelect.addEventListener('change', () => {
    showFormById(formTypeSelect.value);
    // Update hash for direct linking
    if (formTypeSelect.value) {
      history.replaceState(null, null, `#${formTypeSelect.value}`);
    }
  });

  // Handle hash navigation on load
  function handleHashOnLoad() {
    const hash = window.location.hash.replace('#', '');
    if (hash && forms[hash]) {
      showFormById(hash);
    } else {
      hideAllForms();
      formTypeSelect.value = '';
    }
  }
  window.addEventListener('hashchange', handleHashOnLoad);
  handleHashOnLoad();

  // Real-time validation for email and phone
  Object.values(forms).forEach(form => {
    form.addEventListener('input', e => {
      const input = e.target;
      let valid = true, message = '';
      // Universal email/phone validation
if (input.name && input.name.toLowerCase().includes('email_phno')) {
  input.value = input.value.toLowerCase();
  const val = input.value.trim();
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const phoneRegex = /^\d{10}$/;
  if (val && !emailRegex.test(val) && !phoneRegex.test(val)) {
    valid = false;
    message = 'Please enter a valid email address or 10-digit phone number';
  }
} else if (input.type === 'email') {
  input.value = input.value.toLowerCase();
  if (input.value && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(input.value)) {
    valid = false;
    message = 'Please enter a valid email address';
  }
} else if (input.name && input.name.toLowerCase().includes('phone')) {
  input.value = input.value.replace(/\D/g, '').slice(0, 10);
  if (input.value && !/^\d{10}$/.test(input.value)) {
    valid = false;
    message = 'Please enter a valid 10-digit phone number';
  }
}
      if (!valid) {
        input.classList.add('error');
        showFormMessage(form, message, "#ff4136");
      } else {
        input.classList.remove('error');
        hideFormMessage(form);
      }
    });
  });

  // Handle submission for all forms
  Object.values(forms).forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      hideFormMessage(form);

      // Basic validation (required inputs only)
      const inputs = form.querySelectorAll('[required]');
      for (let input of inputs) {
        if (!input.value.trim()) {
          input.classList.add('error');
          showFormMessage(form, `Please fill out the ${input.previousElementSibling ? input.previousElementSibling.innerText.replace('*', '') : input.name} field.`, "#ff4136");
          input.focus();
          return;
        }
        // Universal email/phone validation
        if (input.name && input.name.toLowerCase().includes('email_phno')) {
          const val = input.value.trim();
          const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
          const phoneRegex = /^\d{10}$/;
          if (val && !emailRegex.test(val) && !phoneRegex.test(val)) {
            input.classList.add('error');
            showFormMessage(form, 'Please enter a valid email address or 10-digit phone number', "#ff4136");
            input.focus();
            return;
          }
        } else if (input.type === 'email' && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(input.value)) {
          input.classList.add('error');
          showFormMessage(form, 'Please enter a valid email address', "#ff4136");
          input.focus();
          return;
        } else if (input.name && input.name.toLowerCase().includes('phone') && !/^\d{10}$/.test(input.value)) {
          input.classList.add('error');
          showFormMessage(form, 'Please enter a valid 10-digit phone number', "#ff4136");
          input.focus();
          return;
        }
        input.classList.remove('error');
      }

      // Show sending message
      showFormMessage(form, "Sending...", "#0077ff");

      // Submit form data
      fetch('https://script.google.com/macros/s/AKfycbxSyCetjMaWvpxb9PMGgSXKgSIf_d1-r3qt8FBKZNtvCeIzgIMX759IYntwucfvxy8eeg/exec', {
        method: 'POST',
        body: new FormData(form),
      })
      .then(response => response.text())
      .then(text => {
        if (text.includes('Success')) {
          showFormMessage(form, "Successfully sent! We will respond within 24 hours.", "#2ecc40");
          form.reset();
          setTimeout(() => hideFormMessage(form), 3000);
        } else {
          showFormMessage(form, 'Submission failed: ' + text, "#ff4136");
        }
      })
      .catch(err => {
        showFormMessage(form, 'Error submitting form.', "#ff4136");
        console.error(err);
      });
    });

    // Optional: Add reset button handler if present
    const resetBtn = form.querySelector('.reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        hideFormMessage(form);
      });
    }
  });

// Add this after your DOMContentLoaded or main form logic
document.addEventListener('DOMContentLoaded', function() {
  const formTypeSelect = document.getElementById('formType');
  const subjectDefaults = {
    'contact': 'For general contact',
    'broken-link': 'Requesting for broken link',
    'resource-add': 'Requesting new resource',
    'spelling-mistake': 'Reporting spelling mistake',
    'change-del-sub': 'Requesting subject change/deletion',
    'change-syllabus': 'Requesting syllabus update',
    
  };

  if (formTypeSelect) {
    formTypeSelect.addEventListener('change', function() {
      const selected = this.value;
      // Find the visible form and its subject input
      const form = document.getElementById(selected);
      if (form) {
        const subjectInput = form.querySelector('input[name="subject"]');
        if (subjectInput && subjectDefaults[selected]) {
          subjectInput.value = subjectDefaults[selected];
        }
      }
    });

    // On page load, if a form is already selected, set its subject
    const selected = formTypeSelect.value;
    if (selected && subjectDefaults[selected]) {
      const form = document.getElementById(selected);
      if (form) {
        const subjectInput = form.querySelector('input[name="subject"]');
        if (subjectInput) subjectInput.value = subjectDefaults[selected];
      }
    }
  }
});

