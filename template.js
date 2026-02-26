document.addEventListener('DOMContentLoaded', function () {

    // Pages qui nécessitent une connexion
    const pagesProtegees = [
        'client-form.html',
        'prospect-form.html',
        'delete-client.html',
        'delete-prospect.html'
    ];

    // Vérification de connexion sur les pages protégées
    const pageCourante = window.location.pathname.split('/').pop();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Vérification du mode dans l'URL
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');

    // Si on essaie d'accéder à une page protégée sans être connecté
    if (pagesProtegees.includes(pageCourante) && !isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    // Si on essaie d'accéder aux modes modifier/supprimer sans être connecté
    if ((mode === 'modifier' || mode === 'supprimer') && !isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    fetch("template.html")
        .then(res => res.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const headerType = document.body.getAttribute("data-header");

            if (headerType === "retour") {
                document.getElementById("header").innerHTML =
                    doc.getElementById("tpl-header-retour").innerHTML;
            } else {
                document.getElementById("header").innerHTML =
                    doc.getElementById("tpl-header").innerHTML;

                initBurgerMenu();
            }

            const asideTarget = document.getElementById("aside");
            if (asideTarget) {
                asideTarget.innerHTML =
                    doc.getElementById("tpl-aside").innerHTML;
            }

            document.getElementById("footer").innerHTML =
                doc.getElementById("tpl-footer").innerHTML;

            gererConnexion();

        })
        .catch(err => {
            console.error("Erreur lors du chargement du template :", err);
        });

    function initBurgerMenu() {
        const burger = document.getElementById("burger-main");
        const panel = document.getElementById("panel-main");

        if (!burger || !panel) return;

        burger.addEventListener("click", () => {
            burger.classList.toggle("open");
            panel.classList.toggle("open");
        });

        document.addEventListener("click", (e) => {
            if (!burger.contains(e.target) && !panel.contains(e.target)) {
                burger.classList.remove("open");
                panel.classList.remove("open");
            }
        });

        panel.querySelectorAll(".crm-acc-toggle").forEach(btn => {
            btn.addEventListener("click", () => {
                const content = document.getElementById(btn.dataset.target);
                btn.classList.toggle("open");
                content.classList.toggle("open");
            });
        });
    }

    function gererConnexion() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const username = localStorage.getItem('username');

        // Bouton dans le menu burger
        const navConnexion = document.getElementById('nav-connexion');
        if (navConnexion) {
            if (isLoggedIn) {
                navConnexion.innerHTML = `
                    <p class="crm-username">👤 ${username}</p>
                    <a href="logout.html" class="crm-btn-connexion">Déconnexion</a>
                `;
            } else {
                navConnexion.innerHTML = `
                    <a href="login.html" class="crm-btn-connexion">Connexion</a>
                `;
            }
        }

        // Bouton dans l'aside
        const asideConnexion = document.getElementById('aside-connexion');
        if (asideConnexion) {
            if (isLoggedIn) {
                asideConnexion.innerHTML = `
                    <p class="mt-2 mb-1 small">👤 ${username}</p>
                    <a href="logout.html" class="btn btn-danger btn-sm w-100">Déconnexion</a>
                `;
            } else {
                asideConnexion.innerHTML = `
                    <a href="login.html" class="btn btn-primary btn-sm w-100 mt-2">Connexion</a>
                `;
            }
        }

        // Masquer Modifier/Supprimer si non connecté
        if (!isLoggedIn) {
            document.querySelectorAll('.btn-modifier, .btn-supprimer').forEach(btn => {
                btn.classList.add('d-none');
            });
        }
    }

});