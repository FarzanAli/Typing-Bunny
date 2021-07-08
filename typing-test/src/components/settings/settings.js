import React, { useState } from 'react';
import '../typing-box/text.css';
let Settings = (props) => {

    let sampleWord = ["A", "m", "a", "n"];
    const [showOptions, setShowOptions] = useState(true);

    if(props.isopen === true && showOptions === false){
        setShowOptions(true)
    }

    return(
        <div className="settings-container" isopen={props.isopen.toString()}>
            {showOptions === true && 
                <div className="settings-options" onAnimationEnd={(e) => {if(e.animationName === "slide-out-options"){setShowOptions(!showOptions)}}} isopen={props.isopen.toString()}>
                    <div className="option" isopen={props.isopen.toString()}></div>
                    <div className="option" isopen={props.isopen.toString()}></div>
                    <div className="option" isopen={props.isopen.toString()}></div>
                    
                    {/* <div className="settings-cursor-options">
                        {
                            sampleWord.map((letter, idx) => (
                                idx === 1 ? <div style={{fontSize: "20px", display: 'inline-block', backgroundColor: "var(--purple-shade-1)"}} id={idx}>{letter}</div> : 
                                <div style={{fontSize: "20px", display: 'inline-block'}} id={idx}>{letter}</div>
                            ))
                        }
                    </div> */}
                </div>
            }
        </div>
    );
}

export default Settings;