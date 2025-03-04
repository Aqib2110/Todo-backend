// const express = require('express')
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const cors = require('cors')
// const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose');
// require('dotenv').config();
// const PORT = process.env.PORT;
// const { userModel,todoModel, workModel, personalModel, homeModel } = require('./db');
// async function connect()
// {
//   const data = await mongoose.connect(process.env.mongo_URI);
//     if(data){
//         console.log("connected to mongodb")
//     }
// }
// connect();
// const app = express();
// app.use(express.json());

// app.use(cors({
// origin:["https://todo-nbdm.vercel.app"],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true 
// }));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://todo-nbdm.vercel.app');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
//     if (req.method === 'OPTIONS') {
//         res.sendStatus(204); // Preflight request response
//     } else {
//         next();
//     }
// });

// app.options('*', cors());
// const users = [];
// app.use(express.urlencoded({extended:true}))
// app.use(cookieParser());
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// const jwt_secret = "ILOVEALLAH"
// // app.get("/signup",(req,res)=>{
// //     res.render('signup')
// // })
// // app.get("/signin",(req,res)=>{
// //     res.render('signin')
// // })

// const AuthMiddleware = async(req,res,next)=>{
//     const authHeader = req.headers['authorization'];
//     console.log(authHeader,"fyurtry35347567566575676579657");
//     const token = authHeader && authHeader.split(' ')[1];
//     console.log(token);
//     if (!token) {
//         res.redirect('/signin');
//         return;
//     }
//     try {
//         const decoded = jwt.verify(token,jwt_secret,{ expiresIn: '1d' });
//         const username = decoded.username;
//         if(username){
//             const userfind = await userModel.findOne({
//                 username:username,
//             });
//             if(userfind){
//                 req.user = userfind;
//                 console.log(userfind)
//             }
//             else{
//                 console.log("user not found")
//             }
        
//         }
//         else{
//             res.redirect('/signin')
//         }
//         next();
//     } catch (err) {
//         res.redirect('/signin');
//     }

// }
// app.post('/worktodos',AuthMiddleware,async(req,res)=>{
//     const title = req.body.title;
//     console.log(title,"aqib444")
//     const userId = req.user._id;

//    await workModel.create({
//         title:title,
//         userId:userId
//     })
// res.json({
//     message:" work todo created successfully"
// })
// })
// app.delete('/worktodos',AuthMiddleware,async(req,res)=>{
//     const todoId = req.body.todoId;
//    await workModel.deleteOne({
//         _id:todoId,
//     })
// res.json({
//     message:"todo deleted successfully"
// })
// })

// app.delete('/Personaltodos',AuthMiddleware,async(req,res)=>{
//     const todoId = req.body.todoId;
//    await personalModel.deleteOne({
//         _id:todoId,
//     })
// res.json({
//     message:"todo deleted successfully"
// })
// })
// app.delete('/Hometodos',AuthMiddleware,async(req,res)=>{
//     const todoId = req.body.todoId;
//    await homeModel.deleteOne({
//         _id:todoId,
//     })
// res.json({
//     message:"todo deleted successfully"
// })
// })

// app.get('/worktodos',AuthMiddleware,async(req,res)=>{
//     const userId = req.user._id;
//    const todos = await workModel.find({
// userId:userId
//    });
//    if(todos){
//     res.json({
//         todos,
//      })
//    }
//    else{
//     res.json({
//         message:"no todos found"
//     })
//    }

// })
// app.get('/Personaltodos',AuthMiddleware,async(req,res)=>{
//     const userId = req.user._id;
//    const todos = await personalModel.find({
// userId:userId
//    });
//    if(todos){
//     res.json({
//         todos,
//      })
//    }
//    else{
//     res.json({
//         message:"no todos found"
//     })
//    }
// })
// app.get('/Hometodos',AuthMiddleware,async(req,res)=>{
//     const userId = req.user._id;
//    const todos = await homeModel.find({
// userId:userId
//    });
//    if(todos){
//     res.json({
//         todos,
//      })
//    }
//    else{
//     res.json({
//         message:"no todos found"
//     })
//    }
// })
// app.post('/Personaltodos',AuthMiddleware,async(req,res)=>{
//     const title = req.body.title;
//     const userId = req.user._id;

//    await personalModel.create({
//         title:title,
//         userId:userId
//     })
// res.json({
//     message:" personal todo created successfully"
// })
// })
// app.post('/Hometodos',AuthMiddleware,async(req,res)=>{
//     const title = req.body.title;
//     const userId = req.user._id;

