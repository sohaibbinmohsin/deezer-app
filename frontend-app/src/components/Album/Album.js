import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./album.css";

const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null)
  const [albumStatus, setAlbumStatus] = useState(null)

  const getData = () => {
    axios.get(`http://localhost:8080/album?id=${id}`)
      .then(res => {
          setAlbum(res.data)
          setAlbumStatus(res.status);
      }).catch(err => {
          setAlbum(err)
      })
  }

  useEffect(()=>{
      getData()
  }, [])

  if(album === null){
    return(
      <div class='main-home'>
          <h3 style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '50%', left: '50%'}}>Loading...</h3>
      </div>
  );     
  }
  else{
    if(albumStatus === 200){
      return(
        <div className='main-home-album'>
          <div className='album'>
            <div className='details'>
              <span className='album-image'>
                  <img src={album.cover_medium}/>
              </span>
              <span className='album-details name'>Title: {album.title}</span>
                <span className='album-details artist'>Artist: {album.artist.name}</span>
                <span className='album-details duration'>Duration: {((album.duration)/60).toFixed(2)} minutes</span>
                <span className='album-details rank'>Rank on Deezer: {album.rank}</span>
                <span className='album-details release'>Release Date: {album.release_date}</span>
            </div>
            <div className='tr'>
              {
                album.tracks.data.map((track, key) => {
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

export default Album
