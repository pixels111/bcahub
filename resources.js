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
        { title: "C-LANGUAGE", link:"https://dl.dropboxusercontent.com/scl/fi/z2m7j9sa8xbjq4swl4dyo/C-LANGUAGE.pdf?rlkey=xi8zcjnv2my6rjiae1foccl8y"},
        { title: "Excel--Labels-Values-and-Formulas", link: "https://dl.dropboxusercontent.com/scl/fi/wnq4paupt63o0whurdfyr/Excel-Labels-Values-and-Formulas.pdf?rlkey=p8oji5451azal04snrxu0828e" },
        { title: "Marketing Skill notes", link: "https://dl.dropboxusercontent.com/scl/fi/us3n5ifd32onyhk957zwv/Marketing-Skill-notes.pdf?rlkey=cx0wz53y709qurdpzzw7lmol9" },
        { title: "NOTES-MSWORD-1", link: "https://dl.dropboxusercontent.com/scl/fi/rcwogg4jnts2un9amshf8/NOTES-MSWORD-1.pdf?rlkey=9y6z6kcc7sitdlsxdhb0nfext" },
        { title: "office automation tools record programs", link: "https://dl.dropboxusercontent.com/scl/fi/fucn32cn6e2wn6yakcpiq/office-automation-tools-record-programs.pdf?rlkey=gk9c0yfuicij26yddr6mc8oty" },
        { title: "office automation tools(1,2)", link: "https://dl.dropboxusercontent.com/scl/fi/8088usd1q4gtc5pjr5qu8/office-automation-tools-1-2.pdf?rlkey=d90f9ty30vmt3f7qb1i582nz9" },
        { title: "Edx", link: "https://dl.dropboxusercontent.com/scl/fi/31pcuehlbvi1j4f7rnsf7/Edx.pdf?rlkey=q3y0248eiovehl6p8e9wn10d3" },
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
        {
          subject: "SOFTWARE ENGINEERING",
          units: [
            { title: "Unit 1: Introduction To Software Engineering", link: "sem_resources/Maths_Unit1.pdf" },
            { title: "Unit 2: Software Cost Estimation", link: "sem_resources/Maths_Unit2.pdf" },
            { title: "Unit 3: Software Design", link: "sem_resources/Maths_Unit3.pdf" },
            { title: "Unit 4: User Interface Design & Real Time System", link: "sem_resources/Maths_Unit4.pdf" },
            { title: "Unit 5: Software Quality & Testing", link: "Maths_Unit5.pdf" }
          ]
        },
        {
          subject: "ORGANISATIONAL BEHAVIOUR",
          units: [
            { title: "Unit 1: Organizational Behaviour", link: "sem_resources/Maths_Unit1.pdf" },
            { title: "Unit 2: Group Dynamics", link: "sem_resources/Maths_Unit2.pdf" },
            { title: "Unit 3: Leadership", link: "sem_resources/Maths_Unit3.pdf" },
            { title: "Unit 4: Management of Change", link: "sem_resources/Maths_Unit4.pdf" },
            { title: "Unit 5: Organizational culture", link: "Maths_Unit5.pdf" }
          ]
        },
        {
          subject: "HEALTH AND HYGIENE",
          units: [
            { title: "Unit 1: Basic Of Nutrition", link: "sem_resources/Maths_Unit1.pdf" },
            { title: "Unit 2: Health", link: "sem_resources/Maths_Unit2.pdf" },
            { title: "Unit 3: Hygiene", link: "sem_resources/Maths_Unit3.pdf" },
          ]
        },
        {
          subject: "PROJECT MANAGEMENT",
          units: [
            { title: "Project Management(All Units)", link: "sem_resources/Maths_Unit1.pdf" },
          ]
        },
      ],
      pdfs: [
        { title: "Applet", link: "#" },
        { title: "DBMS(1-3)", link: "#" },
        { title: "Graph", link: "#" },
        { title: "Java 1st Unit", link: "#" },
      ],
      records: [
        {
          subject: "DATABASE MANAGEMENT SYSTEM",
          pdf: { title: "DBMS Record (by SETHU)", link: "Maths_Record.pdf" },
          pdf: { title: "DBMS Record (source file)", link: "Maths_Record.pdf" }

        },
        {
          subject: "JAVA AND DATA STRUCTURES",
          pdf: { title: "JAVA Record (by SETHU)", link: "Physics_Record.pdf" }
        },
        {
          subject: "MATHEMATICAL AND STATISTICAL FOUNDATIONS",
          pdf: { title: "Maths Record (by SETHU)", link: "Physics_Record.pdf" },
          pdf: { title: "Maths Record (source file)", link: "Maths_Record.pdf" }
        },
        {
          subject: "SOFTWARE ENGINEERING",
          pdf: { title: "SOFTWARE ENGINEERING Record (by SETHU)", link: "Physics_Record.pdf" }
        }
      ],
      syllabus: {
        major: [
          { title: "DATABASE MANAGEMENT SYSTEM", link: "Mathematics_Syllabus.pdf" },
          { title: "JAVA AND DATA STRUCTURES", link: "Physics_Syllabus.pdf" },
          { title: "MATHEMATICAL AND STATISTICAL FOUNDATIONS", link: "Chemistry_Syllabus.pdf" },
          { title: "SOFTWARE ENGINEERING", link: "Biology_Syllabus.pdf" },
        ],
        minor: [
          { title: "ORGANISATIONAL BEHAVIOUR", link: "Environmental_Science_Syllabus.pdf" },
        ],
        skillCourse: [
          { title: "HEALTH AND HYGIENE", link: "Python_Programming_Syllabus.pdf" },
          { title: "PROJECT MANAGEMENT", link: "Web_Development_Syllabus.pdf" },
        ]
      },
      questionPapers: [
        { title: "Semester Exam Question Papers", link: "#" },
        { title: "Internal Exam Question Papers", link: "#" }
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
                        .map(unit => `  &nbsp; <li> <a href="${unit.link}" download>${unit.title}</a></li>`)
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
                      <li><a href="${record.pdf.link}" >${record.pdf.title}</a></li>
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
                      .map(subject => `<li><a href="${subject.link}" >${subject.title}</a></li><br>`)
                      .join('')}
                  </ul>
                </li>
                <li><strong>Minor</strong>
                  <ul><br>
                    ${resourceData.minor
                      .map(subject => `<li><a href="${subject.link}" >${subject.title}</a></li><br>`)
                      .join('')}
                  </ul>
                </li><br>
                <li><strong>Skill / Multidisciplinary Course</strong>
                  <ul><br>
                    ${resourceData.skillCourse
                      .map(subject => `<li><a href="${subject.link}" >${subject.title}</a></li><br>`)
                      .join('')}
                  </ul>
                </li>
              `;
            } else {
              // Render other sections
              sectionElement.innerHTML = resourceData
                .map(item => `<li><a href="${item.link}">${item.title}</a></li><br>`)
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
