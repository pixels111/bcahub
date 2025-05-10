document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('nav ul a'); // Select all menu links
  const semesterButtons = document.querySelectorAll('.semester-btn');
  const resourceSections = {
    assignments: document.getElementById('assignments-list'),
    notes: document.getElementById('notes-list'),
    pdfs: document.getElementById('pdfs-list'),
    records: document.getElementById('records-list'),
    syllabus: document.getElementById('syllabus-list'),
    questionPapers: document.getElementById('question-papers-list'),
  };
  menuLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active'); // Add 'active' class to the matching link
    } else {
      link.classList.remove('active'); // Remove 'active' class from non-matching links
    }
  });
  const semesterResources = {
    1: {
      
    },
    2: {
      pdfs: [
        { title: "C-LANGUAGE", link: "https://github.com/sethu369/bcahub/releases/download/bcahub/C_LANGUAGE.docx" },
        { title: "Excel--Labels-Values-and-Formulas", link: "sem_resources/Excel_Labels_Values_and_Formulas.doc" },
        { title: "Marketing Skill notes", link: "sem_resources/Marketing_Skill_notes.pdf" },
        { title: "NOTES -MSWORD-1", link: "sem_resources/NOTES_MSWORD-1.pdf" },
        { title: "office automation tools record programs", link: "sem_resources/officeautomationtoolsrecordprograms.pdf" },
        { title: "office automation tools(1,2)", link: "sem_resources/officeautomationtools(1,2).pdf" },
        { title: "Edx", link: "sem_resources/Edx.pdf" },
      ],
      
    },
    3: {
      assignments: [
        { title: "DBMS Assignment(by SETHU)", link:"sem_resources/DBMS_assignment_by_SETHU.pdf"},
        { title: "JAVA Assignment(by SETHU)", link: "sem_resources/JAVA_assignment_by_SETHU.pdf"},
        { title: "MATHS Assignment(by SETHU)", link:"sem_resources/maths_assignment_by_SETHU.pdf"},
        { title: "ORGANISATION BEHAVIOUR Assignment(by SETHU)", link:"sem_resources/Organisation_Behaviour_assignment_by_SETHU.pdf"},
        { title: "SOFTWARE ENGINEERING Assignment(by SETHU)", link:"sem_resources/Software Engineer assignment (by SETHU).pdf"},
      ],
      notes: [
        {
          subject: "DATABASE MANAGEMENT SYSTEM",
          units: [
            { title: "Unit 1: Overview Of Database System", link: "sem_resources/Maths_Unit1.pdf" },
            { title: "Unit 2: Relational Model & Normalization", link: "sem_resources/Maths_Unit2.pdf" },
            { title: "Unit 3: Entity Relationship Model & Basic SQL", link: "sem_resources/Maths_Unit3.pdf" },
            { title: "Unit 4: SQL", link: "Maths_Unit4.pdf" },
            { title: "Unit 5: PS/SQL", link: "Maths_Unit5.pdf" },
          ]
        },
        {
          subject: "MATHEMATICAL AND STATISTICAL FOUNDATIONS",
          units: [
            { title: "Unit 1: Matrix Algebra-1", link: "sem_resources/Maths_Unit1.pdf" },
            { title: "Unit 2: Matrix Algebra-2", link: "sem_resources/Maths_Unit2.pdf" },
            { title: "Unit 3: Set Theory", link: "sem_resources/Maths_Unit3.pdf" },
            { title: "Unit 4: Basics Of Statistics", link: "sem_resources/Maths_Unit4.pdf" },
            { title: "Unit 5: Statistical Measures", link: "sem_resources/Maths_Unit5.pdf" }
          ]
        },
        {
          subject: "JAVA AND DATA STRUCTURES",
          units: [
            { title: "Unit 1: Introduction To OOPS", link: "sem_resources/Maths_Unit1.pdf" },
            { title: "Unit 2: Class and Objects & Inheritance & Interface", link: "sem_resources/Maths_Unit2.pdf" },
            { title: "Unit 3: Packages & Exception Handling & Applets", link: "sem_resources/Maths_Unit3.pdf" },
            { title: "Unit 4: Data Structure & Linear Data Structure", link: "sem_resources/Maths_Unit4.pdf" },
            { title: "Unit 5: Trees and Graphs", link: "Maths_Unit5.pdf" }
          ]
        },
      ],
      pdfs: [
        { title: "PDF 1", link: "#" },
        { title: "PDF 2", link: "#" }
      ],
      records: [
        {
          subject: "Mathematics",
          pdf: { title: "Maths Record", link: "Maths_Record.pdf" }
        },
        {
          subject: "Physics",
          pdf: { title: "Physics Record", link: "Physics_Record.pdf" }
        }
      ],
      syllabus: {
        major: [
          { title: "Mathematics", link: "Mathematics_Syllabus.pdf" },
          { title: "Physics", link: "Physics_Syllabus.pdf" },
          { title: "Chemistry", link: "Chemistry_Syllabus.pdf" },
          { title: "Biology", link: "Biology_Syllabus.pdf" },
          { title: "Computer Science", link: "Computer_Science_Syllabus.pdf" }
        ],
        minor: [
          { title: "Environmental Science", link: "Environmental_Science_Syllabus.pdf" },
          { title: "Statistics", link: "Statistics_Syllabus.pdf" },
          { title: "Economics", link: "Economics_Syllabus.pdf" }
        ],
        skillCourse: [
          { title: "Python Programming", link: "Python_Programming_Syllabus.pdf" },
          { title: "Web Development", link: "Web_Development_Syllabus.pdf" },
          { title: "Data Science", link: "Data_Science_Syllabus.pdf" }
        ]
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
      notes: [
        {
          subject: "Mathematics",
          units: [
            { title: "Unit 1: Algebra", link: "Maths_Unit1.pdf" },
            { title: "Unit 2: Calculus", link: "Maths_Unit2.pdf" }
          ]
        },
        {
          subject: "Physics",
          units: [
            { title: "Unit 1: Mechanics", link: "Physics_Unit1.pdf" },
            { title: "Unit 2: Thermodynamics", link: "Physics_Unit2.pdf" }
          ]
        }
      ],
      pdfs: [
        { title: "PDF 1", link: "#" },
        { title: "PDF 2", link: "#" }
      ],
      records: [
        {
          subject: "Mathematics",
          pdf: { title: "Maths Record", link: "Maths_Record.pdf" }
        },
        {
          subject: "Physics",
          pdf: { title: "Physics Record", link: "Physics_Record.pdf" }
        }
      ],
      syllabus: {
        major: [
          { title: "Mathematics", link: "Mathematics_Syllabus.pdf" },
          { title: "Physics", link: "Physics_Syllabus.pdf" },
          { title: "Chemistry", link: "Chemistry_Syllabus.pdf" },
          { title: "Biology", link: "Biology_Syllabus.pdf" },
          { title: "Computer Science", link: "Computer_Science_Syllabus.pdf" }
        ],
        minor: [
          { title: "Environmental Science", link: "Environmental_Science_Syllabus.pdf" },
          { title: "Statistics", link: "Statistics_Syllabus.pdf" },
          { title: "Economics", link: "Economics_Syllabus.pdf" }
        ],
        skillCourse: [
          { title: "Python Programming", link: "Python_Programming_Syllabus.pdf" },
          { title: "Web Development", link: "Web_Development_Syllabus.pdf" },
          { title: "Data Science", link: "Data_Science_Syllabus.pdf" }
        ]
      },
      questionPapers: [
        { title: "Question Paper 1", link: "#" },
        { title: "Question Paper 2", link: "#" }
      ]
    },
    5: {
      
    },
    6: {
      
    },
    6: {
      
    },
    7: {

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
                  <li><strong>
                    ${subject.subject}</strong>
                    <ul>
                      ${subject.units
                        .map(unit => `  &nbsp; <li> <a href="#" onclick="downloadAndRedirect('${unit.link}');" target="_blank">${unit.title}</a></li>`)
                        .join('')}
                    </ul>
                  </li><br>
                `)
                .join('');
            } else if (section === "records") {
              // Render records with PDFs
              sectionElement.innerHTML = resourceData
                .map(record => `
                  <li><strong>
                    ${record.subject}</strong>
                    <ul><br>
                      <li><a href="${record.pdf.link}" target="_blank">${record.pdf.title}</a></li>
                    </ul>
                  </li><br>
                `)
                .join('');
            } else if (section === "syllabus") {
              // Render syllabus with major, minor, and skill courses
              sectionElement.innerHTML = `
                <li><strong>Major</strong>
                  <ul><br>
                    ${resourceData.major
                      .map(subject => `<li><a href="${subject.link}" target="_blank">${subject.title}</a></li><br>`)
                      .join('')}
                  </ul>
                </li>
                <li><strong>Minor</strong>
                  <ul><br>
                    ${resourceData.minor
                      .map(subject => `<li><a href="${subject.link}" target="_blank">${subject.title}</a></li><br>`)
                      .join('')}
                  </ul>
                </li><br>
                <li><strong>Skill Course</strong>
                  <ul><br>
                    ${resourceData.skillCourse
                      .map(subject => `<li><a href="${subject.link}" target="_blank">${subject.title}</a></li><br>`)
                      .join('')}
                  </ul>
                </li>
              `;
            } else {
              // Render other sections
              sectionElement.innerHTML = resourceData
                .map(item => `<li><a href="#" onclick="downloadAndRedirect('${item.link}');">${item.title}</a></li><br>`)
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

function showSidebar(){
  document.querySelector('.sidebar').classList.add('active');
  document.querySelector('.socials-container').style.display = 'none';
}
function hideSidebar(){
  document.querySelector('.sidebar').classList.remove('active');
  document.querySelector('.socials-container').style.display = 'flex';
}
function downloadAndRedirect(link) {
  const a = document.createElement('a');
  a.href = link;
  a.target = '_blank';
  a.rel = 'noopener';
  document.body.appendChild(a); // must append to DOM
  a.click(); // trigger download
  a.remove(); // clean up

  // Redirect after delay (3 seconds)
  setTimeout(() => {
    window.location.href = 'https://sethu369.github.io/bcahub/resources.html'; // update this to your real redirect page
  }, 6000);
}
