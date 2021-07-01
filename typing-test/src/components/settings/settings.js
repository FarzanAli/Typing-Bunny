import React, { useState } from 'react';
import useSound from 'use-sound';
import gear1Sound from '../audio/gear/gear-1.mp3';
import gear2Sound from '../audio/gear/gear-2.mp3';
import './settings.css';
import { GoGear } from 'react-icons/go';

let Settings = () => {

    const [isClicked, setIsClicked] = useState(false);
    
    const [gear1] = useSound(gear1Sound, {
        playbackRate: 1.5,
        volume: 2
    });
    
    return(
        <div className="settings-container" onClick={() => {setIsClicked(!isClicked);gear1();}} isopen={isClicked.toString()}>
            <GoGear style={{width: "85%", height: "85%", color: "#DADDFF"}}/>
        </div>
    );
}

export default Settings;