import React from 'react';
import './box.css';

let Box = (props) => {

    let boxInput = (e) => {
        // console.log(e)
        
        if(e.target.value[e.target.value.length - 1] === " " && props.typingText.slice(0, props.input.length + 1) === props.input + e.target.value[e.target.value.length - 1]){
            props.boxInputCallback(e.target.value, "set");
        }
        else if(e.target.value[e.target.value.length - 1] !== " "){
            props.boxInputCallback(e.target.value, "set");
        }
    }

    return(
        <div className="box-container">
            <input type="text" className="input-box" spellCheck="false" value={(!/\S/.test(props.input)) ? props.input : props.input.indexOf(" ") === -1 ? props.input : props.input.slice(props.input.lastIndexOf(" ") + 1, props.input.length)} onChange={(e) => boxInput(e)}></input>
        </div>
    );
}

export default Box;