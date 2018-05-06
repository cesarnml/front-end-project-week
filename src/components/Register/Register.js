import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Button } from 'reactstrap'
import './Register.css'

class Register extends React.Component {
  state = {
    username: '',
    password: ''
  }

  render() {
    return (
      <div className="Register">
        <h2>Register:</h2>
        <form onSubmit={this.submitHandler}>
          <div className="form-row">
            <label>Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.inputHandler}
              type="text"
            />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.inputHandler}
              type="password"
            />
          </div>
          <div className="form-row">
            <Button color="success">Register</Button>
          </div>
        </form>
      </div>
    )
  }

  inputHandler = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  submitHandler = event => {
    event.preventDefault()

    axios
      .post('http://localhost:5000/api/register', this.state)
      .then(response => {
        console.log('response', response.data)
        this.props.onRegister(response.data)
        this.props.history.push('/')
      })
      .catch(err => {
        console.log('ERROR You are not authorized', err)
      })
  }
}

export default withRouter(Register)