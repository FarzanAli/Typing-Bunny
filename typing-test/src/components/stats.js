import React, { Component } from 'react';
import './stats.css';

export default class Stats extends Component{
    render(){
        return(
            <div className="stats-container">
                <div className="accuracy">Accuracy:{Math.round(this.props.accuracy)}%</div>
                <div className="wpm">WPM: {Math.round(this.props.wpm)}</div>
            </div>
        );
    }
}