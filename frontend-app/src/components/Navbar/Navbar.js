import React, { useState, useEffect} from 'react';
import "./navbar.css";
import axios from 'axios';
import { Nav, NavLink, Bars, NavMenu,  NavBtn} from './NavbarElements';


const Navbar = () => {
    const [signedIn, setSignedIn] = useState(false)

    const checkSignIn = () => {
        axios.get(`http://localhost:8080/signedIn`)
          .then(res => {
              console.log(res.data)
              setSignedIn(res.data)
          }).catch(err => {
              setSignedIn(false)
          })
    }

    const signOut = () => {
        axios.get(`http://localhost:8080/sign-out`)
          .then(res => {
              if(res.send === "Logged Out"){
                setSignedIn(false)
                console.log(signedIn)
              }
              else{
                setSignedIn(true)
              }
              
          }).catch(err => {
              setSignedIn(true)
          })
    }

    useEffect(()=>{
        checkSignIn()
    }, [signedIn])

    return (
    <>
        <Nav>
            <NavLink to='/'>
                <h3 style={{fontWeight: 'bolder', color: 'whitesmoke', fontSize:'32px'}}>Deezer API</h3>
            </NavLink>
            <Bars />
            <NavMenu>
                <div className='main'>
                <form action="/search" id="form1">
                    <input type ='search' placeholder='Search for songs, albums, artists' name="q" />
                    <button class='btn-search' type="submit" value="Submit"><i class="fa fa-search icon-search"></i></button>
                </form>
                </div>
                <NavLink to='/favorite' activeStyle>
                    <a href=''><i class="fa fa-heart icon-fav"></i></a>
                </NavLink>
                <NavLink to='/user-playlist' activeStyle>
                    <text style={{fontSize: '17px', color: 'whitesmoke'}}>Playlists</text>
                </NavLink>
                <NavBtn>
                    <a href={signedIn?'#':"https://connect.deezer.com/oauth/auth.php?app_id=556762&redirect_uri=https://localhost:3000/signin&perms=basic_access,email,offline_access,manage_library,delete_library,listening_history,manange_community"} style={{color:'whitesmoke'}}>{signedIn?'Sign Out': 'Sign In'}</a>
                </NavBtn>
            </NavMenu>
        </Nav>
    </>
    )
}

export default Navbar
