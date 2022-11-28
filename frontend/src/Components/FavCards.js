import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import dateFormat from 'dateformat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Button } from '@material-ui/core';
import { IconButton } from "@mui/material";

const FavCards = () => {
    const [favnews, setFavnews] = useState([]);
    const [summary, setSummary] = useState("");
    const [icon, setIcon] = useState(true);
    useEffect(() => {
      getfav()
  },[icon])
  async function getfav() {
      const user = {
          userId : localStorage.getItem("userId")
      } 
      await axios.post("http://localhost:8000/favRouter/showfavourite", user)
      .then(responseData => {
          console.log("res",responseData);
          if (responseData.data.error) {
              console.log("res",responseData);
          }
          else {
                  //setcustomerData(responseData.data)
                  setFavnews(responseData.data)
                  console.log("response", responseData.data)
          }
      })
  }
  async function summarizer(event, link) {
    event.preventDefault();
    const requestBody = {
      link: link
    }
    const res = await axios.post("http://127.0.0.1:5000/summarizer", requestBody);
    setSummary(res.data.summary);
    console.log("summary", res);
  }

  async function delFav(title) {
    setIcon(false)
    const requestData = {
        userId: localStorage.getItem("userId"),
        title
    }
    const res = await axios.post("http://localhost:8000/favRouter/removefav", requestData)
    console.log("remove", res)
  }
    return (<div>
    {
      favnews.map((option) => (
        <Card sx={{ display: "flex", borderRadius:'15px', flexDirection:'row', justifyContent: 'space-between', margin: '30px' }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {option.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {dateFormat(option.publishedAt, "dddd, mmmm dS, yyyy")}
              { option.summary === "" ? <p>{summary}</p> : <p>{option.summary}</p>}
              <IconButton>
                <span onClick={() => delFav(option.title)}>
                  <BookmarkIcon />
                </span>
              </IconButton>
             { option.summary === "" ? <Button onClick={event => summarizer(event, option.url)}>Summarise </Button> : <p></p>} 
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image= {option.image}
          alt="Live from space album cover"
        />
      </Card>
      ))
    }
      
  </div>)
}


export default FavCards;