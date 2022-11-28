import React, {useState}  from 'react';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import "./Register.css"

function Register(){
    const navigate = useNavigate();
    const [email , setEmail ] = useState("");
    const [password , setPwd ] = useState("");
    const [name , setName] = useState("");
    const [error , setError] = useState("");
  

    async function cusRegister(event) {
        event.preventDefault();
        try {
           const regAdmin = {
                name,
                email,
                password,
            };
            console.log("------",regAdmin)
            const res = await axios.post("http://localhost:8000/userRouter/register/",regAdmin,);
            console.log("response", res.data.data._id);
            if(res.status === 200) {
                // dispatch(register({
                //     email: res.data.email,
                //     signedIn: true, 
                // }))
                localStorage.setItem("email", email);
                localStorage.setItem("userId", res.data.data._id)
                navigate("/");  
                }
         
            else {
                console.log("error",res);
                console.log("incatch")
                //setError(res.data.message)
            }
            
        }catch(err){
            console.log("error",err.response.data.message);
            console.log("incatch")
            
                setError(err.response.data.message)
              
        }
    }

    const divStyle = {
        color: 'red'
      }; 
    return (
        <div className ="register_cen">
        <div className ="reg">
                
            <div className ="register_wc">
                <h4>Let's get started</h4>
                <div className ="register__container">
                    <p>Enter your email, phone number and password(required)</p>
                    <form>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} required></input>
                        <input type="password" placeholder="password" onChange={(e) => setPwd(e.target.value)} value={password} required></input>
                        <button onClick={cusRegister} className="register__button">Register</button>
                    </form>
                    <div className="register__text">
                        <p>Already use Register?</p>
                        <Link to="/login" className="register_ul"><p className="register__create">Sign in</p></Link>
                    </div>
                    <div style = {divStyle}>
                    {error && <p> {error}</p>}
                        
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}


export default Register;