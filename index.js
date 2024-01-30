const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./Models/UserModel')


const SECRET_KEY = 'super-secret-key'

//connect express
const app = express();

//connect to middleware 
app.use(cors())
app.use(bodyParser.json());

//connect to mongodb
mongoose.connect('mongodb://localhost:27017')
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err))


//routes
app.listen(3001,()=>{
    console.log("server is connected");
})

app.post('/register',async (req,res)=>{
    try {
        const{username,email,password} = req.body
        const hashPassword = await bcrypt.hash(password,10);
        const newUser =  new User({username , email, password:hashPassword})
         await newUser.save()
        res.json(newUser)


    } catch (error) {
        res.json(error)
    }
})

app.get('/register', async(req, res) => {
    try {
        const users = await User.find({})
        res.json(users)

    } catch (error) {
        res.json(error);
    }
})


app.post('/login',async(req,res)=>{
    try {
     const {username, password} = req.body
     const user = await User.findOne({username})
     if (!user) {
        res.json({error:"user Not Found"})
     }
     const isPasswordValid = await bcrypt.compare(password, user.password)
     if (!isPasswordValid) {
        res.json({error:"password Not Matching"})
     }

     res.json("Login SucessFul")
     const token = jwt.sign({userId:user._id},SECRET_KEY,{ expiresIn: '1hr' })
      res.json({token})
    } catch (error) {
        res.json(error)
    }
})

