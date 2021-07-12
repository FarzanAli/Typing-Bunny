import React from 'react';

let Toggle = (props) => {

    let onChange = e => {
        for(let i = 0; i < document.getElementsByClassName("toggle").length; i++){
            if(document.getElementsByClassName("toggle").item(i).checked && i !== parseInt(e.target.id)){
                document.getElementsByClassName("toggle").item(i).checked = false;
            }
            if(document.getElementsByClassName("toggle").item(i).checked === false && i === parseInt(e.target.id)){
                document.getElementsByClassName("toggle").item(i).checked = true
            }
        }
    }

    return(
        <>
        <label className="label-container">
            <input className="toggle" type="checkbox" defaultChecked={props.checked} id={props.idx} onChange={onChange}/>
            <span className="custom-toggle"></span>
            &nbsp;{props.name}
        </label><br/>
        </>
    );
}

export default Toggle;