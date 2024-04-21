const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// login
const handleLogin = async(req,res) => {
    const { user , pwd } = req.body
    if(!user || !pwd){
        return res.status(400).json({message : "username and password are required"})
    }
    const foundUser = await User.findOne({ username : user }).exec()
    if(!foundUser){
        return res.sendStatus(401) // unauthorized
    }
    // evaluate password
    const match = await  bcrypt.compare(pwd , foundUser.password)
    if(match){
        const roles = Object.values(foundUser.roles)
        const id = foundUser._id
        // create jwt 
        const accessToken = jwt.sign(
            { "UserInfo": 
                {
                    "username" : foundUser.username,
                    "roles"  : roles,
                    "id" : foundUser._id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn : '15m' }
        )
        const refreshToken = jwt.sign(
            { 'username' : foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn : "1d" } // refresh token needs to last much more than the access token
        )
        // saving RefreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save()
        console.log(result) 
        res.cookie("jwt" , refreshToken, { httpOnly : true ,sameSite : 'None',secure : true,maxAge : 24 * 60 *60*1000 }) // secure : true
        res.json({user, accessToken , roles , id})
    } else{
        res.sendStatus(401)
    }
}


module.exports = { handleLogin }