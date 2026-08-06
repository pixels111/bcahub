const contributeModal=document.getElementById("contributeModal");

contributeModal.addEventListener("click",function(e){
    if(e.target===this){
        contributeModal.classList.remove("active");
    }
});

document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){
        contributeModal.classList.remove("active");
    }
});

const API_URL = "https://script.google.com/macros/s/AKfycby2GNSDM67zYmyPWb91Q9GUZZHLLrKpBE_gyl2yGTWabFmvET-A2ebtx9SBe3bETUMd/exec";

const RESOURCE_REF_SECTION_ORDER = ['assignments', 'notes', 'important_questions', 'pdfs', 'records', 'syllabus', 'papers'];

const RESOURCE_REF_TYPE_CODE_MAP = {
    assignments: { code: 'A', suffix: '' },
    notes: { code: 'N', suffix: '' },
    important_questions: { code: 'IQ', suffix: '' },
    pdfs: { code: 'PDF', suffix: '' },
    records: { code: 'REC', suffix: '' },
    syllabus: { code: 'SYL', suffix: '' },
    papers: { code: 'PP', suffix: '' }
};

// ---- Apps Script API response normalizer ----------------------------
// The Google Apps Script Web App returns JSON keyed as:
//   { "<semester>": { "<section>": { "<subject>": [ items... ] } } }
// (or { "<semester>": { "<section>": [ items... ] } } when a section has
// no subject grouping for that semester).
// Every existing render function in this file (renderAllResources,
// renderSpecificResource, createResourceSection, createAllSemestersResourceSection,
// createResourceList) expects the OPPOSITE nesting order:
//   { "<section>": { "<semester>": { "<subject>": [ items... ] } } }
// normalizeResourceData() performs that reshuffle only - it does not
// invent, drop, or rename any fields on the resource items themselves.
function normalizeResourceData(raw) {
    const normalized = {};

    RESOURCE_REF_SECTION_ORDER.forEach(section => {
        normalized[section] = {};
    });

    if (!raw || typeof raw !== 'object') return normalized;

    Object.keys(raw).forEach(semesterKey => {
        const semesterData = raw[semesterKey];
        if (!semesterData || typeof semesterData !== 'object') return;

        Object.keys(semesterData).forEach(section => {
            const sectionData = semesterData[section];
            if (!sectionData) return;

            if (!normalized[section]) {
                normalized[section] = {};
            }

            normalized[section][semesterKey] = sectionData;
        });
    });

    return normalized;
}

function buildResourceRefIndex(resourceData) {
    const index = {}; 
    if (!resourceData) return index;

    RESOURCE_REF_SECTION_ORDER.forEach(section => {
        const sectionData = resourceData[section];
        if (!sectionData) return;

        const typeInfo = RESOURCE_REF_TYPE_CODE_MAP[section] || { code: section.toUpperCase(), suffix: '' };

        Object.keys(sectionData).forEach(semKey => {
            const semData = sectionData[semKey];
            let itemCounter = 0;

            function register(item, subject) {
                itemCounter += 1;
                const refCode = semKey + 'SEM' + typeInfo.code + itemCounter + typeInfo.suffix;
                if (item && typeof item === 'object') {
                    item.refCode = refCode; // reused as-is by the renderer, no second system
                }
                index[refCode] = { section, semester: semKey, subject: subject || null, item };
            }

            if (Array.isArray(semData)) {
                semData.forEach(item => register(item, null));
            } else if (semData && typeof semData === 'object') {
                Object.keys(semData).forEach(subject => {
                    const subjItems = semData[subject];
                    if (Array.isArray(subjItems)) {
                        subjItems.forEach(item => register(item, subject));
                    }
                });
            }
        });
    });

    return index;
}

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
    const searchInput = document.getElementById('resource-search');
    const searchClearBtn = document.getElementById('search-clear');
    
    /* ==========================================================
   RESOURCE LOADING OVERLAY
========================================================== */

const loadingOverlay =
    document.getElementById("resourceLoadingOverlay");

const loadingText =
    document.getElementById("resourceLoadingText");

function isMainLoaderVisible() {

    const loader = document.getElementById("loader");

    if (!loader) return false;

    return !loader.classList.contains("done");

}

function showLoadingOverlay(message = "Preparing resources...") {

    // Don't show if the main BCAHub loader is still active
    if (isMainLoaderVisible()) return;

    if (!loadingOverlay) return;

    loadingText.textContent = message;

    loadingOverlay.classList.add("show");

}

function hideLoadingOverlay() {

    if (!loadingOverlay) return;

    loadingOverlay.classList.remove("show");

}

