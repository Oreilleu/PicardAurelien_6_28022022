const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');

router.get('/', sauceCtrl.getAllSauce);
// router.get('/:id', sauceCtrl.getOneSauce);
router.post('/', sauceCtrl.createSauce);
// router.put('/:id', sauceCtrl.modifySauce);
// router.delete('/:id', sauceCtrl.deleteSauce);
// router.post('/:id/like', sauceCtrl.likeOnSauce);

module.exports = router;


