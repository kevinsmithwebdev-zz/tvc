import React from 'react'
import { View } from 'react-native'

import Readout from './Readout'
import Controls from './Controls'

class Root extends React.Component {
  state = { counter: 0 }

  changeCounter = factor => {
    if (this.state.counter + factor >= 0) {
      this.setState({ counter: this.state.counter + factor })
    }
  }


  render() {
    return (
      <View>

        <Readout counter={this.state.counter} />
        <Controls changeCounter={this.changeCounter} />
      </View>
    )
  }
}

export default Root
