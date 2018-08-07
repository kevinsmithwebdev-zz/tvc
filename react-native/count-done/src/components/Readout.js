import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Readout = ({ counter }) => {
  return (
    <Text style={styles.readout}>Counter: {counter}</Text>
  )
}

export default Readout

const styles = StyleSheet.create({
  readout: {
    marginVertical: 20,
    fontSize: 36,
    textAlign: 'center',
  }
})
