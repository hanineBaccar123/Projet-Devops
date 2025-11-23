var express = require('express');
var router = express.Router();
const CommentaireController = require("../Controllers/CommentaireController")


router.post('/addCommentaire', CommentaireController.addCommentaire);
router.delete('/deleteCommentaireById/:id', CommentaireController.deleteCommentaireById);
router.get('/getAllComments', CommentaireController.getAllCommentes);




module.exports = router;
