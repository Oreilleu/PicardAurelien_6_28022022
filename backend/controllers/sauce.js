const { JsonWebTokenError } = require('jsonwebtoken');
const Sauce = require('../models/sauce');
const fs = require('fs');

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


exports.modifySauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                const sauceObject = req.file ?
            { 
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body };
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet modifié'}))
                .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(404).json({ error }));   
};

exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé'}))
                .catch(error => res.status(400).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ error }));
};

exports.likeOnSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {    
            if(!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                Sauce.updateOne({ _id: req.params.id }, 
                {
                    $inc: {likes: 1},
                    $push: {usersLiked: req.body.userId}
                })
                .then(() => res.status(201).json({message: 'like +1'}))
                .catch(error => res.status(400).json({error}));
            }
            else if(sauce.usersLiked.includes(req.body.userId) && req.body.like === 0){
                Sauce.updateOne({ _id: req.params.id }, 
                    {
                        $inc: {likes: -1},
                        $pull: {usersLiked: req.body.userId}
                    })
                    .then(() => res.status(201).json({message: 'like -1'}))
                    .catch(error => res.status(400).json({error}));
            }
            else if(!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                Sauce.updateOne({ _id: req.params.id }, 
                    {
                        $inc: {dislikes: 1},
                        $push: {usersDisliked: req.body.userId}
                    })
                    .then(() => res.status(201).json({message: 'dislike +1'}))
                    .catch(error => res.status(400).json({error}));
            } else if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne({ _id: req.params.id }, 
                    {
                        $inc: {dislikes: -1},
                        $pull: {usersDisliked: req.body.userId}
                    })
                    .then(() => res.status(201).json({message: 'dislike -1'}))
                    .catch(error => res.status(400).json({error}));
            }
            console.log(sauce)
        })
        .catch(error => res.status(404).json({error}));
};