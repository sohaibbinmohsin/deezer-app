import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../Album/album.css"

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null)
  const [playlistStatus, setPlaylistStatus] = useState(null)

  const getData = () => {
    axios.get(`http://localhost:8080/playlist?id=${id}`)
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
      <div class='main-home'>
          <h3 style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '50%', left: '50%'}}>Loading...</h3>
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
                      <audio controls class="audio-1">
                          <source src={track.preview} />
                      </audio>
                      <span className='link-button'><a href={track.link} className='button-text'>Song Link</a></span>
                      <span className='link-button share'><a href={track.share} className='button-text'>Share Link</a></span>
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
            <h3 style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '50%', left: '50%'}}>Something Went Wrong</h3>
        </div>
      )
    }
  }
}

export default Playlist
