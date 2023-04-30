import React from 'react'
import GuestUser from './GuestUser'
import LoggedUser from './LoggedUser'

const NavBar = (props) => {
    const user = props.user
    return (
        <div>{user ? <LoggedUser></LoggedUser> : <GuestUser></GuestUser>}</div>
    )
}

export default NavBar