# Guide de Configuration - E-Learning Platform

## 📋 Prérequis

- Node.js installé
- MongoDB (local ou Atlas)
- npm ou yarn

## 🚀 Configuration du Backend

### 1. Créer le fichier `.env`

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
Port=5000
Url_Db=mongodb+srv://baccarhanine:pvKCqF5yZEsIQEZj@cluster0.oisbgie.mongodb.net/
```

**Note:** Remplacez l'URL MongoDB par votre propre connexion si nécessaire.

### 2. Installer les dépendances du backend

```bash
npm install
```

### 3. Démarrer le backend

```bash
npm run dev
```

Le backend devrait démarrer sur `http://localhost:5000`

## 🎨 Configuration du Frontend

### 1. Aller dans le dossier frontend

```bash
cd frontend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Démarrer le frontend

```bash
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

## ⚠️ Résolution des problèmes

### Erreur: ECONNREFUSED

Si vous voyez l'erreur `ECONNREFUSED` dans la console du frontend :

1. **Vérifiez que le backend est démarré**
   - Le backend doit être en cours d'exécution sur le port 5000
   - Vous devriez voir dans la console : `app is running on port 5000`

2. **Vérifiez le fichier `.env`**
   - Assurez-vous que le fichier `.env` existe à la racine du projet
   - Vérifiez que `Port=5000` est bien défini

3. **Vérifiez la connexion MongoDB**
   - Assurez-vous que l'URL MongoDB dans `.env` est correcte
   - Vérifiez votre connexion internet si vous utilisez MongoDB Atlas

### Erreur: CORS

Si vous avez des erreurs CORS :

- Le backend est déjà configuré pour accepter les requêtes depuis `localhost:5173`
- Si vous utilisez un autre port, modifiez `app.js` ligne 33

## 📝 Ordre de démarrage recommandé

1. **D'abord**, démarrez le backend :
   ```bash
   npm run dev
   ```

2. **Ensuite**, démarrez le frontend (dans un autre terminal) :
   ```bash
   cd frontend
   npm run dev
   ```

## 🔍 Vérification

Pour vérifier que tout fonctionne :

1. Backend : Ouvrez `http://localhost:5000` dans votre navigateur
   - Vous devriez voir `{"message":"index"}` ou similaire

2. Frontend : Ouvrez `http://localhost:5173`
   - Vous devriez voir la page de connexion

## 📞 Support

Si vous rencontrez toujours des problèmes :
- Vérifiez que les ports 5000 et 5173 ne sont pas utilisés par d'autres applications
- Vérifiez les logs de la console pour plus de détails


