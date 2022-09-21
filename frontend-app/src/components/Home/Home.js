import React, { useState, useEffect } from 'react';
import "./home.css";
import axios from 'axios';

const Home = () => {
    const [tracksData, setTrackData] = useState(null);
    const [trackResponseStatus, setTrackStatus] = useState(0);
    const [albumsData, setAlbumsData] = useState(null);
    const [albumsResponseStatus, setAlbumsStatus] = useState(0);
    const [artistsData, setArtistsData] = useState(null);
    const [artistsResponseStatus, setArtistsStatus] = useState(0);
    const [playlistsData, setPlaylistsData] = useState(null);
    const [playlistsResponseStatus, setPlaylistsStatus] = useState(0);
    const [podcastsData, setPodcastsData] = useState(null);
    const [podcastsResponseStatus, setPodcastsStatus] = useState(0);
    

    const getData = () => {
        //Tracks Data
        axios.get('http://localhost:8080/top-tracks')
        .then(res => {
            setTrackData(res.data)
            setTrackStatus(res.status);
        }).catch(err => {
            setTrackData(err)
        })

        //Albums Data
        axios.get('http://localhost:8080/top-albums')
        .then(res => {
            setAlbumsData(res.data)
            setAlbumsStatus(res.status);
        }).catch(err => {
            setAlbumsData(err)
        })

        //Artist Data
        axios.get('http://localhost:8080/top-artists')
        .then(res => {
            setArtistsData(res.data)
            setArtistsStatus(res.status);
        }).catch(err => {
            setArtistsData(err)
        })

        //Playlist Data
        axios.get('http://localhost:8080/top-playlists')
        .then(res => {
            setPlaylistsData(res.data)
            setPlaylistsStatus(res.status);
        }).catch(err => {
            setPlaylistsData(err)
        })

        //Podcast Data
        axios.get('http://localhost:8080/top-podcasts')
        .then(res => {
            setPodcastsData(res.data)
            setPodcastsStatus(res.status);
        }).catch(err => {
            setPodcastsData(err)
        })
    }

    useEffect(()=>{
        getData()
    }, [])

    if (tracksData === null) {
        return(
            <div class='main-home'>
                <h1 style={{color:'#0b0045', padding:'15px', fontWeight:'bold'}}>Top Tracks</h1>
                <h3 style={{display: 'flex', justifyContent: 'center'}}>Loading...</h3>

                <h1 style={{color:'#0b0045', padding:'15px', fontWeight:'bold'}}>Top Albums</h1>
                <h3 style={{display: 'flex', justifyContent: 'center'}}>Loading...</h3>

                <h1 style={{color:'#0b0045', padding:'15px', fontWeight:'bold'}}>Top Artists</h1>
                <h3 style={{display: 'flex', justifyContent: 'center'}}>Loading...</h3>

                <h1 style={{color:'#0b0045', padding:'15px', fontWeight:'bold'}}>Top Playlists</h1>
                <h3 style={{display: 'flex', justifyContent: 'center'}}>Loading...</h3>

                <h1 style={{color:'#0b0045', padding:'15px', fontWeight:'bold'}}>Top Podcasts</h1>
                <h3 style={{display: 'flex', justifyContent: 'center'}}>Loading...</h3>
            </div>
        );        
    }
    else{
        let track_div;
        let album_div;
        let artist_div;
        let playlist_div;
        let podcast_div;
        if(trackResponseStatus === 200){
            if(tracksData.total === 0){
                track_div = <>
                                <h3 style={{display: 'flex', justifyContent: 'center', color:'#0b0045', padding:'15px'}}>None</h3>
                            </>;
            }
            else{
                track_div = <>
                                <div className='charts'>
                                {
                                    tracksData.data.map((track, key) => {
                                        let image_link = track.album.cover_medium;
                                        let song_name = track.title
                                        let artist_name = track.artist.name
                                        let album_name = track.album.title
                                        return(
                                            <a href={"/track/" + track.id}> 
                                                <div class='display-box' key={key}>
                                                    <span>
                                                        <img src={image_link}/>
                                                    </span>
                                                    <div style={{display:'flex', overflow:'auto', flexDirection:'column', alignItems:'center'}}>
                                                        <span className='title'>
                                                            <text>{song_name}</text>
                                                        </span>
                                                        <span className='title-next'>
                                                            <text>{artist_name}</text>
                                                        </span>
                                                        <span className='title-next-next'>
                                                            <text>{album_name}</text>
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        )
                                    })
                                }
                                </div>
                            </>;
            }  
        }
        else {
            track_div = <>
                            <h3 style={{display: 'flex', justifyContent: 'center', color:'#0b0045', padding:'15px'}}>Something Went Wrong</h3>
                        </>;
        }
        if(albumsResponseStatus === 200){
            if(albumsData.total === 0){
                album_div = <>
                                <h3 style={{display: 'flex', justifyContent: 'center', color:'#0b0045', padding:'15px'}}>None</h3>
                            </>;
            }
            else{
                album_div = <>
                                <div className='charts'>
                                {
                                    albumsData.data.map((album, key) => {
                                        let image_link = album.cover_medium;
                                        let album_name = album.title;
                                        let artist_name = album.artist.name
                                        return(
                                            <a href={"/album/" + album.id}>
                                            <div class='display-box' key={key}>
                                                <span>
                                                    <img src={image_link}/>
                                                </span>
                                                <div style={{display:'flex', overflow:'auto', flexDirection:'column', alignItems:'center'}}>
                                                    <span className='title'>
                                                        <text>{album_name}</text>
                                                    </span>
                                                    <span className='title-next'>
                                                        <text>{artist_name}</text>
                                                    </span>
                                                </div>
                                            </div>
                                            </a>
                                        )
                                    })
                                }
                                </div>
                            </>;
            }  
        }
        else {
            album_div = <>
                            <h3 style={{display: 'flex', justifyContent: 'center', color:'#0b0045', padding:'15px'}}>Something Went Wrong</h3>
                        </>;
        }
        if(artistsResponseStatus === 200){
            if(artistsData.total === 0){
                artist_div = <>
                                <h3 style={{display: 'flex', justifyContent: 'center', color:'#0b0045', padding:'15px'}}>None</h3>
                            </>;
            }
            else{
                artist_div = <>
                                <div className='charts'>
                                {
                                    artistsData.data.map((artist, key) => {
                                        let image_link = artist.picture_medium;
                                        let artist_name = artist.name
                                        return(
                                            <a href={"/artist/" + artist.id}>
                                            <div class='display-box artist' key={key}>
                                                <span>
                                                    <img src={image_link}/>
                                                </span>
                                                <div style={{display:'flex', overflow:'auto', flexDirection:'column', alignItems:'center'}}>
                                                    <span className='title'>
                                                        <text>{artist_name}</text>
                                                    </span>
                                                </div>
                                            </div>
                                            </a>
                                        )
                                    })
                                }
                                </div>
                            </>;
            }  
        }
        else {
            artist_div = <>
                            <h3 style={{display: 'flex', justifyContent: 'center', color:'#0b0045', padding:'15px'}}>Something Went Wrong</h3>
                        </>;
        }
        if(playlistsResponseStatus === 200){
            if(playlistsData.total === 0){
                playlist_div = <>
                                <h3 style={{display: 'flex', justifyContent: 'center', color:'#0b0045', padding:'15px'}}>None</h3>
                            </>;
            }
            else{
                playlist_div = <>
                                <div className='charts'>
                                {
                                    playlistsData.data.map((playlist, key) => {
                                        let image_link = playlist.picture_medium;
                                        let playlist_name = playlist.title;
                                        let user_name = playlist.user.name;
                                        return(
                                            <a href={"/playlist/" + playlist.id}>
                                            <div className='display-box playlist' key={key}>
                                                <span>
                                                    <img src={image_link}/>
                                                </span>
                                                <div style={{display:'flex', overflow:'auto', flexDirection:'column', alignItems:'center'}}>
                                                    <span className='title'>
                                                        <text>{playlist_name}</text>
                                                    </span>
                                                    <span className='title-next'>
                                                        <text>{user_name}</text>
                                                    </span>
                                                </div>
                                            </div>
                                            </a>
                                        )
                                    })
                                }
                                </div>
                            </>;
            }  
        }
        else {
            playlist_div = <>
                            <h3 style={{display: 'flex', justifyContent: 'center', color:'#0b0045', padding:'15px'}}>Something Went Wrong</h3>
                        </>;
        }
        if(podcastsResponseStatus === 200){
            if(podcastsData.total === 0){
                podcast_div = <>
                                <h3 style={{display: 'flex', justifyContent: 'center', color:'#0b0045', padding:'15px'}}>None</h3>
                            </>;
            }
            else{
                podcast_div = <>
                                <div className='charts'>
                                {
                                    podcastsData.data.map((podcast, key) => {
                                        let image_link = podcast.picture_medium;
                                        let podcast_name = podcast.title;
                                        return(
                                            <a href={"/podcast/" + podcast.id}>
                                            <div class='display-box artist' key={key}>
                                                <span>
                                                    <img src={image_link}/>
                                                </span>
                                                <div style={{display:'flex', overflow:'auto', flexDirection:'column', alignItems:'center'}}>
                                                    <span className='title'>
                                                        <text>{podcast_name}</text>
                                                    </span>
                                                </div>
                                            </div>
                                            </a>
                                        )
                                    })
                                }
                                </div>
                            </>;
            }  
        }
        else {
            podcast_div = <>
                            <h3 style={{display: 'flex', justifyContent: 'center', color:'#0b0045', padding:'15px'}}>Something Went Wrong</h3>
                        </>;
        }
        return(
            <div class='main-home'>
                <h1 style={{color:'#0b003f', padding:'15px', fontWeight:'bold'}}>Top Tracks</h1>
                {track_div}
                <h1 style={{color:'#0b003f', padding:'15px', fontWeight:'bold'}}>Top Albums</h1>
                {album_div}
                <h1 style={{color:'#0b003f', padding:'15px', fontWeight:'bold'}}>Top Artists</h1>
                {artist_div}
                <h1 style={{color:'#0b003f', padding:'15px', fontWeight:'bold'}}>Top Playlists</h1>
                {playlist_div}
                <h1 style={{color:'#0b003f', padding:'15px', fontWeight:'bold'}}>Top Podcasts</h1>
                {podcast_div}
            </div>
        )
    }
}

export default Home;