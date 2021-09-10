const express = require("express");
const router = express.Router();
const {userLogin} = require("../Controller/userController");

router.route("/user/login")
    .post(userLogin);

module.exports = router;