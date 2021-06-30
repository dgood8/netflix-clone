import React, { useEffect, useState } from 'react'
import'./Nav.css'

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", () =>{
            if(window.scrollY > 120){
                //display black space in nave bar
                handleShow(true);
            } else handleShow(false);
        });
        return () =>{
            window.removeEventListener("scroll");
        };
    }, []);

    return (
        <div className= {`nav ${show && "nav_black"}`}>
            <img 
                className = "nav_logo"
                src= "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                alt = "Netflix Logo"
            />
            <img
                className = "nav_avatar"
                src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                alt= "avatar logo"      
            />
            
        </div>
    )
}

export default Nav
