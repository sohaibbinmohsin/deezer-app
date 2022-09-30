import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./css/album.css";
import Loading from './Loading';
import SomethingWentWrong from './SomethingWentWrong';

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null)
  const [playlistStatus, setPlaylistStatus] = useState(null)

  const getData = () => {
    axios.get(`{{EDUCATIVE_LIVE_VM_URL}}:3000/playlist?id=${id}`)
      .then(res => {
          setPlaylist(res.data)
          setPlaylistStatus(res.status);
      }).catch(err => {
          setPlaylist(err)
      })
  }

  useEffect(()=>{
      getData()
  }, [])

  if(playlist === null){
    return(
      <div class='main-home' style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '45%', left: '45%'}}>
        <Loading /> 
      </div>
  );     
  }
  else{
    if(playlistStatus === 200){
      return(
        <div className='main-home-album'>
          <div className='album'>
            <div className='details'>
              <span className='album-image playlist'>
                  <img src={playlist.picture_medium}/>
              </span>
              <span className='album-details name'>Title: {playlist.title}</span>
                <span className='album-details artist'>Creator: {playlist.creator.name}</span>
                <span className='album-details duration'>Duration: {((playlist.duration)/60).toFixed(2)} minutes</span>
                <span className='album-details rank'>Rank on Deezer: {playlist.rank}</span>
                <span className='album-details release'>Creation Date: {playlist.creation_date}</span>
            </div>
            <div className='tr'>
              {
                playlist.tracks.data.map((track, key) => {
                  return(
                    <div className='tr-details' key={key}>
                      <span className='tr-inner-details title'>{track.title}</span>
                      <span className='tr-inner-details duration'>{((track.duration)/60).toFixed(2)}</span>
                      <audio controls class="audio-1" style={{marginTop:'10px'}}>
                          <source src={track.preview} />
                      </audio>
                      <span className='link-button'><a href={track.link} className='button-text' target="_blank">Song Link</a></span>
                    </div>
                  )
                })
              }
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

export default Playlist
