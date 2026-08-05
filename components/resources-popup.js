/* ==========================================================
   RESOURCE POPUP
========================================================== */

const resourcePopup =
    document.getElementById("resourcePopup");

const popupTerminal =
    document.getElementById("popupTerminal");

let popupCurrentLine = null;

/* ==========================================================
   SHOW / HIDE
========================================================== */

function showResourcePopup(){

    if(!resourcePopup) return;

    popupTerminal.innerHTML = "";

    popupCurrentLine = null;

    /* Temporary startup message */

    const line = document.createElement("div");

    line.className =
        "loader-terminal-line loader-terminal-current";

    line.id = "popupPlaceholder";

    line.innerHTML = `
        <span class="terminal-prefix">&gt;</span>
        <span class="terminal-text">
            Initializing Resources...
        </span>
        <span class="terminal-cursor"></span>
    `;

    popupTerminal.appendChild(line);

    resourcePopup.classList.add("show");

}

function hideResourcePopup(){

    if(!resourcePopup) return;

    resourcePopup.classList.remove("show");

}

/* ==========================================================
   TERMINAL
========================================================== */

function popupTerminalLog(message){

    if(!popupTerminal) return;

    const placeholder =
    document.getElementById("popupPlaceholder");

    if (placeholder) {

    popupTerminal.innerHTML = "";

    }

    if(popupCurrentLine){

        popupCurrentLine.classList.remove(
            "loader-terminal-current"
        );

        popupCurrentLine.classList.add(
            "loader-terminal-success"
        );

        popupCurrentLine.innerHTML =
            `<span class="terminal-success">✓</span>
             <span class="terminal-text">
                ${popupCurrentLine.dataset.message}
             </span>`;

    }

    const line = document.createElement("div");

    line.className =
        "loader-terminal-line loader-terminal-current";

    line.dataset.message = message;

    line.innerHTML =
        `<span class="terminal-prefix">&gt;</span>
         <span class="terminal-text">${message}</span>
         <span class="terminal-cursor"></span>`;

    popupTerminal.appendChild(line);

    popupCurrentLine = line;

    popupTerminal.scrollTop =
        popupTerminal.scrollHeight;

}

function popupTerminalDone(){

    if(!popupCurrentLine) return;

    popupCurrentLine.classList.remove(
        "loader-terminal-current"
    );

    popupCurrentLine.classList.add(
        "loader-terminal-success"
    );

    popupCurrentLine.innerHTML =
        `<span class="terminal-success">✓</span>
         <span class="terminal-text">
            ${popupCurrentLine.dataset.message}
         </span>`;

    popupCurrentLine = null;

}

function popupTerminalError(message){

    if(!popupCurrentLine) return;

    popupCurrentLine.classList.remove(
        "loader-terminal-current"
    );

    popupCurrentLine.classList.add(
        "loader-terminal-error"
    );

    popupCurrentLine.innerHTML =
        `<span class="terminal-error">✗</span>
         <span class="terminal-text">${message}</span>`;

    popupCurrentLine = null;

}