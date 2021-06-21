import React, { Component } from 'react';
export default class Stats extends Component{
    render(){
        return(
            <div className="stats-container">
                <div className="accuracy-container">
                    Accuracy 
                    <div className="accuracy">{Math.round(this.props.accuracy)}</div>
                </div>
                <div className="wpm-container">
                    WPM 
                    <div className="wpm">{Math.round(this.props.wpm)}</div>
                </div>
            </div>
        );
    }
}