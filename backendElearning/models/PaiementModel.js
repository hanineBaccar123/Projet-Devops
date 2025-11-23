const mongoose =  require('mongoose');
const User = require('./UserModel');
const PaiementSchema =  new mongoose.Schema({

    date:Date,
    montant:Number,


       student : {type : mongoose.Schema.Types.ObjectId , ref:'user'},//one
       
    
    
});
const Paiement = mongoose.model("Paiement",PaiementSchema)
module.exports= Paiement; 