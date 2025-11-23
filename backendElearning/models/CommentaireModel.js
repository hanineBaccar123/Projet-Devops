const mongoose =  require('mongoose')
const CommentaireSchema =  new mongoose.Schema({
    rating:Number,
    description:String,

       student : {type : mongoose.Schema.Types.ObjectId , ref:'user'},//one
       cour : {type : mongoose.Schema.Types.ObjectId , ref:'Cours'},//one
       
});
const Commentaire = mongoose.model("Commentaire",CommentaireSchema)
module.exports= Commentaire;