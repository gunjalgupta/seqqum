import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import dateFormat from 'dateformat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IconButton from '@mui/material/IconButton';
import { Button } from '@material-ui/core';
import './Cards.css';

const Cards = ({newUrl, newTitle, newPublishedAt, newImage, newAuthor }) => {
    const [summary, setSummary] = useState("");
    const [flag, setFlag] = useState(false);
    const [saveSummary, setSaveSummary] = useState("");
    const [icon, setIcon] = useState(false);
    useEffect(() => {
        const req = {
          userId: localStorage.getItem("userId"),
          title: newTitle
        };
        axios
          .post("http://localhost:8000/favRouter/check", req)
          .then((response) => {
            if(response.data.length === 1){
                console.log("here", response.data)
                if(response.data.summary !== ""){
                    console.log("here inside", response.data[0].summary)
                    setSaveSummary(response.data[0].summary)
                    setFlag(true)
                }
                setIcon(true)
            }
          });
      },[icon]);

      async function summarizer(event, link) {
        event.preventDefault();
        const requestBody = {
          link: link
        }
        const res = await axios.post("http://127.0.0.1:5000/summarizer", requestBody);
        setSummary(res.data.summary);
        console.log("summary", res);
      }
      
      async function addFav(url, title, author, publishedAt, image, summary) {
        setIcon(true)
        const cusFav = {
          userId: localStorage.getItem("userId"),
          title: title,
          url,
          author, 
          publishedAt,
          image,
          summary: summary.toString()
        }
        console.log("requestbody", cusFav)
        const res = await axios.post("http://localhost:8000/favRouter/addfav", cusFav)
        console.log("add",res)
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

    return <div >
    {
        <Card sx={{ display: "flex", borderRadius:'15px', flexDirection:'row', justifyContent: 'space-between', margin: '30px' }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <a className='cardsLink' href={newUrl} target="_blank">
            <Typography component="div" variant="h5">
            {newTitle}
            </Typography>
            </a>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {dateFormat(newPublishedAt, "dddd, mmmm dS, yyyy")}
              <p>{flag === true ? saveSummary : summary}</p>
              { localStorage.getItem("userId") ? 
                <IconButton aria-label="add to favorites">
                <div>
                  {icon ? (
                    <span
                        onClick={() => delFav(newTitle)}
                    >
                      {" "}
                      <BookmarkIcon />{" "}
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        addFav(newUrl, newTitle, newAuthor, newPublishedAt, newImage, summary);
                      }}
                    >
                      {" "}
                      <BookmarkBorderIcon />{" "}
                    </span>
                  )}
                </div>
              </IconButton> : <></>
              }
             { summary === "" && flag === false ? <Button onClick={event => summarizer(event, newUrl)}>Summarise </Button> : <p></p>}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image= {newImage}
          alt="Live from space album cover"
        />
      </Card>
    }
      
  </div>
}


export default Cards;