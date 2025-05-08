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
        { title: "C-LANGUAGE", link: "C-LANGUAGE.docx" },
        { title: "Excel--Labels-Values-and-Formulas", link: "Excel--Labels-Values-and-Formulas.doc" },
        { title: "Marketing Skill notes", link: "Marketing Skill notes.pdf" },
        { title: "NOTES -MSWORD-1", link: "NOTES -MSWORD-1.pdf" },
        { title: "office automation tools record programs", link: "office automation tools record programs.pdf" },
        { title: "office automation tools(1,2)", link: "office automation tools(1,2).pdf" },
        { title: "Edx", link: "Edx.pdf" },
      ],
      
    },
    3: {
      assignments: [
        { title: "DBMS Assignment(by SETHU)", link:"DBMS_assignment_by_SETHU.pdf"},
        { title: "JAVA Assignment(by SETHU)", link: "JAVA_assignment_by_SETHU.pdf"},
        { title: "MATHS Assignment(by SETHU)", link:"maths_assignment_by_SETHU.pdf"},
        { title: "ORGANISATION BEHAVIOUR Assignment(by SETHU)", link:"Organisation_Behaviour_assignment_by_SETHU.pdf"},
        { title: "SOFTWARE ENGINEERING Assignment(by SETHU)", link:"Software Engineer assignment (by SETHU).pdf"},
      ],
      notes: [
        {
          subject: "DATABASE MANAGEMENT SYSTEM",
          units: [
            { title: "Unit 1: Overview Of Database System", link: "Maths_Unit1.pdf" },
            { title: "Unit 2: Relational Model & Normalization", link: "Maths_Unit2.pdf" },
            { title: "Unit 3: Entity Relationship Model & Basic SQL", link: "Maths_Unit3.pdf" },
            { title: "Unit 4: SQL", link: "Maths_Unit4.pdf" },
            { title: "Unit 5: PS/SQL", link: "Maths_Unit5.pdf" },
          ]
        },
        {
          subject: "MATHEMATICAL AND STATISTICAL FOUNDATIONS",
          units: [
            { title: "Unit 1: Matrix Algebra-1", link: "Maths_Unit1.pdf" },
            { title: "Unit 2: Matrix Algebra-2", link: "Maths_Unit2.pdf" },
            { title: "Unit 3: Set Theory", link: "Maths_Unit3.pdf" },
            { title: "Unit 4: Basics Of Statistics", link: "Maths_Unit4.pdf" },
            { title: "Unit 5: Statistical Measures", link: "Maths_Unit5.pdf" }
          ]
        },
        {
          subject: "JAVA AND DATA STRUCTURES",
          units: [
            { title: "Unit 1: Introduction To OOPS", link: "Maths_Unit1.pdf" },
            { title: "Unit 2: Class and Objects & Inheritance & Interface", link: "Maths_Unit2.pdf" },
            { title: "Unit 3: Packages & Exception Handling & Applets", link: "Maths_Unit3.pdf" },
            { title: "Unit 4: Data Structure & Linear Data Structure", link: "Maths_Unit4.pdf" },
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
                        .map(unit => `  &nbsp; <li><a href="${unit.link}" target="_blank">${unit.title}</a></li>`)
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
                .map(item => `<li><a href="${item.link}" download target="_blank">${item.title}</a></li><br>`)
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
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'flex'
}
function hideSidebar(){
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'none'
}