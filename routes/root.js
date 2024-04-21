const express = require("express")
const router = express.Router()
const path = require("path")

router.get("^/$|/index(.html)?",(req,res) => {
    res.sendFile(path.join(__dirname ,"..", 'views' , 'index.html'))
}) 

router.get("/new-page(.html)?" , (req,res) => {
    res.sendFile(path.join(__dirname ,"..", "views" ,"new.html"))
})

router.get("/old-page(.html)?" , (reqm ,res) => {
    res.redirect(301 , "/new-page.html") // 302 by default
})

module.exports = router