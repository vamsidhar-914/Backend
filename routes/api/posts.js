const express = require("express")
const router = express.Router()
const ROLES_LIST = require("../../config/roles_List")
const verifyRoles = require("../../middleware/verifyRoles")


const { 
    getAllPosts,
    createPosts,
    updatePost,
    deletePost,
    getPost,
    userPosts
} = require("../../controlllers/postsController")

router.route("/")
    .get(getAllPosts)
    .post(createPosts)
    .put(updatePost)
    .delete(deletePost)

router.route("/")
    .get(getPost)

module.exports = router