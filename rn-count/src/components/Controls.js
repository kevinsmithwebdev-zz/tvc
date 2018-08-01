import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Controls = ({ changeCounter }) => {
  return (
    <View style={styles.container}>
      <View style={styles.addContainer}>
        <Button
          onPress={() => { changeCounter(1) }}
          title="ADD"
          color="green"
        />
      </View>

      <TouchableOpacity
        onPress={() => { changeCounter(-1) }}
        style={styles.buttonTouch}
      >
        <Text style={styles.subtract}>SUBTRACT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Controls

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  addContainer: {
    flex: 1,
  },
  buttonTouch: {
    backgroundColor: 'orange',
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  subtract: {
    fontWeight: 'bold',
    color: 'white',
  },
})
