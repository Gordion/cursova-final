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
        question: "The Statue of Liberty was constructed to welcome immigrants to the USA.",
        options: [{
          option: "True",
          correct: false
        }, {
          option: "False",
          correct: true
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "",
        moreUrl: ''
      }, {
        question: "Édouard de Laboulaye paid for the statue with his own money.",
        options: [{
          option: "True",
          correct: false
        }, {
          option: "False",
          correct: true
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "",
        moreUrl: ''
      }, {
        question: "Gustave Eiffel designed the Statue of Liberty before designing the Eiffel Tower.",
        options: [{
          option: "True",
          correct: false
        }, {
          option: "False",
          correct: false
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "",
        moreUrl: ''
      }, {
        question: "Eiffel failed to consider strong winds when designing the Eiffel Tower.",
        options: [{
          option: "True",
          correct: false
        }, {
          option: "False",
          correct: true
        }],
        img: {
          src: '',
          alt: ''
        },
        feedback: "",
        moreUrl: ''
      }, {
        question: "Three known copies of Eiffel’s plans of the Statue of Liberty exist today.",
        options: [{
          option: "True",
          correct: true
        }, {
          option: "False",
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

    if (localStorage.getItem('user')) {
    console.log("test", this.state);
    const result = ((correct / this.state.questions.length) * 100).toFixed();
    console.log('result', result);
    let user= JSON.parse(localStorage.getItem('user'));
    console.log("text", user);
    axios.post('http://localhost:4000/user/reading', {_id:user._id, reading:result})
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
      <div>
      <h2 className="textTitle">The arm of Liberty</h2>
      <p className="text-reading">


      The Statue of Liberty is probably the most famous icon of the USA. It was built to celebrate the end of slavery, and later became a symbol for freedom among immigrants. The statue depicts Libertas, the Roman goddess of liberty. And the torch she carries high above her outstretched arm represents a light that guides people along the path to freedom. Interestingly, however, Liberty looks different from the way the designer first intended.

      The idea for the statue came from a poet, Édouard de Laboulaye. When the American Civil war ended, he wanted to commemorate the end of the slave trade with a gift. He and other people who opposed slavery raised money and hired a sculptor, Frédéric-Auguste Bartholdi, to design the statue. Bartholdi later employed the French engineer, Gustave Eiffel, to devise its structure. Eiffel, who would subsequently build the famous tower in Paris, was already a well-known designer of railway bridges. So he knew how to build robust structures that are flexible and safe in strong winds. This feature was necessary because the winds in New York harbor are extremely strong. Today, the top of her torch swings over 15cm when the wind is blowing at 50 miles per hour.

      Eiffel designed the statue to be built around a massive metal skeleton, similar to the Eiffel tower. Huge pieces of copper were fixed onto this to form its shape. Until recently, two copies of the plans were believed to exist. But recently, a third copy was discovered, which revealed some interesting information. In 2018, a map dealer bought some historic papers at an auction in Paris, which included original plans, calculations, and drawings of the statue. At first, the documents were too fragile to read. But after special treatment, the papers clearly showed that Eiffel’s plans had been changed by Bartholdi with red ink. Liberty’s arm, which was thick and vertical in Eiffel’s drawing, was adjusted to be slimmer, less upright, and generally more attractive than Eiffels’ design.

      The changes in the plans are dated July 28, 1882, after the construction of the tower had begun. We don’t know what Eiffel thought of Bartholdi’s changes. By then, Eiffel was working on other projects, and only his assistants were working with Bartholdi in New York. Maybe Bartholdi thought he could make the changes because Eiffel was not there and would not complain.

      However, the changes made the arm not only more attractive but also weaker, which has created problems over the years. At first, visitors could climb a ladder to the torch in Liberty’s arm, but in 1916, there was an explosion on a nearby island. It damaged the statue and made it unsafe, and the stairway to the torch has been closed ever since. During restoration work in the 1980s, engineers noticed that the structure inside Liberty’s head, shoulders, and arm were different from how they were shown on Eiffel’s plans. They thought that the builders had made mistakes, but some historians believed that Bartholdi had changed Eiffel’s design. The newly discovered papers confirm those theories.
      </p>
      </div>
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
