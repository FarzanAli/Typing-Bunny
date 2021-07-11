import React, { useState, useEffect } from 'react';

let Button = () => {

    let cursorIndex = 1;
    
    let mappedArray = ["C", "u", "r", "s", "o", "r"].map((letter, idx) => (
        idx === cursorIndex ? <div style={{fontSize: "20px", display: 'inline-block', backgroundColor: "var(--purple-shade-1)"}} key={idx}>{letter}</div> : 
        <div style={{fontSize: "20px", display: 'inline-block'}} key={idx}>{letter}</div>
    ))

    return(
        <>
        {mappedArray}
        </>
    );
}

export default Button;