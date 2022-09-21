import "./App.css"
import { Home, Album, Artist, Playlist, Track, Navbar, Footer, Favorite, Podcast, UserPlaylist, Search, SignIn } from "."
import { BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/track/:id" element={<Track />} />
          <Route path="/podcast/:id" element={<Podcast />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/user-playlist" element={<UserPlaylist />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
