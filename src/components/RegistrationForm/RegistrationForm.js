import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='reg-form'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <Label className="label-margin" htmlFor='registration-name-input'>
            Enter your name<Required />
          </Label>
          <Input
          className="reg-form-inputs"
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            required
          />
        </div>
        <div>
          <Label className="label-margin" htmlFor='registration-username-input'>
            Choose a username<Required />
          </Label>
          <Input
          className="reg-form-inputs"
            id='registration-username-input'
            name='username'
            required
          />
        </div>
        <div>
          <Label className="label-margin" htmlFor='registration-password-input'>
            Choose a password<Required />
          </Label>
          <Input
          className="reg-form-inputs"
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <footer className="reg-footer">
          <Button className="signup-button" type='submit'>
            Sign up
          </Button>
          {' '}
          <Link className="account-link" to='/login'>Already have an account?</Link>
        </footer>
      </form>
    )
  }
}

export default RegistrationForm
