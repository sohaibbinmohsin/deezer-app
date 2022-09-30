import React, { useState, useEffect} from 'react';
import "./css/navbar.css";
import axios from 'axios';
import { Nav, NavLink, Bars, NavMenu,  NavBtn} from './NavbarElements';


const Navbar = () => {
    const [signedIn, setSignedIn] = useState(false)

    const checkSignIn = () => {
        axios.get(`{{EDUCATIVE_LIVE_VM_URL}}:3000/signedIn`)
          .then(res => {
              setSignedIn(res.data)
          }).catch(err => {
              setSignedIn(false)
          })
    }

    const signOut = () => {
        axios.get(`{{EDUCATIVE_LIVE_VM_URL}}:3000/sign-out`)
          .then(res => {
              if(res.send === "Logged Out"){
                setSignedIn(false)
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
                <h3 style={{fontWeight: 'bolder', color: 'whitesmoke', fontSize:'32px'}}>My Deezer</h3>
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
                    <a href={signedIn?'#':"https://connect.deezer.com/oauth/auth.php?app_id=556762&redirect_uri={{EDUCATIVE_LIVE_VM_URL}}/signin&perms=basic_access,email,offline_access,manage_library,delete_library,listening_history,manange_community"} style={{color:'whitesmoke'}}>{signedIn?'Sign Out': 'Sign In'}</a>
                </NavBtn>
            </NavMenu>
        </Nav>
    </>
    )
}

export default Navbar
