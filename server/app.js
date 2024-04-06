const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config()


mongoose.connect(process.env.DBURL)
.then(()=>{
  console.log("Db connection SUCCESS");
})

.catch(()=>{
   console.log("mongodb not connected");
})

const User =require('./module/User')
const MessageModel = require('./module/message')
const verifyToken = require('./middleware')

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

 

app.post('/signup', async (req, res) => {
  const { name, emailOrPhone, password } = req.body;
  const existingUser = await User.findOne({ emailOrPhone });

  if (existingUser) {
    return res.json({ error: 'Email already exists' });
  }


  const newUser = new User({name,emailOrPhone,password });

  await newUser.save();
  res.json({success:"Registration successfully",newUser});
});

app.post('/login', async (req, res) => {
  const { emailOrPhone, password} = req.body;
  const user = await User.findOne({ emailOrPhone });

  if (!user) {
    return res.json({ message: 'Invalid email' });
  }

  if (password !== user.password) {
    return res.json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ id: user._id, emailOrPhone: user.emailOrPhone }, process.env.secretKey, {
    expiresIn: '1h',
  });

  res.cookie('jwt', token, { httpOnly: true });

  res.json({ success: 'Login successful', token });
});


app.post('/postData', verifyToken, async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  const userId = req.user.id;

  const newMessage = new MessageModel({ userId, message });

  await newMessage.save();
  res.json({ message: 'Data posted successfully', data: newMessage });
});

app.get('/getData', verifyToken, async (req, res) => {
  const userId = req.user.id;

  const messages = await MessageModel.find({ userId });

  res.json({ message:'Data retrieved successfully', data: messages });
});


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port:${process.env.PORT}`);
});
