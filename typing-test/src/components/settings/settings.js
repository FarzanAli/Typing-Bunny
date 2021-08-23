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
                    palette={[]}
                    mute={props.mute}
                    boxCallback={props.boxCallback.bind(this)}
                    box={props.box}
                    />
                    <OptionsBox
                    title={"Theme"}
                    toggle={[{name: "Neumorphism", checked: "checked"}]}
                    palette={[]}
                    mute={props.mute}
                    />
                    <OptionsBox
                    title={"Errors"}
                    toggle={[]}
                    palette={
                        {
                            name:"error",
                            array: [{color: "rgb(255, 52, 52)", checked: "checked"}, {color: "#7EFF29", checked: ""}, {color: "#FFB300", checked: ""}, {color: "#00FFED", checked: ""}],
                            cssVariable: '--error-color'
                        }
                    }
                    mute={props.mute}
                    errorsFilledCallback={props.errorsFilledCallback}
                    errorsFilled={props.errorsFilled}
                    />
                </div>
                <div className="settings-option-column">
                    {props.box === false && <OptionsBox
                        title={"Auto-Stop"}
                        toggle={[{name:"Stops cursor on error", checked: ""}]}
                        palette={[]}
                        mute={props.mute}
                        autoStopCallback={props.autoStopCallback.bind(this)}
                        autoStop={props.autoStop}
                    />
                    }
                    <OptionsBox
                    title={"Cursor"}
                    toggle={[]}
                    palette={{
                        name: "cursor",
                        array: [{color: "#8929ff9a", checked: "checked"}, {color: "#7EFF29", checked: ""}, {color: "#FFB300", checked: ""}, {color: "#00FFED", checked: ""}], 
                        cssVariable: '--cursor-color'
                    }}
                    mute={props.mute}
                    cursorFilledCallback={props.cursorFilledCallback}
                    cursorFilled={props.cursorFilled}
                    />
                </div>
            </div>
        </div>}
        </>
    );
}

export default Settings;