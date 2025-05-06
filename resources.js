document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('click-sound');
  const semesterButtons = document.querySelectorAll('.semester-btn');
  const resourceSections = {
    assignments: document.getElementById('assignments-list'),
    notes: document.getElementById('notes-list'),
    pdfs: document.getElementById('pdfs-list'),
    records: document.getElementById('records-list'),
    syllabus: document.getElementById('syllabus-list'),
    questionPapers: document.getElementById('question-papers-list'),
  };

  // Play click sound on all anchor and button clicks
  document.querySelectorAll('a, button').forEach(elem => {
    elem.addEventListener('click', () => {
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }
    });
  });

  // Ensure the side navigation is hidden on page load
  const sideNav = document.getElementById("mySidenav");
  sideNav.style.width = "0"; // Always hidden initially

  const semesterResources = {
    1: {
      assignments: [
        { title: "Assignment 1", link: "#" },
        { title: "Assignment 2", link: "#" }
      ],
      notes: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        units: [
          { title: `Unit 1`, link: "#" },
          { title: `Unit 2`, link: "#" }
        ]
      })),
      pdfs: [
        { title: "PDF 1", link: "#" },
        { title: "PDF 2", link: "#" }
      ],
      
      records: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        pdf: { title: `PDF`, link: "#" }
      })),
      syllabus: {
        major: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        minor: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        skillCourse: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`)
      },
      questionPapers: [
        { title: "Question Paper 1", link: "#" },
        { title: "Question Paper 2", link: "#" }
      ]
    },
    2: {
      assignments: [
        { title: "Assignment 1", link: "#" },
        { title: "Assignment 2", link: "#" }
      ],
      notes: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        units: [
          { title: `Unit 1`, link: "#" },
          { title: `Unit 2`, link: "#" }
        ]
      })),
      pdfs: [
        { title: "PDF 1", link: "#" },
        { title: "PDF 2", link: "#" }
      ],
      
      records: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        pdf: { title: `PDF`, link: "#" }
      })),
      syllabus: {
        major: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        minor: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        skillCourse: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`)
      },
      questionPapers: [
        { title: "Question Paper 1", link: "#" },
        { title: "Question Paper 2", link: "#" }
      ]
    },
    3: {
      assignments: [
        { title: "DBMS assignment(by SETHU)", link:"DBMS_assignment_by_SETHU.pdf"},
        { title: "Assignment 2", link: "#" }
      ],
      notes: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        units: [
          { title: `Unit 1`, link: "DBMS assignment(by SETHU).pdf" },
          { title: `Unit 2`, link: "#" }
        ]
      })),
      pdfs: [
        { title: "PDF 1", link: "#" },
        { title: "PDF 2", link: "#" }
      ],
      
      records: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        pdf: { title: `PDF`, link: "#" }
      })),
      syllabus: {
        major: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        minor: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        skillCourse: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`)
      },
      questionPapers: [
        { title: "Question Paper 1", link: "#" },
        { title: "Question Paper 2", link: "#" }
      ]
    },
    4: {
      assignments: [
        { title: "Assignment 1", link: "#" },
        { title: "Assignment 2", link: "#" }
      ],
      notes: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        units: [
          { title: `Unit 1`, link: "#" },
          { title: `Unit 2`, link: "#" }
        ]
      })),
      pdfs: [
        { title: "PDF 1", link: "#" },
        { title: "PDF 2", link: "#" }
      ],
      
      records: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        pdf: { title: `PDF`, link: "#" }
      })),
      syllabus: {
        major: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        minor: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        skillCourse: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`)
      },
      questionPapers: [
        { title: "Question Paper 1", link: "#" },
        { title: "Question Paper 2", link: "#" }
      ]
    },
    5: {
      assignments: [
        { title: "Assignment 1", link: "#" },
        { title: "Assignment 2", link: "#" }
      ],
      notes: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        units: [
          { title: `Unit 1`, link: "#" },
          { title: `Unit 2`, link: "#" }
        ]
      })),
      pdfs: [
        { title: "PDF 1", link: "#" },
        { title: "PDF 2", link: "#" }
      ],
      
      records: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        pdf: { title: `PDF`, link: "#" }
      })),
      syllabus: {
        major: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        minor: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        skillCourse: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`)
      },
      questionPapers: [
        { title: "Question Paper 1", link: "#" },
        { title: "Question Paper 2", link: "#" }
      ]
    },
    6: {
      assignments: [
        { title: "Assignment 1", link: "#" },
        { title: "Assignment 2", link: "#" }
      ],
      notes: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        units: [
          { title: `Unit 1`, link: "#" },
          { title: `Unit 2`, link: "#" }
        ]
      })),
      pdfs: [
        { title: "PDF 1", link: "#" },
        { title: "PDF 2", link: "#" }
      ],
      
      records: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        pdf: { title: `PDF`, link: "#" }
      })),
      syllabus: {
        major: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        minor: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        skillCourse: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`)
      },
      questionPapers: [
        { title: "Question Paper 1", link: "#" },
        { title: "Question Paper 2", link: "#" }
      ]
    },
    7: {
      assignments: [
        { title: "Assignment 1", link: "#" },
        { title: "Assignment 2", link: "#" }
      ],
      notes: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        units: [
          { title: `Unit 1`, link: "#" },
          { title: `Unit 2`, link: "#" }
        ]
      })),
      pdfs: [
        { title: "PDF 1", link: "#" },
        { title: "PDF 2", link: "#" }
      ],
      
      records: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        pdf: { title: `PDF`, link: "#" }
      })),
      syllabus: {
        major: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        minor: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        skillCourse: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`)
      },
      questionPapers: [
        { title: "Question Paper 1", link: "#" },
        { title: "Question Paper 2", link: "#" }
      ]
    },
    8: {
      assignments: [
        { title: "Assignment 1", link: "#" },
        { title: "Assignment 2", link: "#" }
      ],
      notes: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        units: [
          { title: `Unit 1`, link: "#" },
          { title: `Unit 2`, link: "#" }
        ]
      })),
      pdfs: [
        { title: "PDF 1", link: "#" },
        { title: "PDF 2", link: "#" }
      ],
      
      records: Array.from({ length: 7 }, (_, i) => ({
        subject: `Subject ${i + 1}`,
        pdf: { title: `PDF`, link: "#" }
      })),
      syllabus: {
        major: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        minor: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`),
        skillCourse: Array.from({ length: 7 }, (_, i) => `Subject ${i + 1}`)
      },
      questionPapers: [
        { title: "Question Paper 1", link: "#" },
        { title: "Question Paper 2", link: "#" }
      ]
    },
    // Add similar structure for other semesters
  };

  semesterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const semester = button.getAttribute('data-sem');
      const resources = semesterResources[semester];

      if (resources) {
        Object.keys(resourceSections).forEach(section => {
          const sectionElement = resourceSections[section];
          const resourceData = resources[section];

          if (resourceData) {
            if (section === "notes") {
              // Render notes with sublist
              sectionElement.innerHTML = resourceData
                .map(subject => `
                  <li>
                    ${subject.subject}
                    <ul>
                      ${subject.units
                        .map(unit => `<li><a href="${unit.link}" target="_blank">${unit.title}</a></li>`)
                        .join('')}
                    </ul>
                  </li>
                `)
                .join('');
            } else if (section === "records") {
              // Render records with PDFs
              sectionElement.innerHTML = resourceData
                .map(record => `
                  <li>
                    ${record.subject}
                    <ul>
                      <li><a href="${record.pdf.link}" target="_blank">${record.pdf.title}</a></li>
                    </ul>
                  </li>
                `)
                .join('');
            } else if (section === "syllabus") {
              // Render syllabus with major, minor, and skill courses
              sectionElement.innerHTML = `
                <li>Major
                  <ul>
                    ${resourceData.major
                      .map(subject => `<li>${subject}</li>`)
                      .join('')}
                  </ul>
                </li>
                <li>Minor
                  <ul>
                    ${resourceData.minor
                      .map(subject => `<li>${subject}</li>`)
                      .join('')}
                  </ul>
                </li>
                <li>Skill Course
                  <ul>
                    ${resourceData.skillCourse
                      .map(subject => `<li>${subject}</li>`)
                      .join('')}
                  </ul>
                </li>
              `;
            } else {
              // Render other sections
              sectionElement.innerHTML = resourceData
                .map(item => `<li><a href="${item.link}" download target="_blank">${item.title}</a></li>`)
                .join('');
            }
          } else {
            sectionElement.innerHTML = '<p>No resources available.</p>';
          }
        });
      }
    });
  });
});

function toggleNav() {
  const sideNav = document.getElementById("mySidenav");
  if (sideNav.style.width === "250px") {
    sideNav.style.width = "0";
  } else {
    sideNav.style.width = "250px";
  }
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function toggleDropdown(element) {
  const parent = element.parentElement;
  parent.classList.toggle("open");
}