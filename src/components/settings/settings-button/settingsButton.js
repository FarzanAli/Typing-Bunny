import React, { useState } from 'react';
import '../settings.css';
import Settings from '../settings.js';
import { GoGear } from 'react-icons/go';
import { useSound } from 'use-sound';
import gearSound1 from '../../audio/gear/gear-1.mp3'

let SettingsButton = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [gearSound] = useSound(gearSound1, {volume: 0.5, playbackRate: 1.5});

    return(
        <>
            <div className="settings-button-container" onClick={() => {setIsOpen(!isOpen); if(!props.mute) gearSound()}}>
                <GoGear className="gear" isopen={isOpen.toString()}/>
            </div>
            <Settings
            isopen={isOpen}
            mute={props.mute}
            autoStopCallback={props.autoStopCallback.bind(this)}
            autoStop={props.autoStop}
            boxCallback={props.boxCallback.bind(this)}
            box={props.box}
            cursorFilledCallback={props.cursorFilledCallback}
            cursorFilled={props.cursorFilled}
            errorsFilledCallback={props.errorsFilledCallback}
            errorsFilled={props.errorsFilled}
            />
        </>
    );
}

export default SettingsButton;