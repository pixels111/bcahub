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
    id: 1,
    title: "The Fibonacci Series",
    image: "../pictures/id6-0.jpg",
    preview: "Nature's mathematical sequence that appears everywhere from flowers to galaxies.",
    content: `<img src='../pictures/id6-0.jpg' class='detail-image'>
              <p>The Fibonacci series is a sequence of numbers starting with 0 and 1, where each new number is the sum of the two preceding ones.</p>
              <strong>The Series Looks Like:</strong>
              <p>0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...</p> 
              <h2>How it Works</h2>
              <ul>
                <li>The series <strong>always begins with 0 and 1</strong>.</li>
                <li>Each new term is calculated by <strong>adding the two previous numbers</strong>.</li>
              </ul>
              <img src='../pictures/id6-1.png' class='detail-image'>
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
    id: 2,
    title: "The Fibonacci Series code",
    image: "../pictures/id2-0.png",
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
  },

  {
  id: 3,
    title: "The Science Behind the Touch Sense",
    image: "../pictures/id3-0.png",
    preview: "How we actually feel touch at the quantum level",
    content: `<p>Have you ever thought about what really happens when you <em>touch</em> something?</p>

              <p>Surprisingly, at the <strong>quantum level</strong>, the answer is: <strong>you never actually touch anything.</strong></p>

              <p>Let’s break it down in a simple way...</p>

              <p>Everything around us — including our own bodies — is made up of <strong>atoms</strong>. These atoms consist of a <strong>nucleus</strong> (containing protons and neutrons) surrounded by <strong>electrons</strong>.</p>

              <img src='../pictures/id3-1.png' class='detail-image'>

              <p>Now, here’s where it gets interesting:</p>

              <p>When you try to touch an object — say, your phone screen — the <strong>electrons</strong> in the atoms of your fingers get extremely close to the electrons in the atoms of the phone. But they never <em>really</em> touch.</p>

              <p><strong>Why?</strong></p>

              <p>Because <strong>electrons have a negative charge</strong>, and like charges <strong>repel</strong> each other — just like two magnets pushing away when you try to bring their same poles together.</p>
              <br>
              <img src='../pictures/id3-2.webp' class='detail-image'>

              <p>So instead of your atoms merging or physically "touching" the other atoms, your electrons are actually pushing away the electrons of the object. This creates a <strong>tiny electromagnetic force</strong> — a kind of invisible resistance.</p>
              <img src='../pictures/id3-3.png' class='detail-image'>
              <p>Your <strong>sensory nerves</strong> pick up this repelling force and send signals to your <strong>brain</strong>, which then interprets it as a <strong>sense of touch</strong>.</p>

              <p>So, even though it feels like you’re touching something — at the quantum level, it’s just a <strong>force interaction</strong> between clouds of electrons.</p>

              <h3>In short:</h3>
              <ul>
                  <li>You never really touch anything.</li>
                  <li>You’re just <strong>feeling the resistance</strong> between your electrons and the electrons of the object.</li>
                  <li>And your brain converts that into the sense of touch.</li>
              </ul>`,
    labels: ["touch sense", "quantum physics", "electromagnetic force", "human body", "sensation", "atoms", "nerves"],
    category: ["science", "facts"],
    credit: `<ul>
              <li>BCAHub</li>
              <li>AI Images</li>
            </ul>`
  },
  {
  id: 4,
    title: "What is USB and Types of USB Ports",
    image: "../pictures/id4-0.png",
    preview: "A complete and easy guide to USB ports — their types, uses, hidden facts, and why the world is shifting to Type-C.",
    content: `
              <h2>What is USB?</h2>
              <p>
                <strong>USB</strong> stands for <em>Universal Serial Bus</em>. It’s a standard way to connect, transfer data, and power devices. 
                From charging your phone to connecting a mouse, keyboard, or flash drive — USB is everywhere in our digital lives. 
                But did you know there are several types of USB ports? And that one special port, <strong>USB Type-C</strong>, is now replacing them all? 
                Let’s explore their journey and purpose.
              </p>

              <h2> The Evolution of USB Ports</h2>
              <p>
                The story of USB started in <strong>1996</strong> with <strong>Type-A</strong>. Then came <strong>Type-B</strong>, <strong>Mini USB</strong>, and <strong>Micro USB</strong> in 2007.
                But things changed in <strong>2014</strong> with the introduction of <strong>USB Type-C</strong> — a smart, fast, reversible connector.
              </p>

              <h2>Types of USB Ports & Their Uses</h2>

              <h3>1. USB Type-A</h3>
              <img src='../pictures/id4-1.png' class='detail-image' style="width:100%; height:150px; align-item:center;">
              <ul>
                <li><strong>Invented:</strong> 1996</li>
                <li><strong>Used In:</strong> Desktops, TVs, flash drives, keyboards</li>
                <li><strong>Still Used:</strong> Yes</li>
                <li><strong>Image Label:</strong> “Type-A: The classic USB for computers and gadgets”</li>
                <li><strong>Note:</strong> Big, rectangular, not reversible</li>
              </ul>

              <h3>2. USB Type-B</h3>
              <img src='../pictures/id4-2.png' class='detail-image' style="width:100%; height:150px; align-item:center;">

              <ul>
                <li><strong>Invented:</strong> ~1998</li>
                <li><strong>Used In:</strong> Printers, scanners</li>
                <li><strong>Still Used:</strong> Rarely</li>
                <li><strong>Image Label:</strong> “Type-B: Mostly used in printers and older devices”</li>
                <li><strong>Note:</strong> Square with a rounded top</li>
              </ul>

              <h3>3. Mini USB</h3>
              <img src='../pictures/id4-3.png' class='detail-image' style="width:100%; height:150px; align-item:center;">
              <ul>
                <li><strong>Invented:</strong> Early 2000s</li>
                <li><strong>Used In:</strong> Old cameras, MP3 players</li>
                <li><strong>Still Used:</strong> No</li>
                <li><strong>Image Label:</strong> “Mini USB: Used in old cameras and small gadgets”</li>
                <li><strong>Note:</strong> Outdated and bulkier than Micro USB</li>
              </ul>

              <h3>4. Micro USB</h3>
              <img src='../pictures/id4-4.png' class='detail-image' style="width:100%; height:150px; align-item:center;">
              <ul>
                <li><strong>Invented:</strong> 2007</li>
                <li><strong>Used In:</strong> Older Android phones, Bluetooth speakers, power banks</li>
                <li><strong>Still Used:</strong> In budget gadgets</li>
                <li><strong>Image Label:</strong> “Micro USB: Used in old phones and accessories”</li>
                <li><strong>Note:</strong> Small and thin, but not reversible</li>
              </ul>

              <h3>5. USB Type-C</h3>
              <img src='../pictures/id4-5.png' class='detail-image' style="width:100%; height:150px; align-item:center;">
              <ul>
                <li><strong>Invented:</strong> 2014</li>
                <li><strong>Used In:</strong> New phones, laptops, tablets, monitors</li>
                <li><strong>Still Used:</strong> Yes — and rapidly growing</li>
                <li><strong>Image Label:</strong> “Type-C: Fast, small, and works both ways”</li>
                <li><strong>Note:</strong> Reversible, powerful, supports data, charging, and video</li>
              </ul>

              <h2>The Rise of USB Type-C</h2>
              <p>
                USB-C isn’t just a new shape — it’s a new level of functionality. It supports:
                <ul>
                  <li><strong>Faster Charging</strong> – up to 240W, even enough for gaming laptops</li>
                  <li><strong>High-Speed Data Transfer</strong> – up to 40 Gbps</li>
                  <li><strong>Video/Audio Output</strong> – replaces HDMI and 3.5mm jack</li>
                  <li><strong>Reversibility</strong> – plug it in any way</li>
                  <li><strong>Slim Design</strong> – perfect for modern devices</li>
                </ul>
                In 2022, EU laws required USB-C for all smartphones sold in Europe — even Apple switched the iPhone 15 to USB-C.
              </p>

              <h2>Why the World is Switching to USB-C</h2>
              <ul>
                <li>No more flipping — it’s reversible</li>
                <li>Superfast charging (USB PD)</li>
                <li>Quick data transfers (up to 40 Gbps)</li>
                <li>Works for video and sound — goodbye HDMI!</li>
                <li>Universally supported — one cable for all gadgets</li>
                <li>Sleek, slim, modern</li>
                <li>Legally required in some regions (like the EU)</li>
              </ul>

              <h2>What Most People Don’t Know</h2>
              <p>
                Not all USB-C cables are equal:
                <ul>
                  <li>Some don’t support fast charging or data transfer</li>
                  <li>Thunderbolt 3/4 looks the same but needs special support</li>
                  <li>Cheap cables may overheat or damage devices</li>
                </ul>
                Always check for <strong>USB PD</strong>, <strong>Thunderbolt logos</strong>, and proper <strong>certification</strong>.
              </p>

              <h2>Interesting & Confidential USB Facts</h2>
              <ul>
                <li>USB-C was designed to replace ALL ports — USB-A, HDMI, audio, DisplayPort</li>
                <li>Apple switched to USB-C because of European law</li>
                <li>USB-C + MagSafe = fast, safe charging with magnets</li>
                <li>Budget devices still use old USB to sell old accessories</li>
                <li>Thunderbolt is faster but more expensive and only works with supported devices</li>
                <li>Low-quality USB-C cables can ruin your gadgets</li>
              </ul>

              <h2>Conclusion</h2>
              <p>
                USB ports have come a long way — from bulky, one-way connectors to sleek, universal USB-C. 
                It’s fast, smart, and becoming the only port you’ll ever need. 
                Whether it’s for power, data, video, or sound — USB Type-C does it all.
              </p>
              <p>Next time you charge or connect a device, remember: not all USB cables are created equal!</p>

    `,
    labels: ["usb ports", "type-c", "technology", "gadget guide", "connectivity", "charging", "data cables"],
    category: ["tech"],
    credit: `<ul>
              <li>BCAHub</li>
              <li>internet Images</li>
            </ul>`
  },
   {
  id: 5,
    title: "The Big Bang",
    image: "../pictures/id5-0.png",
    preview: "The story of how the universe began — from a cosmic explosion to ever-expanding galaxies. Is it science or still a mystery?",
    content: `
              <h2>Definition of Big Bang Theory</h2> 
              <p>The Big Bang Theory is the most widely accepted scientific explanation for how the universe began. It proposes that the universe started as a singularity — a single, infinitely small, hot, and dense point — and around <strong>13.8 billion years ago</strong>, it suddenly expanded, creating space, time, energy, and matter. This expansion continues even today.</p>
              <img src='../pictures/id5-2.jpg' class='detail-image' >
              <p>Imagine blowing up a balloon — at first, it's tiny, but as you add air, it gets bigger and bigger. The universe expanded in a similar way, just like that balloon.</p>
