const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routers/user');
const userSauce = require('./routers/sauce');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

// Connexion à la base de donnée mongoDB
mongoose.connect(process.env.MONGOOSE,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Autorise tous les utilisateurs à envoyer ou recevoir des données
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(helmet());
app.use(express.json());
app.use('/api/auth', userRoute);
app.use('/api/sauces', userSauce);

module.exports = app;