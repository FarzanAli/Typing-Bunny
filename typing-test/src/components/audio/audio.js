import React, { useState, useEffect } from 'react';
import { useSound } from 'use-sound';
import { IoIosVolumeHigh } from 'react-icons/io';
import { IoIosVolumeOff } from 'react-icons/io';
import MuteSound from './mute/mute.mp3';

let Audio = (props) => {

    const [mute, setMute] = useState(false);
    const [muteSound] = useSound(MuteSound);

    useEffect(() => {
        props.muteCallback(mute);
    }, [mute]);

    return(
        <div onClick={() => {setMute(!mute); if(mute) muteSound();}}>
            {mute === true && <IoIosVolumeOff style={{width: `100%`, height: `100%`}}/>}
            {mute === false && <IoIosVolumeHigh style={{width: `100%`, height: `100%`}}/>}
        </div>
    );
}

export default Audio;