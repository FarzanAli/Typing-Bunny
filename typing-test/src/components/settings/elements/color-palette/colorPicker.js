import React, { useState } from 'react';
import './colorPicker.css';
import { SketchPicker } from "react-color";

let ColorPicker = (props) => {

    let [color, setColor] = useState(props.palette[0])

    let onChange = (color) => {
        setColor(color.hex)
        props.colorCallback(color.hex);
        document.documentElement.style.setProperty('--cursor-color', color.hex);
    }

    return(
        <div className="color-picker-container">
            <SketchPicker
                width={200}
                color={color}
                onChange ={onChange}
                disableAlpha={true}
                presetColors={[]}
            />
        </div>
    );
}

export default ColorPicker;
