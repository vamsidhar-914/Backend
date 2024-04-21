const express = require('express')
const router = express.Router()
const logoutController = require("../controlllers/logoutController")

router.get("/" , logoutController.handleLogout)

module.exports = router;