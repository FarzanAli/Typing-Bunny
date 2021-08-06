import React, { useState, useEffect } from 'react';
import { FaMoon } from 'react-icons/fa';
import useSound from 'use-sound';
import LightSwitchOn from './audio/light-switch/light-switch-on.mp3';
import LightSwitchOff from './audio/light-switch/light-switch-off.mp3';
let ToggleLight = (props) => {
    const [isOn, setIsOn] = useState(false);
    const [playOn] = useSound(LightSwitchOn, {playbackRate: 1.2});
    const [playOff] = useSound(LightSwitchOff);
    useEffect(() => {
        isOn ? document.documentElement.setAttribute('theme', 'light') : document.documentElement.setAttribute('theme', 'dark');
        document.documentElement.classList.add('transition');
        window.setTimeout(() => {
            document.documentElement.classList.remove('transition');
        }, 1000);
    }, [isOn, playOn, playOff]);

    //removes keyboard focus from buttons.
    document.addEventListener('click', (e) => {
        if(document.activeElement.toString() === '[object HTMLButtonElement]'){
            document.activeElement.blur();
        }
    });

    return(
        <button type="button" className="test" onClick={() => {setIsOn(!isOn); if(!props.mute) isOn ? playOn() : playOff()}}>
            <FaMoon style={{width: `95%`, height: `95%`}}/>
        </button>
    );
}

export default ToggleLight;