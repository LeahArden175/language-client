import React, { Component } from "react";
import LanguageService from "../../services/language-services";

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
      <section>
        <main>
          <h2>Translate the word:</h2>
          <span>{this.state.nextWord}</span>
          <p>Your total score is: {this.state.totalScore}</p>
          <p>
            You have answered this word correctly {this.state.correctCount}{" "}
            times.
          </p>
          <p>
            You have answered this word incorrectly {this.state.incorrectCount}{" "}
            times.
          </p>
          <form>
            <label htmlFor="learn-guess-input">
              What's the translation for this word?
            </label>
            <input id="learn-guess-input" type="text" required></input>
            <button type="submit">Submit your answer</button>
          </form>
        </main>
      </section>
    );
  }
}
