const mongoose = require('mongoose')

const CoursModel = require("../models/CoursModel")

module.exports.getAllCours = async (req,res) => {
    try {

        const CoursList = await CoursModel.find()
        res.status(200).json({ CoursList });

    }
    catch  (error){
        res.status(500).json({message : error.message})
    }
};


module.exports.addCours = async (req,res) => {
    try {

        const { name , prix , description,level,language,duration}=req.body
        
        const Cours = new CoursModel({name , prix , description,level,language,duration})
        const addedCours= await Cours.save()
        res.status(200).json({addedCours})

    }
    catch  (error){
        res.status(500).json({message : error.message})
    }
}

module.exports.deleteCoursById = async (req,res) => {
    try {

        const id = req.params.id     
        const cours = await CoursModel.findByIdAndDelete(id)
        res.status(200).json("deleted")

    }
    catch  (error){
        res.status(500).json({message : error.message});
    }
};