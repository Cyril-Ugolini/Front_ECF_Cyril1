# ENTREPRISE — CRM Front-End

> Projet ECF AFPA — Formation Concepteur Développeur d'Application (CDA) 2026

---

## Description

Application CRM (Customer Relationship Management) front-end permettant de gérer
des clients et des prospects. Réalisée en HTML5, CSS3 et JavaScript vanilla,
avec Bootstrap 5 et Leaflet installés via NPM.

---

## Fonctionnalités

### Gestion des clients
- Liste des clients
- Création d'un client
- Modification d'un client
- Suppression d'un client
- Fiche détaillée avec carte et météo

### Gestion des prospects
- Liste des prospects
- Création d'un prospect
- Modification d'un prospect
- Suppression d'un prospect
- Fiche détaillée avec carte et météo

### Autres
- Authentification simulée (login / logout avec confirmation)
- Protection des pages sensibles selon l'état de connexion
- Validation HTML5 sur tous les formulaires
- Validation métier en JavaScript (chiffre d'affaires, nombre d'employés)
- Géolocalisation et météo en temps réel sur les fiches
- Pages RGPD complètes (mentions légales, politique de confidentialité)
- Design responsive (mobile, tablette, desktop)
- Thème tech futuriste
- Accessibilité RGAA (aria-label, aria-expanded, roles)

---

## Technologies

| Technologie | Version | Usage |
|---|---|---|
| HTML5 | — | Structure des pages |
| CSS3 | — | Styles et animations |
| JavaScript | ES6+ | Validation, DOM, APIs |
| Bootstrap | 5.3.2 | Mise en page responsive |
| Leaflet | 1.x | Carte géographique interactive |
| NPM | — | Gestion des dépendances |

---

## APIs utilisées

| API | Usage | Clé requise |
|---|---|---|
| api-adresse.data.gouv.fr | Géolocalisation depuis une adresse | Non |
| OpenStreetMap | Tuiles de la carte | Non |
| Open-Meteo | Météo en temps réel | Non |

---

## Installation

### Prérequis
- Node.js installé sur votre machine
- Un serveur local (IntelliJ, VS Code Live Server, etc.)

### Étapes

1. Cloner le dépôt :
```bash
git clone https://github.com/votre-repo/Front_ECF_Cyril1.git
cd Front_ECF_Cyril1
```

2. Installer les dépendances :
```bash
npm install
```

3. Ouvrir `Index.html` avec le serveur local de votre éditeur.

---

## Structure du projet
```
Front_ECF_Cyril1/
├── css/
│   └── style.css               ← Styles globaux + thème
├── node_modules/
│   ├── bootstrap/              ← Framework CSS/JS
│   └── leaflet/                ← Librairie carte
├── Index.html                  ← Page d'accueil
├── login.html                  ← Connexion
├── logout.html                 ← Déconnexion
├── client-form.html            ← Création / modification client
├── client-view.html            ← Fiche client + carte + météo
├── clients-list.html           ← Liste des clients
├── delete-client.html          ← Suppression client
├── prospect-form.html          ← Création / modification prospect
├── prospect-view.html          ← Fiche prospect + carte + météo
├── prospects-list.html         ← Liste des prospects
├── delete-prospect.html        ← Suppression prospect
├── mentions-legales.html       ← RGPD
├── politique-confidentialite.html ← RGPD
├── template.html               ← Header / footer / aside
├── template.js                 ← Injection template + connexion
├── validation.js               ← Validation + APIs carte/météo
├── package.json
├── .gitignore
└── README.md
```

---

## Identifiants de connexion

> ⚠️ Simulation front-end uniquement — ne pas utiliser en production

| Identifiant | Mot de passe |
|---|---|
| admin | password123 |

---

## Conformité

| Critère | Statut |
|---|---|
| HTML5 valide | ✅ |
| CSS3 responsive | ✅ |
| RGPD | ✅ |
| RGAA (accessibilité) | ✅ |
| Validation HTML5 formulaires | ✅ |
| Validation métier JS | ✅ |
| APIs géolocalisation + météo | ✅ |
| Gestion dépendances NPM | ✅ |
| 0 vulnérabilités NPM | ✅ |

---

## Auteur

**Cyril** — Formation AFPA CDA 2026

---
