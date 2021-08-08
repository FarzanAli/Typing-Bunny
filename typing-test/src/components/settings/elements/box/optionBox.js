import React from 'react';
import './optionBox.css';
import Toggle from '../toggle/toggle.js';
import Palette from '../color-palette/palette.js';

let OptionBox = (props) => {
    return(
        <div className="option-box-container">
            <div className="option-title">{props.title}</div>
            {props.toggle.length !== 0 && (
                <Toggle
                toggle={props.toggle}
                title={props.title}
                mute={props.mute}
                autoStopCallback={props.autoStopCallback}
                autoStop={props.autoStop}
                boxCallback={props.boxCallback}
                box={props.box}
                />
            )}
            {props.palette.length !== 0 && (
                <Palette 
                palette={props.palette}
                mute={props.mute}
                />
            )}
        </div>
    );   
}

export default OptionBox;