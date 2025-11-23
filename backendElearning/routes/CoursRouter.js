var express = require('express');
var router = express.Router();
const CoursController = require("../Controllers/CoursController")


router.get('/getAllCours', CoursController.getAllCours);
router.post('/addCours', CoursController.addCours);
router.delete('/deleteCoursById/:id', CoursController.deleteCoursById);



module.exports = router;
