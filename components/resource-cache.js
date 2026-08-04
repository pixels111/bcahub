/* ==========================================================
   BCAHub Resource Cache Manager
   ----------------------------------------------------------
   Shared across all pages.
   Handles:
   - Version checking
   - Background prefetch
   - Session cache
   ========================================================== */

const RESOURCE_API = "https://script.google.com/macros/s/AKfycbyEaoQMkMlEP5AAaKQYakoFc19V-mQvsWoJLuu8bHdjxAvr3Bow3FalVKH7hgKOm7pp/exec";

const RESOURCE_CACHE_KEY = "bcahub_resources";

const META_CHECK_KEY = "bcahub_meta_check";
const META_CHECK_INTERVAL = 30000; // 30 seconds

let resourcePrefetchPromise = null;

window.BCAHubResourceState = {

    downloading: false,

    ready: false

};

let resourcePopupElement = null;

document.addEventListener("DOMContentLoaded", () => {

    resourcePopupElement = document.getElementById("resourcePopup");

});

/* ==========================================================
   LOADER STATUS
========================================================== */

function updateLoaderStatus(message) {

    if (typeof setLoaderStatus === "function") {

        setLoaderStatus(message);

    }

}

function loaderStep(message) {

    const popupVisible =
        resourcePopupElement?.classList.contains("show");

    if (popupVisible && typeof popupTerminalLog === "function") {

        popupTerminalLog(message);

    }

    else if (window.loaderEngine) {

        window.loaderEngine.step(message);

    }

}

function loaderInfo(message) {

    const popupVisible =
        resourcePopupElement?.classList.contains("show");

    if (popupVisible && typeof popupTerminalLog === "function") {

        popupTerminalLog(message);

    }

    else if (window.loaderEngine) {

        window.loaderEngine.info(message);

    }

}

function loaderError(message) {

    const popupVisible =
        resourcePopupElement?.classList.contains("show");

    if (popupVisible && typeof popupTerminalError === "function") {

        popupTerminalError(message);

    }

    else if (window.loaderEngine) {

        window.loaderEngine.error(message);

    }

}

/* ==========================================================
   CACHE
========================================================== */

function getCachedResources() {

    const cache = sessionStorage.getItem(RESOURCE_CACHE_KEY);

    if (!cache) return null;

    try {

        return JSON.parse(cache);

    } catch (err) {

        sessionStorage.removeItem(RESOURCE_CACHE_KEY);

        return null;

    }

}

function saveCachedResources(version, data) {

    sessionStorage.setItem(

        RESOURCE_CACHE_KEY,

        JSON.stringify({

            version,

            data,

            cachedAt: Date.now()

        })

    );

}

function clearCachedResources() {

    sessionStorage.removeItem(RESOURCE_CACHE_KEY);

}

/* ==========================================================
   API
========================================================== */

async function fetchResourceMeta() {

    loaderStep("Booting Resources");
    loaderStep("Reading Local Cache");

    updateLoaderStatus("Connecting to Resource Server...");

    const lastCheck = Number(sessionStorage.getItem(META_CHECK_KEY));

    const cache = getCachedResources();

    // Use cached version if metadata was checked recently
    if (

        cache &&
        lastCheck &&
        (Date.now() - lastCheck) < META_CHECK_INTERVAL

    ) {

        loaderStep("Using Local Cache");

        return {

            version: cache.version

        };

    }

    loaderStep("Cache Miss");
    loaderStep("Connecting to Resource Server");

    const response = await fetch(`${RESOURCE_API}?mode=meta`);

    if (!response.ok) {

        throw new Error("Unable to fetch resource metadata.");

    }

    const meta = await response.json();

    sessionStorage.setItem(

        META_CHECK_KEY,

        Date.now()

    );

    return meta;

}

/* ---------- Fetch Latest Resources ---------- */

async function fetchLatestResources() {

    loaderStep("Downloading Resource Database");

    updateLoaderStatus("Fetching Latest Resources...");

    const response = await fetch(`${RESOURCE_API}?mode=data`);

    if (!response.ok) {

        throw new Error("Unable to fetch resource data.");

    }

    const data = await response.json();

    let count = 0;

    Object.values(data).forEach(semester => {

        Object.values(semester).forEach(category => {

            if (Array.isArray(category)) {

                count += category.length;

            }

            else {

                Object.values(category).forEach(arr => {

                    count += arr.length;

                });

            }

        });

    });

    loaderStep(`Downloaded ${count} Resources`);

    return data;

}

/* ==========================================================
   PREFETCH
========================================================== */
async function prefetchResources() {

    // Already downloading?
    if (resourcePrefetchPromise) {

        return resourcePrefetchPromise;

    }

    resourcePrefetchPromise = (async () => {

        window.BCAHubResourceState.downloading = true;

        try {

            const meta = await fetchResourceMeta();

            const cache = getCachedResources();

            // Cache missing
            if (!cache) {

                const data = await fetchLatestResources();

                saveCachedResources(meta.version, data);

                window.BCAHubResourceState.ready = true;

                console.log("[BCAHub] Resources cached.");

                return;

            }

            // Cache latest
            if (cache.version === meta.version) {

                window.BCAHubResourceState.ready = true;

                console.log("[BCAHub] Cache is up to date.");

                return;

            }

            // Version changed
            const data = await fetchLatestResources();

            saveCachedResources(meta.version, data);

            window.BCAHubResourceState.ready = true;

            console.log("[BCAHub] Cache updated.");

        }

        catch (error) {

            console.error("[BCAHub] Prefetch failed:", error);

        }

        finally {

            window.BCAHubResourceState.downloading = false;
            resourcePrefetchPromise = null;

        }

    })();
    
    return resourcePrefetchPromise;

}

/* ==========================================================
   GET RESOURCES
========================================================== */

async function getResources() {

    await prefetchResources();

    const cache = getCachedResources();

    if (!cache) {

        throw new Error("Resource cache unavailable.");

    }

    return cache.data;

}
/* ==========================================================
   AUTO PREFETCH
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    prefetchResources();

});