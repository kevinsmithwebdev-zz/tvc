import React from 'react'
import Expo from 'expo'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as todosActions from '../../redux/actions/todos'

class Header extends React.Component {

  state = { input: '' }

  handleInputChange = text => {
    this.setState({ input: text })
  }

  handleAdd = () => {
    this.props.addTodo(this.state.input)
    this.setState({ input: '' })
  }

  render() {
    // console.log('Header.render', this.props)
    const { addTodo } = this.props

    return (
      <View style={styles.container}>
        {/* <Text>Hello, from Header!</Text> */}

        <TouchableOpacity
          style={styles.addTouch}
          onPress={this.handleAdd}
        >
          <Icon
            name='add-to-list'
            type='entypo'
            color='#fff'
          />
        </TouchableOpacity>

        <TextInput
          onChangeText={t => this.handleInputChange(t)}
          value={this.state.input}
          style={styles.input}
          underlineColorAndroid='transparent'
        />

      </View>
    )
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTodo: todosActions.addTodo,
  }, dispatch)
)

export default connect(
  null,
  mapDispatchToProps,
)(Header)

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingTop: Expo.Constants.statusBarHeight + 5,
    backgroundColor: 'green',
    flexDirection: 'row',
  },

  addTouch: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 3,
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: 'black',
    fontSize: 20,
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    borderRadius: 5,
  },

})
