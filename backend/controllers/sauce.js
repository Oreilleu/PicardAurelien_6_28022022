const Sauce = require('../models/sauce');

exports.getAllSauce = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json({ error }));
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then( sauces => res.status(200).json(sauces))
        .catch( error => res.status(404).json({ error }));
};

exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet créé '}))
        .catch(error => res.status(400).json({ error }));
};

// exports.modifySauce = (req, res) => {

// };

// exports.deleteSauce = (req, res) => {

// };

// exports.likeOnSauce = (req, res) => {

// };