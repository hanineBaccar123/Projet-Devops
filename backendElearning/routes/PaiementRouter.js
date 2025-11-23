var express = require('express');
var router = express.Router();
const PaiementController = require("../Controllers/PaiementController")


router.post('/add', PaiementController.addPaiement);

module.exports = router;