//    await homeModel.create({
//         title:title,
//         userId:userId
//     })
// res.json({
//     message:" home todo created successfully"
// })
// })

// app.post("/signup",async(req,res)=>{
// const username = req.body.username;
// const name = req.body.name;
// const password = req.body.password;
// console.log(req.body)
// await userModel.create({
//     name:name,
//     username:username,
//     password:password
// })
// res.json(
//     {
//        message: "signup successfully"
//     })

// })
// app.post("/signin",(req,res)=>{
// const name = req.body.username;
// const pass = req.body.password;
// console.log(req.body);
// const user = userModel.findOne({
//     username:name,
//     password:pass
// });
// if(user){
// const token = jwt.sign({
//     username:name,
// },jwt_secret)
// // res.cookie('auth_token', token, { httpOnly: true,secure:false,maxAge: 24 * 60 * 60 * 1000 ,path:'/' });
// res.header('Authorization',`Bearer ${token}`);
// console.log(token);
// res.json({
//     message:"signin successfully",
//     token:token,
// })
//  }
// })
// app.get("/",AuthMiddleware,(req,res)=>{
//     // const authHeader = req.headers['authorization'];
//     // console.log(authHeader,"fyurtry35347567566575676579657");
//     // const token = authHeader && authHeader.split(' ')[1];
//     // console.log(token);
//     // if(token == null){
//     //     res.json({
//     //         error:"not found",
//     //     })
//     //     return;
//     // }
//     // else{
//     //     try {
//     //         const decoded = jwt.verify(token,jwt_secret);
//     //         const username = decoded.username;
//     //         if(username){
//     //             const userfind = users.find(user=>user.username == username)
//     //           if(userfind){
//     //             res.json({
//     //                 message:"clear"
//     //             })
//     //           }
//     //         }
//     //     } catch (err) {
//     //         res.json({
//     //             error:"user not found"
//     //         });
//     //     }
//     // }
//     res.json({
//         message:"clear"
//     })
   
// })
// app.get('/logout',(req,res)=>{
    
//     res.redirect('/signin');
// })
// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`server is listening at http://localhost:${PORT}`)
// });







// Required Modules
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

// Models and Config
const { userModel, workModel, personalModel, homeModel } = require('./db');
const jwt_secret = "ILOVEALLAH"; // Keep this secret in your .env file
const PORT = process.env.PORT || 3000;

// MongoDB Connection
async function connect() {
    try {
        await mongoose.connect(process.env.mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
    }
}
connect();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// CORS Configuration
app.use(cors({
    origin: 'https://todo-nbdm.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Manual CORS Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://todo-nbdm.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// Authentication Middleware
const AuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, jwt_secret, { expiresIn: '1d' });
        const userfind = await userModel.findOne({ username: decoded.username });
        if (!userfind) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = userfind;
        next();
    } catch (err) {
        console.error('Auth error:', err.message);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

// Routes
// Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { username, name, password } = req.body;
        await userModel.create({ name, username, password });
        res.json({ message: "Signup successfully" });
    } catch (error) {
        console.error('Signup error:', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Signin Route
app.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username, password });

        if (user) {
            const token = jwt.sign({ username }, jwt_secret, { expiresIn: '1d' });
            res.header('Authorization', `Bearer ${token}`);
            res.json({ message: "Signin successfully", token });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error('Signin error:', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Create Todo
app.post('/worktodos', AuthMiddleware, async (req, res) => {
    try {
        const { title } = req.body;
        await workModel.create({ title, userId: req.user._id });
        res.json({ message: "Work todo created successfully" });
    } catch (error) {
        console.error('Create worktodo error:', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get Work Todos
app.get('/worktodos', AuthMiddleware, async (req, res) => {
    try {
        const todos = await workModel.find({ userId: req.user._id });
        res.json({ todos: todos || [] });
    } catch (error) {
        console.error('Get worktodos error:', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete Work Todo
app.delete('/worktodos', AuthMiddleware, async (req, res) => {
    try {
        await workModel.deleteOne({ _id: req.body.todoId });
        res.json({ message: "Work todo deleted successfully" });
    } catch (error) {
        console.error('Delete worktodo error:', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Default Route for Auth Check
app.get("/", AuthMiddleware, (req, res) => {
    res.json({ message: "Authentication successful" });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
