import React, { useState } from 'react';
import './box.css';

let Box = (props) => {
    return(
        <div className="box-container">
            <input type="text" className="input-box" value={props.input} onChange={(e) => props.boxInputCallback(e.target.value)}></input>
        </div>
    );
}

export default Box;