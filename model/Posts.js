const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostsSchema = new Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    title : {
        type : String,
        required : true,
    },
    desc : {
        type : String,
        required : true,
    },
})

module.exports = mongoose.model("Posts" , PostsSchema)