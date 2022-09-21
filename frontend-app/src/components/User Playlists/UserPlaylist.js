import React, { useState, useEffect} from 'react';
import axios from 'axios';
import "./userplaylist.css"

const UserPlaylist = () => {
    const [playlist, setPlaylist] = useState(null)
    const [playlistStatus, setPlaylistStatus] = useState(null)
    const [runDisplay, setRunDisplay] = useState(true)
    const [signedIn, setSignedIn] = useState(false)
  
    const getData = () => {
      axios.get(`http://localhost:8080/user-playlist`)
        .then(res => {
            if(res.data.type !== 'playlist'){
                throw "error"
            }
            setPlaylist(res.data)
            setPlaylistStatus(res.status);
        }).catch(err => {
            setPlaylist(err)
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

    const deletePlaylist = (id) => {
        axios.get(`http://localhost:8080/delete-playlist?id=${id}`)
        .then(res => {
            setRunDisplay(!runDisplay)
        }).catch(err => {
            
        })
    }
  
    useEffect(()=>{
        getData()
        checkSignIn()
    }, [runDisplay])

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
            <div className='main-playlist-home'>
                {
                    playlist.data.map((item, key) => {
                        return(
                            <div className='playlist-display'>
                                <span class='playlist-image'>
                                    <img src={item.picture_medium}/>
                                </span>
                                <span className='playlist-details title'>{item.title}</span>
                                <span className='playlist-details duration'>{((item.duration)/60).toFixed(2)} minutes</span>
                                <span className='playlist-details release'>{item.creation_date}</span>
                                <span className='playlist-link-button'><a href={item.link} className='button-text'>Playlist Link</a></span>
                                <button className='playlist-link-button delete' onClick={()=>{deletePlaylist(item.id)}}><text style={{color:'whitesmoke'}}>Delete</text></button>
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
                        <h3 style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '50%', left: '40%'}}>Sign In To Access Playlists</h3>
                    </div>
                )
            }
        }
    }
}

export default UserPlaylist
