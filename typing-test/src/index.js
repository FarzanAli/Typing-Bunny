import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TypingBox from './components/typingBox.js';

export default class Main extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      input: "",
      typingText: "A teacher's professional duties may extend beyond formal teaching. Outside of the classroom teachers may accompany students on field trips, supervise study halls, help with the organization of school functions, and serve as supervisors for extracurricular activities. In some education systems, teachers may have responsibility for student discipline."
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
      }, () => console.log(this.state.input));

      document.getElementsByClassName("letter").item(this.state.input.length + 1).style.backgroundColor = "transparent";
      document.getElementsByClassName("letter").item(this.state.input.length).style.backgroundColor = "#6200EE";
    }
    else if(data.length === 1){

      this.setState({
        input: this.state.input + data
      }, () => console.log(this.state.input));

      let letter = document.getElementsByClassName("letter");

      if(this.state.input.length < this.state.typingText.length){
        if(this.state.input[this.state.input.length - 1] === this.state.typingText[this.state.input.length - 1]){
          letter.item(this.state.input.length).style.backgroundColor = "#6200EE";
          letter.item(this.state.input.length - 1).style.backgroundColor = "transparent";
        }
        else{
          letter.item(this.state.input.length).style.backgroundColor = "#6200EE";
          letter.item(this.state.input.length - 1).style.backgroundColor = "red";
          letter.item(this.state.input.length - 1).style.borderRadius = "0px";
        }
      }
      else{
        letter.item(this.state.input.length - 1).style.backgroundColor = "transparent";
      }

      if(this.state.input.length === this.state.typingText.length && this.state.input[this.state.input.length - 1] !== this.state.typingText[this.state.input.length - 1]){
        letter.item(this.state.input.length - 1).style.backgroundColor = "red";
      }

      
    }
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