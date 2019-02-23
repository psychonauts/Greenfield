import React from 'react';
import { Button } from 'react-materialize';
import axios from 'axios';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleLogin() {
    console.log('handle login');
    const { username, password } = this.state;
    // const username = this.state.username;
    // const password = this.state.password;
    const params = {
      username,
      password,
    };
    axios.post('/login', params)
      .then((result) => { console.log(result); })
      .catch((err) => { console.log(err); });
  }

  render() {
    const { username, password } = this.state;
    return (
      <form>
        <input type="text" name="text" placeholder="username" value={username} onChange={this.handleUsernameChange} />
        <input type="text" name="password" placeholder="Password" value={password} onChange={this.handlePasswordChange} />
        <Button type="button" onClick={this.handleLogin}>Login!!</Button>
      </form>
    );
  }
}

export default LoginForm;
