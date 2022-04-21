import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SettingsButton from './components/settings/settings-button/settingsButton.js';
import ToggleLight from './components/toggleLight.js';
import Audio from './components/audio/audio.js';
import Header from './components/header/header.js';
import TypingBox from './components/typing-box/typingBox.js';
import Box from './components/typing-box/box/box.js';
import Bunny from './components/img/bunnyboi.svg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default class Main extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      input: ``,
      typingText: `"Do not go gentle into that good night; Old age should burn and rave at close of day. Rage, rage against the dying of the light." -Dylan Thomas, as quoted by Professor Brand`,
      sampleTexts: [``,`"Do not go gentle into that good night; Old age should burn and rave at close of day. Rage, rage against the dying of the light." -Dylan Thomas, as quoted by Professor Brand`,
                    `"We are what we repeatedly do. Excellence, then, is not an act, but a habit" - Aristotle`,
                    `"Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma - which is living with the results of other people's thinking." -Steve Jobs`,
                    `Based on the desire for total mobility and the serious physical pursuit of religious freedom, the auto drove mankind further than the wheel and in remote areas even today, it is forbidden as a device too suspect for human conveyance.`,
                    `The quick brown fox jumps over the lazy dog`,
                    `Studying is the main source of knowledge. Books are indeed never failing friends of man. For a mature mind, reading is the greatest source of pleasure and solace to distressed minds. The study of good books ennobles us and broadens our outlook. Therefore, the habit of reading should be cultivated.`,
                    `Bitcoin is an electronic currency created back in January 2009. It is known to be decentralized electronic cash that does not rely on banks. It is the Number one cryptocurrency in the market.`,
                    `Talent is never enough. With few exceptions the best players are the hard workers. It is rightly said that champions are not born, they are made. If talent alone could guarantee success over a long period of time, all talented sports persons would not waste their sweat training hard.`,
                    `In 2067, crop blights and dust storms threaten humanity's survival. Cooper, a widowed engineer and former NASA pilot turned farmer, lives with his father-in-law, Donald, his 15-year-old son, Tom Cooper, and 10-year-old daughter, Murphy "Murph" Cooper. After a dust storm, strange dust patterns inexplicably appear in Murphy's bedroom; she attributes the anomaly to a ghost. Cooper eventually deduces the patterns were caused by gravity variations and they represent geographic coordinates in binary code. Cooper follows the coordinates to a secret NASA facility headed by Professor John Brand.`,
                    `48 years earlier, unknown beings positioned a wormhole near Saturn, opening a path to a distant galaxy with 12 potentially habitable worlds located near a black hole named Gargantua. Twelve volunteers traveled through the wormhole to individually survey the planets and three — Dr. Mann, Laura Miller, and Wolf Edmunds — reported positive results. Based on their data, Professor Brand conceived two plans to ensure humanity's survival. Plan A involves developing a gravitational propulsion theory to propel settlements into space, while Plan B involves launching the Endurance spacecraft carrying 5,000 frozen human embryos to settle a habitable planet.`,
                    `Cooper is recruited to pilot the Endurance. Before leaving, Cooper gives a distraught Murphy his wristwatch to compare their relative time for when he returns. After traversing the wormhole, Dr. Romilly studies the black hole while Cooper, Dr. Doyle, and Dr. Amelia Brand descend in a landing craft to investigate Miller's planet, an ocean world covered in knee-high water. After finding the wreckage from Miller's ship, Brand, insisting on checking the wreckage, disobeys Cooper’s order to re-board immediately, leading to Doyle's death by a gigantic wave. Due to Gargantua's proximity, time is severely dilated: 23 years have elapsed for Romilly on Endurance by the time Cooper and Brand return.`,
                    `Cooper manipulates the second hand of the wristwatch he gave Murphy, using Morse code to transmit the quantum data that TARS collected from inside the event horizon. Back on Earth, Murphy finally realizes the "ghost" was Cooper from the future and deciphers the Morse code from the aberrant ticking of the second hand of the wristwatch. Ejected from the tesseract, Cooper is picked up and awakens on a space habitat orbiting Saturn, where he reunites with an elderly Murphy. Using the quantum data sent by Cooper, the younger Murphy had solved the gravitational propulsion theory for Plan A, enabling humanity's mass exodus and survival`,
                    `In 1945 New York City, at his daughter Connie's wedding to Carlo, Vito Corleone, the don of the Corleone crime family listens to requests. His youngest son, Michael, who was a Marine during World War II, introduces his girlfriend, Kay Adams, to his family at the reception. Johnny Fontane, a popular singer and Vito's godson, seeks Vito's help in securing a movie role; Vito dispatches his consigliere, Tom Hagen, to Los Angeles to persuade studio head Jack Woltz to give Johnny the part. Woltz refuses until he wakes up in bed with the severed head of his prized stallion.`,
                    `Despite a clampdown by the authorities, war breaks out between the Five Families and Vito fears for his family. Michael takes refuge in Sicily and his elder brother Fredo is sheltered by Moe Greene in Las Vegas. Sonny attacks Carlo on the street for abusing Connie and threatens to kill him if it happens again. When it does, Sonny speeds to their home but is ambushed at a highway toll booth and violently murdered by rival gangsters wielding submachine guns. While in Sicily, Michael meets and marries Apollonia, but a car bomb intended for him takes her life.`,
                    `In 1975, the heavyweight boxing world champion, Apollo Creed, announces plans to hold a title bout in Philadelphia during the upcoming United States Bicentennial. However, he is informed five weeks from the fight date that his scheduled opponent Mac Lee Green is unable to compete due to an injured hand. With all other potential replacements booked up or otherwise unavailable, Creed decides to spice things up by giving a local contender a chance to challenge him.`,
                    `Creed selects Rocky Balboa, an Italian journeyman southpaw boxer who fights primarily in small gyms and works as a collector for a loan shark. Rocky meets with promoter George Jergens assuming that Creed is seeking local sparring partners. Reluctant at first, Rocky eventually agrees to the fight which will pay him $150,000. Rocky undergoes several weeks of unorthodox training, such as using sides of beef as punching bags.`
                  ],
      runTimer: false,
      seconds: 0,
      wpm: 0,
      accuracy: 0,
      handledErrors: [],
      mute: false,
      box: true,
      wordArray: [],
      cursorFilled: false,
      errorsFilled: false
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
          seconds: this.state.seconds + 0.05,
          wpm: ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60) === Infinity ? 999:
               ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60) < 0 ? 0 : ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60),
          accuracy: ((this.state.input.length - this.state.errors)/this.state.input.length)*100 < 0 ? 0 : ((this.state.input.length - this.state.errors)/this.state.input.length)*100
        });

        if(this.state.runTimer === false){
          clearInterval(timer);
        }

      }, 50); 
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

  boxInputCallback(data, type){
    if(this.state.input.length < this.state.typingText.length){
      if(type === "set"){
        this.setState({input: this.state.input.slice(0, this.state.input.lastIndexOf(" ") + 1) + data}, () => {
          // console.log(this.state.input)
          if(this.state.input.length === this.state.typingText.length){
            if(this.state.input[this.state.input.length - 1] !== this.state.typingText[this.state.typingText.length - 1]){
              this.setState({
                errors: this.state.errors + 1
              }, () => {
                this.setState({
                  seconds: this.state.seconds + 0.05,
                  wpm: ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60) === Infinity ? 999:
                       ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60) < 0 ? 0 : ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60),
                  accuracy: ((this.state.input.length - this.state.errors)/this.state.input.length)*100 < 0 ? 0 : ((this.state.input.length - this.state.errors)/this.state.input.length)*100
                }, () => {
                  this.toggleRunTimerCallback(false)
                }); 
              })
            }
            else{
              this.setState({
                seconds: this.state.seconds + 0.05,
                wpm: ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60) === Infinity ? 999:
                    ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60) < 0 ? 0 : ((this.state.input.length - this.state.errors)/5)/(this.state.seconds/60),
                accuracy: ((this.state.input.length - this.state.errors)/this.state.input.length)*100 < 0 ? 0 : ((this.state.input.length - this.state.errors)/this.state.input.length)*100
              }, () => {
                this.toggleRunTimerCallback(false)
              });
            }
            
            
            // if(this.state.input[this.state.input.length - 1] !== this.state.typingText[this.state.typingText.length - 1]){
            //   document.getElementsByClassName("letter").item(document.getElementsByClassName("letter").length - 1).className = "letter-error";
            // }
            // else{
            //   document.getElementsByClassName("letter").item(document.getElementsByClassName("letter").length - 1).className = "letter-finished"
            // }
            document.getElementsByClassName("input-box").item(0).disabled = true;
          }
        });
      }
      else if(type === "append"){
        this.setState({input: this.state.input + data}, () => {
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
    }
    // while(document.getElementsByClassName("letter-active").length > 0) {
    //   document.getElementsByClassName("letter-active").item(0).className = "letter";
    // }
    // while(document.getElementsByClassName("letter-error").length > 0){
    //   document.getElementsByClassName("letter-error").item(0).className = "letter";
    // }
  }

  cursorFilledCallback(data){
    this.setState({cursorFilled: data}, () => {
      if(document.getElementsByClassName("letter-active").length !== 0){
        if(data){
          document.getElementsByClassName("letter-active").item(0).style.backgroundColor = "transparent";
          document.getElementsByClassName("letter-active").item(0).style.color = "var(--cursor-color)";
        }
        else{
          document.getElementsByClassName("letter-active").item(0).style.backgroundColor = "var(--cursor-color)";
          document.getElementsByClassName("letter-active").item(0).style.color = "transparent";
        }
      }
    });
  }

  errorsFilledCallback(data){
    this.setState({errorsFilled: data});
  }

  render(){
    return(
      <>
        <div className="title">
          <img src={Bunny} height={"80%"} style={{paddingTop: "13px", marginRight: "-10px", marginLeft: "15px"}}/>
          <p style={{display: "inline-block"}}>Typing Bunny</p>
          <div className="title-buttons-container">
            <a className="title-button" style={{marginLeft: "0px"}} href={"https://github.com/FarzanAli/custom-typing-test"}>
              <FaGithub  style={{width: "50%", height: "50%"}}/>
            </a>
            {/* <a className="title-button" href={"https://www.linkedin.com/in/farzan-ali/"}>
              <FaLinkedin style={{width: "50%", height: "50%"}}/>
            </a> */}
          </div>
        </div>
        
        <div style={{display: "flex", justifyContent: "center"}}>
          <SettingsButton
          mute={this.state.mute}
          autoStopCallback={this.autoStopCallback.bind(this)}
          autoStop={this.state.autoStop}
          boxCallback={this.boxCallback.bind(this)}
          box={this.state.box}
          cursorFilledCallback={this.cursorFilledCallback.bind(this)}
          cursorFilled={this.state.cursorFilled}
          errorsFilledCallback={this.errorsFilledCallback.bind(this)}
          errorsFilled={this.state.errorsFilled}
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
            typingText={this.state.typingText}
            boxInputCallback={this.boxInputCallback.bind(this)}
            />}
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);