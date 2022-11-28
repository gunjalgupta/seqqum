import React from 'react';
import { useNavigate} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button } from '@material-ui/core';
import Dashboard from '../Dashboard/Dashboard';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function CenteredTabs() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div>
    <Paper className={classes.root} style={{display: 'flex', flexDirection:'row', justifyContent:'space-evenly', position:'fixed', width:'100%'}}>
      <div>
        <p style={{
          fontFamily: 'san serif',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#3335FF'
        }}>News</p>
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        style={{marginTop:'10px'}}
      >
        <Tab label="Home" />
        <Tab label="U.S." />
        <Tab label="Business" />
        <Tab label="Sports" />
        <Tab label="Tech" />
        {localStorage.getItem("userId")?<Tab label="Bookmark" />:<></>}
      </Tabs>
      <div>
          {!localStorage.getItem("email")?
          <Button href="#text-buttons" style={{padding: '5px', marginTop:'15px', fontFamily: 'sans-serif', fontSize: '15px', width: '100px', height: '40px'}}
          onClick={() => navigate(`/login`)}>Login</Button>:
          <Button href="#text-buttons" style={{padding: '5px', marginTop:'15px', fontFamily: 'sans-serif', fontSize: '15px', width: '100px', height: '40px'}}
          onClick={() => {navigate(`/login`);
                          localStorage.removeItem("email"); localStorage.removeItem("userId")}}>Logout</Button>}
      </div>
    </Paper>
    { value === 0 && <Dashboard category="home"/>}
    { value === 1 && <Dashboard category="US"/>}
    { value === 2 && <Dashboard category="business"/>}
    { value === 3 && <Dashboard category="sports"/>}
    { value === 4 && <Dashboard category="techcrunch"/>}
    { value === 5 && <Dashboard category="bookmark"></Dashboard>}
    </div>
  );
}

export default CenteredTabs;





