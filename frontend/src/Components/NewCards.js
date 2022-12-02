import React, {useEffect, useState} from "react";
import axios from 'axios';
import Cards from "./Cards";

export default function NewCards({category}) {

  const [news , setNews] = useState([]);

  useEffect(() => {
     axios.get(`http://localhost:8000/newsRoute/getnews?category=${category}`)
      .then(responseData => {
          console.log("res",responseData);
          if (responseData.data.error) {
              console.log("res",responseData);
          }
          else {
                  //setcustomerData(responseData.data)
                  setNews(responseData.data)
                  console.log("response", responseData.data)
          }
      })
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
