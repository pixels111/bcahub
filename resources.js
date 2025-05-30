document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const semesterHeader = document.getElementById('semester-header');
    const semesterOptions = document.getElementById('semester-options');
    const resourceHeader = document.getElementById('resource-header');
    const resourceOptions = document.getElementById('resource-options');
    const selectedSemSpan = document.getElementById('selected-sem');
    const selectedResourceSpan = document.getElementById('selected-resource');
    const selectionMessage = document.getElementById('selection-message');
    const resourcesContainer = document.getElementById('resources-container');
    
    // Sample data for resources with links
    const resourceData = {
        assignments: {
               
          
            3: [
                { name: "DBMS Assignment", link:"sem_resources/DBMS_assignment_by_SETHU.pdf"},
                { name: "JAVA Assignment", link: "sem_resources/JAVA_assignment_by_SETHU.pdf"},
                { name: "MATHS Assignment", link:"sem_resources/maths_assignment_by_SETHU.pdf"},
                { name: "ORGANISATION BEHAVIOUR Assignment", link:"sem_resources/Organisation_Behaviour_assignment_by_SETHU.pdf"},
                { name: "SOFTWARE ENGINEERING Assignment", link:"sem_resources/Software Engineer assignment .pdf"},
            ],
            4: [
                { name: "4 sem", link:"sem_resources/DBMS_assignment_by_SETHU.pdf"},
                { name: "4 sem", link: "sem_resources/JAVA_assignment_by_SETHU.pdf"},
                { name: "4 sem", link:"sem_resources/maths_assignment_by_SETHU.pdf"},
                { name: "4 sem", link:"sem_resources/Organisation_Behaviour_assignment_by_SETHU.pdf"},
                { name: "4 sem", link:"sem_resources/Software Engineer assignment .pdf"},
            ],
           
        },
        notes: {
            
            3: {
                "DATABASE MANAGEMENT SYSTEM": [
            { name: "Unit 1: Overview Of Database System", link: "sem_resources/Maths_Unit1.pdf" },
            { name: "Unit 2: Relational Model & Normalization", link: "sem_resources/Maths_Unit2.pdf" },
            { name: "Unit 3: Entity Relationship Model & Basic SQL", link: "sem_resources/Maths_Unit3.pdf" },
            { name: "Unit 4: SQL", link: "Maths_Unit4.pdf" },
            { name: "Unit 5: PS/SQL", link: "Maths_Unit5.pdf" },
                ],
                
                "MATHEMATICAL AND STATISTICAL FOUNDATIONS": [
            { name: "Unit 1: Matrix Algebra-1", link: "sem_resources/Maths_Unit1.pdf" },
            { name: "Unit 2: Matrix Algebra-2", link: "sem_resources/Maths_Unit2.pdf" },
            { name: "Unit 3: Set Theory", link: "sem_resources/Maths_Unit3.pdf" },
            { name: "Unit 4: Basics Of Statistics", link: "sem_resources/Maths_Unit4.pdf" },
            { name: "Unit 5: Statistical Measures", link: "sem_resources/Maths_Unit5.pdf" }
                ],
                 "JAVA AND DATA STRUCTURES": [
            { name: "Unit 1: Introduction To OOPS", link: "sem_resources/Maths_Unit1.pdf" },
            { name: "Unit 2: Class and Objects & Inheritance & Interface", link: "sem_resources/Maths_Unit2.pdf" },
            { name: "Unit 3: Packages & Exception Handling & Applets", link: "sem_resources/Maths_Unit3.pdf" },
            { name: "Unit 4: Data Structure & Linear Data Structure", link: "sem_resources/Maths_Unit4.pdf" },
            { name: "Unit 5: Trees and Graphs", link: "Maths_Unit5.pdf" }
                 ],
                  "SOFTWARE ENGINEERING": [
            { name: "Unit 1: Introduction To Software Engineering", link: "sem_resources/Maths_Unit1.pdf" },
            { name: "Unit 2: Software Cost Estimation", link: "sem_resources/Maths_Unit2.pdf" },
            { name: "Unit 3: Software Design", link: "sem_resources/Maths_Unit3.pdf" },
            { name: "Unit 4: User Interface Design & Real Time System", link: "sem_resources/Maths_Unit4.pdf" },
            { name: "Unit 5: Software Quality & Testing", link: "Maths_Unit5.pdf" }
          ],
                  "ORGANISATIONAL BEHAVIOUR" : [
            { name: "Unit 1: Organizational Behaviour", link: "sem_resources/Maths_Unit1.pdf" },
            { name: "Unit 2: Group Dynamics", link: "sem_resources/Maths_Unit2.pdf" },
            { name: "Unit 3: Leadership", link: "sem_resources/Maths_Unit3.pdf" },
            { name: "Unit 4: Management of Change", link: "sem_resources/Maths_Unit4.pdf" },
            { name: "Unit 5: Organizational culture", link: "Maths_Unit5.pdf" }
          ],
                 "HEALTH AND HYGIENE" : [
            { name: "Unit 1: Basic Of Nutrition", link: "sem_resources/Maths_Unit1.pdf" },
            { name: "Unit 2: Health", link: "sem_resources/Maths_Unit2.pdf" },
            { name: "Unit 3: Hygiene", link: "sem_resources/Maths_Unit3.pdf" },
          ],
                 "PROJECT MANAGEMENT" : [
            { name: "Project Management (All Units)", link: "sem_resources/Maths_Unit1.pdf" },
          ],

            },

        },
        pdfs: {
           
            2: [
                { name: "C-LANGUAGE", link:"https://drive.google.com/uc?id=1DqnrX2_fDLlUqzUHK21vu_ms_As3bUuu"},
                { name: "Excel--Labels-Values-and-Formulas", link: "https://dl.dropboxusercontent.com/scl/fi/wnq4paupt63o0whurdfyr/Excel-Labels-Values-and-Formulas.pdf?rlkey=p8oji5451azal04snrxu0828e" },
                { name: "Marketing Skill notes", link: "https://dl.dropboxusercontent.com/scl/fi/us3n5ifd32onyhk957zwv/Marketing-Skill-notes.pdf?rlkey=cx0wz53y709qurdpzzw7lmol9" },
                { name: "NOTES-MSWORD-1", link: "https://dl.dropboxusercontent.com/scl/fi/rcwogg4jnts2un9amshf8/NOTES-MSWORD-1.pdf?rlkey=9y6z6kcc7sitdlsxdhb0nfext" },
                { name: "office automation tools record programs", link: "https://dl.dropboxusercontent.com/scl/fi/fucn32cn6e2wn6yakcpiq/office-automation-tools-record-programs.pdf?rlkey=gk9c0yfuicij26yddr6mc8oty" },
                { name: "office automation tools(1,2)", link: "https://dl.dropboxusercontent.com/scl/fi/8088usd1q4gtc5pjr5qu8/office-automation-tools-1-2.pdf?rlkey=d90f9ty30vmt3f7qb1i582nz9" },
                { name: "Edx", link: "https://dl.dropboxusercontent.com/scl/fi/31pcuehlbvi1j4f7rnsf7/Edx.pdf?rlkey=q3y0248eiovehl6p8e9wn10d3" },

            ],
            3: [
                { name: "Applet", link: "#" },
                { name: "DBMS(1-3)", link: "#" },
                { name: "Graph", link: "#" },
                { name: "Java 1st Unit", link: "#" },
            ],
            
        },
        records: {
           
            3: {
                 "DATABASE MANAGEMENT SYSTEM": [
                    { name: "DBMS Record (by SETHU)", link: "Maths_Record.pdf" },
                    { name: "DBMS Record (source file)", link: "Maths_Record.pdf" },
               ],

                "JAVA AND DATA STRUCTURES": [
                    { name: "JAVA Record (by SETHU)", link: "Physics_Record.pdf" },
                ],

                "MATHEMATICAL AND STATISTICAL FOUNDATIONS":[
                    { name: "Maths Record (by SETHU)", link: "Physics_Record.pdf" },
                    { name: "Maths Record (source file)", link: "Maths_Record.pdf" },
                ],       

                "SOFTWARE ENGINEERING": [
                    { name: "SOFTWARE ENGINEERING Record (by SETHU)", link: "Physics_Record.pdf" },
                ],
            },
           
        },
        syllabus: {
            all: {
                "All Semesters Syllabus": [
                    { name: "All Semesters Syllabus (1-8) ", link: "#" },
                ],
            },
           
            2:{},
            3:{
                "major": [
                { name: "DATABASE MANAGEMENT SYSTEM", link: "Mathematics_Syllabus.pdf" },
                { name: "JAVA AND DATA STRUCTURES", link: "Physics_Syllabus.pdf" },
                { name: "MATHEMATICAL AND STATISTICAL FOUNDATIONS", link: "Chemistry_Syllabus.pdf" },
                { name: "SOFTWARE ENGINEERING", link: "Biology_Syllabus.pdf" },
                ],

                "minor": [
                { name: "ORGANISATIONAL BEHAVIOUR", link: "Environmental_Science_Syllabus.pdf" },
                ],

                "Skill / Multidisciplinary Course": [
                { name: "HEALTH AND HYGIENE", link: "Python_Programming_Syllabus.pdf" },
                { name: "PROJECT MANAGEMENT", link: "Web_Development_Syllabus.pdf" },
                ]
            },
            4:{},
            5:{},
            6:{},
            7:{},
            8:{}
        },
        papers: {
        
          
            3: [
                       { name: "Semester Exam Question Papers", link: "#" },
                       { name: "Internal Exam Question Papers", link: "#" }

            ],
           
        }
    };
    
    // Current selections
    let currentSemester = null;
    let currentResource = null;
    
    // Toggle dropdown
    function toggleDropdown(header, options) {
        const isActive = options.classList.contains('active');
        
        // Close all dropdowns first
        document.querySelectorAll('.select-options').forEach(opt => {
            opt.classList.remove('active');
        });
        document.querySelectorAll('.select-header i').forEach(icon => {
            icon.style.transform = 'rotate(0deg)';
        });
        
        // Toggle the clicked one if it wasn't active
        if (!isActive) {
            options.classList.add('active');
            header.querySelector('i').style.transform = 'rotate(180deg)';
        }
    }
    
    // Handle semester selection
    function handleSemesterSelection(value, text) {
        currentSemester = value === 'all' ? 'all' : parseInt(value);
        selectedSemSpan.textContent = text.toUpperCase();
        semesterHeader.querySelector('span').textContent = text;
        semesterOptions.classList.remove('active');
        semesterHeader.querySelector('i').style.transform = 'rotate(0deg)';
        
        if (currentResource) {
            renderResources();
        } else {
            updateSelectionMessage();
        }
    }
    
    // Handle resource selection
    function handleResourceSelection(value, text) {
        currentResource = value;
        selectedResourceSpan.textContent = text.toUpperCase();
        resourceHeader.querySelector('span').textContent = text;
        resourceOptions.classList.remove('active');
        resourceHeader.querySelector('i').style.transform = 'rotate(0deg)';
        
        if (currentSemester) {
            renderResources();
        } else {
            updateSelectionMessage();
        }
    }
    
    // Update selection message
    function updateSelectionMessage() {
        if (!currentSemester && !currentResource) {
            selectionMessage.textContent = "Select semester & resource type to view resources";
        } else if (!currentSemester) {
            selectionMessage.textContent = "Select semester to view resources";
        } else if (!currentResource) {
            selectionMessage.textContent = "Select resource type to view resources";
        }
    }
    
    // Render resources based on selections
    function renderResources() {
        resourcesContainer.innerHTML = '';
        
        if (!currentSemester || !currentResource) {
            showInitialContent();
            return;
        }
        
        selectionMessage.textContent = `Showing resources for selected criteria`;
        
        if (currentResource === 'all') {
            renderAllResources();
        } else {
            renderSpecificResource(currentResource);
        }
    }
    
    // Show initial content when nothing is selected
    function showInitialContent() {
        resourcesContainer.innerHTML = `
            <div class="initial-content">
                <p>Welcome to the Academic Resources portal. Please select a semester and resource type to view available materials.</p>
                <div class="info-box">
                    <h4>Available Resources:</h4>
                    <ul>
                        <li>Assignments</li>
                        <li>Notes & Materials</li>
                        <li>PDF's</li>
                        <li>Records</li>
                        <li>Syllabus</li>
                        <li>Question Papers</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    // Render all resources
    function renderAllResources() {
        const sections = ['assignments', 'notes', 'pdfs', 'records', 'syllabus', 'papers'];
        
        sections.forEach(section => {
            const data = resourceData[section];
            if (currentSemester === 'all') {
                // Show all semesters grouped for this resource type
                createAllSemestersResourceSection(section, data);
            } else if (data[currentSemester] && 
                      (Array.isArray(data[currentSemester]) || Object.keys(data[currentSemester]).length > 0)) {
                // Show specific semester for this resource type
                createResourceSection(section, data[currentSemester], currentSemester);
            }
        });
    }
    
    // Render specific resource type
    function renderSpecificResource(resourceType) {
        const data = resourceData[resourceType];
        
        if (currentSemester === 'all') {
            // Show all semesters for this specific resource type
            createAllSemestersResourceSection(resourceType, data);
        } else if (data[currentSemester] && 
                  (Array.isArray(data[currentSemester]) || Object.keys(data[currentSemester]).length > 0)) {
            // Show specific semester for this specific resource type
            createResourceSection(resourceType, data[currentSemester], currentSemester);
        } else {
            resourcesContainer.innerHTML = `
                <div class="no-resources">
                    No resources found for the selected criteria.
                </div>
            `;
        }
    }
    
    // Create a resource section for all semesters
    function createAllSemestersResourceSection(type, data) {
        const section = document.createElement('div');
        section.className = 'resource-section';
        
        const name = document.createElement('h3');
        name.textContent = getResourcename(type);
        section.appendChild(name);
        
        let hasContent = false;
        
        for (const sem in data) {
            if (data.hasOwnProperty(sem)) {
                const semesterData = data[sem];
                if ((Array.isArray(semesterData) && semesterData.length > 0) || 
                    (typeof semesterData === 'object' && Object.keys(semesterData).length > 0)) {
                    
                    hasContent = true;
                    
                    const semHeading = document.createElement('div');
                    semHeading.className = 'semester-heading';
                    semHeading.textContent = `${sem}${getOrdinalSuffix(sem)} Semester`;
                    section.appendChild(semHeading);
                    
                    const list = createResourceList(type, semesterData);
                    section.appendChild(list);
                }
            }
        }
        
        if (hasContent) {
            resourcesContainer.appendChild(section);
        }
    }
    
    // Create a resource section for specific semester
    function createResourceSection(type, data, semester) {
        const section = document.createElement('div');
        section.className = 'resource-section';
        
        const name = document.createElement('h3');
        name.textContent = getResourcename(type);
        section.appendChild(name);
        
        if (semester && semester !== 'all') {
            const semHeading = document.createElement('div');
            semHeading.className = 'semester-heading';
            semHeading.textContent = `${semester}${getOrdinalSuffix(semester)} Semester`;
            section.appendChild(semHeading);
        }
        
        const list = createResourceList(type, data);
        section.appendChild(list);
        
        resourcesContainer.appendChild(section);
    }
    
    // Create resource list based on type
    function createResourceList(type, data) {
        const list = document.createElement('ul');
        list.className = 'resource-list';
        
        if (Array.isArray(data)) {
            data.forEach(item => {
                const li = document.createElement('li');
                if (typeof item === 'object' && item.link) {
                    const link = document.createElement('a');
                    link.href = item.link;
                    link.textContent = item.name;
                    link.target = "_blank";
                    li.appendChild(link);
                } else {
                    li.textContent = typeof item === 'object' ? item.name : item;
                }
                list.appendChild(li);
            });
        } else if (typeof data === 'object') {
            for (const subject in data) {
                if (data.hasOwnProperty(subject)) {
                    const subjectname = document.createElement('div');
                    subjectname.className = 'subject-name';
                    subjectname.textContent = subject;
                    list.appendChild(subjectname);
                    
                    const subjectGroup = document.createElement('ul');
                    subjectGroup.className = 'subject-group';
                    
                    data[subject].forEach(item => {
                        const li = document.createElement('li');
                        if (typeof item === 'object' && item.link) {
                            const link = document.createElement('a');
                            link.href = item.link;
                            link.textContent = item.name;
                            link.target = "_blank";
                            li.appendChild(link);
                        } else {
                            li.textContent = typeof item === 'object' ? item.name : item;
                        }
                        subjectGroup.appendChild(li);
                    });
                    
                    list.appendChild(subjectGroup);
                }
            }
        }
        
        return list;
    }
    
    // Get ordinal suffix for semester numbers
    function getOrdinalSuffix(num) {
        const j = num % 10;
        const k = num % 100;
        if (j === 1 && k !== 11) {
            return 'st';
        }
        if (j === 2 && k !== 12) {
            return 'nd';
        }
        if (j === 3 && k !== 13) {
            return 'rd';
        }
        return 'th';
    }
    
    // Get formatted resource name
    function getResourcename(type) {
        const names = {
            'assignments': 'Assignments',
            'notes': 'Notes & Materials',
            'pdfs': 'PDF\'s',
            'records': 'Records',
            'syllabus': 'Syllabus',
            'papers': 'Question Papers'
        };
        return names[type] || type;
    }
    
    // Event listeners
    semesterHeader.addEventListener('click', () => {
        toggleDropdown(semesterHeader, semesterOptions);
    });
    
    resourceHeader.addEventListener('click', () => {
        toggleDropdown(resourceHeader, resourceOptions);
    });
    
    document.querySelectorAll('#semester-options .option').forEach(option => {
        option.addEventListener('click', () => {
            handleSemesterSelection(option.dataset.value, option.textContent);
        });
    });
    
    document.querySelectorAll('#resource-options .option').forEach(option => {
        option.addEventListener('click', () => {
            handleResourceSelection(option.dataset.value, option.textContent);
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!semesterHeader.contains(e.target) && !semesterOptions.contains(e.target)) {
            semesterOptions.classList.remove('active');
            semesterHeader.querySelector('i').style.transform = 'rotate(0deg)';
        }
        
        if (!resourceHeader.contains(e.target) && !resourceOptions.contains(e.target)) {
            resourceOptions.classList.remove('active');
            resourceHeader.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });
    
    // Show initial content on page load
    showInitialContent();
});
function showSidebar(){
  document.querySelector('.sidebar').classList.add('active');
  document.querySelector('.socials-container').style.display = 'none';
}
function hideSidebar(){
  document.querySelector('.sidebar').classList.remove('active');
  document.querySelector('.socials-container').style.display = 'flex';
}
