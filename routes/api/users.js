const express = require('express')
const router = express.Router()
const userCont = require("../../controlllers/userCont")
const ROLES_LIST = require("../../config/roles_List")
const verifyRoles = require("../../middleware/verifyRoles")


router.route("/")
    .get(verifyRoles(ROLES_LIST.Admin),userCont.getAllusers)
    .delete(verifyRoles(ROLES_LIST.Admin),userCont.deleteUser)

router.route("/:id")
    .get(verifyRoles(ROLES_LIST.Admin),userCont.getuser)

module.exports = router