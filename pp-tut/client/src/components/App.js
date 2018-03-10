import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Header from './Header/Header'
import Home from './Home/Home'
import Login from './Login/Login'
import Logout from './Logout/Logout'

import { AUTH_LOGIN_URL } from '../constants/constants'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: {}
    }

  }

  componentWillMount() {
  }


  async handleLogin(userData) {
    console.log('in handleLogin', userData)
    await fetch(
      // where to contact
      AUTH_LOGIN_URL,
      // what to send
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json) {
        console.log('returned', json)
        // loginSuccessAction(json);
        this.setState({ redirect: true });
      } else {
        console.log('login failed')
      }
    })
    .catch((err) => {
      console.error('error logging in', err)
    });
  }

  handleLogout() {
    console.log('in App.handleLogout...')
    // console.log(userData)
  }


  render() {
    return (
      <Router>
        <div id="App">
          <Header />

          <Switch>

            <Route exact path="/" component={Home} />

            <Route
              exact path="/login"
              render={() => (
                <Login
                  test={269}
                  handleLogin={this.handleLogin}
                />
              )}
            />

            <Route exact path="/logout"  handleLogin={this.handleLogout} component={Logout} />
            <Redirect from="*" to="/" />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App
