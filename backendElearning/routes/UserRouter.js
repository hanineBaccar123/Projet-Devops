var express = require('express');
var router = express.Router();
const UserController = require("../Controllers/UserController")


const uploadfile = require("../middlewares/uploadFile")

/* GET home page. */
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUserById/:id', UserController.getUsersById);
router.post('/addClient', UserController.addClient);
router.get('/searchUsersByFirstName', UserController.searchUsersByFirstName);
router.delete('/deleteUserById/:id', UserController.deleteUserById);

router.post('/addClientWithImage', uploadfile.single("user_image"),UserController.addClientWithImage);
router.put('/updateUser/:id',UserController.updateUser);

router.put('/modifierProfil/:id', uploadfile.single("user_image"), UserController.updateProfile);

router.post('/register', UserController.register);
router.post('/login', UserController.login);




module.exports = router;




