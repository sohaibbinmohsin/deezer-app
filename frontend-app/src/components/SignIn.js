import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Loading from './Loading';

const SignIn = () => {
    const params = new URLSearchParams(window.location.search);
    let code = params.get('code');
    const [error, setError] = useState(false)
    const [display, setDisplay] = useState('Loading...')
  
    const getData = () => {
        if(params.has('code')){
            console.log(code)
            axios.get(`{{EDUCATIVE_LIVE_VM_URL}}:3000/sign-in?code=${code}`)
            .then(res => {
                if(res.data === "Success"){
                    setDisplay("Successfully Signed In. Redirecting...")
                    setError(true)
                }
            }).catch(err => {
                setDisplay("Something Went Wrong. Try again!")
                setError(true)
            })
        }
        else{
            setDisplay('Authorization Refused. Going back..')
            setError(true)
        }
    }

    useEffect(()=>{
        getData()
    }, [])

    if(error){
        window.location.assign('/')
    }
    if(display === "Loading..."){
        return(
            <div class='main-home' style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '45%', left: '45%'}}>
                <Loading /> 
            </div>
        )
    }
    else{
        return(
            <div class='main-home'>
                <h3 style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '50%', left: '50%', width: '200px', wordWrap:'break-word'}}>{display}</h3>
            </div>
        )
    }
}

export default SignIn
