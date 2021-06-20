import React, { Component } from 'react';

export default class Paste extends Component {

  constructor(props){
    super(props);
    this.paste = this.paste.bind(this);
  }

  async paste(input) {
    const text = await navigator.clipboard.readText();
    input.value = text;
    this.props.handlePasteCallback(input.value);
  }
  render() {
    return (
      <div className="paste-container" onClick={this.paste}>
      </div>
    );
  }
}