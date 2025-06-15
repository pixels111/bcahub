document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('nav ul a');
  menuLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
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
  const scrollOffset = 20;

  const navLinks = document.querySelectorAll('a[href^="#"]');
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
  
  function highlightElement(targetEl) {
    targetEl.classList.add('section-highlight');
    setTimeout(() => {
      targetEl.classList.remove('section-highlight');
    }, 1500);
  }
  
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
        history.replaceState(null, null, `#${targetId}`);
      }
    });
  });
  
  function processInitialHash() {
    const hash = window.location.hash.slice(1);
    if (hash && hash !== lastProcessedHash) {
      const targetEl = document.getElementById(hash);
      if (targetEl) {
        isProgrammaticNavigation = true;
        lastProcessedHash = hash;
        setTimeout(() => {
          perfectScrollTo(targetEl);
          highlightElement(targetEl);
        }, 50);
      }
    }
  }
  
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
  
  window.addEventListener('beforeunload', () => {
    if (performance.navigation.type === 1) {
      history.replaceState(null, null, ' ');
    }
  });
  
  window.addEventListener('load', processInitialHash);
  window.addEventListener('DOMContentLoaded', processInitialHash);
}
document.addEventListener('DOMContentLoaded', setupPerfectSmoothScroll);

// --- Content Data ---
const contentData = [       
    {
    id: 31,
    title: "The Fibonacci Series",
    image: "pictures/id6-0.jpg",
    preview: "Nature's mathematical sequence that appears everywhere from flowers to galaxies.",
    content: `<img src='pictures/id6-0.jpg' class='detail-image'>
              <p>The Fibonacci series is a sequence of numbers starting with 0 and 1, where each new number is the sum of the two preceding ones.</p>
              <strong>The Series Looks Like:</strong>
              <p>0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...</p> 
              <h2>How it Works</h2>
              <ul>
                <li>The series <strong>always begins with 0 and 1</strong>.</li>
                <li>Each new term is calculated by <strong>adding the two previous numbers</strong>.</li>
              </ul>
              <img src='pictures/id6-1.png' class='detail-image'>
              <h2>Who discovered Fibonacci series?</h2>
              <p>The Fibonacci sequence has its origins in ancient India, particularly in the work of the <strong>mathematician Pingala</strong> around 200 BCE.</p><br>
              <p>However, the sequence became widely known in Europe through the Italian mathematician <strong>Leonardo of Pisa</strong>, commonly known as Fibonacci, who introduced it in his book <strong>Liber Abaci</strong> in 1202.</p>
              <h2>Real-World Uses of the Fibonacci Sequence</h2>
              <ol>
                <li><h3>Nature</h3><ul>
                  <li>Found in the way leaves grow on stems</li>
                  <li>Petal patterns in flowers</li>
                  <li>Spiral shells like the nautilus</li>
                  <li>Shapes in pinecones, sunflower seeds, and pineapples</li>
                </ul></li>
                <li><h3>Computer Science</h3><ul>
                  <li>Used in recursion and algorithms</li>
                  <li>Helps in data structures like Fibonacci heaps</li>
                  <li>Common in dynamic programming</li>
                </ul></li>
                <li><h3>Finance</h3><ul>
                  <li>Used to predict stock trends with Fibonacci retracement levels</li>
                </ul></li>
                <li><h3>Art & Architecture</h3><ul>
                  <li>Found in the Golden Ratio, used in design, paintings, and buildings</li>
                </ul></li>
                <li><h3>Music</h3><ul>
                  <li>Found in Indian classical music and Western scales</li>
                  <li>Appears in rhythms and note sequences</li>
                </ul></li>
              </ol>`,
    labels: ["fibonacci sequence","mathematics", "number theory", "nature","patterns"],
    category: ["science", "facts"],
    credit: `<ul>
              <li>Internet images</li>
              <li>wikipedia</li>
            </ul>`
  },
  {
    id: 32,
    title: "The Fibonacci Series code",
    image: "pictures/id2-0.png",
    preview: "Fibonacci Series – Aim, Code, Output",
    content: `
      <h2>Aim</h2>
      <p>To generate and display the Fibonacci series up to <code>n</code> terms.</p>
      <h2>Algorithm</h2>
      <ol>
        <li>Start</li>
        <li>Initialize: <code>a = 0</code>, <code>b = 1</code></li>
        <li>Print <code>a</code> and <code>b</code></li>
        <li>Repeat <code>n-2</code> times:
          <ul>
            <li><code>c = a + b</code></li>
            <li>Print <code>c</code></li>
            <li>Update <code>a = b</code>, <code>b = c</code></li>
          </ul>
        </li>
        <li>Stop</li>
      </ol>
      <div class="codesection">
        <h2>Code in C</h2>
        <div class="code-container">
          <div class="code-header">C</div>
          <div class="code-buttons">
            <button onclick="toggleOutput(this)">Output</button>
          </div>
          <div class="code-block">
            <div class="code-lines" id="code-c">
              <pre>
#include &lt;stdio.h&gt;
int main() {
  int n, a = 0, b = 1, c;
  printf("Enter number of terms: ");
  scanf("%d", &n);
  printf("%d\\t%d", a, b);
  while(n != 0) {
    c = a + b;
    printf("\\t%d", c);
    a = b;
    b = c;
    n--;
  }
  return 0;
}</pre>
            </div>
          </div>
          <div class="output-box">
            <strong>Sample Output:</strong><br>
            Enter number of terms: 10<br>
            0 1 1 2 3 5 8 13 21 34
          </div>
        </div>
      </div>
      <div class="codesection">
        <h2>Code in Java</h2>
        <div class="code-container">
          <div class="code-header">Java</div>
          <div class="code-buttons">
            <button onclick="toggleOutput(this)">Output</button>
          </div>
          <div class="code-block">
            <div class="code-lines" id="code-java">
              <pre>
import java.util.Scanner;
class Fibonacci {
  public static void main(String[] args) {
    int n, a = 0, b = 1, c;
    Scanner s = new Scanner(System.in);
    System.out.print("Enter number: ");
    n = s.nextInt();
    System.out.print(a + "\\t" + b);
    while(n != 0) {
      c = a + b;
      System.out.print("\\t" + c);
      a = b;
      b = c;
      n--;
    }
  }
}</pre>
            </div>
          </div>
          <div class="output-box">
            <strong>Sample Output:</strong><br>
            Enter number: 10<br>
            0 1 1 2 3 5 8 13 21 34
          </div>
        </div>
      </div>
      <div class="codesection">
        <h2>Code in Python</h2>
        <div class="code-container">
          <div class="code-header">Python</div>
          <div class="code-buttons">
            <button onclick="toggleOutput(this)">Output</button>
          </div>
          <div class="code-block">
            <div class="code-lines" id="code-python">
              <pre>
n = int(input("Enter number: "))
a, b = 0, 1
print(a, b, end="\\t")
while n != 0:
  c = a + b
  print(c, end="\\t")
  a = b
  b = c
  n -= 1</pre>
            </div>
          </div>
          <div class="output-box">
            <strong>Sample Output:</strong><br>
            Enter number: 10<br>
            0 1 1 2 3 5 8 13 21 34
          </div>
        </div>
      </div>`,
    labels: ["fibonacci sequence program","c lan","python", "java", "programming"],
    category: ["programs"],
    credit: `<ul><li>BCAHub</li></ul>`
  }
];