function updateLoadingMessage(message) {

    if (!loadingText) return;

    loadingText.textContent = message;

}
    // Data now comes from the Apps Script Web App (Google Sheet backend)
    // instead of a hardcoded object. It starts empty and is populated by
    // loadResourceData() below; every render function reads this same
    // `resourceData` variable via closure, so nothing else has to change.
    let resourceData = {};

    // Build the reference-code index once data has loaded (this stamps
    // item.refCode onto every resource object in resourceData) and expose
    // it for the deep-link module and the Copy Direct Link feature to
    // reuse - no second reference system.
    window.__resourcesPageData = resourceData;
    window.__resourcesRefIndex = {};

    // Current selections
    let currentSemester = null;
    let currentResource = null;
    let currentSearch = '';
    let isDataLoaded = false;
    let dataLoadFailed = false;

    // Fetch resource data from the Apps Script Web App and normalize it
    // into the shape the existing renderer expects.
    // Toggle dropdown
async function loadResourceData() {

    selectionMessage.textContent = "Loading resources...";

    const isDirectVisit =
    !document.referrer ||
    !document.referrer.startsWith(location.origin);

    if (
        !isDirectVisit &&
        window.BCAHubResourceState &&
        window.BCAHubResourceState.downloading &&
        !window.BCAHubResourceState.ready
    ) {
    
        showResourcePopup();
    
    }

    try {

        // Get resources (cache or download)
        const rawData = await getResources();
        
        if (
            document.getElementById("resourcePopup")?.classList.contains("show")
        ) {
        
            popupTerminalLog("Building Search Index");
        
        } else {
        
            loaderEngine.step("Building Search Index");
        
        }
        // Update loader status
        if (typeof setLoaderStatus === "function") {
            setLoaderStatus("Organizing Study Materials...");
        }

        // Normalize data
        resourceData = normalizeResourceData(rawData);

        if (
            document.getElementById("resourcePopup")?.classList.contains("show")
        ) {
        
            popupTerminalLog("Building Reference Index");
        
        } else {
        
            loaderEngine.step("Building Reference Index");
        
        }
        // Build reference index
        window.__resourcesPageData = resourceData;
        window.__resourcesRefIndex = buildResourceRefIndex(resourceData);
        if (
            document.getElementById("resourcePopup")?.classList.contains("show")
        ) {
        
            popupTerminalLog("Rendering Interface");
        
        } else {
        
            loaderEngine.step("Rendering Interface");
        
        }
        isDataLoaded = true;
        dataLoadFailed = false;

        // Render page
        if (currentSemester && currentResource) {

            renderResources();

        } else {

            showInitialContent();
            updateSelectionMessage();

        }

        // Finish after browser paints the UI
        requestAnimationFrame(() => {

            if (typeof setLoaderStatus === "function") {
                setLoaderStatus("Almost Ready...");
            }

            if (window.handleDeepLink) {
                window.handleDeepLink();
            }

            // Give user time to read "Almost Ready..."
            setTimeout(() => {

                if (
                    document.getElementById("resourcePopup")?.classList.contains("show")
                ) {
                
                    popupTerminalLog("Launching BCAHub");
                
                } else {
                
                    loaderEngine.step("Launching BCAHub");
                
                }            
                setTimeout(() => {
                    
                    if (
                        document.getElementById("resourcePopup")?.classList.contains("show")
                    ) {
                    
                        popupTerminalDone();
                    
                    }                   
                     // Hide the popup (if it was shown)
                    hideResourcePopup();
            
                    // Hide the full-page loader
                    finishResourcesLoader();
            
                }, 300);
            
            }, 300);
        });

    }

    catch (error) {
        if (window.loaderEngine) {

         loaderEngine.error("Failed to Load Resources");

        }

        console.error("[BCAHub] Failed to load resources:", error);

        dataLoadFailed = true;
        isDataLoaded = false;

        selectionMessage.textContent =
            "Unable to load resources right now. Please refresh the page.";

        resourcesContainer.innerHTML = `
            <div class="no-resources">
                Unable to load resources right now.
            </div>
        `;
        
        hideResourcePopup();

        // Finish loader even on failure
        if (typeof finishResourcesLoader === "function") {
            finishResourcesLoader();
        }

    }

}
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
        semesterOptions.classList.remove('active');
        semesterHeader.querySelector('i').style.transform = 'rotate(0deg)';
        syncSelectionLabels();
        renderResources();
    }
    
    // Handle resource selection
    function handleResourceSelection(value, text) {
        currentResource = value;
        resourceOptions.classList.remove('active');
        resourceHeader.querySelector('i').style.transform = 'rotate(0deg)';
        syncSelectionLabels();
        renderResources();
    }
    
    function normalizeSearchQuery(value) {
        return (value || '').trim().toLowerCase();
    }

    function hasActiveFilters() {
        return currentSemester !== null || currentResource !== null;
    }

    function shouldApplySearch() {
        return !hasActiveFilters() && normalizeSearchQuery(currentSearch).length > 0;
    }

    function syncSelectionLabels() {
        if (currentSemester === null) {
            selectedSemSpan.textContent = 'NO SEMESTER SELECTED';
            semesterHeader.querySelector('span').textContent = 'Select Semester';
        } else if (currentSemester === 'all') {
            selectedSemSpan.textContent = 'ALL SEMESTERS';
            semesterHeader.querySelector('span').textContent = 'All Semesters';
        } else {
            const semesterText = `${currentSemester}${getOrdinalSuffix(currentSemester)} Semester`;
            selectedSemSpan.textContent = semesterText.toUpperCase();
            semesterHeader.querySelector('span').textContent = semesterText;
        }

        if (!currentResource) {
            selectedResourceSpan.textContent = 'NO RESOURCE SELECTED';
            resourceHeader.querySelector('span').textContent = 'Select Resource';
        } else if (currentResource === 'all') {
            selectedResourceSpan.textContent = 'ALL RESOURCES';
            resourceHeader.querySelector('span').textContent = 'All Resources';
        } else {
            const resourceText = getResourcename(currentResource);
            selectedResourceSpan.textContent = resourceText.toUpperCase();
            resourceHeader.querySelector('span').textContent = resourceText;
        }
    }

    function getSearchableText(item, subject, section, semester) {
        const itemObj = item && typeof item === 'object' ? item : { name: item };
        const tags = Array.isArray(itemObj.tags)
            ? itemObj.tags.join(' ')
            : (itemObj.tags || '');

        const values = [
            // Basic
            itemObj.name || '',
            subject || '',
            semester || '',
            getResourcename(section),

            // Classification
            itemObj.category || '',
            itemObj.resourceType || '',
            itemObj.resource_type || '',
            itemObj.type || "",

            tags,

            // IDs
            itemObj.resourceId || "",
            itemObj.refCode || "",
            itemObj.referenceCode || "",
            itemObj.reference_code || "",
            
           // Metadata
            itemObj.subject || "",
            itemObj.author || "",
            itemObj.authorBadge || "",
            itemObj.uploadedDate || "",
            itemObj.pages || "",
            itemObj.fileId || "",


        ];

        return values.join(' ').toLowerCase();
    }

    function matchesSearchQuery(item, subject, section, semester) {
        if (!shouldApplySearch()) return true;
        const query = normalizeSearchQuery(currentSearch);
        if (!query) return true;
        return getSearchableText(item, subject, section, semester).includes(query);
    }

    function filterSemesterData(section, semesterData, semesterKey) {
        if (Array.isArray(semesterData)) {
            return semesterData.filter(item => matchesSearchQuery(item, null, section, semesterKey));
        }

        if (semesterData && typeof semesterData === 'object') {
            const filteredSubjects = {};

            Object.keys(semesterData).forEach(subject => {
                const subjectItems = semesterData[subject];
                if (!Array.isArray(subjectItems)) return;

                const filteredItems = subjectItems.filter(item => matchesSearchQuery(item, subject, section, semesterKey));
                if (filteredItems.length > 0) {
                    filteredSubjects[subject] = filteredItems;
                }
            });

            return filteredSubjects;
        }

        return null;
    }

    function filterSectionData(section, data) {
        const filteredSectionData = {};

        if (!data || typeof data !== 'object') return filteredSectionData;

        Object.keys(data).forEach(semKey => {
            const semesterData = data[semKey];
            const matchesSemester = !currentSemester || currentSemester === 'all' || String(currentSemester) === String(semKey);

            if (!matchesSemester) return;

            const filteredSemesterData = filterSemesterData(section, semesterData, semKey);
            const hasContent = Array.isArray(filteredSemesterData)
                ? filteredSemesterData.length > 0
                : (filteredSemesterData && typeof filteredSemesterData === 'object' && Object.keys(filteredSemesterData).length > 0);

            if (hasContent) {
                filteredSectionData[semKey] = filteredSemesterData;
            }
        });

        return filteredSectionData;
    }

    // Update selection message
    function updateSelectionMessage() {
        if (dataLoadFailed) {
            selectionMessage.textContent = 'Unable to load resources right now. Please refresh the page to try again.';
            return;
        }
        if (!isDataLoaded) {
            selectionMessage.textContent = 'Loading resources...';
            return;
        }

        const hasSearch = shouldApplySearch();
        const hasFilters = hasActiveFilters();

        if (!hasSearch && !hasFilters) {
            selectionMessage.textContent = "Select semester & resource type to view resources";
        } else if (hasSearch) {
            selectionMessage.textContent = "Showing resources matching your search";
        } else {
            selectionMessage.textContent = "Showing resources for selected criteria";
        }
    }
    
    // Render resources based on selections
    function renderResources() {
        syncSelectionLabels();
        resourcesContainer.innerHTML = '';
        
        if (dataLoadFailed) {
            selectionMessage.textContent = 'Unable to load resources right now. Please refresh the page to try again.';
            resourcesContainer.innerHTML = `
                <div class="no-resources">
                    Unable to load resources right now. Please refresh the page to try again.
                </div>
            `;
            return;
        }

        if (!isDataLoaded) {
            selectionMessage.textContent = 'Loading resources...';
            resourcesContainer.innerHTML = `
                <div class="no-resources">
                    Loading resources...
                </div>
            `;
            return;
        }

        const hasSearch = shouldApplySearch();
        const hasFilters = hasActiveFilters();

        if (!hasSearch && !hasFilters) {
            showInitialContent();
            updateSelectionMessage();
            return;
        }

        if (currentResource && currentResource !== 'all') {
            renderSpecificResource(currentResource);
        } else {
            renderAllResources();
        }

        updateSelectionMessage();
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
                        <li>Important Questions</li>
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
        const sections = ['assignments', 'notes', 'important_questions', 'pdfs', 'records', 'syllabus', 'papers'];
        let hasContent = false;
        
        sections.forEach(section => {
            const data = resourceData[section];
            const filteredData = filterSectionData(section, data);

            if (currentSemester === 'all' || !currentSemester) {
                const sectionMarkup = createAllSemestersResourceSection(section, filteredData);
                hasContent = hasContent || sectionMarkup;
            } else if (filteredData[currentSemester] && 
                      (Array.isArray(filteredData[currentSemester]) || Object.keys(filteredData[currentSemester]).length > 0)) {
                createResourceSection(section, filteredData[currentSemester], currentSemester);
                hasContent = true;
            }
        });

        if (!hasContent) {
            resourcesContainer.innerHTML = `
                <div class="no-resources">
                    No resources found for the selected criteria.
                </div>
            `;
        }
    }
    
    // Render specific resource type
    function renderSpecificResource(resourceType) {
        const data = resourceData[resourceType];
        const filteredData = filterSectionData(resourceType, data);
        
        if (!currentSemester || currentSemester === 'all') {
            const hasContent = createAllSemestersResourceSection(resourceType, filteredData);
            if (!hasContent) {
                resourcesContainer.innerHTML = `
                    <div class="no-resources">
                        No resources found for the selected criteria.
                    </div>
                `;
            }
        } else if (filteredData[currentSemester] && 
                  (Array.isArray(filteredData[currentSemester]) || Object.keys(filteredData[currentSemester]).length > 0)) {
            createResourceSection(resourceType, filteredData[currentSemester], currentSemester);
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
            return true;
        }

        return false;
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
    
    // Create the "Copy Reference Link" button for a resource card.
    // Reuses item.refCode exactly as stamped by buildResourceRefIndex() -
    // no new reference codes are generated here. Untouched from the last
    // integration: same class, same data-ref, same click-delegation hook.
    function createCopyLinkButton(item) {
        if (!item || typeof item !== 'object' || !item.refCode) return null;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'copy-resource-link dc-btn dc-btn-blue';
        btn.dataset.ref = item.refCode;
        btn.setAttribute('aria-label', 'Copy direct link to this resource');
        btn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>' +
            '<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>' +
            '</svg>Copy Ref-Link';
        return btn;
    }

    // ---- File type detection -------------------------------------------
    // Priority: explicit item.fileType, then item.type, then a best-effort
    // extension sniff on the name/link (works for direct file links; Google
    // Drive share links rarely expose an extension, hence the manual
    // override fields). Falls back to 'unknown' -> generic file icon.
    const FILE_EXT_GROUPS = {
        image: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'],
        video: ['mp4', 'mov', 'avi', 'mkv', 'webm'],
        audio: ['mp3', 'wav', 'ogg', 'm4a']
    };

    function detectFileType(item) {
        if (!item || typeof item !== 'object') return 'unknown';
        if (item.fileType) return String(item.fileType).toLowerCase();
        if (item.type) return String(item.type).toLowerCase();

        const haystack = ((item.name || '') + ' ' + (item.link || '')).toLowerCase();
        const extMatch = haystack.match(/\.([a-z0-9]{2,5})(?:[?"'\s]|$)/);
        if (extMatch) {
            const ext = extMatch[1];
            for (const group in FILE_EXT_GROUPS) {
                if (FILE_EXT_GROUPS[group].indexOf(ext) !== -1) return group;
            }
            if (['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'zip', 'rar', 'txt'].indexOf(ext) !== -1) {
                return ext;
            }
        }
        return 'unknown';
    }

    // ---- File icon SVGs --------------------------------------------------
    // Same base "folded-corner page" silhouette as the provided PDF/DOC
    // design, parameterized by color + label so every requested file type
    // (docx, ppt/pptx, xls/xlsx, zip/rar, image/video/audio, unknown) gets
    // its own color-coded logo without inventing a different visual language.
    let dcGradCounter = 0;

    const FILE_ICON_STYLES = {
        pdf:     { label: 'PDF',  bar: '#ee2b26' },
        doc:     { label: 'DOC',  bar: '#185ABD', bluePage: true },
        docx:    { label: 'DOCX', bar: '#185ABD', bluePage: true },
        ppt:     { label: 'PPT',  bar: '#fb923c' },
        pptx:    { label: 'PPTX', bar: '#fb923c' },
        xls:     { label: 'XLS',  bar: '#22c55e' },
        xlsx:    { label: 'XLSX', bar: '#22c55e' },
        zip:     { label: 'ZIP',  bar: '#8a6ff0' },
        rar:     { label: 'RAR',  bar: '#8a6ff0' },
        txt:     { label: 'TXT',  bar: '#6b7280' },
        image:   { label: 'IMG',  bar: '#22d3ee' },
        video:   { label: 'VID',  bar: '#f472b6' },
        audio:   { label: 'AUD',  bar: '#60a5fa' },
        unknown: { label: 'FILE', bar: '#9a9aa5' }
    };

    function createFileIconSvg(fileType) {
        const style = FILE_ICON_STYLES[fileType] || FILE_ICON_STYLES.unknown;
        let pageFill = '#f2f2f2';
        let foldFill = '#c9c9c9';

        if (style.bluePage) {
            dcGradCounter += 1;
            const gradId = 'dcDocGrad' + dcGradCounter;
            pageFill = 'url(#' + gradId + ')';
            foldFill = '#7cc4ff';
            return '<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">' +
                '<defs><linearGradient id="' + gradId + '" x1="0" y1="0" x2="0" y2="1">' +
                '<stop offset="0" stop-color="#2a9bf5"/><stop offset="1" stop-color="#0d6fe0"/>' +
                '</linearGradient></defs>' +
                '<path d="M20 14 C20 8.5 24.5 4 30 4 L128 4 L180 56 L180 206 C180 211.5 175.5 216 170 216 L30 216 C24.5 216 20 211.5 20 206 Z" fill="' + pageFill + '"/>' +
                '<path d="M128 4 L180 56 L138 56 C132.5 56 128 51.5 128 46 Z" fill="' + foldFill + '"/>' +
                '<rect x="46" y="76" width="86" height="9" rx="4.5" fill="#b9b9ba"/>' +
                '<rect x="46" y="98" width="70" height="9" rx="4.5" fill="#b9b9ba"/>' +
                '<rect x="14" y="128" width="172" height="58" rx="8" fill="' + style.bar + '"/>' +
                '<text x="100" y="' + (style.label.length > 3 ? 163 : 168) + '" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="' + (style.label.length > 3 ? 32 : 42) + '" fill="#ffffff">' + style.label + '</text>' +
                '</svg>';
        }

        return '<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M20 14 C20 8.5 24.5 4 30 4 L128 4 L180 56 L180 206 C180 211.5 175.5 216 170 216 L30 216 C24.5 216 20 211.5 20 206 Z" fill="' + pageFill + '"/>' +
            '<path d="M128 4 L180 56 L138 56 C132.5 56 128 51.5 128 46 Z" fill="' + foldFill + '"/>' +
            '<rect x="46" y="76" width="86" height="9" rx="4.5" fill="#b9b9ba"/>' +
            '<rect x="46" y="98" width="70" height="9" rx="4.5" fill="#b9b9ba"/>' +
            '<rect x="14" y="128" width="172" height="58" rx="8" fill="' + style.bar + '"/>' +
            '<text x="100" y="' + (style.label.length > 3 ? 163 : 168) + '" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="800" font-size="' + (style.label.length > 3 ? 32 : 42) + '" fill="#ffffff">' + style.label + '</text>' +
            '</svg>';
    } 

    // ---- Google Drive preview URL ---------------------------------------
    // The View button must open Drive's inline preview and never download.
    // Existing links look like: https://drive.google.com/uc?export=download&id=FILE_ID
    // We pull FILE_ID out (works for both the "uc?...id=" and "/d/ID/" link
    // shapes) and build https://drive.google.com/file/d/FILE_ID/view, which
    // opens Drive's viewer on desktop, Android and iOS instead of downloading.
    // Non-Drive links are returned unchanged (best effort - we can't assume a
    // preview endpoint exists for an arbitrary URL).
    function getDriveViewUrl(link) {
        if (!link) return link;
        const idMatch = link.match(/[?&]id=([a-zA-Z0-9_-]+)/) || link.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (idMatch && idMatch[1]) {
            return 'https://drive.google.com/file/d/' + idMatch[1] + '/view';
        }
        return link;
    }

    // Build a single resource <li> using the user's provided document-card
    // design (.dc-card). The <li> wrapper itself stays unstyled and is only
    // there because the existing deep-link/highlight logic looks for
    // a.closest('li'); the plain-text <a class="dc-title"> textContent is
    // kept identical to item.name (used as the deep-link fallback matcher).
    //
    // Data mapping (all optional fields are only rendered when present on
    // the item - nothing here is invented):
    //   - dc-title      <- item.name (required)
    //   - dc-icon-wrap  <- item.fileType / item.type, else sniffed from the
    //                      name/link, else 'unknown' (generic file icon)
    //   - dc-badge      <- item.badge or item.authorBadge; hidden entirely
    //                      if neither is set
    //   - dc-meta       <- item.pages (displayed verbatim, e.g. "24 Pages" -
    //                      manual string, no auto-detection/suffix logic),
    //                      item.uploadedDate ("Uploaded on <date>"), and the
    //                      subject name (when grouped under a subject) -
    //                      each piece only added if present, dot-separated
    //   - View button   <- Drive preview URL derived from item.link (never
    //                      downloads); Download button keeps item.link and
    //                      the existing download attribute exactly as before
    //   - Download count has been removed from the UI entirely (no longer
    //                      rendered even if item.downloads is set)
    //   - Copy Reference Link <- existing copy-resource-link/refCode logic, untouched
    
    // View and Download URLs are generated directly from item.fileId - no
    // Drive URLs are ever stored in the data itself. Falls back to a raw
    // item.link only for legacy items that don't carry a fileId.
    function getViewUrl(item) {
        if (item && item.fileId) {
            return 'https://drive.google.com/file/d/' + item.fileId + '/view';
        }
        return getDriveViewUrl(item ? item.link : null);
    }

    function getDownloadUrl(item) {
        if (item && item.fileId) {
            return 'https://drive.google.com/uc?export=download&id=' + item.fileId;
        }
        return item ? item.link : null;
    }
    
    
    function createResourceCard(type, item, subject) {
        const li = document.createElement('li');
        li.className = 'resource-card';

        const isObj = typeof item === 'object' && item !== null;
        const name = isObj ? item.name : item;
        const link = isObj
            ? (item.fileId
                ? getDownloadUrl(item)
                : item.link)
            : null;
            const badgeText = isObj ? (item.badge || item.authorBadge || null) : null;
        const pages = isObj ? item.pages : null;
        const uploadedDate = isObj ? item.uploadedDate : null;
        const resourceId = isObj ? item.resourceId : null;
        const fileType = detectFileType(item);

        const card = document.createElement('div');
        card.className = 'dc-card';

        const iconWrap = document.createElement('div');
        iconWrap.className = 'dc-icon-wrap';
        iconWrap.innerHTML = createFileIconSvg(fileType);
        card.appendChild(iconWrap);

        const content = document.createElement('div');
        content.className = 'dc-content';

        if (badgeText) {
            const badge = document.createElement('span');
            badge.className = 'dc-badge';
            badge.textContent = badgeText;
            content.appendChild(badge);
        }

        let title;
        if (link || (isObj && item.fileId)) {
            title = document.createElement('a');
            title.className = 'dc-title';
            title.href = getViewUrl(item);
            title.target = '_blank';
            title.rel = 'noopener noreferrer';
        } else {
            title = document.createElement('div');
            title.className = 'dc-title';
        }
        title.textContent = name;
        content.appendChild(title);

        const metaParts = [];
        if (pages !== null && pages !== undefined && pages !== '') {
            metaParts.push(pages);
        }
        if (resourceId) {
            metaParts.push(resourceId);
        }
        if (metaParts.length) {
            const meta = document.createElement('div');
            meta.className = 'dc-meta';
            metaParts.forEach((part, i) => {
                if (i > 0) {
                    const dot = document.createElement('span');
                    dot.className = 'dc-dot';
                    meta.appendChild(dot);
                }
                const span = document.createElement('span');
                span.textContent = part;
                meta.appendChild(span);
            });
            content.appendChild(meta);
        }

        if (link || (isObj && item.fileId)) {
            const actions = document.createElement('div');
            actions.className = 'dc-actions';

            // Detect Android/iPhone
            const isMobileDevice = /Android|iPhone|iPod/i.test(navigator.userAgent);
            
            // Add mobile class to actions container
            if (isMobileDevice) {
                actions.classList.add('mobile-actions');
            }
            
            // Show View button only on non-mobile devices
            if (!isMobileDevice) {
                const viewBtn = document.createElement('a');
                viewBtn.className = 'dc-btn dc-btn-dark dc-btn-view';
                viewBtn.href = getViewUrl(item);
                viewBtn.target = '_blank';
                viewBtn.rel = 'noopener noreferrer';
                viewBtn.innerHTML =
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>View';
            
                actions.appendChild(viewBtn);
            }           
            // Download -> untouched existing link/behavior. Download count
            // has been removed from the UI entirely (per latest spec) - no
            // count is rendered even if item.downloads is set.
            const downloadBtn = document.createElement('a');
            downloadBtn.className = 'dc-btn dc-btn-dark dc-btn-download';
            downloadBtn.href = getDownloadUrl(item);
            downloadBtn.target = '_blank';
            downloadBtn.rel = 'noopener noreferrer';
            downloadBtn.setAttribute('download', '');
            downloadBtn.innerHTML =
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>Download';
            actions.appendChild(downloadBtn);

            const copyBtn = createCopyLinkButton(item);
            if (copyBtn) {
                copyBtn.classList.add('dc-btn-copy');
                actions.appendChild(copyBtn);
            }

            content.appendChild(actions);
        }

        card.appendChild(content);
        li.appendChild(card);
        return li;
    }

    // Create resource list based on type
function createResourceList(type, data) {
    const list = document.createElement("div");
    list.className = "resource-list";

    if (Array.isArray(data)) {
        const group = document.createElement("ul");
        group.className = "subject-group";

        data.forEach(item => {
            group.appendChild(createResourceCard(type, item, null));
        });

        list.appendChild(group);
    } else {
        Object.keys(data).forEach(subject => {

            const title = document.createElement("div");
            title.className = "subject-title";
            title.textContent = subject;
            list.appendChild(title);

            const group = document.createElement("ul");
            group.className = "subject-group";

            data[subject].forEach(item => {
                group.appendChild(createResourceCard(type, item, subject));
            });

            list.appendChild(group);
        });
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
            'important_questions': 'Important Questions',
            'pdfs': 'PDF\'s',
            'records': 'Records',
            'syllabus': 'Syllabus',
            'papers': 'Question Papers',
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

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        searchClearBtn.hidden = !currentSearch.trim();
        renderResources();
    });

    searchClearBtn.addEventListener('click', () => {
        currentSearch = '';
        searchInput.value = '';
        searchClearBtn.hidden = true;
        renderResources();
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
    
    // Show initial content on page load, then kick off the API fetch
    showInitialContent();
    loadResourceData();
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

// NAV
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));

// HAMBURGER
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => { burger.classList.toggle('open'); mobileNav.classList.toggle('open'); }); 
function closeMobile() { burger.classList.remove('open'); mobileNav.classList.remove('open'); }

// REVEAL
const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } }), { threshold: 0.1 });
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => obs.observe(el));

