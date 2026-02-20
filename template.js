fetch("template.html")
    .then(res => res.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // On regarde quel header la page demande
        const headerType = document.body.getAttribute("data-header");

        if (headerType === "retour") {
            document.getElementById("header").innerHTML =
                doc.getElementById("tpl-header-retour").innerHTML;
        } else {
            document.getElementById("header").innerHTML =
                doc.getElementById("tpl-header").innerHTML;

            // Initialiser le burger menu après injection
            initBurgerMenu();
        }

        // Injecter l'aside (uniquement sur les pages qui ont un #aside)
        const asideTarget = document.getElementById("aside");
        if (asideTarget) {
            asideTarget.innerHTML =
                doc.getElementById("tpl-aside").innerHTML;
        }

        // Injecter le footer
        document.getElementById("footer").innerHTML =
            doc.getElementById("tpl-footer").innerHTML;
    });

function initBurgerMenu() {
    const burger = document.getElementById("burger-main");
    const panel  = document.getElementById("panel-main");

    if (!burger || !panel) return;

    // Ouvrir / fermer le panel
    burger.addEventListener("click", () => {
        burger.classList.toggle("open");
        panel.classList.toggle("open");
    });

    // Fermer si clic en dehors
    document.addEventListener("click", (e) => {
        if (!burger.contains(e.target) && !panel.contains(e.target)) {
            burger.classList.remove("open");
            panel.classList.remove("open");
        }
    });

    // Accordéons
    panel.querySelectorAll(".crm-acc-toggle").forEach(btn => {
        btn.addEventListener("click", () => {
            const content = document.getElementById(btn.dataset.target);
            btn.classList.toggle("open");
            content.classList.toggle("open");
        });
    });
}