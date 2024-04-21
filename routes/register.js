const express = require("express")
const router = express.Router()
const registerController = require("../controlllers/usersControllers")

router.post("/" , registerController.handleNewUser)

module.exports = router;