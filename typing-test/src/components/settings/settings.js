import React, { useState } from 'react';
import '../typing-box/text.css';
import OptionsBox from './elements/box/optionBox.js';

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
                    palette={[{color: "#ad6bff9a", checked: "checked"}, {color: "var(--custom-cursor-color)", checked: ""}]}
                    // palette={["#ad6bff9a", "#008080"]}
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