# Paiement Paypal

[Documentation Paypal](https://developer.paypal.com/studio/checkout/standard/integrate)

Cette application permet de créer et de capturer des paiements via PayPal. Elle est composée d'un client front-end et d'un serveur back-end.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

## Installation

1. Clonez le dépôt :

```sh
git clone https://github.com/Fixito/paypal-payment.git
cd paypal-payment
```

2. Installez les dépendances pour le client et le serveur :

```sh
npm run install
```

## Configuration

1. Créez un fichier `.env` dans le répertoire `server` en vous basant sur le fichier `.env.sample` et remplissez les variables d'environnement nécessaires :

```sh
cp server/.env.sample server/.env
```

2. Modifiez le fichier `.env` avec vos identifiants PayPal :

```env
PAYPAL_CLIENT_ID=your-client-id
PAYPAL_CLIENT_SECRET=your-client-secret
```

## Développement

Pour lancer l'application en mode développement, utilisez la commande suivante :

```sh
npm run dev
```

Cette commande démarre à la fois le client et le serveur en mode développement.

## Build

Pour construire le client, utilisez la commande suivante :

Cette commande nettoie le répertoire dist du serveur, construit le client, et copie les fichiers construits dans le répertoire dist du serveur.

## Démarrage

Pour démarrer le serveur en production, utilisez la commande suivante :

```sh
npm start
```
