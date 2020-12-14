import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
        <nav className='logout-reg-div'>
        <span className="user-name">
          {this.context.user.name}
        </span>
          <Link
            className="nav-links"
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
    )
  }

  renderLoginLink() {
    return (
      <nav className='login-reg-div'>
        <Link className="nav-links" to='/login'>Login</Link>
        {' '}
        <Link className="nav-links" to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header className='header-div'>
        <h1>
          <Link to='/' className="header-link">
            Spaced repetition
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
