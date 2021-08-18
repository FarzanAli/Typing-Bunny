import React, { Component } from 'react';
import { IoIosShuffle } from 'react-icons/io';

export default class Next extends Component{
    render(){
        return(
           <div className="next-container" style={{marginLeft: "15px"}} onClick={this.props.handleNextTextCallback}>
               <IoIosShuffle style={{width: `70%`,height:`70%`, color: `var(--icon-color)`}}/>
           </div>
        );
    }
}