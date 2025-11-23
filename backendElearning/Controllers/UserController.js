const mongoose = require('mongoose')
const userModel = require("../models/UserModel") 
const bcrypt = require("bcrypt")


module.exports.getAllUsers = async (req,res) => {
    try {

        const usersList = await userModel.find()
        res.status(200).json({ usersList });

    }
    catch  (error){
        res.status(500).json({message : error.message})
    }
};

module.exports.getUsersById = async (req,res) => {
    try {

        const id = req.params.id     
        const user = await userModel.findById(id)
        res.status(200).json({user})

    }
    catch  (error){
        res.status(500).json({message : error.message});
    }
};


module.exports.addClient = async (req,res) => {
    try {

        const {firstname , lastname , email , password, role  }=req.body
        
        const user = new userModel({firstname , lastname , email , password,role})
        const addedUser = await user.save()
        res.status(200).json({addedUser})

    }
    catch  (error){
        res.status(500).json({message : error.message})
    }
}


module.exports.searchUsersByFirstName = async (req, res) => {
  
  try {

        const { firstname } = req.body;

    if (!firstname) {
      throw new Error("Please select a name");
    }

    const userList = await userModel.find({
      firstName: { $regex: firstname, $options: "i" }, // Debut
      //firstName: {$regex : `${firstName}$` , $options: "i" } Fin
    });

    if (userList.length === 0) {
      throw new Error("Aucune Utilisateur trouve pour ce nom");
    }

    res.status(200).json({ userList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.deleteUserById = async (req,res) => {
    try {

        const id = req.params.id     
        const user = await userModel.findByIdAndDelete(id)
        res.status(200).json("deleted")

    }
    catch  (error){
        res.status(500).json({message : error.message});
    }
};


module.exports.addClientWithImage = async (req, res) => {
  try {
    //logique
    const userData = req.body;
   
 console.log("1")   
    if(req.file){
        const {filename} = req.file
        userData.user_image= filename
         console.log("2")   
    }
    console.log("3")   
   const user = new userModel(userData);
    const addedUser = await user.save();
    res.status(200).json({ addedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const { firstname, lastname, email,role} = req.body;

    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("user not found !"); 
    }

    updatedUser = await userModel.findByIdAndUpdate(id, {
      $set: { firstname, lastname, email,role },
    }); 
   
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.register = async (req,res) => {
    try {

        const {firstname , lastname , email , password, role  }=req.body
        
        const user = new userModel({firstname , lastname , email , password,role})
        const addedUser = await user.save()
        res.status(200).json({addedUser})

    }
    catch  (error){
        res.status(500).json({message : error.message})
    }
}

module.exports.login = async (req,res) => {
    try {

        const {email , password} = req.body
        
        const user = await userModel.findOne({email})
        if (!user) {
            throw new Error("Invalid credentials")
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error("Invalid credentials")
        }

        res.status(200).json({user})

    }
    catch  (error){
        res.status(500).json({message : error.message})
    }
}












module.exports.updateProfile = async (req, res) => {
	try {
		const { id } = req.params;
		const { firstname, lastname, email, password } = req.body;

		const existingUser = await userModel.findById(id);
		if (!existingUser) {
			throw new Error("user not found !");
		}

		const updatedFields = {};
		if (typeof firstname !== 'undefined') updatedFields.firstname = firstname;
		if (typeof lastname !== 'undefined') updatedFields.lastname = lastname;
		if (typeof email !== 'undefined') updatedFields.email = email;

		if (req.file && req.file.filename) {
			updatedFields.user_image = req.file.filename;
		}

		if (typeof password !== 'undefined' && password) {
			const salt = await bcrypt.genSalt();
			updatedFields.password = await bcrypt.hash(password, salt);
		}

		const updatedUser = await userModel.findByIdAndUpdate(
			id,
			{ $set: updatedFields },
			{ new: true }
		);

		res.status(200).json({ updatedUser });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


