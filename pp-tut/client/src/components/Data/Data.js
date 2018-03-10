import React from 'react'

import { DATA_PROTECTED_URL, DATA_UNPROTECTED_URL } from '../../constants/constants'

class Data extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataProtected: {},
      dataUnprotected: {}
    }
  }

  componentDidMount() {

    fetch(DATA_UNPROTECTED_URL)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      this.setState({ dataUnprotected: json })
    })
    .catch((err) => {
      console.error('error fetching unprotected data', err)
    })

    fetch(DATA_PROTECTED_URL)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      this.setState({ dataProtected: json })
    })
    .catch((err) => {
      console.error('error fetching protected data', err)
    })
  }

  render() {
    return (
      <div>
        <h1>This is the data page!</h1>
        <h3>Response from unprotected route:</h3>
        <h5><i>"{this.state.dataUnprotected.data}"</i></h5>
        <h3>Response from protected route:</h3>
        <h5><i>"{this.state.dataProtected.data}"</i></h5>
      </div>
    )
  }
}

export default Data
