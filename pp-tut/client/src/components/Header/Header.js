import React from 'react'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// import { userUpdate } from '../../redux/actions/actions'

import './Header.css'

const Header = ({ username }) => {
  return (
    <div id="Header">
      <span className="name">
        <div className="title">Boilerplate Passport-Local Auth</div>
        <div className="welcome">
          {
            username
            ? 'Welcome, ' + username + '.'
            : 'Not logged in.'
          }
        </div>
      </span>

      <span className="nav">
        <Link to="/">HOME</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/logout">LOGOUT</Link>
      </span>
    </div>
  )

}

export default Header
