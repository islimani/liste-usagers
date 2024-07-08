# Application de Liste des usagers

## Description du Projet

Cette application Angular affiche une liste d'usagers obtenue à partir d'un appel API. Les usagers sont affichés dans un tableau trié avec des colonnes. L'application est conçue pour être responsive, ce qui signifie qu'elle s'adapte bien aux différentes tailles d'écran.

## Fonctionnalités

- Récupération des usagers depuis une API publique
- Affichage des usagers dans un tableau avec colonnes triables
- Navigation entre la page d'accueil et la page des usagers
- Responsive design

## Technologies Utilisées

- Angular 15
- Angular Material
- TypeScript
- RxJS

## Installation et Démarrage

### Prérequis

- Node.js (version 14 ou supérieure)
- Angular CLI (version 15 ou supérieure)

### Étapes

1. **Cloner le dépôt GitHub**
   ```bash
   git clone https://github.com/islimani/liste-usagers.git
   cd liste-usagers
   ```
   
2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer l'application**
   ```bash
   ng serve
   ```

4. **Accéder à l'application**

   Ouvrez votre navigateur et allez à l'adresse http://localhost:4200.

## Structure du Projet

### Composants

- HomeComponent : Affiche votre nom et un bouton pour lancer la requête vers l'API des usagers
- UsersComponent : Affiche le tableau des usagers avec des colonnes triables.

### Services

- UserService : Service pour interroger l'API et récupérer les usagers.

### Modules

- AppModule : Module principal de l'application, incluant les configurations de routage et les modules Angular Material.

## Tests Unitaires

Les tests unitaires sont inclus pour assurer le bon fonctionnement des différentes fonctionnalités de l'application. Les tests sont écrits à l'aide de Jasmine et de la librairie de test Angular.

### Exécution des Tests

Pour exécuter les tests unitaires, utilisez la commande suivante :
  ```bash
  ng test
  ```
## Améliorations

- Ajout de pagination sur le tableau des usagers
- Ajout d'un hover lorsque le text n'est pas complétement lisible
- Ajout du border resizing du tableau
- Ajout authentification/autorisation pour la sécurité
- ...
