import React from 'react';
import './optionBox.css';
import Toggle from './toggle.js';

let OptionBox = (props) => {
    return(
        <div className="option-box-container">
            <div className="option-title">{props.title}</div>
            {props.toggle !== [] && (
                <div className="toggle-container">
                    {
                        props.toggle.map((object, idx) => (
                            <Toggle
                            name={object.name}
                            checked={object.checked}
                            idx={idx}
                            key={idx}
                            />
                        ))
                    }
                </div>
            )}
        </div>
    );   
}

export default OptionBox;