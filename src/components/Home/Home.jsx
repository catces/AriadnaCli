import React from 'react';
import './Home.css';
    
export default function Home() {
    return (
        <div className='homeContainer'>
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/LAvDpIxz5ZA?playlist=LAvDpIxz5ZA&amp;autoplay=1&amp;controls=0&amp;mute=1&amp;loop=1&amp;cc_load_policy=0&amp;showinfo=0" 
                frameBorder="0" 
                allowFullScreen="">
            </iframe>
        </div>
    )
}