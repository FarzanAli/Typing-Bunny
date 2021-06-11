import React, { Component } from 'react';
import Text from './text.js';

export default class TypingBox extends Component{
    render(){
        return(
            <div className="typing-box">
                <Text typingText={this.props.typingText}/>
            </div>
        );
    }
}