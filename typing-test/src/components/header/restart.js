import React, { Component } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

export default class Restart extends Component{
    render(){
        return(
            <div className="restart-container" style={{marginLeft: "15px"}} onClick={this.props.restartCallback}>
                <FiRefreshCcw style={{width: `50%`,height:`50%`, color: `var(--icon-color)`}}/>
            </div>
        );
    }
}