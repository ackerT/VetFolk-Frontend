import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import vetImage from '../img/vet.png';
import headerimg from '../img/headerimg.png';
import bannerImg from '../img/bannerImg.png';
import "./LandingPage.css"

function LandingPage(){
    return(
        <div className='body'>
            <div className='texto'>
                <h1>Bienvenide</h1>
            </div>
          <div className='bannerImage-container'>
            <img src={headerimg} alt='banner' className='banner'></img>
            </div>  
        </div>
    );
}
export default LandingPage;