import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./favorite.css";

const Favorite = () => {
  const [track, setTrack] = useState(null)
  const [trackStatus, setTrackStatus] = useState(null)
  const [signedIn, setSignedIn] = useState(false)

  const getData = () => {
    axios.get(`http://localhost:8080/favorite`)
      .then(res => {
          if(res.data.type !== 'track'){
            throw "error"
          }
          setTrack(res.data)
          setTrackStatus(res.status);
      }).catch(err => {
          setTrack(err)
      })
  }

  const checkSignIn = () => {
    axios.get(`http://localhost:8080/signedIn`)
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
      <div class='main-home'>
          <h3 style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '50%', left: '50%'}}>Loading...</h3>
      </div>
  );     
  }
  else{
    if(trackStatus === 200){
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
                        <audio controls class="audio-1">
                            <source src={track.preview} />
                        </audio>
                        <span className='playlist-link-button'><a href={track.link} className='button-text'>Song Link</a></span>
                        <span className='playlist-link-button share'><a href={track.share} className='button-text'>Share Link</a></span>
                      </div>
                    </div>
                  )
                })
              }
        </div>
      )

    }
    else{
      if(signedIn){
        return(
        <div class='main-home'>
            <h3 style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '50%', left: '40%'}}>Something Went Wrong</h3>
        </div>
        )
      }
      else{
          return(
              <div class='main-home'>
                  <h3 style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '50%', left: '40%'}}>Sign In To View Favorites</h3>
              </div>
          )
      }
    }
  }
}

export default Favorite
