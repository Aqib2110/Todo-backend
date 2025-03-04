const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const userRegister = new mongoose.Schema({
name:String,
username:String,
password:String,
})
const todoSchema = new mongoose.Schema({
    title:String,
    userId:ObjectId
})
const workSchema = new mongoose.Schema({
    title:String,
    userId:ObjectId
})
const personalSchema = new mongoose.Schema({
    title:String,
    userId:ObjectId
})
const homeSchema = new mongoose.Schema({
    title:String,
    userId:ObjectId
})

const userModel = mongoose.model("User", userRegister);
const todoModel = mongoose.model('Todos', todoSchema);
const workModel = mongoose.model('Work',workSchema);
const personalModel = mongoose.model('Personal',personalSchema);
const homeModel = mongoose.model('Home',homeSchema);

module.exports = {
    userModel,
    todoModel,
    workModel,
    personalModel,
    homeModel
    
}