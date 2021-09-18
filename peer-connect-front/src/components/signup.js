import React,{useState} from 'react';
import {post,get} from 'axios';
import Swal from "sweetalert2";
let check = false;
export default function UserSignup() {
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [passwordCheck ,setPasswordCheck]
     = useState("Password Length Should Be More Than 6 Characters And Should Contain A Number , A Small letter , A Capital Letter and A special Character");
     const [usernameCheck , setUsernameCheck] = useState("");
     const [emailCheck , setEmailCheck] = useState("");
     
     const signUp = ()=>{
        const data = {
            email , username , password
        };
        const config = {
            headers : {
                "content-type": "application/json"
            }
        };
        post("http://localhost:8000/api/v1/user/createuser",data,config)
        .then(response =>{ 
            Swal.fire(response.data.message) 
            setEmail("");
            setUsername("");
            setPassword("");
        })
        .catch(err => Swal.fire(err.response.data.message));
    }
    
    const passwordChecker = (e)=>{
        setPassword(e.target.value.replace(/\s/g, ''));

        if(password.length > 6 && password.match("^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{6,}")){
            check = true;
            setPasswordCheck("Password Is Correct");
        } else if(password.length < 6 && password.match("^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{6,}")) {
            setPasswordCheck("Password Length Should Be More Than 6 Characters");
            check = false;
        } else if (password.length > 6 && !password.match("^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{6,}") ){
            setPasswordCheck("Password Should Contain A Number , A Small letter , A Capital Letter and A special Character");
            check = false;
        }else {
            setPasswordCheck("Password Length Should Be More Than 6 Characters And Should Contain A Number , A Small letter , A Capital Letter and A special Character");
            check = false;
        }
    }
    /*
    As of now what is happening is that , we have to hit onchange again after finalizing the username which we wanna pick , it makes sense.
    */
    const userNameChecker = (e)=>{
        setUsername(e.target.value.replace(/\s/g, ''));
        get(`http://localhost:8001/api/v1/checkusername/${username}`)
        .then(response => setUsernameCheck(response.data.message));
    }
    const emailChecker = (e)=>{
        setEmail(e.target.value.replace(/\s/g, ''));
        get(`http://localhost:8001/api/v1/checkemail/${email}`)
        .then(response => setEmailCheck(response.data.message));
    }
    return (
        <div className="container border mt-5 w-50">
            <h1 className="display-2 text-center u"><u>Sign Up</u></h1>
        <form className="mt-3 p-3" >
            <div className="form-group row">
                <label htmlFor="username" className="col-sm-2 col-form-label">Username :</label>
                <div className="col-sm-10">
                    <input type="text" id = "username"readonly className="form-control" placeholder="Username" 
                    value ={username} onChange={e=>userNameChecker(e)}/>
                     <p className="text-muted">{usernameCheck}</p>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="email" className="col-sm-2 col-form-label">Email :</label>
                <div className="col-sm-10">
                    <input type="email" id = "email"readonly className="form-control" placeholder="example@domain.com" 
                    value ={email} onChange={e=>emailChecker(e)}/>
                    <p className="text-muted">{emailCheck}</p>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password :</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" 
                    value={password} onChange={e=>passwordChecker(e)} />
                    <p className="text-muted">{passwordCheck}</p>
                </div>
            </div>
            <div className = "container mt-3 text-center mb-3 p-3">
                <button type="button" className="btn btn-outline-primary text-center" onClick={()=>{
                    console.log(check);
                    if(check)
                    {
                        signUp()
                    }else{
                        Swal.fire("Password Format Isn't correct");
                        setPassword("");}}}>Sign Up
                </button>
            </div>
        </form>
        </div>
    )
}