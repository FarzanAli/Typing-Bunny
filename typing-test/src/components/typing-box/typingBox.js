import React, { Component } from 'react';
import Text from './text.js';

export default class TypingBox extends Component {

  constructor(props){
    super(props);
    this.state = {
      keys: []
    }
  }

  componentDidMount() {
    if(this.props.input.length < this.props.typingText.length && document.getElementsByClassName("settings-container").item(0) === null){
      document.addEventListener('keydown', (event) => {
        this.keyboardInput(event.key);
        let newKeys = this.state.keys;
        newKeys.push(event.key)
        this.setState({keys: newKeys}, () => {
          if(this.state.keys[0] === "Control"){
            this.props.inputCallback(this.state.keys)
          }
        });
      });
      document.addEventListener('keyup', (event) => {
        let newKeys = this.state.keys
        for(let i = 0; i < newKeys.length; i++){
          if(newKeys[i] === event.key){
            newKeys.splice(i, 1);
          }
        }
        this.setState({keys: newKeys})
      })
    }
  }

  keyboardInput(data) {
    if (data === "Backspace" && this.props.input.length < this.props.typingText.length) {
      this.props.inputCallback(data);
    }
    else if (data.length === 1 && this.props.input.length < this.props.typingText.length) {
      if (this.props.input.length === 0) {
        this.props.toggleRunTimerCallback(true);
      }
      this.props.inputCallback(data);
    }
    if(this.props.input.length === this.props.typingText.length && this.props.runTimer){
      this.props.toggleRunTimerCallback(false);
    }

    let errors = 0;
    for (let i = 0; i < this.props.input.length; i++) {
      if (this.props.input[i] !== this.props.typingText[i]) {
        errors++;
      }
      if(i === this.props.input.length - 1){
        this.props.errorsCallback(errors);
      }
    }
  }

  render() {
    return (
      <div className="typing-box">
        <Text
        input={this.props.input}
        typingText={this.props.typingText}
        handledErrors={this.props.handledErrors}
        runTimer={this.props.runTimer}
        handledErrorsCallback={this.props.handledErrorsCallback}
        />
      </div>
    );
  }
}