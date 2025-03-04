const express = require('express')
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const { userModel,todoModel, workModel, personalModel, homeModel } = require('./db');
async function connect()
{
  const data = await mongoose.connect(process.env.mongo_URI);
    if(data){
        console.log("connected to mongodb")
    }
}
connect();
const app = express();
app.use(express.json());

app.use(cors({
origin:["https://todo-nbdm.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://todo-nbdm.vercel.app');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(204); // Preflight request response
    } else {
        next();
    }
});

app.options('*', cors());
const users = [];
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const jwt_secret = "ILOVEALLAH"
// app.get("/signup",(req,res)=>{
//     res.render('signup')
// })
// app.get("/signin",(req,res)=>{
//     res.render('signin')
// })

const AuthMiddleware = async(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    console.log(authHeader,"fyurtry35347567566575676579657");
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (!token) {
        res.redirect('/signin');
        return;
    }
    try {
        const decoded = jwt.verify(token,jwt_secret,{ expiresIn: '1d' });
        const username = decoded.username;
        if(username){
            const userfind = await userModel.findOne({
                username:username,
            });
            if(userfind){
                req.user = userfind;
                console.log(userfind)
            }
            else{
                console.log("user not found")
            }
        
        }
        else{
            res.redirect('/signin')
        }
        next();
    } catch (err) {
        res.redirect('/signin');
    }

}
app.post('/worktodos',AuthMiddleware,async(req,res)=>{
    const title = req.body.title;
    console.log(title,"aqib444")
    const userId = req.user._id;

   await workModel.create({
        title:title,
        userId:userId
    })
res.json({
    message:" work todo created successfully"
})
})
app.delete('/worktodos',AuthMiddleware,async(req,res)=>{
    const todoId = req.body.todoId;
   await workModel.deleteOne({
        _id:todoId,
    })
res.json({
    message:"todo deleted successfully"
})
})

app.delete('/Personaltodos',AuthMiddleware,async(req,res)=>{
    const todoId = req.body.todoId;
   await personalModel.deleteOne({
        _id:todoId,
    })
res.json({
    message:"todo deleted successfully"
})
})
app.delete('/Hometodos',AuthMiddleware,async(req,res)=>{
    const todoId = req.body.todoId;
   await homeModel.deleteOne({
        _id:todoId,
    })
res.json({
    message:"todo deleted successfully"
})
})

app.get('/worktodos',AuthMiddleware,async(req,res)=>{
    const userId = req.user._id;
   const todos = await workModel.find({
userId:userId
   });
   if(todos){
    res.json({
        todos,
     })
   }
   else{
    res.json({
        message:"no todos found"
    })
   }

})
app.get('/Personaltodos',AuthMiddleware,async(req,res)=>{
    const userId = req.user._id;
   const todos = await personalModel.find({
userId:userId
   });
   if(todos){
    res.json({
        todos,
     })
   }
   else{
    res.json({
        message:"no todos found"
    })
   }
})
app.get('/Hometodos',AuthMiddleware,async(req,res)=>{
    const userId = req.user._id;
   const todos = await homeModel.find({
userId:userId
   });
   if(todos){
    res.json({
        todos,
     })
   }
   else{
    res.json({
        message:"no todos found"
    })
   }
})
app.post('/Personaltodos',AuthMiddleware,async(req,res)=>{
    const title = req.body.title;
    const userId = req.user._id;

   await personalModel.create({
        title:title,
        userId:userId
    })
res.json({
    message:" personal todo created successfully"
})
})
app.post('/Hometodos',AuthMiddleware,async(req,res)=>{
    const title = req.body.title;
    const userId = req.user._id;

   await homeModel.create({
        title:title,
        userId:userId
    })
res.json({
    message:" home todo created successfully"
})
})

app.post("/signup",async(req,res)=>{
const username = req.body.username;
const name = req.body.name;
const password = req.body.password;
console.log(req.body)
await userModel.create({
    name:name,
    username:username,
    password:password
})
res.json(
    {
       message: "signup successfully"
    })

})
app.post("/signin",(req,res)=>{
const name = req.body.username;
const pass = req.body.password;
console.log(req.body);
const user = userModel.findOne({
    username:name,
    password:pass
});
if(user){
const token = jwt.sign({
    username:name,
},jwt_secret)
// res.cookie('auth_token', token, { httpOnly: true,secure:false,maxAge: 24 * 60 * 60 * 1000 ,path:'/' });
res.header('Authorization',`Bearer ${token}`);
console.log(token);
res.json({
    message:"signin successfully",
    token:token,
})
 }
})
app.get("/",AuthMiddleware,(req,res)=>{
    // const authHeader = req.headers['authorization'];
    // console.log(authHeader,"fyurtry35347567566575676579657");
    // const token = authHeader && authHeader.split(' ')[1];
    // console.log(token);
    // if(token == null){
    //     res.json({
    //         error:"not found",
    //     })
    //     return;
    // }
    // else{
    //     try {
    //         const decoded = jwt.verify(token,jwt_secret);
    //         const username = decoded.username;
    //         if(username){
    //             const userfind = users.find(user=>user.username == username)
    //           if(userfind){
    //             res.json({
    //                 message:"clear"
    //             })
    //           }
    //         }
    //     } catch (err) {
    //         res.json({
    //             error:"user not found"
    //         });
    //     }
    // }
    res.json({
        message:"clear"
    })
   
})
app.get('/logout',(req,res)=>{
    
    res.redirect('/signin');
})
app.listen(PORT, '0.0.0.0', () => {
    console.log(`server is listening at http://localhost:${PORT}`)
});
