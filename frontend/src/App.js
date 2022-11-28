import './App.css';
import TabOption from './Navbar/TabOption';
import Login from './Auth/Login';
import Register from './Auth/Register';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<TabOption />}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
