const express = require("express");
const { find } = require( "../models/favourite" );
const router = express.Router();
const Fav = require("../models/favourite");
const axios = require("axios");

router.get('/getnews', async (req, res) => {
    console.log(req.query)
    const category = req.query.category
    console.log(category)
    if(category === "home"){
        console.log(category)
        axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=99bc1a83de634471958f7d9c6bbf0431')
        .then((response) => res.send(response.data.articles)).catch((err) => console.log('err', err))
      } else if (category === "US"){
        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=99bc1a83de634471958f7d9c6bbf0431')
        .then((response) => res.send(response.data.articles)).catch((err) => console.log('err', err))
      } else if (category === "techcrunch") {
        axios.get("https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=99bc1a83de634471958f7d9c6bbf0431")
        .then((response) => res.send(response.data.articles)).catch((err) => console.log('err', err))
      }
       else {
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=99bc1a83de634471958f7d9c6bbf0431`)
        .then((response) => res.send(response.data.articles)).catch((err) => console.log('err', err));  
      }
      return;
})

module.exports = router;