import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./css/track.css";
import Loading from './Loading';
import SomethingWentWrong from './SomethingWentWrong';

const Track = () => {
  const { id } = useParams();
  const [track, setTrack] = useState(null)
  const [trackStatus, setTrackStatus] = useState(null)

  const getData = () => {
    axios.get(`{{EDUCATIVE_LIVE_VM_URL}}:3000/song?id=${id}`)
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

  useEffect(()=>{
      getData()
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
      return(
        <div class='main-home-track'>
          <div class='track'>
            <span class='track-image'>
                <img src={track.album.cover_big}/>
            </span>
            <div class='track-details'>
              <span className='song-details title'>Title: {track.title}</span>
              <span className='song-details artist'>Artist: {track.artist.name}</span>
              <span className='song-details song-album'>Album: {track.album.title}</span>
              <span className='song-details duration'>Duration: {((track.duration)/60).toFixed(2)} minutes</span>
              <span className='song-details rank'>Rank on Deezer: {track.rank}</span>
              <span className='song-details release'>Release Date: {track.release_date}</span>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                <span className='link-button'><a href={track.link} className='button-text' target="_blank">Song Link</a></span>
              </div>
              <div className='preview'>
                <audio controls class="audio-1" style={{marginTop:'10px'}}>
                  <source src={track.preview} />
                </audio>
              </div>
            </div>
          </div>
        </div>
      )

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

export default Track
