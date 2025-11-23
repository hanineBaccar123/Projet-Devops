const mongoose = require("mongoose")

module.exports.connectToMongoDb = async () => {
    mongoose.set('strictQuery', false)
    mongoose
    .connect(process.env.Url_Db)
    .then(() => { console.log("connect to db") 

    })
    .catch((error) => { 
     console.log(error)
     })
}
//pvKCqF5yZEsIQEZj mot de passe base 
//mongodb+srv://baccarhanine:pvKCqF5yZEsIQEZj@cluster0.oisbgie.mongodb.net/