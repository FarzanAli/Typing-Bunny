import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SettingsButton from './components/settings/settings-button/settingsButton.js';
import ToggleLight from './components/toggleLight.js';
import Audio from './components/audio/audio.js';
import Header from './components/header/header.js';
import TypingBox from './components/typing-box/typingBox.js';
import Box from './components/typing-box/box/box.js';

export default class Main extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      input: ``,
      typingText: ` `,
      sampleTexts: [`"Do not go gentle into that good night; Old age should burn and rave at close of day. Rage, rage against the dying of the light." -Dylan Thomas, as quoted by Professor Brand`,
                    `"We are what we repeatedly do. Excellence, then, is not an act, but a habit" - Aristotle`,
                    `"Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma - which is living with the results of other people's thinking." -Steve Jobs`,
                    `Based on the desire for total mobility and the serious physical pursuit of religious freedom, the auto drove mankind further than the wheel and in remote areas even today, it is forbidden as a device too suspect for human conveyance.`,
                    `The quick brown fox jumps over the lazy dog`,

                  ],
      runTimer: false,
      seconds: 0,
      wpm: 0,
      accuracy: 0,
      handledErrors: [],
      mute: false,
      box: false,
      wordArray: []
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
    document.getElementsByClassName("word").item(0).children[0].className = "letter-active";
    if(document.getElementsByClassName("input-box").item(0) !== null){
      document.getElementsByClassName("input-box").item(0).disabled = false; 
    }
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
    const random = Math.floor(Math.random() * (this.state.sampleTexts.length - 1)) + 1
    this.setState({
      typingText: this.state.sampleTexts[random] === this.state.typingText ? (this.state.sampleTexts[random] === this.state.sampleTexts[this.state.sampleTexts.length - 1] ? (this.state.sampleTexts[random - 1]) : this.state.sampleTexts[random + 1]) : this.state.sampleTexts[random]
    });
    this.resetTest();
  }

  muteCallback(mute){
    this.setState({mute: mute});
  }

  autoStopCallback(data){
    this.setState({autoStop: data});
  }

  boxCallback(data){
    this.setState({box: data});
  }

  boxInputCallback(data){
    if(this.state.input.length < this.state.typingText.length){
      this.setState({input: data}, () => {
        if(this.state.input.length === this.state.typingText.length){
          this.toggleRunTimerCallback(false)
          if(this.state.input[this.state.input.length - 1] !== this.state.typingText[this.state.typingText.length - 1]){
            document.getElementsByClassName("letter").item(document.getElementsByClassName("letter").length - 1).className = "letter-error";
          }
          else{
            document.getElementsByClassName("letter").item(document.getElementsByClassName("letter").length - 1).className = "letter-finished"
          }
          document.getElementsByClassName("input-box").item(0).disabled = true;
        }
      });
    }
    while(document.getElementsByClassName("letter-active").length > 0) {
      document.getElementsByClassName("letter-active").item(0).className = "letter";
    }
    while(document.getElementsByClassName("letter-error").length > 0){
      document.getElementsByClassName("letter-error").item(0).className = "letter";
    }
  }

  render(){
    return(
      <>
        <SettingsButton
        mute={this.state.mute}
        autoStopCallback={this.autoStopCallback.bind(this)}
        autoStop={this.state.autoStop}
        boxCallback={this.boxCallback.bind(this)}
        box={this.state.box}
        />
        <div className="minibar-container">
          <Audio
          muteCallback={this.muteCallback.bind(this)}
          />
          <ToggleLight
          mute={this.state.mute}
          />
        </div>
        <div className="main-content">
          <Header
          wpm={this.state.wpm}
          accuracy={this.state.accuracy}
          handlePasteCallback={this.handlePasteCallback.bind(this)}
          handleNextTextCallback={this.handleNextTextCallback.bind(this)}
          restartCallback={this.resetTest.bind(this)}
          />
          
          <TypingBox
          input={this.state.input}
          typingText={this.state.typingText}
          seconds={this.state.seconds}
          handledErrors={this.state.handledErrors}
          runTimer={this.state.runTimer}
          errors={this.state.errors}
          autoStop={this.state.autoStop}
          box={this.state.box}
          
          toggleRunTimerCallback={this.toggleRunTimerCallback.bind(this)}
          inputCallback={this.inputCallback.bind(this)}
          errorsCallback={this.errorsCallback.bind(this)}
          handledErrorsCallback={this.handledErrorsCallback.bind(this)}
          />

          {this.state.box === true && <Box
          input={this.state.input}
          boxInputCallback={this.boxInputCallback.bind(this)}
          activeWord={this.state.activeWord}
          />}
        </div>
      </>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);