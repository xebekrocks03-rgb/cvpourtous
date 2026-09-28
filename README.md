# CVTemplatePro — site e-commerce

Cette version est un prototype front-end autonome en HTML/CSS/JavaScript.

## Lancer le site
1. Décompresser le dossier.
2. Ouvrir `index.html` dans un navigateur.

## Fonctionnalités incluses
- Page d'accueil responsive
- Catalogue de produits
- Recherche instantanée
- Filtres par catégorie
- Tri par prix
- Panier avec persistance locale
- Drawer panier
- Newsletter
- Sections marketing, témoignages et "comment ça marche"

## Pour passer en production
Il faudra connecter :
- un vrai système de comptes clients
- une base de données produits
- un prestataire de paiement (ex. Mobile Money / carte)
- la génération ou livraison sécurisée des fichiers après paiement
- un espace administrateur
- les CGV, politique de confidentialité et système de facturation adaptés à l'activité

Les prix et coordonnées affichés ici sont des exemples de maquette.


## Paiement Mobile Money (instructions manuelles)
Le bouton de paiement affiche les numéros fournis par le propriétaire et crée une référence de commande. Le client doit transférer manuellement le montant puis contacter le vendeur sur WhatsApp. Aucun transfert n'est initié par le site, le paiement n'est pas vérifié automatiquement et les fichiers ne sont pas livrés automatiquement.

## Publication
Le site est statique et peut être publié sur un hébergeur comme Netlify, Vercel ou GitHub Pages. La publication réelle nécessite de téléverser ce dossier sur un compte d'hébergement et, si souhaité, de connecter un nom de domaine. Ne présentez pas les paiements comme automatiquement sécurisés tant qu'un prestataire de paiement n'est pas intégré.
