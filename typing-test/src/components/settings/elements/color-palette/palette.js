import React, { useEffect, useState } from 'react';
import './palette.css';
import ColorPicker from './colorPicker.js';

let Palette = (props) => {

    const [showColorPicker, setShowColorPicker] = useState(false);

    const [color, setColor] = useState(getComputedStyle(document.documentElement).getPropertyValue('--cursor-color'))

    let colorCallback = (color) => {
        setColor(color);
    }
    
    let onChange = e => {
        for(let i = 0; i < document.getElementsByClassName("color").length; i++){
            if(document.getElementsByClassName("color").item(i).checked && i !== parseInt(e.target.id)){
                document.getElementsByClassName("color").item(i).checked = false;
            }
            if(document.getElementsByClassName("color").item(i).checked === false && i === parseInt(e.target.id)){
                document.getElementsByClassName("color").item(i).checked = true
            }
        }
        if(e.target.id === (document.getElementsByClassName("color").length - 1).toString()){
            setShowColorPicker(!showColorPicker)
        }
        if(e.target.style.backgroundColor !== ""){
            setColor(e.target.style.backgroundColor)
        }
        
    }

    useEffect(() => {
        document.documentElement.style.setProperty('--cursor-color', color);
    }, [color, showColorPicker])

    return(
        <>
        <div className="palette-container">
            {
                props.palette.map((object, idx) => (
                    idx === 0 ? 
                    <label className="color-container" key={idx} style={{marginLeft: "0px"}}>
                        <input className="color" type="checkbox" defaultChecked={object.checked} id={idx} style={{backgroundColor: object.color}} onChange={onChange}/>
                        <span className="custom-color-toggle" style={{backgroundColor: object.color}}>
                        </span><br/>
                    </label>
                    : idx === (props.palette.length - 1) ?
                    <label className="color-container" key={idx} style={{marginRight: "0px"}}>
                        <input className="color" type="checkbox" defaultChecked={object.checked} id={idx} style={{backgroundColor: object.color}} onChange={onChange} />
                        <span className="custom-color-toggle" style={{backgroundColor: object.color}}>
                        </span><br/>
                    </label>
                    : 
                    <label className="color-container" key={idx}>
                        <input className="color" type="checkbox" defaultChecked={object.checked} id={idx} style={{backgroundColor: object.color}} onChange={onChange}/>
                        <span className="custom-color-toggle" style={{backgroundColor: object.color}}>
                        </span><br/>
                    </label>

                ))
            }
        </div>
        <div className="custom-color-container">
            <div className="custom-color-button" onClick={onChange}>Custom
                <label className="color-container">
                    <input className="color" type="checkbox" defaultChecked={""} style={{backgroundColor: color}} onClick={onChange}/>
                    <span className="custom-color-toggle" style={{backgroundColor: color}} id={props.palette.length}>
                    </span>
                </label>
            </div>
            {
                    showColorPicker === true && (<div className="color-picker-container">
                        <ColorPicker
                        palette={props.palette}
                        colorCallback={colorCallback.bind(this)}
                        />
                    </div>
            )}
        </div>
        </>
    );
}

export default Palette;