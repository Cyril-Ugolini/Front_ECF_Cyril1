/**
 * validation.js
 * Contrôles côté front avant envoi des données au serveur.
 * - Validation HTML5 (Bootstrap feedback)
 * - Contrôles métier JS (chiffre d'affaires, nb employés, etc.)
 */

// ─── Constantes métier ───────────────────────────────────────────────────────
const METIER = {
    CA_MAX: 10_000_000_000,   // 10 milliards €
    EMPLOYES_MAX: 1_000_000,  // 1 million d'employés
    CA_MIN: 0,
    EMPLOYES_MIN: 0
};

// ─── Utilitaires ─────────────────────────────────────────────────────────────

/**
 * Affiche un message d'erreur global dans le formulaire.
 */
function showFormError(formId, message) {
    const errorDiv = document.querySelector(`#${formId} #form-error`);
    if (!errorDiv) return;
    errorDiv.textContent = message;
    errorDiv.classList.remove('d-none');
}

function hideFormError(formId) {
    const errorDiv = document.querySelector(`#${formId} #form-error`);
    if (!errorDiv) return;
    errorDiv.classList.add('d-none');
    errorDiv.textContent = '';
}

/**
 * Valide les règles métier JS (en plus du HTML5).
 * Retourne un tableau de messages d'erreur (vide = tout est OK).
 */
function validateMetier(formId, type) {
    const errors = [];

    // Chiffre d'affaires
    const caInput = document.querySelector(`#${formId} [name="chiffreAffaires"]`);
    if (caInput && caInput.value !== '') {
        const ca = parseFloat(caInput.value);
        if (isNaN(ca) || ca < METIER.CA_MIN) {
            errors.push("Le chiffre d'affaires ne peut pas être négatif.");
            caInput.classList.add('is-invalid');
        } else if (ca > METIER.CA_MAX) {
            errors.push(`Le chiffre d'affaires semble trop élevé (maximum ${METIER.CA_MAX.toLocaleString('fr-FR')} €).`);
            caInput.classList.add('is-invalid');
        } else {
            caInput.classList.remove('is-invalid');
            caInput.classList.add('is-valid');
        }
    }

    // Nombre d'employés (prospects uniquement)
    if (type === 'prospect') {
        const nbInput = document.querySelector(`#${formId} [name="nbEmployes"]`);
        if (nbInput && nbInput.value !== '') {
            const nb = parseInt(nbInput.value, 10);
            if (isNaN(nb) || nb < METIER.EMPLOYES_MIN) {
                errors.push("Le nombre d'employés ne peut pas être négatif.");
                nbInput.classList.add('is-invalid');
            } else if (nb > METIER.EMPLOYES_MAX) {
                errors.push(`Le nombre d'employés semble trop élevé (maximum ${METIER.EMPLOYES_MAX.toLocaleString('fr-FR')}).`);
                nbInput.classList.add('is-invalid');
            } else {
                nbInput.classList.remove('is-invalid');
                nbInput.classList.add('is-valid');
            }
        }
    }

    return errors;
}

// ─── Initialisation formulaire client / prospect ──────────────────────────────

/**
 * Active la validation Bootstrap + contrôles métier sur un formulaire.
 * @param {string} formId  - id du <form>
 * @param {string} type    - 'client' ou 'prospect'
 */
function initFormValidation(formId, type) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        hideFormError(formId);

        // 1. Validation HTML5 native
        const html5Valid = form.checkValidity();
        form.classList.add('was-validated');

        // 2. Contrôles métier JS
        const metierErrors = validateMetier(formId, type);

        if (!html5Valid) {
            showFormError(formId, 'Veuillez corriger les erreurs dans le formulaire avant de continuer.');
            return;
        }

        if (metierErrors.length > 0) {
            showFormError(formId, metierErrors.join(' '));
            return;
        }

        //  Formulaire valide — ici on pourra appeler l'API serveur
        alert('Formulaire valide ! (envoi au serveur à connecter)');
        // TODO : remplacer par fetch() vers le backend JakartaEE
    });

    // Retrait du message d'erreur global dès qu'on retouche un champ
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', () => hideFormError(formId));
    });
}

// ─── Initialisation formulaire login ─────────────────────────────────────────

function initLoginValidation() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const errorDiv = document.getElementById('login-error');
        errorDiv.classList.add('d-none');
        errorDiv.textContent = '';

        const html5Valid = form.checkValidity();
        form.classList.add('was-validated');

        if (!html5Valid) {
            errorDiv.textContent = 'Veuillez renseigner votre identifiant et votre mot de passe.';
            errorDiv.classList.remove('d-none');
            return;
        }

        //  Formulaire valide — ici on pourra appeler l'API d'authentification
        alert('Connexion valide ! (authentification serveur à connecter)');
        // TODO : remplacer par fetch() vers le backend JakartaEE
        // window.location.href = 'index.html';
    });
}