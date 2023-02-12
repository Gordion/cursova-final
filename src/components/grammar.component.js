import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './reading.css';

const RawHTML = (props) => <span dangerouslySetInnerHTML={{__html: props.html}}></span>;

class QuestionImage extends React.Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.imgRef.current && prevProps.img.src !== this.props.img.src) {
      this.imgRef.current.classList.add('fade-in');

      let timer = setTimeout(() => {
        this.imgRef.current.classList.remove('fade-in');
        clearTimeout(timer);
      }, 1000)
    }
  }

  render() {
    return (
      <img ref={this.imgRef} className="img-fluid" src={this.props.img.src} alt={this.props.img.alt} />
    );
  }
}

const QuizProgress = (props) => {
  return (
    <div className="progress">
      <p className="counter">
        <span>Question {props.currentQuestion+1} of {props.questionLength}</span>
      </p>
      <div className="progress-bar" style={{'width': ((props.currentQuestion+1) / props.questionLength) * 100 + '%'}}></div>
    </div>
  );
}

const Results = (props) => {
  return (
    <div className="results fade-in">
      <h1>Your score: {((props.correct/props.questionLength) * 100).toFixed()}%</h1>
      <button type="button" onClick={props.startOver}>Try again <i className="fas fa-redo"></i></button>
    </div>
  );
}

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.updateAnswer = this.updateAnswer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getResults = this.getResults.bind(this);
    this.startOver = this.startOver.bind(this);

    this.state = {
      currentQuestion: 0,
      correct: 0,
      inProgress: true,
      questions: [{
        question: "You .............. another job pretty soon. I have a feeling that you're going to get fired before long.",
        options: [{
          option: "would have started to look for",
          correct: false
        }, {
          option: "had better to start looking for",
          correct: false
        }, {
          option: "would start looking for",
          correct: false
        }, {
          option: "'d better start looking for",
          correct: true
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "",
        moreUrl: ''
      }, {
        question: "............... , he went to collect his payment",
        options: [{
          option: "Having finished his work successfully",
          correct: true
        }, {
          option: "Although he had completed his work successfully",
          correct: false
        }, {
          option: "Despite the fact that the work was successfully completed",
          correct: false
        }, {
          option: "As long as the work is completed with success",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "",
        moreUrl: ''
      }, {
        question: "I was under the impression that you, too, .............. along with us. I am sorry that you aren't.",
        options: [{
          option: "were supposed to come",
          correct: true
        }, {
          option: "came to suppose",
          correct: false
        }, {
          option: "supposed to have come",
          correct: false
        }, {
          option: "supposed to come",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "",
        moreUrl: ''
      }, {
        question: "It seems to me that they never gave a thought to probable future problems when the plans ............... five years ago.",
        options: [{
          option: "they laid down",
          correct: false
        }, {
          option: "were not laid down",
          correct: false
        }, {
          option: "to be laid down",
          correct: true
        }, {
          option: "were being laid down",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "",
        moreUrl: ''
      }, {
        question: "As far as I'm concerned, all he's good at .............. making up the most improbable excuses anyone has ever heard.",
        options: [{
          option: "his",
          correct: false
        }, {
          option: "presently",
          correct: false
        }, {
          option: "is",
          correct: true
        }, {
          option: "he is",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: ""
      }]
    }
  }

  updateAnswer(e) {
    //record whether the question was answered correctly
    let answerValue = e.target.value;

    this.setState((prevState, props) => {
      let stateToUpdate = prevState.questions;
      //convert boolean string to boolean with JSON.parse()
      stateToUpdate[prevState.currentQuestion].answerCorrect = JSON.parse(answerValue);

      return {questions: stateToUpdate};
    });
  }

  checkAnswer(e) {
    //display to the user whether their answer is correct
    this.setState((prevState, props) => {
      let stateToUpdate = prevState.questions;
      stateToUpdate[prevState.currentQuestion].checked = true;

      return {questions: stateToUpdate};
    });
  }

  nextQuestion(e) {
    //advance to the next question
    this.setState((prevState, props) => {
      let stateToUpdate = prevState.currentQuestion;

      return {currentQuestion: stateToUpdate+1};
    }, () => {
      this.radioRef.current.reset();
    });
  }

  getResults() {
    //loop through questions and calculate the number right
    let correct = this.state.correct;

    this.state.questions.forEach((item, index) => {
      if (item.answerCorrect) {
        ++correct;
      }

      if (index === (this.state.questions.length-1)) {
        this.setState({
          correct: correct,
          inProgress: false
        });
      }
    });

    // if (localStorage.getItem('user')) {
    //   console.log("test", this.state);
    //   const result = ((correct / this.state.questions.length) * 100).toFixed();
    //   console.log('result', result);
    //   let user= JSON.parse(localStorage.getItem('user'));
    //   console.log("text", user);
    //   axios.post('http://localhost:4000/user/result', {_id:user._id, result:result})
    //     .then(res => {
    //       console.log('text', res);
    //     });
    // }
    // else {
    //
    // }
    if (localStorage.getItem('user')) {
    console.log("test", this.state);
    const result = ((correct / this.state.questions.length) * 100).toFixed();
    console.log('result', result);
    let user= JSON.parse(localStorage.getItem('user'));
    console.log("text", user);
    axios.post('http://localhost:4000/user/grammar', {_id:user._id, grammar:result})
      .then(res => {
        console.log('text', res);
      });
    }
    else {

    }

  }

  startOver() {
    //reset form and state back to its original value
    this.setState((prevState, props) => {
      let questionsToUpdate = prevState.questions;

      questionsToUpdate.forEach(item => {
        //clear answers from previous state
        delete item.answerCorrect;
        delete item.checked;
      });

      return {
        inProgress: true,
        correct: 0,
        currentQuestion: 0,
        questions: questionsToUpdate
      }
    });
  }

  componentDidMount() {
    //since we're re-using the same form across questions,
    //create a ref to it so we can clear its state after a question is answered
    this.radioRef = React.createRef();
  }

  render() {

    if (!this.state.inProgress) {
      return (
        <section className="quiz">
          <Results correct={this.state.correct} questionLength={this.state.questions.length} startOver={this.startOver} />
        </section>
      );
    }

    return (
      <section className="quiz fade-in" aria-live="polite">
        <QuizProgress currentQuestion={this.state.currentQuestion} questionLength={this.state.questions.length} />
        <div className="question-container">
          {this.state.questions[this.state.currentQuestion].img.src &&
            <QuestionImage img={this.state.questions[this.state.currentQuestion].img} />
          }
          <p className="question"><RawHTML html={this.state.questions[this.state.currentQuestion].question} /></p>

          <form ref={this.radioRef}>
            {this.state.questions[this.state.currentQuestion].options.map((item, index) => {
              return <div key={index}
                      className={"option" + (this.state.questions[this.state.currentQuestion].checked && !item.correct ? ' dim' : '') + (this.state.questions[this.state.currentQuestion].checked && item.correct ? ' correct' : '')}>
                      <input id={"radio-"+index} onClick={this.updateAnswer} type="radio" name="option" value={item.correct}
                          disabled={this.state.questions[this.state.currentQuestion].checked} />
                        <label htmlFor={"radio-"+index}><RawHTML html={item.option}/></label>
                    </div>
              })}
          </form>

          <div className="bottom">
            {this.state.questions[this.state.currentQuestion].feedback && this.state.questions[this.state.currentQuestion].checked
              && <div className="fade-in">
                <p>
                  <RawHTML html={this.state.questions[this.state.currentQuestion].feedback} />
                  {this.state.questions[this.state.currentQuestion].moreUrl &&
                    <React.Fragment>
                       &nbsp;<a target="_blank" href={this.state.questions[this.state.currentQuestion].moreUrl}>Learn more</a>.
                    </React.Fragment>
                  }
                </p>
              </div>
            }

            {!this.state.questions[this.state.currentQuestion].checked &&
               <button type="button" onClick={this.checkAnswer}
               disabled={!('answerCorrect' in this.state.questions[this.state.currentQuestion])}>Check answer</button>
             }

            {(this.state.currentQuestion+1) < this.state.questions.length && this.state.questions[this.state.currentQuestion].checked &&
              <button className="fade-in next" type="button" onClick={this.nextQuestion}>Next <i className="fa fa-arrow-right"></i></button>
            }
          </div>

          {(this.state.currentQuestion+1) === this.state.questions.length && this.state.questions[this.state.currentQuestion].checked &&
            <button type="button" className="get-results pulse" onClick={this.getResults}>Get Results</button>
          }
        </div>
      </section>
    )
  }
}
