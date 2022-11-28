import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {

    const [email , setEmail ] = useState("");
    const [password , setPwd ] = useState("");
    const [error , setError] = useState("");
    const navigate = useNavigate();
    
    async function cuslogin(event) {
        event.preventDefault();
        try {
            const loginAdmin = {
                email,
                password,
            };
            const res = await axios.post("http://localhost:8000/userRouter/login",loginAdmin,)
            console.log("------",res.data.data._id)
            if(res.status === 200) {
            localStorage.setItem("email", email);
            localStorage.setItem("userId", res.data.data._id)
            navigate("/")
            
            
            }
     
        else {
            console.log("error",res.data.message);
            setError(res.data.message)
        }
        }
        catch(err){
            console.log("error",err.response.data.message);
            console.log("incatch")
            setError(err.response.data.message)
        }
    }

    const divStyle = {
        color: 'red'
      }; 

    return(
    <div className ="login_cen">
    <div className ="logi">
            
        <div className ="login_wc">
            <h4>Welcome back</h4>
            <div className ="login__container">
                <p>Sign in with your email and password</p>
                <form>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    <input type="password" placeholder="password" onChange={(e) => setPwd(e.target.value)} value={password}></input>
                    <button onClick={cuslogin} className="login__button">Login</button>
                </form>
                <div className="login__text">
                    <p>Don't have an account?</p>
                    <Link to="/register" className="login_ul"><p className="login__create">Sign up</p></Link>
                </div>
                <div className="login__text">
                    <Link to="/" className="login_ul"><p className="login__create">Continue anyways</p></Link>
                </div>
                <div style = {divStyle}>
                    {error && <p> {error} </p>}
                        
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}

export default Login;