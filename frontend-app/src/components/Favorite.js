import React, { useState, useEffect} from 'react';
import axios from 'axios';
import "./css/favorite.css";
import None from './None';
import Loading from './Loading';
import SomethingWentWrong from './SomethingWentWrong';

const Favorite = () => {
  const [track, setTrack] = useState(null)
  const [trackStatus, setTrackStatus] = useState(null)
  const [signedIn, setSignedIn] = useState(false)

  const getData = () => {
    axios.get(`https://ed-4649021457301504.educative.run:3000/favorite`)
      .then(res => {
          if(res.data.error){
            throw "error"
          }
          setTrack(res.data)
          setTrackStatus(res.status);
      }).catch(err => {
          setTrack(err)
      })
  }

  const checkSignIn = () => {
    axios.get(`https://ed-4649021457301504.educative.run:3000/signedIn`)
      .then(res => {
          setSignedIn(res.data)
      }).catch(err => {
          setSignedIn(false)
      })
  }

  useEffect(()=>{
      getData()
      checkSignIn()
  }, [])
  
  if(track === null){
    return(
      <div class='main-home' style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '45%', left: '45%'}}>
        <Loading /> 
      </div>
  );     
  }
  else{
    if(trackStatus === 200){
      if(track.total === 0){
        return(
        <div class='main-home'>
          <None /> 
        </div>
        )
      }else{
        return(
          <div className='favorite-main'>
            {
                  track.data.map((track, key) => {
                    return(
                      <div className='favorite-track' key={key}>
                        <span class='playlist-image'>
                          <img src={track.album.cover_medium}/>
                        </span>
                        <div className='fav-details-display'>
                          <span className='fav-details title'>{track.title}</span>
                          <audio controls class="audio-1" style={{marginTop: '10px'}}>
                              <source src={track.preview} />
                          </audio>
                          <span className='playlist-link-button'><a href={track.link} className='button-text' target="_blank">Song Link</a></span>
                        </div>
                      </div>
                    )
                  })
                }
          </div>
        )
      }
    }
    else{
      if(signedIn){
        return(
        <div class='main-home'>
          <SomethingWentWrong />
        </div>
        )
      }
      else{
          return(
              <div class='main-home'>
                <div style={{overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center',textAlign: 'center', backgroundColor: '#5848b5c3', borderRadius: '10px', position: 'absolute', top:'25%', left:'20%', width: '60%', height: '50%'}}>
                  <text style={{color: 'white', fontWeight: 'bold', fontSize: '40px'}}>
                      Sign In To View Favorites
                  </text>
                </div>
              </div>
          )
      }
    }
  }
}

export default Favorite
