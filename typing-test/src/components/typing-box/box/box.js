import React from 'react';
import './box.css';

let Box = (props) => {
    return(
        <div className="box-container">
            <input type="text" className="input-box" onChange={(e) => props.boxInputCallback(e.target.value)}></input>
        </div>
    );
}

export default Box;