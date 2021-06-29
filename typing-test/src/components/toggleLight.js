import React, { useState, useEffect } from 'react';
import { FaMoon } from 'react-icons/fa';
import useSound from 'use-sound';
import LightSwitchOn from './audio/light-switch/light-switch-on.mp3';
import LightSwitchOff from './audio/light-switch/light-switch-off.mp3';
let ToggleLight = () => {
    
    const [isOn, setIsOn] = useState(true);
    const [playOn] = useSound(LightSwitchOn, {playbackRate: 1.2});
    const [playOff] = useSound(LightSwitchOff);
    useEffect(() => {
        isOn ? document.documentElement.setAttribute('theme', 'light') : document.documentElement.setAttribute('theme', 'dark');
        document.documentElement.classList.add('transition');
        window.setTimeout(() => {
            document.documentElement.classList.remove('transition');
        }, 1000);
    }, [isOn, playOn, playOff]);

    return(
        <button type="button" className="toggleLight-container" onClick={() => {setIsOn(!isOn); isOn ? playOn() : playOff()}}>
            <FaMoon style={{width: `100%`, height: `100%`}}/>
        </button>
    );
}

export default ToggleLight;