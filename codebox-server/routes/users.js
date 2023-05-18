const express = require("express");
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require("../controller/users");
const User = require("../models/User");

const router = express.Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;