import React, { Component } from "react";
import LanguageService from '../../services/language-services'
import { Link } from "react-router-dom";
import './Dashboard.css'

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

    renderWords = () => {
        return this.state.words.map(word => {
            return (
                <li key={word.id}>
                    <h4>{word.original}</h4>
                    <p>correct answer count: {word.correct_count}</p>
                    <p>incorrect answer count: {word.incorrect_count}</p>
                </li>
            )
        })
    } 

  render() {
    console.log(this.state)
    return (
      <section className="dashboard-section">
          <h2 className='dashboard-h2'>{this.state.language.name} Dashboard</h2>
          <p className="total-score">Total correct answers: {this.state.language.total_score}</p>
          <Link to='/learn'>
              <button className='practice-button'>Start practicing</button>
          </Link>
          <h3 className='dashboard-h3'>Words to practice</h3>
          <ul>{this.renderWords()}</ul>
      </section>
    );
  }
}
