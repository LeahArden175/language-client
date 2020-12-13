import React, { Component } from "react";
import LanguageService from '../../services/language-services'

export default class Dashboard extends Component {

    state= {
        language : {},
        words: []
      }
    
      componentDidMount = () => {
        this.getLanguage()
      }
    
    getLanguage() {
        LanguageService.getLanguage()
        .then((res) => {
            this.setState({ language : res.language, words : res.words})
        })
    }
  render() {
    console.log(this.state)
    return (
      <div>
        <h2>Test language 1</h2>
        <p>Total correct answers: 7</p>
      </div>
    );
  }
}
