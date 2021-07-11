import React, { Component } from 'react';
import Text from './text.js';

export default class TypingBox extends Component {

  componentDidMount() {
    if(this.props.input.length < this.props.typingText.length && document.getElementsByClassName("settings-container").item(0) === null){
      document.addEventListener('keydown', (event) => {
        this.keyboardInput(event.key)
      });
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