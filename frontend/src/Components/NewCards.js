import React, {useEffect, useState} from "react";
import axios from 'axios';
import Cards from "./Cards";

export default function NewCards({category}) {

  const [news , setNews] = useState([]);

  useEffect(() => {
    if(category === "home"){
      axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=99bc1a83de634471958f7d9c6bbf0431')
      .then((response) => setNews(response.data.articles)).catch((err) => console.log('err', err))
    } else if (category === "US"){
      axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=99bc1a83de634471958f7d9c6bbf0431')
      .then((response) => setNews(response.data.articles)).catch((err) => console.log('err', err))
    } else if (category === "techcrunch") {
      axios.get("https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=99bc1a83de634471958f7d9c6bbf0431")
      .then((response) => setNews(response.data.articles)).catch((err) => console.log('err', err))
    }
     else {
      axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=99bc1a83de634471958f7d9c6bbf0431`)
      .then((response) => setNews(response.data.articles)).catch((err) => console.log('err', err));  
    }
  }, [])

  

  
  return (
    <div >
      {
        news.map((option) => (
          <Cards newUrl={option.url} newTitle={option.title} newPublishedAt={option.publishedAt} newImage={option.urlToImage} newAuthor={option.author}/>
        ))
      }
        
    </div>
  );
}