// Current state
let currentPage = 1;
const itemsPerPage = 16;
let currentFilter = "all";
let filteredContent = [...contentData];
let isRandomMode = false;

// DOM elements
const contentGrid = document.getElementById('content-grid');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const randomBtn = document.getElementById('random-btn');
const filterChips = document.querySelectorAll('.filter-chip');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const contentDetail = document.getElementById('content-detail');
const backButton = document.getElementById('back-button');
const detailTitle = document.getElementById('detail-title');
const detailContent = document.getElementById('detail-content');
const creditSection = document.getElementById('credit-section');
const spaceBg = document.getElementById('space-bg');

// Initialize the app
function init() {
    createStars();
    applyFilter();
    setupEventListeners();
    setupEventListeners();
    
    // Check if we should show random button
    if (sessionStorage.getItem('randomMode') === 'true') {
        isRandomMode = true;
        if (window.location.hash) {
            setupRandomButton();
        }
    }
    initFromHash();
}


// Create starry background
function createStars() {
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 1.5 + 0.5;
        const duration = Math.random() * 4 + 1;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        spaceBg.appendChild(star);
    }
}

// Render content cards
function renderContent() {
    contentGrid.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const contentToDisplay = filteredContent.slice(startIndex, endIndex);
    
    contentToDisplay.forEach(item => {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.dataset.id = item.id;
        card.innerHTML = `
            <img src="${item.image}" class="card-image" alt="${item.title}">
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-text">${item.preview}</p>
                <div class="card-labels">
                    ${item.labels.map(label => `<span class="label">${label}</span>`).join('')}
                </div>
            </div>
        `;
        contentGrid.appendChild(card);
    });
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = endIndex >= filteredContent.length;
}

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    randomBtn.addEventListener('click', showRandomContent);
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.dataset.filter;
            applyFilter();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderContent();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderContent();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    contentGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.content-card');
        if (card) {
            const contentId = parseInt(card.dataset.id);
            showContentDetail(contentId);
        }
    });

    backButton.addEventListener('click', () => {
        contentDetail.style.display = 'none';
        document.body.classList.remove('noscroll');
        history.replaceState(null, null, window.location.pathname);
    });
}

