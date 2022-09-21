import React, { useState, useEffect} from 'react';
import axios from 'axios';

const SignIn = () => {
    const params = new URLSearchParams(window.location.search);
    let code = params.get('code');
    const [error, setError] = useState(false)
    const [display, setDisplay] = useState('Loading...')
  
    const getData = () => {
        if(params.has('code')){
            axios.get(`http://localhost:8080/sign-in?code=${code}`)
            .then(res => {
                if(res == "Success"){
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
        window.location.href('/')
    }

    return(
        <div class='main-home'>
            <h3 style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '50%', left: '50%'}}>{display}</h3>
        </div>
    )
}

export default SignIn
