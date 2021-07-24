import React from 'react';
import './text.css';

let Text = (props) => {

  let wordArray = [];
  if (props.typingText.length === 1) {
    wordArray.push(props.typingText[0]);
  }
  else {
    for (let i = 0; i < props.typingText.length; i++) {
      if (i === 0 || props.typingText[i] === " ") {
        if (props.typingText[i] === " ") { i += 1; }
        for (let j = i; j < props.typingText.length; j++) {
          if (props.typingText[j] === " " || j === props.typingText.length - 1) {
            wordArray.push(props.typingText.slice(i, j + 1));
            i = j + 1;
          }
        }
      }
    }
  }

  let mappedWordArray = wordArray.map((element, idx) => (
    <div className="word" key={idx} id={idx}>
      {
        [...element].map((letter, idy) => (
          idx === 0 && idy === 0 && props.input.length === 0 ? (<div className="letter-active" key={idy} id={idy}>{letter}</div>) :

            letter === " " ? (<div className="letter" key={idy} id={idy}>&nbsp;</div>) :
              (<div className="letter" key={idy} id={idy}>{letter}</div>)
        ))
      }
    </div>
  ));

  if(props.input.length === 0 && document.getElementsByClassName("letter-active").length > 1 && props.runTimer){
    document.getElementsByClassName("letter-active").item(1).className = "letter";
  }
  else if (props.input.length > 0 && props.input.length < props.typingText.length && props.runTimer) {
    //cursor
    /*
      Does not depend on "letter" classes to move cursor, instead depends on "word" class and indexes
      through to put the cursor on the index that immediately follows whatever value input.length is.
    */
    let cursorIndex = 0;
    for(let i = 0; i < wordArray.length; i++){
      for(let j = 0; j < wordArray[i].length; j++){
        if(cursorIndex === props.input.length){
          //Fixes bug in which cursor leaves 1 letter activated when backspacing.
          if(document.getElementsByClassName("letter-active")[1] !== undefined){
            if(j < document.getElementsByClassName("letter-active")[1].id){
              document.getElementsByClassName("letter-active")[1].className = "letter";
            }
            else if(j > document.getElementsByClassName("letter-active")[1].id){
              document.getElementsByClassName("letter-active")[1].className = "letter";
            }
          }
          if(document.getElementsByClassName("letter-active").length > 1){
            for(let k = 0; k < document.getElementsByClassName("letter-active").length; k++){
              if(j !== document.getElementsByClassName("letter-active").item(k).id){
                document.getElementsByClassName("letter-active").item(k).className = "letter";
              }
            } 
          }

          document.getElementsByClassName("word").item(i).children[j].className = "letter-active";
          
        }
        if(document.getElementsByClassName("word").item(i).children[j].className === "letter-error" && cursorIndex > props.input.length){
          document.getElementsByClassName("word").item(i).children[j].className = "letter";
          if(document.getElementsByClassName("letter-active").length > 1){
            document.getElementsByClassName("letter-active").item(1).className = "letter";
          }
        }
        cursorIndex++;
      }
    }
    
    //errors
    //Second implementation
    let current = 0;
    for(let i = 0; i < wordArray.length; i++){
      for(let j = 0; j < wordArray[i].length; j++){
        if(current < props.input.length){
          if(document.getElementsByClassName("word").item(i).children[j].innerHTML === "&nbsp;" && props.input[current] !== " "){
            document.getElementsByClassName("word").item(i).children[j].className = "letter-error";
          }
          else if(document.getElementsByClassName("word").item(i).children[j].innerHTML !== props.input[current]
          && document.getElementsByClassName("word").item(i).children[j].innerHTML !== "&nbsp;"){
            document.getElementsByClassName("word").item(i).children[j].className = "letter-error";
          }
        }
        current++;
      }
    }
    
  }
  else if (props.input.length === props.typingText.length && props.runTimer === true) {
    if(props.input[props.input.length - 1] !== props.typingText[props.input.length - 1] && props.handledErrors.includes(props.input.length - 1) === false){
      document.getElementsByClassName("letter-active").item(0).className = "letter-error"
      props.handledErrorsCallback(props.input.length - 1);
    }
    else if(props.input[props.input.length - 1] === props.typingText[props.input.length - 1]){
      document.getElementsByClassName("letter-active").item(0).className = "letter-finished";
    }
  }
  return (
    <div className="typing-text">
      {mappedWordArray}
    </div>
  );

}

export default Text;