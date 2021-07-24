import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Settings from './components/settings/settings-button/settingsButton.js';
import ToggleLight from './components/toggleLight.js';
import Header from './components/header/header.js';
import TypingBox from './components/typing-box/typingBox.js';

export default class Main extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      input: ``,
      typingText: ` `,
      sampleTexts: [`"Do not go gentle into that good night; Old age should burn and rave at close of day. Rage, rage against the dying of the light." -Dylan Thomas, as quoted by Professor Brand`,
                    `"We are what we repeatedly do. Excellence, then, is not an act, but a habit" - Aristotle`,
                    `"Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma - which is living with the results of other people's thinking." -Steve Jobs`],
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

  resetTest(){
    this.setState({
      input: ``,
      runTimer: false,
      seconds: 0,
      wpm: 0,
      accuracy: 0,
      errors: 0,
      handledErrors: [],
    });
    while(document.getElementsByClassName("letter-active").length > 0) {
      document.getElementsByClassName("letter-active").item(0).className = "letter";
    }
    while(document.getElementsByClassName("letter-error").length > 0){
      document.getElementsByClassName("letter-error").item(0).className = "letter";
    }
    while(document.getElementsByClassName("letter-finished").length > 0){
      document.getElementsByClassName("letter-finished").item(0).className = "letter";
    }
    document.getElementsByClassName("word").item(0).children[0].className = "letter-active"
  }

  startTimer(){

    let timer = setInterval(() => {
      this.setState({
          seconds: this.state.seconds + 0.01,
          wpm: ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60) === Infinity ? 999:
               ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60) < 0 ? 0 : ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60),
          accuracy: ((this.state.input.length - this.state.errors)/this.state.input.length)*100
        })

        if(this.state.runTimer === false){
          clearInterval(timer);
        }

      }, 10);
  }

  toggleRunTimerCallback(bool){
    this.setState({
      runTimer: bool
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
    else if(typeof(data) === "object"){
      if(data[data.length - 2] === "Control" && data[data.length - 1] === "Backspace"){
        let input = this.state.input;
        for(let i = input.length - 1; i >= 0; i--){
          if(input[i] === " " || i === 0){
            input = input.slice(0, i === 0 ? i: i + 1);
            break;
          }
        }
        this.setState({input: input});
      }
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
    let text = typingText;

    //replaces newline characters with space in pasted text.
    text = text.replace(/(\r\n|\n|\r)/gm, " ");

    this.setState({
      typingText: text
    });
    this.resetTest();
  }

  handleNextTextCallback(){
    if(this.state.typingText.length === 0){
      this.setState({
        typingText: this.state.sampleTexts[0]
      });
    }
    else{
      this.setState({
        typingText: this.state.sampleTexts[this.state.sampleTextsIndex],
        sampleTextsIndex: (this.state.sampleTextsIndex === this.state.sampleTexts.length - 1) ? 0 : this.state.sampleTextsIndex + 1
      });
    }
    this.resetTest();
  }
  render(){
    return(
      <>
        <Settings />
        <ToggleLight />
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
          runTimer={this.state.runTimer}

          toggleRunTimerCallback={this.toggleRunTimerCallback.bind(this)}
          inputCallback={this.inputCallback.bind(this)}
          errorsCallback={this.errorsCallback.bind(this)}
          handledErrorsCallback={this.handledErrorsCallback.bind(this)}
          />
        </div>
      </>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);