// STAGGER
document.querySelectorAll('.features-grid .card, .apps-grid .card, .explore-grid .card').forEach((el,i) => { el.style.transitionDelay = (i * 0.07) + 's'; });

/* DEEP-LINK RESOURCE NAVIGATION */
(function () {
    'use strict';

    var HIGHLIGHT_CLASS = 'deep-link-highlight';
    var HIGHLIGHT_MIN_MS = 8000;
    var HIGHLIGHT_MAX_MS = 10000;

    var lastProcessedRef = null;
    var highlightTimer = null;
    var isResolving = false;

    /* ---------------------------- utilities ---------------------------- */

    function decodeHash() {
        var raw = window.location.hash || '';
        if (!raw || raw === '#') return null;
        var value = raw.slice(1);
        try {
            value = decodeURIComponent(value);
        } catch (e) {
            // leave as-is if decoding fails
        }
        value = value.trim();
        return value || null;
    }

    function waitFor(conditionFn, timeoutMs, intervalMs) {
        timeoutMs = timeoutMs || 5000;
        intervalMs = intervalMs || 50;
        return new Promise(function (resolve) {
            var start = Date.now();
            (function poll() {
                var result;
                try {
                    result = conditionFn();
                } catch (e) {
                    result = null;
                }
                if (result) {
                    resolve(result);
                } else if (Date.now() - start >= timeoutMs) {
                    resolve(null);
                } else {
                    setTimeout(poll, intervalMs);
                }
            })();
        });
    }

    /* ---------------------------- DOM helpers ---------------------------- */

    function selectOptionByValue(containerId, value) {
        var container = document.getElementById(containerId);
        if (!container) return false;
        var options = container.querySelectorAll('.option');
        for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            if (opt.dataset && String(opt.dataset.value) === String(value)) {
                opt.click(); // reuse the existing, unmodified selection logic
                return true;
            }
        }
        return false;
    }

    function expandCollapsedAncestors(el) {
        var node = el;
        while (node && node !== document.body) {
            if (node.classList) {
                if (node.classList.contains('collapsed')) {
                    node.classList.remove('collapsed');
                }
                if (node.getAttribute && node.getAttribute('aria-expanded') === 'false') {
                    node.setAttribute('aria-expanded', 'true');
                }
                if (node.style && node.style.display === 'none') {
                    node.style.display = '';
                }
            }
            node = node.parentElement;
        }
    }

    function findTargetElement(entry) {
        var container = document.getElementById('resources-container');
        if (!container || !entry || !entry.item) return null;

        var anchors = container.querySelectorAll('a');
        var i, a;

        if (entry.item.link) {
            for (i = 0; i < anchors.length; i++) {
                a = anchors[i];
                if (a.getAttribute('href') === entry.item.link) {
                    return a.closest('li') || a;
                }
            }
        }

        if (entry.item.name) {
            var target = entry.item.name.trim();
            for (i = 0; i < anchors.length; i++) {
                a = anchors[i];
                if (a.textContent.trim() === target) {
                    return a.closest('li') || a;
                }
            }
            var items = container.querySelectorAll('li');
            for (i = 0; i < items.length; i++) {
                if (items[i].textContent.trim() === target) {
                    return items[i];
                }
            }
        }

        return null;
    }

    /* ------------------------------ styling ------------------------------ */

    function injectHighlightStyles() {
        if (document.getElementById('deep-link-highlight-styles')) return;
        var style = document.createElement('style');
        style.id = 'deep-link-highlight-styles';
        style.textContent =
            '@keyframes colorGlow {' +
            '0% { box-shadow: 0 0 0 rgba(59,130,246,.2); border-color: var(--blue, #3b82f6); background: rgba(59,130,246,.08); }' +
            '25% { box-shadow: 0 0 18px rgba(34,211,238,.45); border-color: var(--cyan, #22d3ee); }' +
            '50% { box-shadow: 0 0 26px rgba(167,139,250,.55); border-color: var(--violet, #a78bfa); background: rgba(167,139,250,.08); }' +
            '75% { box-shadow: 0 0 18px rgba(96,165,250,.45); border-color: var(--blue2, #60a5fa); }' +
            '100% { box-shadow: 0 0 0 rgba(59,130,246,.2); border-color: var(--blue, #3b82f6); background: rgba(59,130,246,.08); }' +
            '}' +
            '.' + HIGHLIGHT_CLASS + ' {' +
            'animation: colorGlow 2.5s ease-in-out infinite;' +
            'font-weight: 600;' +
            'border-radius: 8px;' +
            'border: 1px solid transparent;' +
            'scroll-margin: 80px;' +
            '}';
        document.head.appendChild(style);
    }

    function highlightTarget(el) {
        if (!el) return;
        injectHighlightStyles();

        var existing = document.querySelectorAll('.' + HIGHLIGHT_CLASS);
        for (var i = 0; i < existing.length; i++) {
            existing[i].classList.remove(HIGHLIGHT_CLASS);
        }
        if (highlightTimer) clearTimeout(highlightTimer);

        expandCollapsedAncestors(el);

        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add(HIGHLIGHT_CLASS);

        var duration = HIGHLIGHT_MIN_MS + Math.random() * (HIGHLIGHT_MAX_MS - HIGHLIGHT_MIN_MS);
        highlightTimer = setTimeout(function () {
            el.classList.remove(HIGHLIGHT_CLASS);
        }, duration);
    }

    /* ------------------------------- flow -------------------------------- */

    window.handleDeepLink = function () {
        var refCode = decodeHash();
        if (!refCode || refCode === lastProcessedRef || isResolving) return;
        isResolving = true;

        waitFor(function () { return window.__resourcesRefIndex; }, 5000, 50).then(function (index) {
            if (!index) { isResolving = false; return; } // fail silently

            var entry = index[refCode];
            if (!entry) { isResolving = false; return; } // no matching resource: fail silently

            lastProcessedRef = refCode;

            selectOptionByValue('semester-options', entry.semester);
            selectOptionByValue('resource-options', entry.section);

            waitFor(function () { return findTargetElement(entry); }, 4000, 60).then(function (target) {
                isResolving = false;
                if (!target) return; // fail silently
                requestAnimationFrame(function () { highlightTarget(target); });
            });
        });
    }

    window.addEventListener('hashchange', handleDeepLink);
    window.addEventListener('load', function () {
        setTimeout(handleDeepLink, 60);
    });
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(handleDeepLink, 60);
    });
})();

