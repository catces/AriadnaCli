import React from "react";
import { useNavigate } from 'react-router-dom';
import './About.css';

export default function About () {
    const history = useNavigate();
    return (
        <div className="aboutFather">
            <div className="aboutContainer">
                <div className = 'boxesRow'>
                    <div className = 'aboutBox'>
                        <h3>About App:</h3>
                        <p className="aboutAppText">Hi everyone! Welcome to my app!<br></br>
                        This is an example of a login/register app.<br></br>
                        This was made for a Ariadna Communications Group Company 
                        <br></br>
                        I hope you enjoy it and it doesn't break.
                        </p>
                    </div>
                    <div className = 'aboutBox'>
                        <h3>About Author:</h3>
                        <p className="aboutMeText">César Catalán.
                        Originally from Barranquilla, Atlántico, Colombia.<br></br>
                        Petroleum Engineer graduated from the Industrial University of Santander and 
                        Full Stack Web Developer.<br></br>
                        Person immersed in the eternal search for continuous learning.<br></br>
                        If you want to know more about the author, here you have</p>
                        <a href="https://www.linkedin.com/in/cesarcatalancantillo/" target="_blank" rel="noreferrer">LinkedIn Profile</a>
                    </div>
                </div>
                <button className='backButton' onClick={() => {history('/')}}>Back</button>
            </div>
        </div>
    );
}