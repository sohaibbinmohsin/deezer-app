import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import Home from "./components/Home/Home";
import Album from "./components/Album/Album";
import Artist from "./components/Artist/Artist";
import Playlist from "./components/Playlist/Playlist";
import Track from "./components/Track/Track"
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import Favorite from './components/Favorite/Favorite';
import Podcast from './components/Podcast/Podcast';
import UserPlaylist from './components/User Playlists/UserPlaylist';
import Search from './components/Search/Search';
import SignIn from './components/SignIn';

export { Home, Album, Artist, Playlist, Track, Navbar, Footer, Favorite, Podcast, UserPlaylist, Search, SignIn }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);