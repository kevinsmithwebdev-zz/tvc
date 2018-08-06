import React from 'react'
import { StyleSheet, View } from 'react-native'

import Root from './src/components/Root'

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Root />
      </View>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  }
})
