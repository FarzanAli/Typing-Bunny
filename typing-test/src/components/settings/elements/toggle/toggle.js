import React from 'react';
import useSound from 'use-sound';
import './toggle.css';
import boopOn from '../../../audio/toggle/boop-on.mp3';

let Toggle = (props) => {

    let onChange = e => {
        if(document.getElementsByClassName(props.title + "-toggle").length !== 1){
            for(let i = 0; i < document.getElementsByClassName(props.title + "-toggle").length; i++){
                if(document.getElementsByClassName(props.title + "-toggle").item(i).checked && i !== parseInt(e.target.id)){
                    document.getElementsByClassName(props.title + "-toggle").item(i).checked = false;
                }
                if(document.getElementsByClassName(props.title + "-toggle").item(i).checked === false && i === parseInt(e.target.id)){
                    document.getElementsByClassName(props.title + "-toggle").item(i).checked = true
                }
            }
        }

        if(props.title === "Theme"){
            document.documentElement.setAttribute("neumorphism", document.documentElement.getAttribute("neumorphism") === "true" ? "false": "true" );
        }

        if(props.title === "Auto-Stop"){
            props.autoStopCallback(document.getElementsByClassName(props.title + "-toggle").item(0).checked)
        }

        if(props.title === "Format"){
            props.boxCallback(document.getElementsByClassName(props.title + "-toggle").item(1).checked);
        }
    }

    const [boop] = useSound(boopOn);

    if(props.title === "Theme"){
        props.toggle[0].checked = document.documentElement.getAttribute("neumorphism") === "true" ? "checked" : ""
    }
    else if(props.title === "Auto-Stop"){
        props.toggle[0].checked = props.autoStop;
    }
    else if(props.title === "Format"){
        props.toggle[0].checked = !props.box;
        props.toggle[1].checked = props.box
    }
    return(
        <div className="toggle-container">
            {
                props.toggle.map((object, idx) => (
                    
                    <div key={idx}>
                        <label className="label-container">
                            <input className={props.title + "-toggle"} type="checkbox" defaultChecked={object.checked} id={idx} onChange={onChange} onClick={() => {if(!props.mute) boop()}}/>
                            <span className="custom-toggle"></span>
                            <div className="description-container">{object.name}</div>
                        </label>
                        <br/>
                    </div>
                ))
            }
        </div>
    );
}

export default Toggle;