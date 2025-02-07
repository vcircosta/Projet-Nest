⚙️ Installation et démarrage
1️⃣ Backend
📌 Prérequis :
Node.js installé (v16+)
PostgreSQL installé
cd backend
npm install
📌 Configuration de la base de données :
Créer un fichier .env avec :

env
DATABASE_URL="postgresql://user:password@localhost:5432/reservationdb"
JWT_SECRET="secret-key"
TMDB_API_KEY="ta_cle_api_tmdb"
📌 Générer le schéma Prisma :
npx prisma migrate dev --name init
📌 Lancer le serveur :
npm run start
L'API sera accessible sur http://localhost:3000
La documentation Swagger est disponible sur http://localhost:3000/api

📌 Lancer les tests :
npm run test
npm run test:e2e
2️⃣ Frontend
📌 Installation :
cd frontend
npm install
📌 Configuration :
Créer un fichier .env avec :

VITE_API_URL="http://localhost:3000"
📌 Lancer le projet :
npm run dev
