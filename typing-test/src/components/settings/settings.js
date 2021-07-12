import React, { useState } from 'react';
import '../typing-box/text.css';
import OptionsBox from './elements/optionBox.js';

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
                <div className="settings-option-column">
                    <OptionsBox 
                    title={"Format"}
                    toggle={[{name: "Highlight Text", checked: "checked"}, {name: "Typing Box", checked: ""}]}
                    />
                </div>
                <div className="settings-option-column">cd</div>
            </div>
        </div>}
        </>
    );
}

export default Settings;