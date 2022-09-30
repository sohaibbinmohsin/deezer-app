import React, { useState, useEffect} from 'react';
import axios from 'axios';
import "./css/search.css";
import None from './None';
import Loading from './Loading';
import SomethingWentWrong from './SomethingWentWrong';

const Search = () => {
    const params = new URLSearchParams(window.location.search);
    let q = params.get('q');
    const [result, setResult] = useState(null);
    const [resultStatus, setResultStatus] = useState(null);
  
    const getData = () => {
      axios.get(`{{EDUCATIVE_LIVE_VM_URL}}:3000/search?q=${q}`)
        .then(res => {
            setResult(res.data)
            setResultStatus(res.status);
        }).catch(err => {
            setResult(err)
        })
    }

    const explore = (id, type) => {
        if(type === 'artist'){
            window.location.href = '/artist/' + id
        }
        else if(type === 'track'){
            window.location.href = '/track/' + id
        }
        else if(type === 'album'){
            window.location.href = '/album/' + id
        }
        else if(type === 'playlist'){
            window.location.href = '/playlist/' + id
        }
        else if(type === 'podcast'){
            window.location.href = '/podcast/' + id
        }
    }
  
    useEffect(()=>{
        getData()
    }, [])

    if(result === null){
        return(
            <div class='main-home' style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '45%', left: '45%'}}>
                <Loading /> 
            </div>
        );     
    }
    else{
        if(resultStatus === 200){
            if(result.total === 0){
                return(
                    <div class='main-home'>
                        <None />
                    </div>
                )
            }
            else{
                return(
                    <div className='main-home'>
                        <h1 style={{display:'flex', flexDirection:'row', justifyContent:'center', fontWeight:'bold', color:'#0b0045'}}>Search Results</h1>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            {
                                result.data.map((item, key) => {
                                    return(
                                        <div className='result-details' key={key}>
                                            <span className='tr-inner-details title'>{item.title?item.title:item.name}</span>
                                            <button className='search-link-button' onClick={()=>{explore(item.id, item.type)}}><text style={{color:'whitesmoke'}}>Explore</text></button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                  )
            }
    
        }
        else{
          return(
            <div class='main-home'>
                <SomethingWentWrong />
            </div>
          )
        }
      }
}

export default Search
