import React, { Component } from 'react';
import Text from './text.js';

export default class TypingBox extends Component {

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      this.keyboardInput(event.key)
    });
  }


  keyboardInput(data) {
    if (data === "Backspace" && this.props.input.length < this.props.typingText.length) {
      this.props.inputCallback(data);

      // document.getElementsByClassName("letter").item(this.props.input.length + 1).style.backgroundColor = "transparent";
      // document.getElementsByClassName("letter").item(this.props.input.length).style.backgroundColor = "#6200EE";
    }
    else if (data.length === 1 && this.props.input.length < this.props.typingText.length) {
      if (this.props.input.length === 0) {
        this.props.toggleRunTimerCallback();
      }
      this.props.inputCallback(data);

      // let letter = document.getElementsByClassName("letter");

      if (this.props.input.length < this.props.typingText.length) {
        if (this.props.input[this.props.input.length - 1] === this.props.typingText[this.props.input.length - 1]) {
          // letter.item(this.props.input.length).style.backgroundColor = "#6200EE";
          // letter.item(this.props.input.length - 1).style.backgroundColor = "transparent";
        }
        else {
          // letter.item(this.props.input.length).style.backgroundColor = "#6200EE";
          // letter.item(this.props.input.length - 1).style.backgroundColor = "red";
        }
      }
      else {
        // letter.item(this.props.input.length - 1).style.backgroundColor = "transparent";
        this.props.toggleRunTimerCallback();
      }
      if (this.props.input.length === this.props.typingText.length && this.props.input[this.props.input.length - 1] !== this.props.typingText[this.props.input.length - 1]) {
        // letter.item(this.props.input.length - 1).style.backgroundColor = "red";
      }
    

    }

    let errors = 0;
    for (let i = 0; i < this.props.input.length; i++) {
      if (this.props.input[i] !== this.props.typingText[i]) {
        errors++;
      }
    }
    this.props.errorsCallback(errors);
  }

  render() {
    return (
      <div className="typing-box">
        <Text
        input={this.props.input}
        typingText={this.props.typingText}
        handledErrors={this.props.handledErrors}
        handledErrorsCallback={this.props.handledErrorsCallback}
        />
      </div>
    );
  }
}