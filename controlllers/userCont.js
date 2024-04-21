const User = require("../model/User")

const getAllusers = async(req,res) => {
    const users = await User.find()
    if(!users) {
        return res.status(204).json({ message : " no users found" })
    }
    res.json(users)
}

const deleteUser = async(req,res) => {
    if(!req?.body?.id) {
        return res.status(400).json({ message : "User ID required" })
    }
    const user = await User.findOne({ _id : req.body.id }).exec()
    if(!user){
        return res.status(204).json({ message : `User Id ${req.body.id} not found` })
    }
    const result = await user.deleteOne({ _id : req.body.id })
    res.json(result)
}

const getuser = async (req,res) => {
    if(!req?.params?.id){
        return res.status(400).json({ message : "User ID required" })
    }
    const user = await User.findOne({ _id : req.params.id }).exec()
    if(!user) {
        return res.status(204).json({ message : `User Id ${req.body.id} not found`})
    }
    res.json(user)
}

module.exports = {
    getAllusers,
    deleteUser,
    getuser
}