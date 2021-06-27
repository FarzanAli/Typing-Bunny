import React, { Component } from 'react';
import { FaMoon } from 'react-icons/fa';

export default class ToggleLight extends Component{
    
    componentDidMount(){
        document.getElementsByClassName("toggleLight-container").item(0).addEventListener('mousedown', () => {
            if(document.documentElement.getAttribute('theme') === "light"){
                trans();
                document.documentElement.setAttribute('theme', 'dark');
            }
            else if(document.documentElement.getAttribute('theme') === "dark"){
                trans();
                document.documentElement.setAttribute('theme', 'light');
            }
        });

        let trans = () => {
            document.documentElement.classList.add('transition');
            window.setTimeout(() => {
                document.documentElement.classList.remove('transition')
            }, 1000)
        }
    }

    render(){
        return(
            <button type="button" className="toggleLight-container">
                <FaMoon style={{width: `100%`, height: `100%`}}/>
            </button>
        );
    }
}