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
    
    
    const resourceData = {
        assignments: {
               
          
            3: [
                { name: "DBMS Assignment", link:"https://drive.google.com/uc?export=download&id=1l7m_ZeXaI_dkc2G8swltFs_lvRNS-P_Q"},
                { name: "JAVA Assignment", link: "https://drive.google.com/uc?export=download&id=1s5kDhgKzGE77BV4VCKiApE3SocGxRepx"},
                { name: "MATHS Assignment", link:"https://drive.google.com/uc?export=download&id=1l7rBPFvE6lslqYs7wzuSJ0CKFeNtcqNc"},
                { name: "ORGANISATION BEHAVIOUR Assignment", link:"https://drive.google.com/uc?export=download&id=1l9ehHf9m52O9Q8bLx-EYlhwkq7W_XI42"},
                { name: "SOFTWARE ENGINEERING Assignment", link:"https://drive.google.com/uc?export=download&id=1lEu32gBZXEGyeVnJVXEqB2F7ynVGjygI"},
            ],
            4: [
                { name: "python programming assignment", link:"https://drive.google.com/uc?export=download&id=1xXluvLwuePrg7bspnNungzRblLhxsXzr"},
                { name: "web  programming assignment", link: "https://drive.google.com/uc?export=download&id=1xYm4aOMmbmf7AXfb4GvLPIPJkOU6bdVU"},
                { name: "OS Assignment", link:"https://drive.google.com/uc?export=download&id=147PdKRdOWDv_TAn4ZmTM-y4SwcLMMKam"},
                { name: "HRM Assignment", link:"https://drive.google.com/uc?export=download&id=1tDdjU1_H7fSfQkZpxUQiRV4knnEJUD8a"},
                { name: "FM Assignment", link:"https://drive.google.com/uc?export=download&id=1tEtqzVFJDNcYtmTJuyq-6Iv-nqi3wVnv"},
            ],
            5: [
                { name: "MOBILE APPLICATION DEVELOPMENT USING ANDROID (by RAKESH)", link:"https://drive.google.com/uc?export=download&id=1f8TrV73djYkr17W9dayyg2BMgxW4bnbt"},
                { name: "WEB DEVELOPMENT USING PHP & MYSQL (by RAKESH)", link: "https://drive.google.com/uc?export=download&id=1pzsiBVIR7FFYSIhcfu_f2HKKMWtf7Snc"},
                { name: "FOUNDATION OF DATA SCIENCE", link:"https://drive.google.com/uc?export=download&id="},
                { name: "SOFTWARE TESTING", link:"https://drive.google.com/uc?export=download&id="},
                { name: "PROJECT MANAGEMENT (by RAKESH)", link:"https://drive.google.com/uc?export=download&id=1J8BYpK7hqeKCHpeh52blPfRwcV7-Rann"},
                { name: "FINANCIAL MARKETING", link:"https://drive.google.com/uc?export=download&id="},

             { name: "MOBILE APPLICATION DEVELOPMENT USING ANDROID (by SETHU)", link:"https://drive.google.com/uc?export=download&id=1QMQc4uNA3I3Nwh4ieW3O-aBV2tKjgxAL"},
                { name: "WEB DEVELOPMENT USING PHP & MYSQL (by SETHU)", link: "https://drive.google.com/uc?export=download&id=1X32cP4mSKbwjRaJx7CHHCzOzrPrIx61_"},
                { name: "FOUNDATION OF DATA SCIENCE (by SETHU)", link:"https://drive.google.com/uc?export=download&id="},
                { name: "SOFTWARE TESTING (by SETHU)", link:"https://drive.google.com/uc?export=download&id=1aoOYgmekVej0C8B_-M0-N3JEwCPpiSI8"},
                { name: "PROJECT MANAGEMENT (by SETHU)", link:"https://drive.google.com/uc?export=download&id=1Gk8-AdBh8l9hd5hdSd4YFLO33q1KzfE_"},
                { name: "FINANCIAL MARKETING (by SETHU)", link:"https://drive.google.com/uc?export=download&id="},
            ],
           
        },
        notes: {
            
            3: {
                "DATABASE MANAGEMENT SYSTEM": [
            { name: "Unit 1: Overview Of Database System", link: "https://drive.google.com/uc?export=download&id=1-t7Rk5xPEUdjhtI4a7mHcXndk7hRyXk2" },
            { name: "Unit 2: Relational Model & Normalization", link: "https://drive.google.com/uc?export=download&id=1-vNJn0adGvaGZaJRj_uiE8c2cYW_EfZf" },
            { name: "Unit 3: Entity Relationship Model & Basic SQL", link: "https://drive.google.com/uc?export=download&id=1Z_3qovhb_FaILs4FdWIcR0iRDY52wkF-" },
            { name: "Unit 4: SQL", link: "https://drive.google.com/uc?export=download&id=1ZaU22YnDq2TkvaO_uYSp1ZxPDvkaAFKE" },
            { name: "Unit 5: PS/SQL", link: "https://drive.google.com/uc?export=download&id=1s3YAhaIiirCm3uax98nlR9rYH47-CJfr" },
                ],
                
                "MATHEMATICAL AND STATISTICAL FOUNDATIONS": [
            { name: "Unit 1: Matrix Algebra-1", link: "https://drive.google.com/uc?export=download&id=1-AszkJxX4bz9v_prNsCY7TIVlVOkhUKN" },
            { name: "Unit 2: Matrix Algebra-2", link: "https://drive.google.com/uc?export=download&id=1-5BZs6nRagZ0Iu9_f3UId_m_5c6WDBrD" },
            { name: "Unit 3: Set Theory", link: "https://drive.google.com/uc?export=download&id=1ZkSM7CpLyPAqZKIzSIoK7RIcZ6yAyPbe" },
            { name: "Unit 4: Basics Of Statistics", link: "https://drive.google.com/uc?export=download&id=1ro2xVkaa9AsjUa3nvHN9isHPH5zvOAXI" },
            { name: "Unit 5: Statistical Measures", link: "https://drive.google.com/uc?export=download&id=1pvxVSoX3v0xQRYqFd6eeZyWPUyDRO4Ln" }
                ],
                 "JAVA AND DATA STRUCTURES": [
            { name: "Unit 1: Introduction To OOPS", link: "https://drive.google.com/uc?export=download&id=1-RXFy2I4IpbkcdQtZvc2yC0pzj9N10xc" },
            { name: "Unit 2: Class and Objects & Inheritance & Interface", link: "https://drive.google.com/uc?export=download&id=1-qp3kH9goaDJg6anwRmjRHSgBY6LZQfW" },
            { name: "Unit 3: Packages & Exception Handling & Applets", link: "https://drive.google.com/uc?export=download&id=1ZhZs6nxkH8ohKAaB3SE4HnADRcZv6vqZ" },
            { name: "Unit 4: Data Structure & Linear Data Structure", link: "https://drive.google.com/uc?export=download&id=1ZjOWfM4IF0RFO66Vk5RKxgoMyns_fW2W" },
            { name: "Unit 5: Trees and Graphs", link: "https://drive.google.com/uc?export=download&id=1pvnVDo_ELu2PI2NXAIxLEbn821zJFQZU" }
                 ],
                  "SOFTWARE ENGINEERING": [
            { name: "Unit 1: Introduction To Software Engineering", link: "https://drive.google.com/uc?export=download&id=1-NLP03qikCzuBhnD4JiI7HJTfDtJKyMX" },
            { name: "Unit 2: Software Cost Estimation", link: "https://drive.google.com/uc?export=download&id=1-GnTOCX03e9vyWdxnWX0CjB0z0uNvemr" },
            { name: "Unit 3: Software Design", link: "https://drive.google.com/uc?export=download&id=1q8nLrKv9dPC9OJpIMThmkJ0AoEV-isv-" },
            { name: "Unit 4: User Interface Design & Real Time System", link: "https://drive.google.com/uc?export=download&id=1rqY67x4gJwaXMZ-kMZrn0pKyC4Zt8fj0" },
            { name: "Unit 5: Software Quality & Testing", link: "https://drive.google.com/uc?export=download&id=1rtKxD2F5h5Ks9zIs97NUuFIbFlTg8s_w" }
          ],
                  "ORGANISATIONAL BEHAVIOUR" : [
            { name: "Unit 1: Organizational Behaviour", link: "https://drive.google.com/uc?export=download&id=1-QSzLGI-3U29B6zmgPJ8cyKh0se5EeKE" },
            { name: "Unit 2: Group Dynamics", link: "https://drive.google.com/uc?export=download&id=1-OanzAOdb7ATxuR5r8SjYB1Zk4th4_4A" },
            { name: "Unit 3: Leadership", link: "https://drive.google.com/uc?export=download&id=1q6-PdrF_pvinsmIGJsa1fDrltni87jdq" },
            { name: "Unit 4: Management of Change", link: "https://drive.google.com/uc?export=download&id=1q8AfUVtXLOEoij9uONyCU-p5MV8fQ6D6" },
            { name: "Unit 5: Organizational culture", link: "https://drive.google.com/uc?export=download&id=1ryycsu7vZKle5HrEWKrxggahwYbfhaXr" }
          ],
                 "HEALTH AND HYGIENE" : [
            { name: "Unit 1: Basic Of Nutrition", link: "https://drive.google.com/uc?export=download&id=1zL3-CcdgUj70vM91XPOn8O3K5k_iwpem" },
            { name: "Unit 2: Health", link: "https://drive.google.com/uc?export=download&id=1zMBtEXxO2kEPF3y-3vccWEW5NkJ0S8UW" },
            { name: "Unit 3: Hygiene", link: "https://drive.google.com/uc?export=download&id=1zOrkrhOxLr7NgQdKPmBqOHIKemzRd2i2" },
          ],
                 "PROJECT MANAGEMENT" : [
            { name: "Project Management (All Units)", link: "sem_resources/Maths_Unit1" },
          ],

            },
        4: {
                "PYTHON PROGRAMMING": [
            { name: "Unit 1: Getting Started With Python & Strings", link: "https://drive.google.com/uc?export=download&id=1V-VdXlVx8_lO4Mi_x4eKw3ZFeHYEzE0D" },
            { name: "Unit 2: Functions & Python and OOP & Exception Handling", link: "https://drive.google.com/uc?export=download&id=17b22nDJGxXAnomxr7FZcVvwhouNKos1E" },
            { name: "Unit 3: List & Tuple and Dictionaries", link: "https://drive.google.com/uc?export=download&id=1isjpamk398V8TFsm5Q1cke1FN6OV4VCk" },
            { name: "Unit 4: Introduction to Numpy & Data Handling", link: "https://drive.google.com/uc?export=download&id=1qY55uuSqnI9SgnQVxPLdSEk5KxFSi_Rz" },
            { name: "Unit 5: Plotting Data Using Matplotlib & Database Connectivity", link: "https://drive.google.com/uc?export=download&id=1teb5mjO1PcASJDTojn54hY9f5u9lAj92" },
                ],
                
                "WEB PROGRAMMING": [
            { name: "Unit 1: Introduction to Web Programming", link: "https://drive.google.com/uc?export=download&id=1ixvQa0vAtoDfo_nhnu27ISrjsgyse1uw" },
            { name: "Unit 2: Coding Standards, Block Elements", link: "https://drive.google.com/uc?export=download&id=1q42ohUft6Kr7EA8ZGa_oWBzRpD8W_9p7" },
            { name: "Unit 3: Cascading Style Sheet(CSS)", link: "https://drive.google.com/uc?export=download&id=1q2eaXXcg5pOGdP-BBrRfo01MRmhdyn16" },
            { name: "Unit 4: Organizing a pages, content with lists, figures and various organizational elements", link: "https://drive.google.com/uc?export=download&id=1tbFyWi4JP_XBQ1K1bvIV8hpAP4Ed7p30" },
            { name: "Unit 5: Image Manipulations, Audio and Video", link: "https://drive.google.com/uc?export=download&id=1td8xxcMVr2LA-6ZVo-jCUbxKNIIIQ6ta" }
                ],
                 "OPERATING SYSTEM": [
            { name: "Unit 1: Introduction & System Structures", link: "https://drive.google.com/uc?export=download&id=1jfIWRAffVjACIUMDlCZzb6EYJFGcLC13" },
            { name: "Unit 2: Process Management & Process Scheduling", link: "https://drive.google.com/uc?export=download&id=1isuEy76qKrMjhc3jmkj-kginl0yW1WnW" },
            { name: "Unit 3: Synchronization & Deadlocks", link: "https://drive.google.com/uc?export=download&id=1jeYp7EsuNd9ePEqZO7sl04USGw_qF-72" },
            { name: "Unit 4: Memory Management", link: "https://drive.google.com/uc?export=download&id=1qJM5pKq9jSek2MSJOokZR2kNlznRWiyW" },
            { name: "Unit 5: Files and Directories", link: "https://drive.google.com/uc?export=download&id=1wPS-ZoPJM98e5t9Wjbk8dczbcrYX_4V0" }
                 ],
                  "HUMAN RESOURCE MANAGEMENT": [
            { name: "Unit 1: INTRODUCTION", link: "https://drive.google.com/uc?export=download&id=1UyJG3k0WxS88i9SzD5RrHcWsTh6oy60Z" },
            { name: "Unit 2: PROCUREMENT AND DEVELOPMENT FUNCTIONS [1-7]", link: "https://drive.google.com/uc?export=download&id=1a26uAwlu6t3_wEV0prLWwCGSdQxVxYHE" },
            { name: "Unit 2: PROCUREMENT AND DEVELOPMENT FUNCTIONS [8-12]", link: "https://drive.google.com/uc?export=download&id=1xhNRSK8Mhz5-XV6iiIO7OfdaY4_jdk27" },
            { name: "Unit 3: TRAINING AND DEVELOPMENT", link: "https://drive.google.com/uc?export=download&id=1qLskTEhPPIusEL_vyBwOG5R8sihBsGJ3" },
            { name: "Unit 4: PERFORMANCE APPRAISAL", link: "https://drive.google.com/uc?export=download&id=1yVruLQCsMoU1gTVWPjbzNiIMpLAmqvVQ" },
            { name: "Unit 5: INDUSTRIAL RELATIONS", link: "https://drive.google.com/uc?export=download&id=1r2K3e98LlylZNmjrxM6Lwh9yoya_2xmE" },
            { name: "Human Resource Management All Units", link: "https://drive.google.com/uc?export=download&id=1F4ZRI-Lcjpfmv7QY0TF2jet4CUxBJwzR" }
         
        ],
                  "FINANCIAL MANAGEMENT" : [
            { name: "Unit 1: INTRODUCTION", link: "https://drive.google.com/uc?export=download&id=1TeMaqY1PYP77eO2VHESz47YTx-Tq9WLF"  },
            { name: "Unit 2: INVESTMENT DECISIONS", link: "https://drive.google.com/uc?export=download&id=1a2NYTb1rTWksa87n_yb1DskYuWDGSYDp" },
            { name: "Unit 3: FINANCING DECISIONS", link: "https://drive.google.com/uc?export=download&id=1jvglBZHA0d5-Jy23ONmO_zyRGfDZeHHH" },
            { name: "Unit 4: DIVIDEND DECISIONS", link: "https://drive.google.com/uc?export=download&id=1wHUewDHt48qzqqvuJRvPPArAAqd5V8Sf" },
            { name: "Unit 5: WORKING CAPITAL MANAGEMENT", link: "https://drive.google.com/uc?export=download&id=1vv-7c3VbFmcwA1dQOO_hONqd0hAUgZQn" },
            { name: "Financial Management All Units", link: "https://drive.google.com/uc?export=download&id=1F4ZRI-Lcjpfmv7QY0TF2jet4CUxBJwzR" }

        ],
                 "TOURISM GUIDANCE" : [
            { name: "Tourism Guidance (All Units)", link: "https://drive.google.com/uc?export=download&id=1pvJYEhd4IyjNuQNxz__T3D5AQov2Bn4X" },
          ],
                 "GEOGRAPHY" : [
            { name: "Geography (All Units)", link: "https://drive.google.com/uc?export=download&id=1pyc8HLRBQfxWCY0jVVlWZ1JX0gudvq_2" },
          ],

            },

        5: {

           "MOBILE APPLICATION DEVELOPMENT USING ANDROID": [
       { name: "Unit 1: Introduction to Android", link: "https://drive.google.com/uc?export=download&id=1zNHYV7cYRUbxcATgjqt3Jj9I44yZxZ2n" },
       { name: "Unit 1: Introduction to Android (Faculty-provided pdf)", link: "https://drive.google.com/uc?export=download&id=1fbRukNCV-HVpUK82THiqNSxRYIHsd73r" },
       { name: "Unit 2: Android Application Design Essentials", link: "https://drive.google.com/uc?export=download&id=1MTqUsci_kRIfgA7Z3nnAHL8dOBWTaE4e"},
       { name: "Unit 2: Android Application Design Essentials (Faculty-provided pdf)", link: "https://drive.google.com/uc?export=download&id=1K912uCwhBXjWzqd0wQIq1Jhdg5ke-twB"},
       { name: "Unit 3: Android User Interface Design Essentials & Input Controls", link: "https://drive.google.com/uc?export=download&id=1ng908o61qPVc3D0pWw3VI3QU53L6yLw8" },
       { name: "Unit 4: Testing Android applications", link: "https://drive.google.com/uc?export=download&id=1Bgg5cumoOtwxxMbWUpP0umPIYJ7gYt4x" },
       { name: "Unit 4: Testing Android applications (2nd pdf)", link: "https://drive.google.com/uc?export=download&id=1nqfRmtsZfbygG4xDsiRrZbbr8MBpsJSK" },
       { name: "Unit 5: Using Common Android APIs", link: "https://drive.google.com/uc?export=download&id=1U5bwV5g06kWAKi_MViqtxm0VSqMlu0bJ" } 
           ],

           "WEB DEVELOPMENT USING PHP & MYSQL": [
       { name: "Unit 1: Using PHP & Storing and Retrieving Data", link: "https://drive.google.com/uc?export=download&id=1XAKAbjyh_OSUKg0gcHN55_ypX04g_7fd" },
       { name: "Unit 1 (2nd pdf): Using PHP & Storing and Retrieving Data", link: "https://drive.google.com/uc?export=download&id=1jDhpR_vwkgkB0gyLFbIc22EsKuoZb-h7" },
       { name: "Unit 2: Arrays & String Manipulation and Regular Expressions", link: "https://drive.google.com/uc?export=download&id=1tKdajzRRepWUi4nEfKJbPhOo3a4zgKHI" },
       { name: "Unit 3: Reusing Code and Writing Functions & Object-Oriented PHP & Error and Exception Handling", link: "https://drive.google.com/uc?export=download&id=1AkcBYgWXBot3l2AympbI0Md_m3sT7kow" },
       { name: "Unit 4: Using MySQL", link: "https://drive.google.com/uc?export=download&id=1ItYiIAqpSC7Vw1M0EAC8ITulvmUL9f_i" },
       { name: "Unit 5: Introduction of Laravel PHP Framework", link: "https://drive.google.com/uc?export=download&id=1YVgqyYH2NakWmF4zm8jpyDti2jD4UrgN" },
           ], 
           
           
            "FOUNDATION OF DATA SCIENCE": [
       { name: "Unit 1: Intro to BigData & DataScience", link: "https://drive.google.com/uc?export=download&id=1DdUPIo3B28EsWv8DVmLlZEAj2VMc6ALB" },
       { name: "Unit 2: IPython", link: "https://drive.google.com/uc?export=download&id=1Q0Td2DFIcUDkYl7IuM_2Er5GTH-h8Yrx" },
       { name: "Unit 3: Introduction to NumPy", link: "https://drive.google.com/uc?export=download&id=1k7s41EGkwRcSiOkg1OQ0XqkK3P9BmXCq"},
       { name: "Unit 4: Data Manipulation with Pandas", link: "https://drive.google.com/uc?export=download&id=1EUwsNlGYJVupQTMSPnwMaThwEwn7fKPW&usp=drive_fs" },
       { name: "Unit 5: Visualization with Matplotlib & Python Libraries for Machine Learning", link: "https://drive.google.com/uc?export=download&id=" }
            ], 

             "SOFTWARE TESTING": [
       { name: "Unit 1: Introduction & Flow graphs and Path testing", link: "https://drive.google.com/uc?export=download&id=1mR4HfJy5D4OWbx2w67tu2IVKcnpMHdeW" },
       { name: "Unit 2: Test Case Design Black-Box Approach", link: "https://drive.google.com/uc?export=download&id=1L7KCRxo4oskPSB8M-U1aJI0DwksgxHPI" },
       { name: "Unit 3: Test Case Design White–Box Approach", link: "https://drive.google.com/uc?export=download&id=1mxRJNx1wkXRyRucBC81pEDmMGr804VK8" },
       { name: "Unit 4: Paths, Path products and Regular expressions", link: "https://drive.google.com/uc?export=download&id=17TozD4jm337AOm89CU_PBAfp-Sd166Wf" },
       { name: "Unit 5: State, State Graphs and Transition testing", link: "https://drive.google.com/uc?export=download&id=" },
    
   ],
             "PROJECT MANAGEMENT" : [
       { name: "Unit 1: PROJECT MANAGEMENT", link: "https://drive.google.com/uc?export=download&id=1RWKiNK078gxjx0uZiBOwXYzciXL6gINo" },
       { name: "Unit 2: PROJECT PLANNING AND SELECTION", link: "https://drive.google.com/uc?export=download&id=12ipYCAFW-gcdN3y7qRZnZVDY0M2HCThW" },
       { name: "Unit 3: NETWORK ANALYSIS AND PROJECT EVALUATION", link: "https://drive.google.com/uc?export=download&id=1_GWfLT1ax9vwtjGcB2QD_gkxuDGuBDQM" },
       { name: "Unit 4: PROJECT ORGANIZATION", link: "https://drive.google.com/uc?export=download&id=17tufQq_Pd-bS4lbwHrHsXF1yNjqWhV0k" },
       { name: "Unit 5: PROJECT MONITORING", link: "https://drive.google.com/uc?export=download&id=" },

   ],
            "FINANCIAL MARKETING" : [
       { name: "Unit 1: INDIAN FINANCIAL SYSTEM", link: "https://drive.google.com/uc?export=download&id=" },
       { name: "Unit 2: MONEY MARKET", link: "https://drive.google.com/uc?export=download&id=16uAKcStcz4zRujE-X22K71xYCH983BCs" },
       { name: "Unit 3: CAPITAL MARKET", link: "https://drive.google.com/uc?export=download&id=1huvoRnVP91b5tROMDPTF-yRcH6JrBPam" },
       { name: "Unit 4: FOREIGN EXCHANGE MARKET", link: "https://drive.google.com/uc?export=download&id=1sw-OHUTb2MXqpAI86HDQKnj5XAntaB47" },
       { name: "Unit 5: THE DERIVATIVES MARKETS", link: "https://drive.google.com/uc?export=download&id=1LXGuzfvKW3uT8rfIOU3qYTnhDpidgM79" },    
     ],
"ENVIRONMENTAL EDUCATION" : [
            { name: "Environmental Education (All Units)", link: "https://drive.google.com/uc?export=download&id=14S_31kBlIK_eklqvPNy6M5hl8O1pk433" },
          ],
           
       },

        },
        pdfs: {
           
            2: [
                { name: "C-LANGUAGE", link:"https://drive.google.com/uc?export=download&id=1DR4JJdSG3cT_y1RX6g8ywJhcFByjN0V3"},
                { name: "Excel--Labels-Values-and-Formulas", link: "https://drive.google.com/uc?export=download&id=1DfC0rk2p_iwpmHDeSbSJdAYo0hZLaiea" },
                { name: "Marketing Skill notes", link: "https://drive.google.com/uc?export=download&id=1DP3yonLL5tkt6E-Sguj8LJg2xP-NWDhy" },
                { name: "NOTES-MSWORD-1", link: "https://drive.google.com/uc?export=download&id=1DSL-qCTGjuwZ5_zWk4zBnH404TJcygyA" },
                { name: "office automation tools record programs", link: "https://drive.google.com/uc?export=download&id=1DPYtuWCdDCCHfkE3A0b_nPJCb-Y3MdIw" },
                { name: "office automation tools(1,2)", link: "https://drive.google.com/uc?export=download&id=1DaWOzNcZUZeud9WhcoyIrp9D1XnJpf7d" },
                { name: "Edx", link: "https://drive.google.com/uc?export=download&id=1Di2c4atUJckQya9iejX2Ui_ttQgiTyo7" },

            ],
            3: [
                { name: "Applet", link: "https://drive.google.com/uc?export=download&id=1jU4egr8qj2Cuw5hZ06XuoH2T6SCOeQc3" },
                { name: "DBMS(1-3)", link: "https://drive.google.com/uc?export=download&id=1WEVQx0rKDv39bs3HQw6IRe7HtREgo-3s" },
                { name: "Graph", link: "https://drive.google.com/uc?export=download&id=1ZYfrvK5IZqdMmGfsAiYav3RcE8bA3JmW" },
                { name: "Java 1st Unit", link: "https://drive.google.com/uc?export=download&id=1Crn1wigBm3_KWLw-TuarX-xCzu7D-tdG" },
            ],
            4: [
                { name: "fcfs program", link: "https://drive.google.com/uc?export=download&id=1jLlJqEoYFxbpYfyW7vOxFu4Fm9on1Yw_" },
                { name: "II-IV SEM PYTHON", link: "https://drive.google.com/uc?export=download&id=1K2uCvPlOZRT8gmNHHgtJo3EG2VTlUBQo" },
                { name: "Introduction", link: "https://drive.google.com/uc?export=download&id=1U2A7EFEt_sNu3jaMynGL8MRJpkX0VZEB" },
                { name: "OS program source code", link: "https://drive.google.com/uc?export=download&id=1jQ6_psFHoMsQS6wSrM7bYB9YfYjKGG7n" },
                { name: "Python_material_updated", link: "https://drive.google.com/uc?export=download&id=1K05kTJ1WnO1rRYeAqjP4giQSbL7T9v8h" },
                { name: "Unit 4", link: "https://drive.google.com/uc?export=download&id=1K1MhC0CkeTmoTxuApnqUqdJYkpYN3RiM" },
                { name: "UNIT-5 python notes", link: "https://drive.google.com/uc?export=download&id=1K9ZhIcy3WPEON4G2LP13Lm5kqVF_6wOu" },
            ],
            5: [
                { name: "MAD Experiment 1", link: "https://drive.google.com/uc?export=download&id=1yr6Orx1UR8xhwBemhACaGTCmMIPLTC4o" },
                { name: "MAD Experiment 2", link: "https://drive.google.com/uc?export=download&id=1vWlMOTgRtfltzpRXrx6-EEdlB0tuUPez" },
        ],
        },
        records: {
           
            3: {
                 "DATABASE MANAGEMENT SYSTEM": [
                    { name: "DBMS Record", link: "https://drive.google.com/uc?export=download&id=1-EEf5vXhy5LVIYDEYHoGrNfXjLIgzW9R" },
                    { name: "DBMS Record (source file)", link: "https://drive.google.com/uc?export=download&id=1jPm_m_73QfqpO0L_4xfmay4Wz8zW7aSC" },
               ],

                "JAVA AND DATA STRUCTURES": [
                    { name: "JAVA Record", link: "https://drive.google.com/uc?export=download&id=10wE0-CRtmH0lT1JUCoH9nIY1KlJlrSv8" },
                ],

                "MATHEMATICAL AND STATISTICAL FOUNDATIONS":[
                    { name: "Maths Record", link: "https://drive.google.com/uc?export=download&id=1zFbQfDDf5PJpAJed3qt_Y4kKHG-w0t_4" },
                    { name: "Maths Record (source file)", link: "https://drive.google.com/uc?export=download&id=1lOmvdzVrYouMCOv-cQQ6Ku4pAw4EzsUw" },
                ],       

                "SOFTWARE ENGINEERING": [
                    { name: "SOFTWARE ENGINEERING Record", link: "https://drive.google.com/uc?export=download&id=1UQ6uBRBdmLIbuxWBJbSl6LsUgxTPmgm8" },
                ],
            },
            4: {
                 "PYTHON PROGRAMMING": [
                    { name: "python Record", link: "https://drive.google.com/uc?export=download&id=14aoyGGaarUfnGInMAxlGqZq4jGMTi1My" },
               ],

                "WEB DEVELOPMENT USING PHP & MYSQL ": [
                    { name: "Web Record", link: "https://drive.google.com/uc?export=download&id=1X5xNmGDF9ag7h7IUYVNuskWaeW6-wVqz" },
                    { name: "web record outputs", link: "https://drive.google.com/uc?export=download&id=1X6mSriCEfBi0OnT_eR-Oyu5A9IgkkGmD" },
                    { name: "web record but no outputs(by RAKESH)", link: "https://drive.google.com/uc?export=download&id=1ONDQCE0gpJyg02Y_Gu8fGe7TKKgJM9aL" },
                    { name: "WP-lab-manual-list", link: "https://drive.google.com/uc?export=download&id=1rCzdepN3QQNfkbf_2HCjg0o_0rAM6lF_" }, 
                    { name: "8,9,10", link: "https://drive.google.com/uc?export=download&id=1rF99JdMTGOCDtePcSi8TCNRXaOpFTHXU" },

                ],

                "OPERATING SYSTEM":[
                    { name: "Operating System Record", link: "https://drive.google.com/uc?export=download&id=148GK7ltpIRLRDAOsdX6UOXsq966Qn65z" },
                ],       
            },
            5: {
                 "MOBILE APPLICATION DEVELOPMENT USING ANDROID": [
                    { name: "MAD LAB MANUAL", link: "https://drive.google.com/uc?export=download&id=1U0hZO_g0i7pRNYeGm5pdLgjWpeI9Nkan" },
{ name: "Mobile Application Development Record Pics", link: "https://drive.google.com/uc?export=download&id=1eYQXe-VxwxPIORMCRP0C5Yrb4WbexoEj" },
{ name: "Mobile Application Development Record", link: "https://drive.google.com/uc?export=download&id=1xemXGRXNcPxPvGQW8unYb54efoBuwnuT" },

               ],

                "WEB PROGRAMMING": [
                    { name: "WEB MANUAL", link: "https://drive.google.com/uc?export=download&id=1D3lL9YnrwzzYsHNhxnfpghBwbwV0LwFm" },

{ name: "WEB Development Record", link: "https://drive.google.com/uc?export=download&id=1u4v21bx0mIPwYNwUKwSgzHVlOew6Psjr" },

                ],

                "FOUNDATION OF DATA SCIENCE":[
                    { name: "FDS Record", link: "https://drive.google.com/uc?export=download&id=" },
                ],  
                "SOFTWARE TESTING":[
                    { name: "Software Testing Record", link: "https://drive.google.com/uc?export=download&id=1w2bG1YK92IgbPrnzyvO_6takEMyj3tTo" },
                ],      
            },
        },
        syllabus: {
            0 : {
                "All Semesters Syllabus": [
                    { name: "All Semesters Syllabus (1-8) ", link: "https://drive.google.com/uc?export=download&id=1DqnrX2_fDLlUqzUHK21vu_ms_As3bUuu" },
                ],
            },
           
            
            3:{
                "major": [
                { name: "3rd sem all major subject syllabus", link: "https://drive.google.com/uc?export=download&id=1WMJF7R0cbZLdABY4K6awqKsCR0lwMbqv" },
                ],

                "minor": [
                { name: "ORGANISATIONAL BEHAVIOUR", link: "#" },
                ],

                "Skill / Multidisciplinary Course": [
                { name: "HEALTH AND HYGIENE", link: "https://drive.google.com/uc?export=download&id=1iWJx35AHtEEK9RyzWyq4o_zFswCg1iJj" },
                { name: "PROJECT MANAGEMENT", link: "https://drive.google.com/uc?export=download&id=1iS_z3WLQhPoPdDglSC65ta6TIkR0J0Uj" },
                ]
            },
            4:{
                "major": [
                { name: "4th sem all major subject syllabus", link: "https://drive.google.com/uc?export=download&id=1DRbykhYbDI1aeKBzPFJw74_4vDZ7cUUd" },
                { name: "4th sem all major subject syllabus(edited)", link: "https://drive.google.com/uc?export=download&id=1DOllFd6ALBpRZ7nRP7pcAt_m0yFn43VP" },
                { name: "4th sem Web Programming Syllabus", link: "https://drive.google.com/uc?export=download&id=1jXmXyWfrp80GaKjgD1UoraP7LSVOqXPC" },

            ],

                "minor": [
                { name: "4th sem all minor subject syllabus", link: "https://drive.google.com/uc?export=download&id=1Iu3E3vqwz4LE1FjRo9xOh4uxTX1xaa05" },
                { name: "4th sem all minor subject syllabus(edited)", link: "https://drive.google.com/uc?export=download&id=1JPEIOCNP_fu-CTwt2EfD_6xrytTSN8TB" },
            
            ],

                "Skill / Multidisciplinary Course": [
                { name: "TOURISM-GUIDANCE", link: "https://drive.google.com/uc?export=download&id=1pvJYEhd4IyjNuQNxz__T3D5AQov2Bn4X" },
                { name: "INTRODUCTION-TO-GEOGRAPHY", link: "https://drive.google.com/uc?export=download&id=1pyc8HLRBQfxWCY0jVVlWZ1JX0gudvq_2" },
                ]
            },
           5:{
                "major": [
                { name: "5th sem major subjects syllabus(edited)", link: "https://drive.google.com/uc?export=download&id=1JwvSkophXiZ7WPr9Fj-mMDCvyaJJRGn9" },
                ],
                "minor": [
                { name: "5th sem minor subjects syllabus(edited)", link: "https://drive.google.com/uc?export=download&id=1DFxpdGZd_Uq7r7B03ne6dbdYhy912FmL" },

            ],
"Foundation Course": [
                { name: "Environmental Education", link: "https://drive.google.com/uc?export=download&id=19EEuz4Bq3NGGkJgYA-WgxPnCNhA_Kpxv" },
                
                ]

           
            },
        },
        papers: {
            1: [
                       { name: "Semester Exam Question Papers", link: "https://drive.google.com/uc?export=download&id=1n9XbKr-oT8S1Nj-J0M-kB48buZQ6DPrS" },

            ],

            2: [
                       { name: "Semester Exam Question Papers", link: "https://drive.google.com/uc?export=download&id=1n28iA_OWzeTbOmfMSh2SgopYOKFMpGJa" },

            ],

            3: [
                       { name: "Semester Exam Question Papers", link: "https://drive.google.com/uc?export=download&id=1n9Lkj2fiyoMjYbqSwbkGnkuyB371dsuz" },
                       { name: "Internal Exam Question Papers", link: "https://drive.google.com/uc?export=download&id=1n8SdPH-IZkTzbYiWGtuSK3EeO0TdLx5H" },

            ],
        
          
            4: [
                       { name: "Semester Exam Question Papers", link: "https://drive.google.com/uc?export=download&id=1nCVZJV4044kz13yvEXGRpjr5-352ekRG" },
                       { name: "Internal Exam Question Papers", link: "https://drive.google.com/uc?export=download&id=1AmxiY2cTNwtxN04V27NRoRGwNfv_Y2zv" },
                       { name: "Health & Hygeine imp Q & A ", link: "https://drive.google.com/uc?export=download&id=1zZBO_7vlhgSbiUmkATKj7uqiWcVvIxYa" }

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

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.select-box').forEach(box => {
    box.classList.add('highlight');
    setTimeout(() => box.classList.remove('highlight'), 1500);
  });
});
// Perfect smooth scroll solution with refresh protection
function setupPerfectSmoothScroll() {
  let isProgrammaticNavigation = false;
  let lastProcessedHash = '';
  const scrollOffset = 0; // Small offset from top

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