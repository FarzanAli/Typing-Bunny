import React, { useState } from 'react';
import '../settings.css';
import Settings from '../settings.js';
import { GoGear } from 'react-icons/go';
import { useSound } from 'use-sound';
import gearSound1 from '../../audio/gear/gear-1.mp3'

let SettingsButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [gearSound] = useSound(gearSound1, {volume: 0.5, playbackRate: 1.5});

    return(
        <>
            <div className="settings-button-container" onClick={() => {setIsOpen(!isOpen); gearSound()}}>
                <GoGear className="gear" isopen={isOpen.toString()}/>
            </div>
            <Settings isopen={isOpen.toString()}/>
        </>
    );
}

export default SettingsButton;