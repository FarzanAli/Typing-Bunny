import React, { useState } from 'react';
import '../typing-box/text.css';
import CursorButton from './settings-options/cursor-options/button.js';

let Settings = (props) => {

    const [showOptions, setShowOptions] = useState(false);

    if(props.isopen === true && showOptions === false){
        setShowOptions(true)
    }

    return(
        <>
        {showOptions === true && 
        <div className="settings-container" isopen={props.isopen.toString()}>
            
                <div className="settings-options" onAnimationEnd={(e) => {if(e.animationName === "slide-out-options"){setShowOptions(!showOptions)}}} isopen={props.isopen.toString()}>
                    <div className="option" isopen={props.isopen.toString()}>
                        <div className="settings-cursor-options">
                            <CursorButton />
                        </div>
                    </div>
                    <div className="option" isopen={props.isopen.toString()}>
                        <div className="settings-error-options">
                            Coming soon...
                        </div>
                    </div>
                    <div className="option" isopen={props.isopen.toString()}>
                        <div className="settings-theme-options">
                            Coming soon...
                        </div>
                    </div>
                </div>
        </div>  }</>
    );
}

export default Settings;