<div >
  <video class='detail-video' autoplay controls> 
    <source src="../videos/id5-v1.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div class="detail-video-label">This is the Big Bang Simulation Video by NASA</div>
</div>
              <h2>Who Introduced This Theory?</h2>
              <p>The Big Bang theory was first proposed by <strong>Georges Lemaître</strong>, a Belgian physicist and priest, in 1927.</p>
              <p>Later, <strong>Edwin Hubble</strong> provided observational evidence in 1929 showing that galaxies are moving away from each other — confirming the expansion.</p>
              <h2>How Big Is the Universe Now?</h2>
              <img src='../pictures/id5-3.png' class='detail-image' >
              <p>Since that first moment, the universe has kept growing. Today, the observable universe is about <strong>93 billion light-years</strong> across — and still expanding!</p>
              <h2>How Do We Know the Universe Is Expanding?</h2>
              <p>There are three main clues:</p>
              <ol>
                  <li><strong>Redshift:</strong> Light from far-away galaxies is <strong>stretched</strong>, making it appear red — this shows they're moving away.</li>
                  <li><strong>Cosmic Microwave Background (CMB):</strong> A faint glow of leftover energy from the Big Bang fills the universe.</li>
                  <li><strong>Elements in the Universe:</strong> The amounts of <strong>hydrogen</strong>, <strong>helium</strong>, and <strong>lithium</strong> match what the Big Bang model predicts.</li>
              </ol>
              <p>These observations are like cosmic fingerprints that help us know the Big Bang really happened.</p>
              <h2>Big Bang in Mythology</h2>
              <p>Interestingly, some ancient cultures have similar ideas:</p>
              <ul>
                  <li>In Hinduism, the universe starts with a sound called <strong>“Om”</strong>, which some say is like the <strong>“vibration”</strong> or energy that began everything.</li>
                  <li>Other ancient stories talk about creation from chaos or darkness — which is not too far from what the Big Bang describes.</li>
              </ul>
              <p>So, while science and mythology are different, they sometimes share a surprising connection.</p>
              <h2>Can We Trust This Theory? How Much Truth Is Behind It?</h2>
              <p>The Big Bang Theory is not just a guess —, and it’s backed by physics, mathematics decades of astronomical observation. However, it doesn’t explain what caused the Big Bang, only what happened after. While it's our best model, scientists are still exploring new theories like cosmic inflation, string theory, and quantum gravity to understand more.</p>
              <h2>Conclusion</h2>
              <p>The Big Bang Theory gives us the closest and most fascinating explanation of how the universe came into existence. From a tiny, hot flash of energy, space and time were born — and over billions of years, that spark expanded to form stars, galaxies, planets, and life itself. It helps us understand where we came from — not just as people, but as part of a vast, ever-growing cosmos. While we don’t have all the answers, what we do know points to an exciting universe still unfolding. So the next time you look up at the night sky, remember: it all began with one giant cosmic leap — the Big Bang.</p>
`,
    labels: ["big bang", "universe", "space science", "origin of universe", "singularity"],
    category: ["space"],
    credit: `<ul>
              <li>BCAHub</li>
              <li>Images & videos from NASA, Wikipedia,</li>
              <li>The Sound of the Big Bang by <a href="https://faculty.washington.edu/jcramer/BBSound_2013.html" class="splink" style="color:yellow">John G.Cramer</a> -- Emeritus Professor of Physics University of Washington</li>
            </ul>`
  },
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
const priorityCardIds = [5];

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