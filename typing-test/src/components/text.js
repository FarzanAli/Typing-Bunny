import React, { Component } from 'react';

export default class Text extends Component{
    
    render(){
        let wordArray = [];
        if(this.props.typingText.length === 1){
          wordArray.push(this.props.typingText[0]);
        }
        else{
          for(let i = 0; i < this.props.typingText.length; i++){
            if(i === 0 || this.props.typingText[i] === " "){
              if(this.props.typingText[i] === " "){i += 1;}
              for(let j = i; j < this.props.typingText.length; j++){
                if(this.props.typingText[j] === " " || j === this.props.typingText.length - 1){
                  wordArray.push(this.props.typingText.slice(i, j + 1));
                  i = j + 1;
                }
              }
            }
          }
        }

        wordArray = wordArray.map((element, idx) => (
            <div className="word" key={idx} id={idx}>
              {
                [...element].map((letter, idx) => (
                  letter === " " ? (<div className="letter" key={idx}>&nbsp;</div>) :
                  (<div className="letter" key={idx}>{letter}</div>)
                ))
              }
            </div>
        )); 
        
        return(
            <div className="typing-text">
                {wordArray}
            </div>
        );
    }
}