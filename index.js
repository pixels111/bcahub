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

  // IMPORTANT:
  // Replace below URL with your Google Apps Script Web App URL (deployed as exec)
  const API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz84vL9JSeAnpFcL68GPwHQmmlL00WWM7dWma7izoU6YEb92dzG8EWSytbvAd6Fr_uf/exec';

  const form = document.getElementById('rating-form');
  const thankYouMessage = document.getElementById('thank-you-message');
  const ratingSummary = document.getElementById('rating-summary');
  const slides = document.getElementById('slides');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  let feedbackList = [];
  let userHasRated = false;

  // Escape HTML to prevent injection
  function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[c]);
  }

  // Render average rating and count
  function updateSummary() {
    if (!feedbackList.length) {
      ratingSummary.textContent = 'No ratings yet.';
      ratingSummary.setAttribute('aria-hidden', 'true');
      return;
    }
    const total = feedbackList.length;
    const avg = (feedbackList.reduce((acc, f) => acc + f.rating, 0) / total).toFixed(2);
    ratingSummary.textContent = `Average rating: ${avg} ★ (${total} rating${total > 1 ? 's' : ''})`;
    ratingSummary.setAttribute('aria-hidden', 'false');
  }

  // Render individual feedback cards
  function renderFeedback() {
    slides.innerHTML = '';
    if (!feedbackList.length) {
      slides.innerHTML = '<p style="color: var(--color-gray); font-style: italic;">No feedback yet.</p>';
      return;
    }
    for (const f of feedbackList) {
      if (!f.approved) continue;
      const card = document.createElement('article');
      card.className = 'feedback-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Feedback by ${f.name}, rating: ${f.rating} stars`);

      const stars = Array(f.rating).fill(0).map(_ => 
        `<svg class="feedback-star" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="var(--color-star-on)">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63
            2 9.24l5.46 4.73L5.82 21z"/>
        </svg>`).join('');
      card.innerHTML = `
        <div class="feedback-name">${escapeHtml(f.name)}</div>
        <div class="feedback-rating" aria-hidden="true">${stars}</div>
        <div class="feedback-message">${escapeHtml(f.feedback)}</div>`;
      slides.appendChild(card);
    }
  }

  // Scroll controls for slider
  function scrollSlider(direction) {
    const card = slides.querySelector('.feedback-card');
    const scrollAmount = card ? card.offsetWidth + 16 : 296;
    slides.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }
  prevBtn.addEventListener('click', () => scrollSlider(-1));
  nextBtn.addEventListener('click', () => scrollSlider(1));

  // Get feedback from Google Sheets via Apps Script GET endpoint
  async function loadFeedback() {
    try {
      const res = await fetch(`${API_ENDPOINT}?action=get`);
      if (!res.ok) throw new Error('Failed to load feedback');
      const data = await res.json();
      // Format of data assumed [{ name, rating, feedback, approved }]
      feedbackList = data.filter(f => f.approved === true);
      updateSummary();
      renderFeedback();
    } catch (e) {
      console.error(e);
      ratingSummary.textContent = 'Failed to load feedback.';
    }
  }

  async function submitFeedback(payload) {
    // POST to Google Apps Script
    const formData = new URLSearchParams();
    formData.append('name', payload.name);
    formData.append('rating', payload.rating);
    formData.append('feedback', payload.feedback);
    formData.append('approved', payload.approved ? 'true' : 'false');

    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to submit feedback');
    return await res.json();
  }

  // Check if user has rated before, optionally you can track in localStorage
  function checkUserRated() {
    return localStorage.getItem('userRated') === 'true';
  }

  function markUserRated() {
    localStorage.setItem('userRated', 'true');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (userHasRated) return;

    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const rating = formData.get('rating');
    const feedback = formData.get('feedback').trim();
    const approved = formData.get('approve') === 'on';

    if (!rating) { alert('Please select a rating.'); return; }
    if (!name || name.length < 2) { alert('Please enter your name (min 2 characters).'); return; }
    if (!feedback) { alert('Please enter your feedback.'); return; }
    if (!approved) { alert('Please approve displaying your feedback.'); return; }

    try {
      form.querySelector('button[type="submit"]').disabled = true;
      await submitFeedback({ name, rating, feedback, approved });
      // Update UI and local state
      markUserRated();
      userHasRated = true;
      form.style.display = 'none';
      thankYouMessage.style.display = 'block';
      // Reload feedback from backend to reflect new feedback and possible deletions
      await loadFeedback();
      thankYouMessage.focus();
    } catch (err) {
      alert('Failed to submit feedback, please try again later.');
      form.querySelector('button[type="submit"]').disabled = false;
      console.error(err);
    }
  });

  // Initialization
  userHasRated = checkUserRated();
  if (userHasRated) {
    form.style.display = 'none';
    thankYouMessage.style.display = 'block';
  }
  loadFeedback();
