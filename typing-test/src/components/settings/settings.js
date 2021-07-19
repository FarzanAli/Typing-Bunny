import React, { useState } from 'react';
import '../typing-box/text.css';
import OptionsBox from './elements/box/optionBox.js';

let Settings = (props) => {

    const [showOptions, setShowOptions] = useState(false);

    if(props.isopen === true && showOptions === false){
        setShowOptions(true)
    }

    window.onclick = e => {
        if(e.target.className === "settings-container"){
            document.getElementsByClassName("settings-button-container").item(0).click();
        }
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
                    palette={[{color: "#8929ff9a", checked: "checked"}, {color: "#FFFFFF", checked: ""}]}
                    />
                </div>
                <div className="settings-option-column">
                    <OptionsBox
                        title={"Auto-Stop"}
                        toggle={[{name:"(description)", checked: ""}]}
                        palette={[]}
                    />
                </div>
            </div>
        </div>}
        </>
    );
}

export default Settings;