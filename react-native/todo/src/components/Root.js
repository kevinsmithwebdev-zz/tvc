import React from 'react'
import { StyleSheet, View } from 'react-native'

import Header from './Header/Header'
import Todos from './Todos/Todos'
import Footer from './Footer/Footer'

const App = () => (
  <View style={styles.container}>
    <Header />
    <Todos />
    <Footer />
  </View>
)

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'antiquewhite',
  },
})
