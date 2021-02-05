import React, { useEffect, useState } from 'react';
import {FcGoogle} from 'react-icons/fc'
import {useHistory} from 'react-router-dom'

const ifToken = () => {
    if(localStorage.getItem('token') !== null)
        return false;
    return true;
}

const AuthPanel = () => {
    
    
    const para = {
        client_id: '545831803122-8m7jga8f2c277vql7u43etgaq7o0an0u.apps.googleusercontent.com',
        redirect_uri: 'http://localhost:3000',
        response_type: 'token',
        scope: 'https://www.googleapis.com/auth/userinfo.email',
    }

    const url = `https://accounts.google.com/o/oauth2/v2/auth`
    return <div className='h-3/5 w-1/5 bg-white rounded-md flex flex-col justify-center items-center'>
        <form method="GET" action={url}>
            {Object.keys(para).map((ele,i) => (<input key={i} type='hidden' name={ele} value={para[ele]} >
            
            </input>))}
            <button className='g_button rounded-md focus:outline-none focus:border-none'>
                Log in with <FcGoogle className='inline text-xl'/>
            </button>
        </form>
    </div>
}

const Todo = ({hash, setUsername}) => {

    console.log(hash);
    let qs = hash.slice(1);
    qs = qs.split('&');
    let params = {};
    for(let i of qs){
        let [a,b] = i.split('=');
        params[a] = b;
    } 
    console.log(params, ifToken());
    let history = useHistory();
    if(params['access_token'] !== undefined){
       fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
           method : "GET",
           headers : {
               Authorization : `Bearer ${params['access_token']}`
           }
       }).then(res => res.json()).then(res => {
           console.log(res);
           localStorage.setItem('token', res.email);
           setUsername(res.email);
           history.push('/');
       })
    }
    return <div className='w-full h-full flex flex-row flex-nowrap justify-center items-center'>
        {ifToken() ? 
            <AuthPanel/>    
            : 
            <div>

            </div>
        }
    </div>
}

export default Todo;