const Sauce = require('../models/sauce');

exports.getAllSauce = (req, res) => {
    Sauce.find()
        .then(sauce => res.status(200).json({ sauce }))
        .catch(error => res.status(404).json({ error }));
};

// exports.getOneSauce = (req, res) => {
//     Sauce.findOne({ _id: req.body.id })
// };

exports.createSauce = (req, res) => {
    // delete req.body._id
    const sauce = new Sauce({
        ...req.body
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