async function loadUpdates() {

    const list = document.getElementById("updates-list");

    if (!list) return;

    list.innerHTML = `
        <li class="update-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading updates...</span>
        </li>
    `;

    try {

        const response = await fetch(`${API}?sheet=updates`);

        if (!response.ok)
            throw new Error();

        const updates = await response.json();

        list.innerHTML = "";

        /* Always first */

        const topItem = document.createElement("li");

        topItem.innerHTML = `
            <a href="#" class="update-new" id="newResourcesBtn">
                <i class="fas fa-folder-open"></i>
                Newly Added Resources
            </a>
        `;

        list.appendChild(topItem);

        document
            .getElementById("newResourcesBtn")
            .addEventListener("click", e => {

                e.preventDefault();

                openResourcesModal();

            });

        /* No updates */

        if (!updates.length) return;

        updates.forEach(item => {

            const li = document.createElement("li");

            const a = document.createElement("a");

            a.href = item.Link;

            if (/^https?:\/\//i.test(item.Link)) {

                a.target = "_blank";
                a.rel = "noopener noreferrer";

            }

            if (item.className)
                a.classList.add(item.className);

            a.innerHTML = `
                <i class="fas ${item["fa-symbol"]}"></i>
                ${item.Title}
            `;

            li.appendChild(a);

            list.appendChild(li);

        });

    }

    catch (err) {

        console.error(err);

        list.innerHTML = `
            <li class="update-error">
                <i class="fas fa-exclamation-circle"></i>
                <span>Unable to load updates.</span>
            </li>
        `;

    }

}

document.addEventListener("DOMContentLoaded", loadUpdates);