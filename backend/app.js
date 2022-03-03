const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const userRoute = require('./routers/user');
const userSauce = require('./routers/sauce');

// Connexion à la base de donnée mongoDB
mongoose.connect('mongodb+srv://Oreilleu:954502031aB@cluster0.rc7yz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Autorise tous les utilisateurs à envoyer ou recevoir des données
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoute);
app.use('/api/sauces', userSauce);

module.exports = app;