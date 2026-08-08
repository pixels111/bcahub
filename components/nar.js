/* ==========================================================
   Admin GLOBAL API
========================================================== */

const API = "https://script.google.com/macros/s/AKfycbywaNi6QZqgRTJztV3MkqD8Aa5eabhFNDfCh6dMoXrDT58VavKKqz8E9HuM_2DfZLwodQ/exec";

/* ==========================================================
   PART 1
   FILE TYPE DETECTION
========================================================== */

const FILE_EXT_GROUPS = {

    image: ["png","jpg","jpeg","gif","webp","svg","bmp"],
    video: ["mp4","mov","avi","mkv","webm"],
    audio: ["mp3","wav","ogg","m4a"]

};

function detectFileType(item){

    if(!item || typeof item !== "object"){

        return "unknown"; 

    }

    if(item.fileType){

        return String(item.fileType).toLowerCase();

    }

    if(item.type){

        return String(item.type).toLowerCase();

    }

    if(item.Type){

        return String(item.Type).toLowerCase();

    }

    const text = (
        (item.name || "") +
        " " +
        (item.Title || "") +
        " " +
        (item.link || "") +
        " " +
        (item.Link || "")
    ).toLowerCase();

    const ext = text.match(/\.([a-z0-9]{2,5})(?:[?"'\s]|$)/);

    if(ext){

        const value = ext[1];

        for(const group in FILE_EXT_GROUPS){

            if(FILE_EXT_GROUPS[group].includes(value)){

                return group;

            }

        }

        if([
            "pdf",
            "doc",
            "docx",
            "ppt",
            "pptx",
            "xls",
            "xlsx",
            "zip",
            "rar",
            "txt"
        ].includes(value)){

            return value;

        }

    }

    return "unknown";

}

/* ==========================================================
   FILE ICON STYLES
========================================================== */

let narGradCounter = 0;

const FILE_ICON_STYLES = {

    pdf:     {label:"PDF",bar:"#ee2b26"},
    doc:     {label:"DOC",bar:"#185ABD",bluePage:true},
    docx:    {label:"DOCX",bar:"#185ABD",bluePage:true},
    ppt:     {label:"PPT",bar:"#fb923c"},
    pptx:    {label:"PPTX",bar:"#fb923c"},
    xls:     {label:"XLS",bar:"#22c55e"},
    xlsx:    {label:"XLSX",bar:"#22c55e"},
    zip:     {label:"ZIP",bar:"#8a6ff0"},
    rar:     {label:"RAR",bar:"#8a6ff0"},
    txt:     {label:"TXT",bar:"#6b7280"},
    image:   {label:"IMG",bar:"#22d3ee"},
    video:   {label:"VID",bar:"#f472b6"},
    audio:   {label:"AUD",bar:"#60a5fa"},
    unknown: {label:"FILE",bar:"#9a9aa5"}

};
/* ==========================================================
   PART 2A
   SVG FILE ICON GENERATOR
========================================================== */

function createFileIconSvg(fileType){

    const style =
        FILE_ICON_STYLES[fileType] ||
        FILE_ICON_STYLES.unknown;

    let pageFill = "#f4f6fb";
    let foldFill = "#d8dde8";

    const labelY =
        style.label.length > 3 ? 163 : 168;

    const labelSize =
        style.label.length > 3 ? 32 : 42;

    if(style.bluePage){

        narGradCounter++;

        const gradId =
            "narDocGrad" + narGradCounter;

        pageFill = `url(#${gradId})`;

        foldFill = "#7cc4ff";

        return `

<svg
viewBox="0 0 200 220"
xmlns="http://www.w3.org/2000/svg"
preserveAspectRatio="xMidYMid meet">

<defs>

<linearGradient
id="${gradId}"
x1="0"
y1="0"
x2="0"
y2="1">

<stop offset="0%" stop-color="#2a9bf5"/>
<stop offset="100%" stop-color="#0d6fe0"/>

</linearGradient>

</defs>

<path
d="M20 14
C20 8.5 24.5 4 30 4
L128 4
L180 56
L180 206
C180 211.5 175.5 216 170 216
L30 216
C24.5 216 20 211.5 20 206Z"
fill="${pageFill}"/>

<path
d="M128 4
L180 56
L138 56
C132.5 56 128 51.5 128 46Z"
fill="${foldFill}"/>

<rect
x="46"
y="76"
width="86"
height="9"
rx="4.5"
fill="#b7bcc7"/>

<rect
x="46"
y="98"
width="70"
height="9"
rx="4.5"
fill="#b7bcc7"/>

<rect
x="14"
y="128"
width="172"
height="58"
rx="8"
fill="${style.bar}"/>

<text
x="100"
y="${labelY}"
text-anchor="middle"
font-family="Poppins,sans-serif"
font-size="${labelSize}"
font-weight="800"
fill="#ffffff">

${style.label}

</text>

</svg>

`;

    }

    return `

<svg
viewBox="0 0 200 220"
xmlns="http://www.w3.org/2000/svg"
preserveAspectRatio="xMidYMid meet">

<path
d="M20 14
C20 8.5 24.5 4 30 4
L128 4
L180 56
L180 206
C180 211.5 175.5 216 170 216
L30 216
C24.5 216 20 211.5 20 206Z"
fill="${pageFill}"/>

<path
d="M128 4
L180 56
L138 56
C132.5 56 128 51.5 128 46Z"
fill="${foldFill}"/>

<rect
x="46"
y="76"
width="86"
height="9"
rx="4.5"
fill="#b7bcc7"/>

<rect
x="46"
y="98"
width="70"
height="9"
rx="4.5"
fill="#b7bcc7"/>

<rect
x="14"
y="128"
width="172"
height="58"
rx="8"
fill="${style.bar}"/>

<text
x="100"
y="${labelY}"
text-anchor="middle"
font-family="Poppins,sans-serif"
font-size="${labelSize}"
font-weight="800"
fill="#ffffff">

${style.label}

</text>

</svg>

`;

}

/* ==========================================================
   PART 2B
   RESOURCE CARD
========================================================== */

function createResourceCard(resource){

    const fileType = detectFileType(resource);

    return `

<article class="nar-card">

    <div class="nar-thumb">

        ${createFileIconSvg(fileType)}

    </div>

    <div class="nar-body">

        <div class="nar-top">

            <div class="nar-heading">

                <h3 class="nar-title">

                    ${resource.Title || "Untitled Resource"}

                </h3>

                <p class="nar-type">

                    ${resource["Resource Type"] || "Resource"}

                </p>

            </div>

            <span class="nar-author">

                Uploaded by

                <strong>

                    ${resource["Upload By"] || "Unknown"}

                </strong>

            </span>

        </div>

        <div class="nar-info">

            <span>

                <i class="fas fa-graduation-cap"></i>

                ${resource.Semester || "-"}

            </span>

            <span>

                <i class="fas fa-file"></i>

                ${resource.Pages || "-"}

            </span>

            <span>

                <i class="fas fa-calendar"></i>

                ${resource.uploadDate || "-"}

            </span>

        </div>

        <a
            href="${resource.Link || "#"}"
            class="nar-button">

            <i class="fas fa-download"></i>

            Get Resource

        </a>

    </div>

</article>

`;

}

/* ==========================================================
   PART 3
   NEWLY ADDED RESOURCES MODAL
========================================================== */

async function openResourcesModal() {

    const modal = document.getElementById("nar-modal");
    const container = document.getElementById("nar-content");

    if (!modal || !container) {

        console.error("Newly Added Resources modal not found.");

        return;

    }

    modal.classList.add("show");
    document.body.style.overflow = "hidden";

    container.innerHTML = `

        <div class="nar-loading">

            <i class="fas fa-spinner fa-spin"></i>

            <h3>Checking for newly added resources...</h3>

            <p>Please wait while we fetch the latest uploads.</p>

        </div>

    `;

    try {

        const response = await fetch(
            `${API}?sheet=new-resource-list`
        );

        if (!response.ok) {

            throw new Error("Failed to fetch resources.");

        }

        const resources = await response.json();

        if (!Array.isArray(resources) || resources.length === 0) {

            container.innerHTML = `

                <div class="nar-empty">

                    <i class="fas fa-folder-open"></i>

                    <h3>You're all caught up!</h3>

                    <p>No new resources have been added yet.</p>

                </div>

            `;

            return;

        }

        let html = "";

        resources.forEach(resource => {

            html += createResourceCard(resource);

        });

        container.innerHTML = html;

        requestAnimationFrame(() => {

            document
                .querySelectorAll(".nar-card")
                .forEach((card, index) => {

                    card.style.animationDelay =
                        `${index * 60}ms`;

                });

        });

    }

    catch (error) {

        console.error(error);

        container.innerHTML = `

            <div class="nar-error">

                <i class="fas fa-exclamation-circle"></i>

                <h3>Unable to load resources</h3>

                <p>Please try again later.</p>

            </div>

        `;

    }

}

/* ==========================================================
   CLOSE MODAL
========================================================== */

function closeResourcesModal() {

    const modal = document.getElementById("nar-modal");

    if (!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow = "";

}

/* ==========================================================
   MODAL EVENTS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("nar-modal");
    const closeBtn = document.getElementById("nar-close");

    if (!modal) return;

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeResourcesModal
        );

    }

    modal.addEventListener("click", e => {

        if (e.target === modal) {

            closeResourcesModal();

        }

    });

    document.addEventListener("keydown", e => {

        if (
            e.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeResourcesModal();

        }

    });

});

