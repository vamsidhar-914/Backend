const Posts = require("../model/Posts")
const ROLES_LIST = require("../config/roles_List")



const getAllPosts = async (req,res) => {
    const rolesArray = {...ROLES_LIST}
    console.log(rolesArray)
    console.log(rolesArray.Admin)
    const result = req.roles.map(role => role === rolesArray.Admin ? true : false).find(val => val === true)
    console.log(result)
    if(result === true){
        const postsAdmin = await Posts.find()
        if(!postsAdmin){
            return res.status(204).json({ message : "no posts found" })
        }
        return res.json(postsAdmin) // this is by admin
    }
    const posts = await Posts.find({ user_id : req.user_id })
    console.log(req.user_id)
    if(!posts){
        return res.status(204).json({ message : "no Posts found"})
    }
    res.json(posts)
}

const createPosts = async(req,res) => {
    if(!req?.body?.title || !req?.body?.desc){
        res.status(400).json({ message : "title and desc are required" })
    }
    console.log(req.user_id)
    try{
        const result = await Posts.create({
            title : req.body.title,
            desc : req.body.desc,
            user_id : req.user_id
        })
        res.status(201).json(result)
    }catch(err){
        console.log(err)
    }
}

const updatePost = async(req,res) => {
    if(!req?.body?.id){
        return res.status(400).json({ message : "ID required" })
    }
    const post = await Posts.findOne({ _id : req.body.id }).exec()
    if(!post){
        return res.status(204).json({ message : `no post found with ${req.body.id}` })
    }
    if(post.user_id.toString() !== req.user_id ){
        return res.status(403).json({ message : "you cannot update others posts" })
    }
    if(req.body?.title){
        post.title = req.body.title
    }
    if(req.body?.desc){
        post.desc = req.body.desc
    }
    const result = await post.save()
    res.json(result)
}

const deletePost = async(req,res) => {
    if(!req?.body?.id){
        return res.status(400).json({ message : "ID required" })
    }
    const post = await Posts.findOne({ _id : req.body.id }).exec()
    if(!post){
        return res.status(204).json({ message : `no post found with ${req.body.id}` })
    }
    if(post.user_id.toString() !== req.user_id ){
        return res.status(403).json({ message : "you cannot delete others posts" })
    }
    const result = await post.deleteOne({ _id : req.body.id})
    res.json(result)
}

const getPost = async(req,res) => {
    if(req?.body?.id){
        return res.status(400).json({ message : "ID required" })
    }
    const post = await Posts.findOne({ _id : req.body.id }).exec()
    if(!post){
        return res.status(204).json({ message : `no post found with ${req.body.id}` })
    }
    console.log(req.user_id)
    if(post.user_id.toString() !== req.user._id ){
        res.status(403)
        throw new Error("You cannot delete others posts")
    }
    const result = await post.deleteOne({ _id : req.body.id})
}

module.exports = {
    getAllPosts,
    createPosts,
    updatePost,
    deletePost,
    getPost,
}