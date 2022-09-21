import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../Album/album.css";

const Artist = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null)
  const [artistStatus, setArtistStatus] = useState(null)
  const [topSongs, setTopSongs] = useState(null)
  const[topSongsStatus, setTopSongsStatus] = useState(null)

  const getData = () => {
    axios.get(`http://localhost:8080/artist?id=${id}`)
      .then(res => {
          setArtist(res.data)
          setArtistStatus(res.status);
      }).catch(err => {
          setArtist(err)
      })
  }

  const getTopSongsData = () => {
    axios.get(`http://localhost:8080/artist-top-songs?id=${id}`)
      .then(res => {
          setTopSongs(res.data)
          setTopSongsStatus(res.status);
      }).catch(err => {
          setTopSongs(err)
      })
  }

  useEffect(()=>{
      getData()
      getTopSongsData()
  }, [])

  if(artist === null){
    return(
      <div class='main-home'>
          <h3 style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '50%', left: '50%'}}>Loading...</h3>
      </div>
  );     
  }
  else{
    if(artistStatus === 200 && topSongsStatus === 200){
      return(
        <div className='main-home-album'>
          <div className='album'>
            <div className='details'>
              <span className='album-image'>
                  <img src={artist.picture_medium}/>
              </span>
              <span className='album-details name'>Name: {artist.name}</span>
                <span className='album-details artist'>Number of Albums: {artist.nb_album}</span>
                <span className='album-details duration'>Number of Fans: {artist.nb_fan}</span>
                <span className='link-button artist'><a href={artist.link} className='button-text'>Profile Link</a></span>
                <span className='link-button share artist'><a href={artist.share} className='button-text'>Share Link</a></span>
            </div>
            <div className='tr'>
              {
                topSongs.data.map((track, key) => {
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
    else if(artistStatus === 200){
      <div className='main-home-album'>
        <div className='album'>
          <div className='details'>
            <span className='album-image'>
                <img src={artist.picture_medium}/>
            </span>
            <span className='album-details name'>Name: {artist.name}</span>
              <span className='album-details artist'>Number of Albums: {artist.nb_album}</span>
              <span className='album-details duration'>Number of Fans: {artist.nb_fan}</span>
              <span className='link-button artist'><a href={artist.link} className='button-text'>Profile Link</a></span>
              <span className='link-button share artist'><a href={artist.share} className='button-text'>Share Link</a></span>
          </div>
        </div>
      </div>
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

export default Artist
