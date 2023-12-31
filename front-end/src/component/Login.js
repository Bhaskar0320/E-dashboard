import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login=()=>{
        const[email, setEmail] = useState('');
        const[password, setPassword] = useState('');
        const navigate = useNavigate();
        
        useEffect(()=>{
            const auth = localStorage.getItem('user');
            if(auth){
                navigate('/');
            }
        });
        
        const handleLogin= async ()=>{
            console.warn(email,password);  
            
            let result = await fetch('http://localhost:5000/login',{
                method:'post',
                body:JSON.stringify({email, password}),
                headers:{
                    'content-Type':'application/json'
                },
            })
            result = await result.json();
            console.warn(result);

            if(result.auth){
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("token", JSON.stringify(result.auth));
                navigate('/');

            }else{
                alert("Invalid email or password")
            }
        }

    return (
        <div className='login'>
            <h1>Login here to view</h1>
            <input type='text' className="inputBox" placeholder='Enter Email' value={email} 
            onChange={(e)=>setEmail(e.target.value)}  />
            <input type='password' className="inputBox" placeholder='Enter Password' value={password}
            onChange={(e)=>setPassword(e.target.value)} />

            <button onClick={handleLogin} className="addButton" type="button">Login</button>
            
        </div>
    )
}

export default Login;