const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { route } = require('./auth');
const bcrypt = require('bcrypt');
const Post = require('../models/Post');
const Comment = require('../models/Comments');



//create
router.post('/create',async (req,res)=>{
    try{
        const newPost=new Post(req.body)
        const savedPost=await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(err){
        res.status(500).json(err)
    }
})
//update
router.put('/:id', async (req, res) => {
    try{
        
        const updatedUser=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)

    }
    catch(err){
        res.status(500).json(err)
    }
})



//delete
router.delete("/:id",async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("Post has been deleted!")
    }
    catch(err){
        res.status(500).json(err)
    }
})





//get post details 
router.get('/:id', async (req, res) => {
    try{
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get posts
router.get('/', async (req, res) => {
    const query =req.query
    console.log(query)
    try{
        const searchFilter ={
            title:{$regex:query.search,$options:'i'}  //option is for upper  and lower case
        }
    const posts = await Post.find(query.search?searchFilter:null)
    res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get user posts
router.get('/user/:userId', async (req, res) => {
    try{
    const posts = await Post.find({userId:req.params.userId})
    res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//search posts
router.get('/search/:prompt',async(req,res)=>{
    try{


    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;