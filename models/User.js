const {Schema,model} = require("mongoose");

const UserSchema = new Schema({
    phone:{
        type:String,
    },
    email:{
        type:String,
    },
},{versionKey:false,timestamps:false})

const User = model("user",UserSchema);

module.exports = User;