// Handle search input
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    const results = contentData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.preview.toLowerCase().includes(query) ||
        item.labels.some(label => label.toLowerCase().includes(query))
    ).slice(0, 5);
    
    if (results.length > 0) {
        searchResults.innerHTML = results.map(item => `
            <div class="search-result-item" data-id="${item.id}">
                <strong>${item.title}</strong><br>
                <small>${item.preview}</small>
            </div>
        `).join('');
        
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const contentId = parseInt(item.dataset.id);
                searchInput.value = '';
                searchResults.style.display = 'none';
                showContentDetail(contentId);
            });
        });
        
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        searchResults.style.display = 'block';
    }
}

// Show random content
function showRandomContent() {
    isRandomMode = true;
    const randomIndex = Math.floor(Math.random() * contentData.length);
    const contentId = contentData[randomIndex].id;
    
    // Store random mode in session storage
    sessionStorage.setItem('randomMode', 'true');
    
    showContentDetail(contentId);
}
function setupRandomButton() {
    const nextRandomBtn = document.createElement('button');
    nextRandomBtn.id = 'next-random-btn';
    nextRandomBtn.className = 'random-nav-btn';
    nextRandomBtn.innerHTML = 'Next Random ➔';
    nextRandomBtn.onclick = showRandomContent;
    
    const detailHeader = document.querySelector('.detail-header');
    if (detailHeader && !detailHeader.querySelector('#next-random-btn')) {
        detailHeader.appendChild(nextRandomBtn);
    }
}
// Priority cards always first, rest shuffled for "all" filter
const priorityCardIds = [31,32];

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function applyFilter() {
    if (currentFilter === 'all') {
        const priorityCards = priorityCardIds
            .map(id => contentData.find(item => item.id === id))
            .filter(Boolean);
        const nonPriorityCards = contentData.filter(
            item => !priorityCardIds.includes(item.id)
        );
        shuffleArray(nonPriorityCards);
        filteredContent = [...priorityCards, ...nonPriorityCards];
    } else {
        filteredContent = contentData.filter(item =>
            Array.isArray(item.category)
                ? item.category.includes(currentFilter)
                : item.category === currentFilter
        );
    }
    currentPage = 1;
    renderContent();
}

