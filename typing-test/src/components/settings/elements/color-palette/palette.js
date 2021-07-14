import React from 'react';
import './palette.css';
import { SketchPicker } from 'react-color';

let Palette = (props) => {
    let onChange = e => {
        for(let i = 0; i < document.getElementsByClassName("color").length; i++){
            if(document.getElementsByClassName("color").item(i).checked && i !== parseInt(e.target.id)){
                document.getElementsByClassName("color").item(i).checked = false;
            }
            if(document.getElementsByClassName("color").item(i).checked === false && i === parseInt(e.target.id)){
                document.getElementsByClassName("color").item(i).checked = true
            }
        }
    }

    let handleColorChange = (color) => {
        document.documentElement.style.setProperty('--cursor-color', color.hex);
    }

    return(
        <>
        {/* <div className="palette-container">
            {
                props.palette.map((object, idx) => (
                    idx === 0 ? 
                    <label className="color-container" key={idx} style={{marginLeft: "0px"}}>
                        <input className="color" type="checkbox" defaultChecked={object.checked} id={idx} style={{backgroundColor: "red"}} onChange={onChange}/>
                        <span className="custom-color-toggle" style={{backgroundColor: object.color}}>
                        </span><br/>
                    </label>
                    : idx === (props.palette.length - 1) ?
                    <label className="color-container" key={idx} style={{marginRight: "0px"}}>
                        <input className="color" type="checkbox" defaultChecked={object.checked} id={idx} style={{backgroundColor: object.color}} onChange={onChange}/>
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
        </div> */}
        <div className="color-picker-container">
            <SketchPicker
                disableAlpha={true}
                presetColors={props.palette}
                width={150}
                color={props.palette[0]}
                onChangeComplete={handleColorChange}
            />
        </div>
        </>
    );
}

export default Palette;