import React,{useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {post} from 'axios';
import {useHistory} from 'react-router-dom';
import Swal from "sweetalert2";


export default function UserLogin() {
    
    let history = useHistory();

    // eslint-disable-next-line
    const [username , setUsername] = useState("");
    // eslint-disable-next-line
    const [password, setPassword] = useState("");

    const login =  () => {
        const data = {
            username : username,
            password : password
        }
        const config = {
            headers: {
                'content-type': 'application/json'
              }
        }
        console.log(data);
        post("http://localhost:8000/api/v1/user/login",data,config)
        .then(response => {
            Swal.fire(`Welcome Back , ${response.data.username}`);
            history.push("/");
        })
        .catch(error =>{
            Swal.fire(error.response.data.message);
            setPassword("");
        });
    }


    return (
        <div className="container border mt-5 w-50 p-3">
            <h1 className="display-2 text-center u"><u>Login</u></h1>
        <form className="mt-3"  >
            <div className="form-group row">
                <label htmlFor="username" className="col-sm-2 col-form-label">Username :</label>
                <div className="col-sm-10">
                    <input type="text" id = "username"readonly className="form-control" placeholder="Username" value ={username} onChange={e=>setUsername(e.target.value)}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password :</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                </div>
            </div>
            <div className = "container mt-3 text-center ">
                <button type="button" className="btn btn-outline-primary text-center" onClick={login} >Login</button>
            </div>
           
            <p className="forgot-password text-right">
          
            Forgot <a href="/forgotpassword">Password?</a>
           
        </p>
        </form>
        </div>
    )
}