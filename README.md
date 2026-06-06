# Libroteka

Libroteka eshte nje aplikacion web full-stack i zhvilluar me MERN Stack per menaxhimin personal te librave. Perdoruesi mund te regjistrohet, te hyje ne sistem dhe te menaxhoje librat qe deshiron te lexoje, po lexon ose ka perfunduar.

## Teknologjite e perdorura

- MongoDB
- Express.js
- React.js
- Node.js
- Redux Toolkit
- RTK Query
- React Router
- JWT
- bcrypt
- Mongoose

## Funksionalitetet

- Regjistrim perdoruesi
- Hyrje ne sistem
- Autentifikim me JWT
- Hashim i fjalekalimit me bcrypt
- Shtim libri
- Shfaqje librash
- Perditesim statusi libri
- Fshirje libri
- Kopertine libri me URL
- Ruajtje e te dhenave ne MongoDB

## Struktura e projektit

Libroteka
 ─ backend
  ─ config
  ─ controllers
  ─ middleware
  ─ models
  ─ routes
  ─ server.js

 ─ frontend
    ─ src
        ─ components
        ─ pages
        ─ store
## Instruksione
Perdoruesi duhet te krijoje vet .env me: 
NODE_ENV=development
PORT=5000
JWT_SECRET=your_secret
MONGO_URI=your_mongodb_connection_string

 
