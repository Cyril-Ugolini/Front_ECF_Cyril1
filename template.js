fetch("template.html")
    .then(res => res.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // On regarde quel header la page demande
        const headerType = document.body.getAttribute("data-header");

        if (headerType === "retour") {
            // Injecter le header avec bouton retour
            document.getElementById("header").innerHTML =
                doc.getElementById("tpl-header-retour").innerHTML;
        } else {
            // Injecter le header complet (par défaut)
            document.getElementById("header").innerHTML =
                doc.getElementById("tpl-header").innerHTML;
        }

        // Injecter l'aside (uniquement sur les pages qui ont un #aside)
        const asideTarget = document.getElementById("aside");
        if (asideTarget) {
            asideTarget.innerHTML =
                doc.getElementById("tpl-aside").innerHTML;
        }

        // Inject footer
        document.getElementById("footer").innerHTML =
            doc.getElementById("tpl-footer").innerHTML;
    });