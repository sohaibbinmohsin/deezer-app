import React, { useState, useEffect} from 'react';
import axios from 'axios';
import "./css/userplaylist.css"
import None from './None';
import Loading from './Loading';
import SomethingWentWrong from './SomethingWentWrong';

const UserPlaylist = () => {
    const [playlist, setPlaylist] = useState(null)
    const [playlistStatus, setPlaylistStatus] = useState(null)
    const [runDisplay, setRunDisplay] = useState(true)
    const [signedIn, setSignedIn] = useState(false)
  
    const getData = () => {
      axios.get(`{{EDUCATIVE_LIVE_VM_URL}}:3000/user-playlist`)
        .then(res => {
            if(res.data.error){
                throw "error"
            }
            setPlaylist(res.data)
            setPlaylistStatus(res.status);
        }).catch(err => {
            setPlaylist(err)
        })
    }

    const checkSignIn = () => {
        axios.get(`{{EDUCATIVE_LIVE_VM_URL}}:3000/signedIn`)
          .then(res => {
              setSignedIn(res.data)
          }).catch(err => {
              setSignedIn(false)
          })
      }

    const deletePlaylist = (id) => {
        axios.get(`{{EDUCATIVE_LIVE_VM_URL}}:3000/delete-playlist?id=${id}`)
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
          <div class='main-home' style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '45%', left: '45%'}}>
            <Loading /> 
        </div>
      );     
    }
    else{
        if(playlistStatus === 200){
            if(playlist.total === 0){
                return(
                <div class='main-home'>
                    <None />
                </div>
                )
            }else{
                return(
                    <div className='favorite-main'>
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
                                        <span className='playlist-link-button'><a href={item.link} className='button-text' target="_blank">Playlist Link</a></span>
                                        <button className='playlist-link-button delete' onClick={()=>{deletePlaylist(item.id)}}><text style={{color:'whitesmoke'}}>Delete</text></button>
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
                                Sign In To Access Playlists
                            </text>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default UserPlaylist
