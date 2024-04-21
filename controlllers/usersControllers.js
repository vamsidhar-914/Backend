const User = require("../model/User")
const bcrypt = require("bcrypt")

// register new user
const handleNewUser = async(req,res) => {
    const { user , pwd } = req.body
    if(!user || !pwd){
        return res.status(400).json({message : "username and password are required"})
    }
    // check for duplictes
    const duplicates = await User.findOne({ username : user }).exec()
    // check for duplicate
    if(duplicates){
        return res.status(409) // conflict
    }
    try{
        // encrypt the password
        const hashpassword = await bcrypt.hash(pwd , 10)

        // create and store the new user
        const result = await User.create({
            "username" : user, 
            "password" : hashpassword
        })

        console.log(result)
        
        res.status(201).json(`new user ${user} created`)
    } catch(err){
        res.status(500).json({message : err.message})
    }
}


module.exports = { handleNewUser }