const mongoose = require('mongoose')

const CommentaireModel = require("../models/CommentaireModel")




module.exports.getAllCommentes = async (req,res) => {
    try {

        const CommentaireList = await CommentaireModel.find()
        res.status(200).json({ CommentaireList });

    }
    catch  (error){
        res.status(500).json({message : error.message})
    }
};

module.exports.addCommentaire = async (req,res) => {
    try {

        const { rating,description }=req.body
        
        const Commentaire = new CommentaireModel({ rating,description})
        const addedCommentaire= await Commentaire.save()
        res.status(200).json({addedCommentaire})

    }
    catch  (error){
        res.status(500).json({message : error.message})
    }
}


module.exports.deleteCommentaireById = async (req,res) => {
    try {

        const id = req.params.id     
        const commentaire = await CommentaireModel.findByIdAndDelete(id)
        res.status(200).json("deleted")

    }
    catch  (error){
        res.status(500).json({message : error.message});
    }
};