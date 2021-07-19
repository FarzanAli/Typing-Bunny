import React from 'react';
import './colorPicker.css';
import { SketchPicker } from 'react-color';

let ColorPicker = (props) => {

    let onChange = (color) => {
        props.colorCallback(color)
    }

    return(
        <div className="color-picker-container">
            <SketchPicker
                width={200}
                color={props.cursorColor}
                onChange = {onChange}
                disableAlpha={true}
                presetColors={[]}
            />
        </div>
    );
}

export default ColorPicker;
