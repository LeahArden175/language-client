import React, { Component } from "react";
import LanguageService from "../../services/language-services";
import config from "../../config";
import TokenService from "../../services/token-service";
import "./Learn.css";

export default class Learn extends Component {
  state = {
    nextWord: "",
    answerWord : '',
    totalScore: 0,
    correctCount: 0,
    incorrectCount: 0,
    answer: "",
    isCorrect: null,
    guess: "",
  };

  componentDidMount = () => {
    this.getLanguageHead();
  };

  getLanguageHead = () => {
    LanguageService.getLanguageHead().then((res) => {
      console.log('from get lang', res)
      this.setState({
        nextWord: res.nextWord,
        totalScore: res.totalScore,
        correctCount: res.wordCorrectCount,
        incorrectCount: res.wordIncorrectCount,
      });
    });
  };

  handleGuessSubmit = (event) => {
    event.preventDefault();
    fetch(`${config.REACT_APP_API_BASE}/language/guess`, {
      method: "POST",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        guess: this.state.guess,
      }),
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((res) => {
        this.setState({
          answer: res.answer,
          answerWord : this.state.nextWord,
          isCorrect: res.isCorrect,
          totalScore: res.totalScore,
          nextWord : res.nextWord
        })
      })
      .then(() => console.log(this.state.answerWord))
      .then(() => {
        if(this.state.isCorrect){
          this.setState({
            correctCount : this.state.correctCount + 1
          })
        } else {
          if(!this.state.isCorrect) {
            this.setState({
              incorrectCount : this.state.incorrectCount + 1
            })
          }
        }
      })
  };

  handleGuessChange = (event) => {
    const submittedGuess = event.target.value;
    this.setState({
      guess: submittedGuess.toLowerCase(),
    });
  };

  renderItalianWord = () => {
    if (!this.state.answer) {
      return (
        <div className="italian-word-div" aria-live='polite'>
          <h2 className="learn-h2">Translate the word:</h2>
          <span className="learn-span">{this.state.nextWord}</span>
        </div>
      );
    } else {
      return;
    }
  };

  renderScore = () => {
    if (this.state.isCorrect === false) {
      return (
        <div className="correct-incorrect" aria-live='polite'>
          <h2 className="incorrect">Good try, but not quite right :(</h2>
          <p className="feedback">
            The correct answer was {this.state.answer} and you chose{" "}
            {this.state.guess}
          </p>
        </div>
      );
    } else {
      if (this.state.isCorrect === true) {
        return (
          <div className="correct-incorrect" aria-live='polite'>
            <h2 className="correct">You were correct! :D</h2>
          </div>
        );
      }
    }
  };

  renderForm = () => {
    if (!this.state.answer) {
      return (
        <form onSubmit={this.handleGuessSubmit} className="learn-form">
          <label className="learn-label" htmlFor="learn-guess-input">
            What's the translation for this word?
          </label>
          <input
            className="learn-input"
            id="learn-guess-input"
            type="text"
            value={this.state.guess}
            onChange={this.handleGuessChange}
            required
          ></input>
          <button className="learn-submit" type="submit">
            Submit your answer
          </button>
        </form>
      );
    } else {
      return (
        <form onSubmit={this.getNextWord}>
            <button className="learn-submit">
              Try another word!
            </button>
        </form>
      );
    }
  };

  displayScore = () => {
    //console.log(this.state)
    return (
      <div className="DisplayScore">
        <p className="total-score" aria-live='polite'>
          Your total score is: {this.state.totalScore}
        </p>
      </div>
    );
  };

  displayFeedback = () => {
    if (this.state.isCorrect === true) {
      return (
        <div className="DisplayFeedback">
          <p className='feedback' aria-live='polite'>
            The correct translation for {this.state.answerWord} was{" "}
            {this.state.answer} and you chose {this.state.guess}!
          </p>
        </div>
      );
    } else if (this.state.isCorrect === false) {
      return (
        <div className="DisplayFeedback" aria-live='polite'>
          <p className='feedback'>
            The correct translation for {this.state.answerWord} was{" "}
            {this.state.answer} and you chose {this.state.guess}!
          </p>
        </div>
      );
    } else {
      if (this.state.isCorrect === null) {
        return;
      }
    }
  };

  getNextWord = (event) => {
    event.preventDefault();
    LanguageService.getLanguageHead().then((res) => {
      console.log('from get next', this.state)
      this.setState({
        answer: "",
        isCorrect: null,
        guess: "",
        correctCount : res.wordCorrectCount,
        incorrectCount : res.wordIncorrectCount
      });
    });
  };

  render() {
    return (
      <section className="learn-section">
        <main className="learn-main" aria-live="polite">
          {this.renderItalianWord()}
          {this.displayFeedback()}
          {this.renderScore()}
          {this.renderForm()}
          {this.displayScore()}
          <div className="score-div">
            <p className="learn-p">
              You have answered this word correctly {this.state.correctCount}{" "}
              times.
            </p>
            <hr className='line' />
            <p className="learn-p">
              You have answered this word incorrectly{" "}
              {this.state.incorrectCount} times.
            </p>
          </div>
        </main>
      </section>
    );
  }
}
