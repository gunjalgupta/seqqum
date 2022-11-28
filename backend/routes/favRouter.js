const express = require("express");
const { find } = require( "../models/favourite" );
const router = express.Router();
const Fav = require("../models/favourite");


router.post('/addfav', async (req, res) => {
    console.log("here")
    const newfvrt = new Fav({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        image:req.body.image,
        publishedAt: req.body.publishedAt,
        summary: req.body.summary,
        userId: req.body.userId
    })
    newfvrt.save((err,result) => {
        if(err){
            return res.status(500).send(err)
        } else{
            return res.status(200).send(result)
        }
    })
})

router.post('/removefav', async (req,res) => {
    const userId = req.body.userId
    const title = req.body.title
    Fav.deleteOne({userId: userId, title: title}, (err,result) => {
        if(err){
            return res.status(500).send(err)
        } else{
            return res.status(200).send(result)
        }
    })
})

router.post('/check', async (req, res) => {
    const userId = req.body.userId
    const title = req.body.title
    console.log(req.body)
    Fav.find({userId: userId, title: title}, (err, result) => {
        if(err) {
            console.log(err)
            return res.status(500).send(err)
        } else {
            return res.status(200).send(result)
        }
    })
})

router.post('/showfavourite', async (req, res) => {
    const {userId} = req.body
    
    console.log("In show favrt")
    Fav.find({userId: userId},(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send(err)
        }
        else{
            return res.status(200).send(result)
        }
    })
})

module.exports = router;