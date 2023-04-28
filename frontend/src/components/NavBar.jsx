import React from 'react'
import GuestUser from './GuestUser'
import LoggedUser from './LoggedUser'

const NavBar = (props) => {
    const id = props.id
    return (
        <div>{id === 0 ? <GuestUser></GuestUser> : <LoggedUser></LoggedUser>}</div>
    )
}

export default NavBar