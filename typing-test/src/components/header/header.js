import React, { Component } from 'react';
import './header.css';
import Paste from './paste.js';
import Next from './next.js';
import Restart from './restart.js';
import Stats from './stats.js';

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-buttons-container">
          <Paste
            handlePasteCallback={this.props.handlePasteCallback.bind(this)}
          />
          <Next
            handleNextTextCallback={this.props.handleNextTextCallback}
          />
          <Restart
            restartCallback={this.props.restartCallback}
          />
        </div>
        <Stats
          wpm={this.props.wpm}
          accuracy={this.props.accuracy}
        />
      </div>
    );
  }
}