import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

import './App.css';
import BiancaImage from './Bianca.png';
import backgroundMusic from './background-music.mp3';

function App() {
    const [x, setx] = useState(52);
    const [y, sety] = useState(55);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const form = useRef();
    const audioRef = useRef(null);

    const body = document.querySelector("body");
    if (!body) {
        throw new ReferenceError("Body section not found.");
    }

    function createHeart() {
        const heart = document.createElement("i");
        heart.className = "fa-solid fa-heart";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 2 + "s";
        body.appendChild(heart);
    }
    setInterval(createHeart, 1000);
    setInterval(function name() {
        var heartArr = document.querySelectorAll(".fa-heart");
        if (heartArr.length > 200) {
            heartArr[0].remove();
        }
    }, 100);

    const popUp = () => {
        alert(
            "AH look at you, you caught the button. \nLucky button catchers win one free date on February 14th with an eligible bachelor who will be in touch with you to follow up!"
        );
    };

    const clickedYes = () => {
        alert(
            "Looks like you couldn’t resist saying yes, Bianca! You’ve officially made my Valentine’s Day special. An message has been sent to me with your response, and I can't wait to celebrate with you but incase not received please text me 6505012799"
        );
    };

    function mouseOver() {
        setx(Math.random() * 100);
        sety(Math.random() * 100);
    }

    var noStyle = {
        left: x + "%",
        top: y + "%",
        position: "absolute",
    };

    var yesStyle = {
        left: "40%",
        top: "55%",
        position: "absolute",
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_z199l6g",
                "template_w4y121f",
                form.current,
                "KI7bceeNiZsp0c9Kp"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
        e.target.reset();
    };

    const toggleMusic = () => {
        if (isMusicPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsMusicPlaying(!isMusicPlaying);
    };

    // Auto-play music on page load
    useEffect(() => {
        const playMusic = async () => {
            try {
                await audioRef.current.play();
                setIsMusicPlaying(true);
            } catch (err) {
                console.log("Autoplay blocked. User interaction required.", err);
            }
        };
        playMusic();
    }, []);

    return (
        <>
            {/* Add audio element */}
            <audio ref={audioRef} src={backgroundMusic} loop />

            <div className="Bianca-section">
                <button onClick={toggleMusic} className="play-music-button">
                    {isMusicPlaying ? "Pause Music" : "Play Music"}
                </button>
                <img src={BiancaImage} alt="Bianca" className="Bianca-image" />
                <p className="pre-valentine">From Aaron to Bianca </p>
            </div>
            <p className="valentine">Valentine?</p>
            <form onSubmit={sendEmail} ref={form}>
                <button style={yesStyle} type="submit" onClick={clickedYes}>
                    YES!
                </button>
            </form>
            <button onMouseOver={mouseOver} style={noStyle} onClick={popUp}>
                no
            </button>
        </>
    );
}

export default App;
