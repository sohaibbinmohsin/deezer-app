import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import Home from "./components/Home";
import Album from "./components/Album";
import Artist from "./components/Artist";
import Playlist from "./components/Playlist";
import Track from "./components/Track"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Favorite from './components/Favorite';
import Podcast from './components/Podcast';
import UserPlaylist from './components/UserPlaylist';
import Search from './components/Search';
import SignIn from './components/SignIn';

export { Home, Album, Artist, Playlist, Track, Navbar, Footer, Favorite, Podcast, UserPlaylist, Search, SignIn }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);