/* COPY DIRECT LINK */
(function () {
    'use strict';

    var toastTimer = null;

    function injectCopyLinkStyles() {
        if (document.getElementById('copy-link-styles')) return;
        var style = document.createElement('style');
        style.id = 'copy-link-styles';
        style.textContent =
            '.copy-link-toast {' +
            'position: fixed;' +
            'left: 50%;' +
            'bottom: 28px;' +
            'transform: translateX(-50%) translateY(12px);' +
            'background: #111827;' +
            'color: #fff;' +
            'padding: 10px 18px;' +
            'border-radius: 999px;' +
            'font-size: 0.9rem;' +
            'font-weight: 600;' +
            'box-shadow: 0 8px 24px rgba(0,0,0,.25);' +
            'opacity: 0;' +
            'pointer-events: none;' +
            'transition: opacity .25s ease, transform .25s ease;' +
            'z-index: 9999;' +
            '}' +
            '.copy-link-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }';
        document.head.appendChild(style);
    }

    function showCopyToast(message) {
        injectCopyLinkStyles();

        var toast = document.getElementById('copy-link-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'copy-link-toast';
            toast.className = 'copy-link-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = message;
        toast.classList.add('show');

        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            toast.classList.remove('show');
        }, 2200);
    }

    function buildResourceUrl(refCode) {
        return window.location.origin + window.location.pathname + '#' + refCode;
    }

    function copyResourceLink(refCode) {
        var url = buildResourceUrl(refCode);

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(function () {
                showCopyToast('<i class="fas fa-link"></i> &nbsp;Resource Link Copied');
            }).catch(function () {
                window.prompt('Copy this link:', url);
            });
        } else {
            window.prompt('Copy this link:', url);
        }
    }

    document.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('.copy-resource-link') : null;
        if (!btn) return;

        e.preventDefault();
        var refCode = btn.dataset.ref;
        if (!refCode) return;

        copyResourceLink(refCode);
    });

    document.addEventListener('DOMContentLoaded', injectCopyLinkStyles);
})();


