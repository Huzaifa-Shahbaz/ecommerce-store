const express = require('express');
const router = express.Router();
const { 
    getUsers, 
    postUser, 
    deleteUser, 
    updateUser 
} = require('../controllers/userControllers');


router.route("/").post(postUser);
router.route("/").get(getUsers);
router.route("/update-user/:id").put(updateUser);
router.route("/delete-user/:id").delete(deleteUser);


module.exports = router;
