import React, { useEffect, useState } from 'react';
import './palette.css';
import ColorPicker from './colorPicker.js';

let Palette = (props) => {
    const [showColorPicker, setShowColorPicker] = useState(false);

    const [color, setColor] = useState(getComputedStyle(document.documentElement).getPropertyValue(props.palette.cssVariable))

    let colorCallback = (color) => {
        setColor(color.hex);
    }

    let onChange = e => {
        for(let i = 0; i < document.getElementsByClassName(props.palette.name + "-color").length; i++){
            if(document.getElementsByClassName(props.palette.name + "-color").item(i).checked && i !== parseInt(e.target.id)){
                document.getElementsByClassName(props.palette.name + "-color").item(i).checked = false;
            }
            if(document.getElementsByClassName(props.palette.name + "-color").item(i).checked === false && i === parseInt(e.target.id)){
                document.getElementsByClassName(props.palette.name + "-color").item(i).checked = true
            }
        }
        if(e.target.id === (document.getElementsByClassName(props.palette.name + "-color").length - 1).toString()){
            setShowColorPicker(!showColorPicker)
        }
        if(e.target.style.backgroundColor !== ""){
            setColor(e.target.style.backgroundColor)
        }
        
    }

    useEffect(() => {
        document.documentElement.style.setProperty(props.palette.cssVariable, color);
    }, [color, showColorPicker, props.palette.cssVariable])

    window.onclick = e => {
        if(e.target.className === "option-box-container"){
            setShowColorPicker(false);
        }
        if(e.target.className === "custom-color-button"){
            setShowColorPicker(!showColorPicker)
        }
        if(e.target.className === "settings-container"){
            document.getElementsByClassName("settings-button-container").item(0).click();
        }
    }

    return(
        <>
        <div className="palette-container">
            {
                props.palette.array.map((object, idx) => (
                    idx === 0 ? 
                    <label className="color-container" key={idx} style={{marginLeft: "0px"}}>
                        <input className={props.palette.name + "-color"} type="checkbox" defaultChecked={object.checked} id={idx} style={{backgroundColor: object.color}} onChange={onChange}/>
                        <span className="custom-color-toggle" style={{backgroundColor: object.color}}>
                        </span><br/>
                    </label>
                    : idx === (props.palette.array.length - 1) ?
                    <label className="color-container" key={idx} style={{marginRight: "0px"}}>
                        <input className={props.palette.name + "-color"} type="checkbox" defaultChecked={object.checked} id={idx} style={{backgroundColor: object.color}} onChange={onChange} />
                        <span className="custom-color-toggle" style={{backgroundColor: object.color}}>
                        </span><br/>
                    </label>
                    : 
                    <label className="color-container" key={idx}>
                        <input className={props.palette.name + "-color"} type="checkbox" defaultChecked={object.checked} id={idx} style={{backgroundColor: object.color}} onChange={onChange}/>
                        <span className="custom-color-toggle" style={{backgroundColor: object.color}}>
                        </span><br/>
                    </label>

                ))
            }
        </div>
        <div className="custom-color-container">
            <div className="custom-color-button" onClick={onChange}>Custom
                <label className="color-container">
                    <input className={props.palette.name + "-color"} type="checkbox" defaultChecked={""} style={{backgroundColor: color}} onClick={onChange}/>
                    <span className="custom-color-toggle" style={{backgroundColor: color}} id={props.palette.array.length}>
                    </span>
                </label>
            </div>
            {
                showColorPicker === true && (<div className="color-picker-container">
                    <ColorPicker
                    cssVariable={props.cssVariable}
                    palette={props.palette.array}
                    cursorColor={color}
                    colorCallback={colorCallback.bind(this)}
                    />
                </div>
            )}
        </div>
        </>
    );
}

export default Palette;