import React from "react";
import {useNavigate} from "react-router-dom";
import supabase from "../utilis/supabase.js";

export default function MainPage () {
    const navigate = useNavigate();

    function goToNoticeBoard() {
        navigate('/noticeboard');
    }

    async function handleLogOut(){
        await supabase.auth.signOut();
        navigate('/signin');
    }

    return(
        <>
            <div className="mainpage_container">
                <h1>Hello, Neighbour. Welcome home.</h1>
              <div className="mainpage_buttons">
                <button className="main_page_btn" onClick={goToNoticeBoard} >Notice Board</button>
                <button className="main_page_btn">Map</button>
                  <button className="main_page_btn" onClick={handleLogOut}>Log Out</button>
              </div>
            </div>
        </>
    )
}