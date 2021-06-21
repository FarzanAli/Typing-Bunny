import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/header/header.js';
import TypingBox from './components/typing-box/typingBox.js';

export default class Main extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      input: "",
      typingText: " ",
      sampleTexts: ["The quick brown fox jumped over the lazy dog.",
                    "“Do not go gentle into that good night; Old age should burn and rave at close of day. Rage, rage against the dying of the light.” —Dylan Thomas, as quoted by Professor Brand"],
      sampleTextsIndex: 0,
      runTimer: false,
      seconds: 0,
      wpm: 0,
      accuracy: 0,
      handledErrors: []
    };
  }

  componentDidMount(){
    this.handleNextTextCallback();
  }

  startTimer(){

    let timer = setInterval(() => {
      this.setState({
          seconds: this.state.seconds + 0.01,
          wpm: ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60) === Infinity ? 999:
               ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60),
          accuracy: ((this.state.input.length - this.state.errors)/this.state.input.length)*100
        })
        
        if(this.state.runTimer === false){
          clearInterval(timer);
        }

      }, 10);
  }

  toggleRunTimerCallback(){
    this.setState({
      runTimer: !this.state.runTimer
    }, () => {
      if(this.state.runTimer === true){
        this.startTimer();
      }
    });
  }

  inputCallback(data){
    if(data === "Backspace"){
      this.setState({
        input: this.state.input.slice(0, this.state.input.length - 1)
      });
    }
    else{
      this.setState({
        input: this.state.input + data
      });
    }
  }

  errorsCallback(errors){
    this.setState({errors: errors});
  }

  handledErrorsCallback(index){
    let handledErrors = this.state.handledErrors;
    handledErrors.push(index);
    this.setState({handledErrors: handledErrors})
  }

  handlePasteCallback(typingText){
    this.setState({
      typingText: typingText
    }, () => console.log(this.state.typingText))
  }

  handleNextTextCallback(){
    if(this.state.typingText.length === 0){
      this.setState({
        typingText: this.state.sampleTexts[0]
      });
    }
    else{
      console.log(this.state.sampleTextsIndex)
      this.setState({
        typingText: this.state.sampleTexts[this.state.sampleTextsIndex],
        sampleTextsIndex: (this.state.sampleTextsIndex === this.state.sampleTexts.length - 1) ? 0 : this.state.sampleTextsIndex + 1
      });
    }
  }

  render(){
    return(
      <div className="main-content">
        <Header
        wpm={this.state.wpm}
        accuracy={this.state.accuracy}
        handlePasteCallback={this.handlePasteCallback.bind(this)}
        handleNextTextCallback={this.handleNextTextCallback.bind(this)}
        />
        
        <TypingBox
        input={this.state.input}
        typingText={this.state.typingText}
        seconds={this.state.seconds}
        handledErrors={this.state.handledErrors}

        toggleRunTimerCallback={this.toggleRunTimerCallback.bind(this)}
        inputCallback={this.inputCallback.bind(this)}
        errorsCallback={this.errorsCallback.bind(this)}
        handledErrorsCallback={this.handledErrorsCallback.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);