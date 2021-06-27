import React, { Component } from 'react';
import { FaPaste } from 'react-icons/fa';
export default class Paste extends Component {

  constructor(props){
    super(props);
    this.paste = this.paste.bind(this);
  }

  async paste(input) {
    const text = await navigator.clipboard.readText();
    input.value = text;
    if(input.value.length !== 0){
      this.props.handlePasteCallback(input.value);
    }
  }
  render() {
    return (
      <div className="paste-container" onClick={this.paste}>
        <FaPaste style={{width: `65%`,height:`65%`, color: `#868686`}}/>
      </div>
    );
  }
}