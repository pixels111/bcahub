/* ==========================================================
   BCAHub Resources Loader v3.0
========================================================== */

const loader = document.getElementById("loader");
const pct = document.getElementById("loaderPct");
const loaderStatus = document.getElementById("loaderStatus");
const loaderTerminal = document.getElementById("loaderTerminal");

/* ==========================================================
   GLOBAL
========================================================== */

window.ResourcesLoader = {

    ready:false,

    finished:false,

    progress:95

};

/* ==========================================================
   STATUS
========================================================== */

function setLoaderStatus(text){

    if(loaderStatus){

        loaderStatus.textContent=text;

    }

}

/* ==========================================================
   TERMINAL ENGINE
========================================================== */

const loaderEngine = {

    activeLine: null,

    progress: 95,

    progressSteps: [96, 97, 98, 99, 100],

    stepIndex: 0,

    step(message) {

        if (!loaderTerminal) return;

        if (this.activeLine) {

            this.complete();

        }

        const line = document.createElement("div");

        line.className =
            "loader-terminal-line loader-terminal-current";

        line.dataset.message = message;

        line.innerHTML =
            `<span class="terminal-prefix">&gt;</span>
             <span class="terminal-text">${message}</span>
             <span class="terminal-cursor"></span>`;

        loaderTerminal.appendChild(line);

        loaderTerminal.scrollTop = loaderTerminal.scrollHeight;

        this.activeLine = line;

    },

    complete() {

        if (!this.activeLine) return;

        this.activeLine.classList.remove("loader-terminal-current");

        this.activeLine.classList.add("loader-terminal-success");

        this.activeLine.innerHTML =
            `<span class="terminal-success">✓</span>
             ${this.activeLine.dataset.message}`;

        this.activeLine = null;

        if (this.stepIndex < this.progressSteps.length) {

            this.progress = this.progressSteps[this.stepIndex++];

            pct.textContent = this.progress + "%";

        }

    },

    info(message) {

        const line = document.createElement("div");

        line.className = "loader-terminal-line";

        line.innerHTML =
            `<span class="terminal-info">ℹ</span> ${message}`;

        loaderTerminal.appendChild(line);

        loaderTerminal.scrollTop = loaderTerminal.scrollHeight;

    },

    error(message) {

        if (!this.activeLine) return;

        this.activeLine.classList.remove("loader-terminal-current");

        this.activeLine.classList.add("loader-terminal-error");

        this.activeLine.innerHTML =
            `<span class="terminal-error">✗</span> ${message}`;

        this.activeLine = null;

    },

    finish() {

        this.progress = 100;

        pct.textContent = "100%";

        window.ResourcesLoader.ready = true;

    }

};

/* ==========================================================
   PUBLIC API
========================================================== */

window.loaderEngine = loaderEngine;

/* ==========================================================
   PROGRESS
========================================================== */
if (loader && pct) {

    if (sessionStorage.getItem("loaderShown")) {

        loader.style.display = "none";

    } else {

        sessionStorage.setItem("loaderShown", "true");

        let progress = 0;

        const interval = setInterval(() => {

            if (progress < 95) {

                progress += Math.floor(Math.random() * 6) + 3;

                if (progress > 95) {

                    progress = 95;

                }

                pct.textContent = progress + "%";

            }

            if (window.ResourcesLoader.ready) {

                clearInterval(interval);

                pct.textContent = "100%";

                setTimeout(() => {

                    loader.classList.add("done");

                }, 1000);

            }

        }, 100);

    }

}

function finishResourcesLoader() {

    if (window.ResourcesLoader.finished) return;

    window.ResourcesLoader.finished = true;

    loaderEngine.finish();

}