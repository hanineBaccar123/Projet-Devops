const mongoose = require('mongoose')
const PaiementModel = require('../models/PaiementModel')


module.exports.addPaiement = async (req,res) => {
    try {

        const {date , montant  }=req.body
        const paiement = new PaiementModel({ date , montant})
        const addedPaiement = await paiement.save()
        res.status(200).json({addedPaiement})

    }
    catch  (error){
        res.status(500).json({message : error.message})
    }
}

