const mongoose =  require('mongoose')
const bcrypte = require("bcrypt")

const userSchema =  new mongoose.Schema({

    firstname:String,
    lastname:String,
    email:{type : String, required:true, unique : true ,lowercase : true, match:[/^\S+@\S+\.\S+$/, "Please enter a valid email adress "],

    },
    password:{type: String, required:true , minlength:12  },
    role: { type:String, enum:['student','teacher','admin']},
    user_image: {type : String , required:false ,default:'client-care_15755360.png'},
    isActive:Boolean,
    isBanned:Boolean,
    
    courses: [{type : mongoose.Schema.Types.ObjectId , ref:'Cours'}],//many
    payements: [{type : mongoose.Schema.Types.ObjectId , ref:'Paiement'}],//many
    comments: [{type : mongoose.Schema.Types.ObjectId , ref:'Commentaire'}]//many



},{timestamps:true});


userSchema.pre('save',async function (next) {
    try{
        const salt = await bcrypte.genSalt()
        const User = this
        User.password = await bcrypte.hash(User.password,salt)
        User.isActive = false 
        next()

    }catch(error)

    { 
        newt(error)

    }
})
const User = mongoose.model("User",userSchema)
module.exports= User;