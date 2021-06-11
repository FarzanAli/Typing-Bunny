import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TypingBox from './components/typingBox.js';

export default class Main extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      input: "",
      typingText: "student test.",
      started: false,
      seconds: 0,
      wpm: 0
    };
  }

  componentDidMount(){
    document.addEventListener('keydown', (event) => {
      this.keyboardInput(event.key)
    });
    document.getElementsByClassName("letter").item(0).style.backgroundColor = "#6200EE";
  }

  keyboardInput(data){
    if(data === "Backspace" && this.state.input.length < this.state.typingText.length){
      this.setState({
        input: this.state.input.slice(0, this.state.input.length - 1)
      });

      document.getElementsByClassName("letter").item(this.state.input.length + 1).style.backgroundColor = "transparent";
      document.getElementsByClassName("letter").item(this.state.input.length).style.backgroundColor = "#6200EE";
    }
    else if(data.length === 1){
      if(this.state.input.length === 0){
        this.setState({
          started: true
        }, () => this.startTimer());
      }
      this.setState({
        input: this.state.input + data
      });

      let letter = document.getElementsByClassName("letter");

      if(this.state.input.length < this.state.typingText.length){
        if(this.state.input[this.state.input.length - 1] === this.state.typingText[this.state.input.length - 1]){
          letter.item(this.state.input.length).style.backgroundColor = "#6200EE";
          letter.item(this.state.input.length - 1).style.backgroundColor = "transparent";
        }
        else{
          letter.item(this.state.input.length).style.backgroundColor = "#6200EE";
          letter.item(this.state.input.length - 1).style.backgroundColor = "red";
        }
      }
      else{
        this.setState({started: false})
      }
      if(this.state.input.length === this.state.typingText.length && this.state.input[this.state.input.length - 1] !== this.state.typingText[this.state.input.length - 1]){
        letter.item(this.state.input.length - 1).style.backgroundColor = "red";
      }
    }

    let errors = 0;
    for(let i = 0; i < this.state.input.length; i++){
      if(this.state.input[i] !== this.state.typingText[i]){
        errors++;
      }
    }
    this.setState({errors: errors});
  }

  startTimer(){
    console.log(this.state.started)
    let timer = setInterval(() => {
    this.setState({
        seconds: this.state.seconds + 0.01,
        wpm: (this.state.input.length/5)/(this.state.seconds/60),
        errorPercentage: ((this.state.input.length - this.state.errors)/this.state.input.length)*100
      }, () => console.log(this.state.errorPercentage))
      
      if(this.state.started === false){
        clearInterval(timer);
      }

    }, 10);
    
  }

  render(){
    return(
      <div className="main-content">
        <TypingBox
        typingText={this.state.typingText}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);