const express = require("express")
const router = express.Router()

const {
    getAllEmployees,
    creteEmployees,
    updateEmployee,
    deleteEmployee,
    getEmployee,
} = require("../../controlllers/employeeController")
const ROLES_LIST = require("../../config/roles_List")
const verifyRoles = require("../../middleware/verifyRoles")

router.route("/")
    .get(getAllEmployees) // everyone can access get Route
    .post(verifyRoles(ROLES_LIST.Admin , ROLES_LIST.Editor) ,creteEmployees)
    .put(verifyRoles(ROLES_LIST.Admin , ROLES_LIST.Editor),updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee)

router.route("/:id")
    .get(getEmployee)


module.exports = router