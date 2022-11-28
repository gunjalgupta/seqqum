import React from 'react';
import NewCards from '../Components/NewCards';
import FavCards from '../Components/FavCards';

const Dashboard = ({category}) => {
    return (
        <div style={{height:'100vh', display: 'flex', flexDirection: 'column', alignItems: 'Center'}}>
            
            <div style={{width: '70%', marginTop:'50px'}}>
                {category === 'bookmark' ? <FavCards/> : <NewCards category={category} />}
            </div>
        </div>
    )
}


export default Dashboard;