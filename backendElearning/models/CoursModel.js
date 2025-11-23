const mongoose =  require('mongoose')
const CoursSchema =  new mongoose.Schema({

    name:String,
    prix:Number,
    description:String,
    level:String,
    language:String,
    duration: Number,
    


   students : [{type : mongoose.Schema.Types.ObjectId , ref:'user'}],//many
   teacher : {type : mongoose.Schema.Types.ObjectId , ref:'user'},//one
   comments : [{type : mongoose.Schema.Types.ObjectId , ref:'commentaire'}],//many


});
const Cours = mongoose.model("Cours",CoursSchema)
module.exports= Cours;