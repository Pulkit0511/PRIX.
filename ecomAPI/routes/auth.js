const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//REGISTER
router.post('/register', async (req,res) => {
    const newUser= new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    });

    const password = CryptoJS.AES.decrypt(newUser.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)

    if(!newUser.username || !password || !newUser.email){
        res.status(400).json('Invalid Credentials')
        return;
    }

    if(await User.findOne({username: newUser.username}) && res.status(409).json('Username already exists'))
        return;
    
    if(await User.findOne({email: newUser.email}) && res.status(409).json('Email already in use'))
        return;

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

//LOGIN
router.post('/login', async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user && res.status(401).json('Wrong Credentials!'))
            return;

        const Correctpassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8)

        if((Correctpassword !== req.body.password) && res.status(401).json('Wrong Credentials!'))
            return;

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC, {expiresIn: '3d'})

        const {password, ...others} = user._doc;
        
        res.status(200).json({...others, accessToken})
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;