// Content Detail Management - Final Working Version
let currentDetailId = null;

function showContentDetail(contentId) {
    // Don't reopen same card
    if (currentDetailId === contentId) return;
    
    const content = contentData.find(item => item.id === contentId);
    if (!content) return;
    
    currentDetailId = contentId;

    // Store grid scroll position
    window.contentGridScrollPosition = window.scrollY;
    
    // Reset detail view completely
    contentDetail.style.display = 'none';
    detailTitle.textContent = content.title;
    detailContent.innerHTML = content.content;
    creditSection.innerHTML = `Credit: ${content.credit}`;
    
    // Force layout recalculation
    void contentDetail.offsetHeight;
    
    // Show and reset scroll
    contentDetail.style.display = 'block';
    contentDetail.scrollTop = 0;
    document.body.classList.add('noscroll');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update history
    history.pushState({ contentId, fromContentGalaxy: true }, '', `#${contentId}`);
    // Handle random button visibility
    if (sessionStorage.getItem('randomMode') === 'true') {
        setupRandomButton();
        document.getElementById('next-random-btn').style.display = 'block';
    } else if (document.getElementById('next-random-btn')) {
        document.getElementById('next-random-btn').style.display = 'none';
    }
}


// Back button handler
backButton.addEventListener('click', () => {
    isRandomMode = false;
    sessionStorage.removeItem('randomMode');
    if (document.getElementById('next-random-btn')) {
        document.getElementById('next-random-btn').style.display = 'none';
    }
    currentDetailId = null;
    contentDetail.style.display = 'none';
    document.body.classList.remove('noscroll');
    
    // Restore grid scroll position
    if (window.contentGridScrollPosition !== undefined) {
        window.scrollTo({ top: window.contentGridScrollPosition });
    }
    
    history.replaceState({ fromContentGalaxy: true }, '', window.location.pathname);
});

// Handle browser navigation
window.addEventListener('popstate', (event) => {
    if (!event.state || !event.state.fromContentGalaxy) {
        if (contentDetail.style.display === 'block') {
            currentDetailId = null;
            contentDetail.style.display = 'none';
            document.body.classList.remove('noscroll');
        }
        return;
    }

    if (event.state.contentId) {
        showContentDetail(event.state.contentId);
    } else {
        currentDetailId = null;
        contentDetail.style.display = 'none';
        document.body.classList.remove('noscroll');
        
        if (window.contentGridScrollPosition !== undefined) {
            window.scrollTo({ top: window.contentGridScrollPosition });
        }
    }
});

// Initialize from URL hash
function initFromHash() {
    const idFromHash = parseInt(window.location.hash.replace('#', ''));
    if (!isNaN(idFromHash)) {
        showContentDetail(idFromHash);
    }
}


// Hash-based navigation
if (window.location.hash) {
    const idFromHash = parseInt(window.location.hash.replace('#', ''));
    if (!isNaN(idFromHash)) {
        showContentDetail(idFromHash, false);
    }
}

window.addEventListener('hashchange', () => {
    const idFromHash = parseInt(window.location.hash.replace('#', ''));
    if (!isNaN(idFromHash)) {
        showContentDetail(idFromHash, false);
    } else {
        contentDetail.style.display = 'none';
        document.body.classList.remove('noscroll');
    }
});

// Modal functionality
var modal = document.getElementById("myModal");
var btn = document.getElementById("clickHere");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Toggle Output
function toggleOutput(button) {
    const outputBox = button.closest(".code-container").querySelector(".output-box");
    outputBox.style.display = outputBox.style.display === "block" ? "none" : "block";
}

// Initialize the app
init();