import React, { Component } from "react";
import LanguageService from "../../services/language-services";
import "./Learn.css";

export default class Learn extends Component {
  state = {
    nextWord: "",
    totalScore: 0,
    correctCount: 0,
    incorrectCount: 0,
  };

  componentDidMount = () => {
    this.getLanguagehead();
  };

  getLanguagehead = () => {
    LanguageService.getLanguageHead().then((res) => {
      this.setState({
        nextWord: res.nextWord,
        totalScore: res.totalScore,
        correctCount: res.wordCorrectCount,
        incorrectCount: res.wordIncorrectCount,
      });
    });
  };

  render() {
    console.log(this.state);
    return (
      <section className="learn-section">
        <main className="learn-main">
          <h2 className="learn-h2">Translate the word:</h2>
          <span className="learn-span">{this.state.nextWord}</span>
          <form className="learn-form">
            <label className="learn-label" htmlFor="learn-guess-input">
              What's the translation for this word?
            </label>
            <input
              className="learn-input"
              id="learn-guess-input"
              type="text"
              required
            ></input>
            <button className="learn-submit" type="submit">
              Submit your answer
            </button>
          </form>
          <div className='score-div'>
          <p className="learn-p">
            Your total score is: {this.state.totalScore}
          </p>
          <p className="learn-p">
            You have answered this word correctly {this.state.correctCount}{" "}
            times.
          </p>
          <p className="learn-p">
            You have answered this word incorrectly {this.state.incorrectCount}{" "}
            times.
          </p>
          </div>
        </main>
      </section>
    );
  }
}
