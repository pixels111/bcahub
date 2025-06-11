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


 // Sample content data
        const contentData = [
            {
                id: 1,
                title: "The Andromeda Galaxy",
                image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "Our closest galactic neighbor is on a collision course with the Milky Way.",
                content: "<p>The Andromeda Galaxy, also known as Messier 31 or M31, is a spiral galaxy approximately 2.5 million light-years from Earth. It is the nearest major galaxy to the Milky Way and is visible to the naked eye on moonless nights.</p><p>Andromeda is approaching the Milky Way at about 110 kilometers per second and is expected to collide with our galaxy in about 4.5 billion years, eventually merging to form a giant elliptical galaxy.</p><img src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>With a diameter of about 220,000 light-years, Andromeda contains approximately one trillion stars, making it significantly larger than the Milky Way.</p>",
                labels: ["galaxy", "space", "astronomy", "andromeda"],
                category: "space",
                credit: "NASA/JPL-Caltech"
            },
            {
                id: 2,
                title: "How to Install Python",
                image: "pictures/Python-programming-india 21.png",
                preview: "Step-by-step guide to installing Python on your computer.",
                content: `<h2>Installing Python on Windows</h2>
                          <p>1. Visit the official Python website at python.org</p>
                          <p>2. Download the latest version for Windows</p>
                          <p>3. Run the installer and check 'Add Python to PATH'</p>
                          <p>4. Click 'Install Now'</p>
                          <img src='https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'>
                          <img src='pictures/Python-programming-india 21.png' class='detail-image'>

                          <h2>Installing Python on macOS</h2>
                          <p>1. Python comes preinstalled on macOS, but you can install the latest version from python.org</p>
                          <p>2. Download the macOS installer</p>
                          <p>3. Open the .pkg file and follow the instructions</p>
                          <h2>Verifying Installation</h2>
                          <p>Open a terminal and type <code>python --version</code>to verify your installation.</p> `,
                labels: ["python", "programming", "how to download python", "install python", "programming language"],
                category: "programs",
                credit: `<ol>
                         <li>Python Software Foundation</li>
                         <li>python website</li>
                        </ol> `
            },
            {
                id: 3,
                title: "Quantum Entanglement",
                image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "Spooky action at a distance that baffled even Einstein.",
                content: "<p>Quantum entanglement is a physical phenomenon that occurs when pairs or groups of particles are generated or interact in ways such that the quantum state of each particle cannot be described independently of the state of the others, even when the particles are separated by a large distance.</p><img src='https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Albert Einstein famously called this 'spooky action at a distance' as it seemed to violate the speed of light limit imposed by his theory of relativity. However, quantum mechanics has been experimentally verified many times.</p><p>Potential applications include quantum computing, quantum cryptography, and quantum teleportation.</p>",
                labels: ["quantum", "physics", "science", "entanglement"],
                category: "science",
                credit: "CERN"
            },
            {
                id: 4,
                title: "The Human Brain",
                image: "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "The most complex object in the known universe.",
                content: "<p>The human brain weighs about 3 pounds (1.4 kilograms) and contains approximately 86 billion neurons. Each neuron connects to thousands of other neurons, forming an incredibly complex network.</p><img src='https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>The brain consumes about 20% of the body's energy despite being only 2% of its weight. It processes information at speeds up to 120 meters per second.</p><p>Interesting facts:</p><ul><li>The brain is about 75% water</li><li>It generates about 12-25 watts of electricity</li><li>There are no pain receptors in the brain itself</li><li>The brain is more active at night than during the day</li></ul>",
                labels: ["brain", "neuroscience", "science", "human body"],
                category: "science",
                credit: "National Institute of Health"
            },
            {
                id: 5,
                title: "Black Holes",
                image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "Regions of spacetime where gravity is so strong that nothing can escape.",
                content: "<p>A black hole is a region of spacetime exhibiting gravitational acceleration so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it. The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole.</p><img src='https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Black holes of stellar mass are expected to form when very massive stars collapse at the end of their life cycle. After a black hole has formed, it can continue to grow by absorbing mass from its surroundings.</p><p>In 2019, the first ever direct image of a black hole was captured by the Event Horizon Telescope, showing the supermassive black hole at the center of Messier 87 galaxy.</p>",
                labels: ["black hole", "space", "astrophysics", "event horizon"],
                category: "space",
                credit: "Event Horizon Telescope Collaboration"
            },
            {
                id: 6,
                title: "The Fibonacci Sequence",
                image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "Nature's favorite numbers appear everywhere from flowers to galaxies.",
                content: "<p>The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1. That is: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, and so on.</p><img src='https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>This sequence appears unexpectedly in mathematics and in nature. Examples include:</p><ul><li>The arrangement of leaves on a stem</li><li>The pattern of florets in a sunflower</li><li>The spiral of a nautilus shell</li><li>The branching of trees</li></ul><p>The ratio of successive Fibonacci numbers approaches the golden ratio (approximately 1.618), which appears frequently in art and architecture.</p>",
                labels: ["mathematics", "numbers", "nature", "patterns"],
                category: "facts",
                credit: "Wikimedia Commons"
            },
            {
                id: 7,
                title: "JavaScript Basics",
                image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "Introduction to the language that powers the modern web.",
                content: "<p>JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web.</p><img src='https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Key features of JavaScript:</p><ul><li>Lightweight, interpreted language</li><li>Object-oriented programming support</li><li>Client-side execution</li><li>Event-driven programming</li><li>Prototype-based inheritance</li></ul><p>JavaScript can be used for:</p><ul><li>Adding interactive behavior to web pages</li><li>Creating web and mobile apps</li><li>Building web servers and server applications</li><li>Game development</li></ul>",
                labels: ["javascript", "programming", "web development", "coding"],
                category: "programs",
                credit: "Mozilla Developer Network"
            },
            {
                id: 8,
                title: "The Great Pyramid",
                image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "The last remaining wonder of the ancient world.",
                content: "<p>The Great Pyramid of Giza is the oldest and largest of the three pyramids in the Giza pyramid complex bordering present-day Giza in Greater Cairo, Egypt. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact.</p><img src='https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Built as a tomb for the Fourth Dynasty Egyptian pharaoh Khufu, the pyramid was constructed over a 20-year period concluding around 2560 BCE. Originally standing at 146.5 meters (481 feet), it was the tallest man-made structure in the world for more than 3,800 years.</p><p>Interesting facts:</p><ul><li>Contains an estimated 2.3 million stone blocks</li><li>The sides are aligned almost exactly with the cardinal directions</li><li>The mortar used is of unknown origin (chemical analysis shows it doesn't match any known Egyptian material)</li><li>The temperature inside is a constant 20°C (68°F)</li></ul>",
                labels: ["pyramid", "egypt", "history", "architecture"],
                category: "facts",
                credit: "Egyptian Ministry of Antiquities"
            },
            {
                id: 9,
                title: "Neural Networks",
                image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "How machines learn to think like humans (sort of).",
                content: "<p>A neural network is a series of algorithms that endeavors to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates. In this sense, neural networks refer to systems of neurons, either organic or artificial in nature.</p><img src='https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Neural networks can adapt to changing input; so the network generates the best possible result without needing to redesign the output criteria.</p><p>Applications include:</p><ul><li>Image recognition</li><li>Speech recognition</li><li>Medical diagnosis</li><li>Financial forecasting</li><li>Autonomous vehicles</li></ul>",
                labels: ["ai", "machine learning", "neural networks", "technology"],
                category: "programs",
                credit: "DeepMind Technologies"
            },
            {
                id: 10,
                title: "The Solar System",
                image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "Our cosmic neighborhood in the Milky Way galaxy.",
                content: "<p>The Solar System is the gravitationally bound system of the Sun and the objects that orbit it, either directly or indirectly. Of the objects that orbit the Sun directly, the largest are the eight planets, with the remainder being smaller objects, the dwarf planets and small Solar System bodies.</p><img src='https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>The four smaller inner planets (Mercury, Venus, Earth and Mars) are terrestrial planets, being primarily composed of rock and metal. The four outer planets are giant planets, being substantially more massive than the terrestrials.</p><p>Interesting facts:</p><ul><li>99.86% of the Solar System's mass is in the Sun</li><li>Jupiter's Great Red Spot is a storm that has raged for at least 350 years</li><li>Saturn's rings are made mostly of ice particles</li><li>Uranus rotates on its side</li></ul>",
                labels: ["solar system", "planets", "space", "astronomy"],
                category: "space",
                credit: "NASA"
            },
            {
                id: 11,
                title: "The Periodic Table",
                image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "The organized array of all known chemical elements.",
                content: "<p>The periodic table is a tabular arrangement of the chemical elements, ordered by their atomic number, electron configuration, and recurring chemical properties. This ordering shows periodic trends, such as elements with similar behavior in the same column.</p><img src='https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>The table is divided into four blocks: s-block, p-block, d-block, and f-block. The rows are called periods, and the columns are called groups. Elements in the same group have similar chemical properties.</p><p>Interesting facts:</p><ul><li>Dmitri Mendeleev is credited with creating the first widely recognized periodic table in 1869</li><li>Elements 95-118 are synthetic and don't occur naturally</li><li>Hydrogen is the most abundant element in the universe</li><li>Oxygen is the most abundant element in Earth's crust</li></ul>",
                labels: ["chemistry", "elements", "science", "periodic table"],
                category: "science",
                credit: "International Union of Pure and Applied Chemistry"
            },
            {
                id: 12,
                title: "HTML5 Features",
                image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "Modern web capabilities that revolutionized the internet.",
                content: "<p>HTML5 is the fifth and current major version of HTML, and subsumes XHTML. It introduces many new features including:</p><ul><li>Semantic elements like &lt;header&gt;, &lt;footer&gt;, &lt;article&gt;, and &lt;section&gt;</li><li>New form controls like calendar, date, time, email, and search</li><li>Support for audio and video without plugins (&lt;audio&gt; and &lt;video&gt; tags)</li><li>Canvas for 2D drawing and WebGL for 3D graphics</li><li>Local storage (localStorage and sessionStorage)</li><li>Geolocation API</li><li>Drag and drop functionality</li></ul><img src='https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>HTML5 is designed to be usable by all Open Web developers and to reduce the need for proprietary plug-in-based rich Internet application (RIA) technologies such as Adobe Flash.</p>",
                labels: ["html5", "web development", "programming", "coding"],
                category: "programs",
                credit: "World Wide Web Consortium"
            },
            {
                id: 13,
                title: "The Human Genome",
                image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a9e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "The complete set of genetic instructions for a human being.",
                content: "<p>The human genome is the complete set of nucleic acid sequences for humans, encoded as DNA within the 23 chromosome pairs in cell nuclei and in a small DNA molecule found within individual mitochondria. These are usually treated separately as the nuclear genome and the mitochondrial genome.</p><img src='https://images.unsplash.com/photo-1581093450021-4a7360e9a9e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>The Human Genome Project produced the first complete sequences of individual human genomes. As of 2020, the typical difference between an individual's genome and the reference genome was estimated at 20 million base pairs (or 0.6% of the total).</p><p>Interesting facts:</p><ul><li>The human genome contains about 3 billion base pairs</li><li>We share about 99.9% of our DNA with every other human</li><li>Only about 1.5% of the genome codes for proteins</li><li>We share about 98% of our DNA with chimpanzees</li></ul>",
                labels: ["genetics", "biology", "science", "dna"],
                category: "science",
                credit: "National Human Genome Research Institute"
            },
            {
                id: 14,
                title: "CSS Grid Layout",
                image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "Modern layout system for the web that revolutionized CSS.",
                content: "<p>CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward.</p><img src='https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Key features of CSS Grid:</p><ul><li>Fixed and flexible track sizes</li><li>Item placement (you can place items exactly where you want in the grid)</li><li>Creation of additional tracks to hold content</li><li>Alignment control</li><li>Control of overlapping content</li></ul><p>Grid works well with Flexbox. While Flexbox is for one-dimensional layouts (either a row or a column), Grid is for two-dimensional layouts (rows and columns at the same time).</p>",
                labels: ["css", "web design", "frontend", "programming"],
                category: "programs",
                credit: "Mozilla Developer Network"
            },
            {
                id: 15,
                title: "The Big Bang Theory",
                image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                preview: "The prevailing cosmological model for the observable universe.",
                content: "<p>The Big Bang theory is the prevailing cosmological model explaining the existence of the observable universe from the earliest known periods through its subsequent large-scale evolution. The model describes how the universe expanded from an initial state of high density and temperature.</p><img src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Key evidence for the Big Bang includes:</p><ul><li>The expansion of the universe (Hubble's Law)</li><li>The cosmic microwave background radiation</li><li>The abundance of light elements (hydrogen, helium, lithium)</li><li>The large-scale structure of the universe</li></ul><p>According to the theory, the universe was initially extremely hot and dense before space expanded rapidly. After this rapid expansion, the universe cooled sufficiently to allow the formation of subatomic particles, and later simple atoms.</p>",
                labels: ["cosmology", "big bang", "space", "physics"],
                category: "space",
                credit: "European Space Agency"
            },
            
    {
        id: 16,
        title: "The Hubble Deep Field",
        image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "The most important image ever taken by humanity.",
        content: "<p>The Hubble Deep Field is an image of a small region in the constellation Ursa Major, constructed from Hubble Space Telescope observations. It covers an area about 1/30th the diameter of the full Moon.</p><img src='https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>The image revealed about 3,000 galaxies, some of which are among the youngest and most distant known. By revealing such large numbers of very young galaxies, the HDF has become a landmark image in the study of the early universe.</p>",
        labels: ["hubble", "space", "astronomy", "deep field"],
        category: "space",
        credit: "NASA/ESA"
    },
    {
        id: 17,
        title: "Understanding Recursion",
        image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "To understand recursion, you must first understand recursion.",
        content: "<p>Recursion is a method where the solution to a problem depends on solutions to smaller instances of the same problem. In programming, a recursive function is one that calls itself.</p><img src='https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Common examples include calculating factorials, Fibonacci sequences, and traversing tree structures. Every recursive function must have:</p><ul><li>A base case (to stop the recursion)</li><li>A recursive case (that calls the function with a modified input)</li></ul><p>While powerful, recursion can lead to stack overflow if not implemented carefully.</p>",
        labels: ["recursion", "programming", "algorithms", "computer science"],
        category: "programs",
        credit: "Computer Science Fundamentals"
    },
    {
        id: 18,
        title: "Quantum Computing Basics",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "Computing at the atomic scale using quantum mechanics.",
        content: "<p>Quantum computers use quantum bits or qubits which can exist in superposition of states (both 0 and 1 simultaneously), unlike classical bits which are either 0 or 1.</p><img src='https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Key concepts:</p><ul><li>Superposition: Qubits can be in multiple states at once</li><li>Entanglement: Qubits can be linked, with the state of one affecting another</li><li>Quantum tunneling: Particles can pass through barriers</li></ul><p>Potential applications include drug discovery, optimization problems, and breaking current encryption methods.</p>",
        labels: ["quantum", "computing", "physics", "technology"],
        category: "science",
        credit: "IBM Quantum"
    },
    {
        id: 19,
        title: "The Voyager Golden Record",
        image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "A message to aliens aboard the Voyager spacecraft.",
        content: "<p>The Voyager Golden Records are phonograph records that were included aboard both Voyager spacecraft launched in 1977. They contain sounds and images selected to portray the diversity of life and culture on Earth.</p><img src='https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Contents include:</p><ul><li>115 images encoded in analog form</li><li>Natural sounds (surf, wind, thunder, animals)</li><li>Musical selections from different cultures</li><li>Spoken greetings in 55 languages</li><li>Printed messages from President Carter and U.N. Secretary General</li></ul>",
        labels: ["voyager", "space", "nasa", "golden record"],
        category: "space",
        credit: "NASA/JPL"
    },
    {
        id: 20,
        title: "CSS Flexbox Guide",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "Modern layout system for the web that revolutionized CSS.",
        content: "<p>Flexbox is a one-dimensional layout method for arranging items in rows or columns. Items flex to fill additional space or shrink to fit into smaller spaces.</p><img src='https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Key properties:</p><ul><li>display: flex - creates a flex container</li><li>flex-direction - row or column</li><li>justify-content - alignment along main axis</li><li>align-items - alignment along cross axis</li><li>flex-wrap - controls wrapping behavior</li></ul><p>Flexbox works well for component layouts, while Grid is better for page layouts.</p>",
        labels: ["css", "flexbox", "web design", "frontend"],
        category: "programs",
        credit: "Mozilla Developer Network"
    },
    {
        id: 21,
        title: "The Double-Slit Experiment",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "The experiment that revealed the wave-particle duality of matter.",
        content: "<p>The double-slit experiment demonstrates that light and matter can display characteristics of both classically defined waves and particles. It was first performed by Thomas Young in 1801 with light.</p><img src='https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Key findings:</p><ul><li>Light passing through two slits creates an interference pattern (wave behavior)</li><li>Even single photons produce interference (quantum weirdness)</li><li>The act of observation affects the outcome (wavefunction collapse)</li></ul><p>This experiment is fundamental to quantum mechanics.</p>",
        labels: ["quantum", "physics", "experiment", "science"],
        category: "science",
        credit: "Physics World"
    },
    {
        id: 22,
        title: "Git Version Control",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "The essential tool for modern software development.",
        content: "<p>Git is a distributed version control system that tracks changes in source code during software development. It was created by Linus Torvalds in 2005 for Linux kernel development.</p><img src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Key concepts:</p><ul><li>Repository: The database storing the complete history</li><li>Commit: A snapshot of changes at a point in time</li><li>Branch: Independent line of development</li><li>Merge: Combining branches</li><li>Remote: Shared repository (e.g., on GitHub)</li></ul><p>Basic commands: git init, git add, git commit, git push, git pull</p>",
        labels: ["git", "version control", "programming", "github"],
        category: "programs",
        credit: "Git Documentation"
    },
    {
        id: 23,
        title: "The Fermi Paradox",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "If aliens exist, where is everybody?",
        content: "<p>The Fermi Paradox is the apparent contradiction between the high probability of extraterrestrial civilizations and the lack of evidence for, or contact with, such civilizations.</p><img src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Possible explanations include:</p><ul><li>Intelligent life is extremely rare</li><li>Advanced civilizations destroy themselves</li><li>We're in a cosmic zoo being observed</li><li>They're here but we can't perceive them</li><li>The Great Filter lies ahead of us</li></ul><p>Named after physicist Enrico Fermi who famously asked 'Where is everybody?'</p>",
        labels: ["fermi", "space", "aliens", "paradox"],
        category: "space",
        credit: "SETI Institute"
    },
    {
        id: 24,
        title: "Neural Networks Explained",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "How machines learn to recognize patterns.",
        content: "<p>Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) that process information using dynamic state responses to external inputs.</p><img src='https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Key components:</p><ul><li>Input layer: Receives the data</li><li>Hidden layers: Perform computations</li><li>Output layer: Produces the result</li><li>Weights: Parameters that transform input data</li><li>Activation function: Determines neuron output</li></ul><p>Used for image recognition, speech processing, medical diagnosis, and more.</p>",
        labels: ["ai", "machine learning", "neural networks", "technology"],
        category: "programs",
        credit: "DeepMind Technologies"
    },
    {
        id: 25,
        title: "The Wow! Signal",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "The strongest candidate for an alien radio transmission.",
        content: "<p>The Wow! signal was a strong narrowband radio signal detected on August 15, 1977, by Ohio State University's Big Ear radio telescope. It appeared to come from the direction of the constellation Sagittarius.</p><img src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Characteristics:</p><ul><li>Lasted 72 seconds</li><li>Frequency of about 1420 MHz (hydrogen line)</li><li>Signal intensity variation matched telescope's beam pattern</li><li>Never detected again despite many attempts</li></ul><p>Named from astronomer Jerry Ehman's handwritten 'Wow!' on the printout.</p>",
        labels: ["wow signal", "space", "seti", "aliens"],
        category: "space",
        credit: "Ohio State University Radio Observatory"
    },
    {
        id: 26,
        title: "Blockchain Technology",
        image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "The decentralized ledger technology behind cryptocurrencies.",
        content: "<p>Blockchain is a growing list of records (blocks) linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data.</p><img src='https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Key features:</p><ul><li>Decentralized: No central authority</li><li>Immutable: Data cannot be altered</li><li>Transparent: All transactions are visible</li><li>Secure: Cryptographic protection</li></ul><p>Applications beyond cryptocurrency include smart contracts, supply chain tracking, and secure voting systems.</p>",
        labels: ["blockchain", "crypto", "technology", "bitcoin"],
        category: "programs",
        credit: "Bitcoin Whitepaper"
    },
    {
        id: 27,
        title: "The Drake Equation",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "Estimating the number of active, communicative extraterrestrial civilizations.",
        content: "<p>The Drake Equation is a probabilistic argument used to estimate the number of active, communicative extraterrestrial civilizations in the Milky Way galaxy.</p><img src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>The equation is: N = R* × fp × ne × fl × fi × fc × L</p><p>Where:</p><ul><li>R* = rate of star formation</li><li>fp = fraction with planetary systems</li><li>ne = planets that could support life</li><li>fl = planets where life develops</li><li>fi = intelligent life</li><li>fc = civilizations that develop technology</li><li>L = length of time civilizations release signals</li></ul>",
        labels: ["drake equation", "space", "aliens", "astronomy"],
        category: "space",
        credit: "SETI Institute"
    },
    {
        id: 28,
        title: "REST API Design",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "Principles for designing web APIs that follow REST architecture.",
        content: "<p>REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to GET, PUT, POST and DELETE data.</p><img src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Key principles:</p><ul><li>Client-server architecture</li><li>Statelessness: Each request contains all needed information</li><li>Cacheability: Responses define themselves as cacheable or not</li><li>Uniform interface: Resources identified in requests</li><li>Layered system: Client can't tell if connected to end server or intermediary</li></ul><p>Common HTTP methods: GET (read), POST (create), PUT (update), DELETE (remove)</p>",
        labels: ["rest", "api", "web development", "programming"],
        category: "programs",
        credit: "Roy Fielding's Dissertation"
    },
    {
        id: 29,
        title: "The Kardashev Scale",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "Measuring a civilization's level of technological advancement.",
        content: "<p>The Kardashev Scale is a method of measuring a civilization's level of technological advancement based on the amount of energy it is able to use.</p><img src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Three main types:</p><ul><li>Type I: Planetary civilization - can use all energy available on its planet (~10^16 watts)</li><li>Type II: Stellar civilization - can harness all energy from its star (~10^26 watts)</li><li>Type III: Galactic civilization - can control energy on the scale of its galaxy (~10^36 watts)</li></ul><p>Humanity is currently around 0.73 on the scale.</p>",
        labels: ["kardashev", "space", "civilization", "futurism"],
        category: "space",
        credit: "Nikolai Kardashev"
    },
    {
        id: 30,
        title: "Big O Notation",
        image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        preview: "Describing how algorithms scale with input size.",
        content: "<p>Big O notation is used in computer science to describe the performance or complexity of an algorithm. It describes the worst-case scenario of how long an algorithm takes to run or how much space it uses.</p><img src='https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' class='detail-image'><p>Common complexities:</p><ul><li>O(1): Constant time (hash table lookup)</li><li>O(log n): Logarithmic time (binary search)</li><li>O(n): Linear time (simple search)</li><li>O(n log n): Linearithmic time (efficient sorting)</li><li>O(n²): Quadratic time (simple sorting)</li><li>O(2ⁿ): Exponential time (traveling salesperson)</li></ul><p>Helps compare algorithm efficiency as input size grows.</p>",
        labels: ["big o", "algorithms", "computer science", "programming"],
        category: "programs",
        credit: "Computer Science Fundamentals"
    }
        ];
        
        // Current state
        let currentPage = 1;
        const itemsPerPage = 16;
        let currentFilter = "all";
        let filteredContent = [...contentData];
        
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
        
        // Initialize the page
        function init() {
            createStars();
            renderContent();
            setupEventListeners();
        }
        
        // Create starry background
        function createStars() {
            const starCount = 200;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                // Random position
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                
                // Random size (0.5px to 2px)
                const size = Math.random() * 1.5 + 0.5;
                
                // Random animation duration (1s to 5s)
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
            
            // Update pagination buttons
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = endIndex >= filteredContent.length;
        }
        
        // Setup event listeners
        function setupEventListeners() {
            // Search functionality
            searchInput.addEventListener('input', handleSearch);
            
            // Random content button
            randomBtn.addEventListener('click', showRandomContent);
            
            // Filter chips
            filterChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    filterChips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    currentFilter = chip.dataset.filter;
                    applyFilter();
                });
            });
            
            // Pagination
            prevBtn.addEventListener('click', () => {
                  if (currentPage > 1) {
                      currentPage--;
                      renderContent();
                      window.scrollTo(0, 0); // Only here
                  }
              });

              nextBtn.addEventListener('click', () => {
                  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
                  if (currentPage < totalPages) {
                      currentPage++;
                      renderContent();
                      window.scrollTo(0, 0); // Only here
                  }
              });
            
            // Content card click
            contentGrid.addEventListener('click', (e) => {
                const card = e.target.closest('.content-card');
                if (card) {
                    const contentId = parseInt(card.dataset.id);
                    showContentDetail(contentId);
                }
            });
            
            // Back button in detail view
            backButton.addEventListener('click', () => {
                contentDetail.style.display = 'none';
                document.body.classList.remove('noscroll');
                // Do NOT call window.scrollTo(0, 0) here
            });
        }
        
        // Handle search input
        function handleSearch() {
            const query = searchInput.value.toLowerCase();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            // Search in titles, previews, and labels
            const results = contentData.filter(item => 
                item.title.toLowerCase().includes(query) ||
                item.preview.toLowerCase().includes(query) ||
                item.labels.some(label => label.toLowerCase().includes(query))
            ).slice(0, 5); // Limit to 5 results
            
            if (results.length > 0) {
                searchResults.innerHTML = results.map(item => `
                    <div class="search-result-item" data-id="${item.id}">
                        <strong>${item.title}</strong><br>
                        <small>${item.preview}</small>
                    </div>
                `).join('');
                
                // Add click handlers to search results
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
            const randomIndex = Math.floor(Math.random() * contentData.length);
            showContentDetail(contentData[randomIndex].id);
        }
        
        // Apply category filter
        function applyFilter() {
            if (currentFilter === 'all') {
                filteredContent = [...contentData];
            } else {
                filteredContent = contentData.filter(item => item.category === currentFilter);
            }
            
            currentPage = 1;
            renderContent();
        }
        
        // Show content detail view
        function showContentDetail(contentId) {
            const content = contentData.find(item => item.id === contentId);
            if (!content) return;
            
            detailTitle.textContent = content.title;
            detailContent.innerHTML = content.content;
            creditSection.textContent = `Credit: ${content.credit}`;
            
            contentDetail.style.display = 'block';
            document.body.classList.add('noscroll'); // <-- Add this line
            window.scrollTo(0, 0);
        }
        
        // Initialize the app
        init();

    // Show content detail view
function showContentDetail(contentId) {
    const content = contentData.find(item => item.id === contentId);
    if (!content) return;

    detailTitle.textContent = content.title;
    detailContent.innerHTML = content.content;
    creditSection.textContent = `Credit: ${content.credit}`;

    contentDetail.style.display = 'block';
    document.body.classList.add('noscroll'); // <-- Add this line
    window.scrollTo(0, 0);
}

// Back button in detail view
backButton.addEventListener('click', () => {
    contentDetail.style.display = 'none';
    document.body.classList.remove('noscroll'); // <-- Add this line
});

// Open detail if hash is present on load
if (window.location.hash) {
    const idFromHash = parseInt(window.location.hash.replace('#', ''));
    if (!isNaN(idFromHash)) {
        showContentDetail(idFromHash);
    }
}

// Update hash when opening a detail
function showContentDetail(contentId) {
    const content = contentData.find(item => item.id === contentId);
    if (!content) return;

    detailTitle.textContent = content.title;
    detailContent.innerHTML = content.content;
    creditSection.innerHTML = `Credit: ${content.credit}`; // Use innerHTML here

    contentDetail.style.display = 'block';
    document.body.classList.add('noscroll');
    window.scrollTo(0, 0);

    // Update the hash in the URL
    window.location.hash = `#${contentId}`;
}

// Listen for hash changes (for back/forward navigation)
window.addEventListener('hashchange', () => {
    const idFromHash = parseInt(window.location.hash.replace('#', ''));
    if (!isNaN(idFromHash)) {
        showContentDetail(idFromHash);
    } else {
        contentDetail.style.display = 'none';
        document.body.classList.remove('noscroll');
    }
});

// Show content detail view
function showContentDetail(contentId, updateHash = true) {
    const content = contentData.find(item => item.id === contentId);
    if (!content) return;

    detailTitle.textContent = content.title;
    detailContent.innerHTML = content.content;
    creditSection.innerHTML = `Credit: ${content.credit}`; // Use innerHTML here

    contentDetail.style.display = 'block';
    document.body.classList.add('noscroll');
    if (updateHash) {
        window.location.hash = `#${contentId}`;
    }
}

// Back button in detail view
backButton.addEventListener('click', () => {
    contentDetail.style.display = 'none';
    document.body.classList.remove('noscroll');
    // Remove hash from URL
    history.replaceState(null, null, window.location.pathname);
});

// Open detail if hash is present on load
if (window.location.hash) {
    const idFromHash = parseInt(window.location.hash.replace('#', ''));
    if (!isNaN(idFromHash)) {
        showContentDetail(idFromHash, false);
    }
}

// Listen for hash changes (for back/forward navigation)
window.addEventListener('hashchange', () => {
    const idFromHash = parseInt(window.location.hash.replace('#', ''));
    if (!isNaN(idFromHash)) {
        showContentDetail(idFromHash, false);
    } else {
        contentDetail.style.display = 'none';
        document.body.classList.remove('noscroll');
    }
});