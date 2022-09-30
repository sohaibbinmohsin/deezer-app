import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./css/track.css";
import Loading from './Loading';
import SomethingWentWrong from './SomethingWentWrong';

const Podcast = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null)
  const [podcastStatus, setPodcastStatus] = useState(null)

  const getData = () => {
    axios.get(`{{EDUCATIVE_LIVE_VM_URL}}:3000/top-podcasts`)
      .then(res => {
          for(let i = 0; i < res.data.total; i++){
            if(res.data.data[i].id === parseInt(id)){
              setPodcast(res.data.data[i])
            }
          }
          setPodcastStatus(res.status);
      }).catch(err => {
          setPodcast(err)
      })
  }

  useEffect(()=>{
      getData()
  }, [])

  if(podcast === null){
    return(
      <div class='main-home' style={{position: 'absolute', display: 'flex', justifyContent: 'center', alignContent: 'center', top: '45%', left: '45%'}}>
        <Loading /> 
      </div>
  );     
  }
  else{
    if(podcastStatus === 200){
      return(
        <div class='main-home-track'>
          <div class='track'>
            <span class='track-image'>
                <img src={podcast.picture_big}/>
            </span>
            <div class='track-details'>
              <span className='song-details title'>Title: {podcast.title}</span>
              <span className='song-details description'>{podcast.description}</span>
              
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                <span className='link-button'><a href={podcast.link} className='button-text' target="_blank">Podcast Link</a></span>
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

export default Podcast
