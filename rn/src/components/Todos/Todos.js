import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as todosActions from '../../redux/actions/todos'

class Todos extends React.Component {

  render() {
    const { deleteTodo, toggleTodoCompleted, todos } = this.props

    // console.log('Todos.render', this.props)

    const Todo = ({ todo: { task, isComplete }, id }) => {

      return (
        <View style={styles.todoContainer}>

          <TouchableOpacity
            onPress={() => toggleTodoCompleted(id)}
            style={styles.todoTouch}
          >
            <Text style={[styles.todoText, isComplete ? styles.todoTextComplete : null]}>{task}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => deleteTodo(id)}
            style={styles.deleteTouch}
          >
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>

        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Todos:</Text>
        { todos.map((t, idx) => <Todo key={idx} todo={t} id={idx}/> )}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  let newTodos = []
  switch (state.filter) {
    case 'complete':
      newTodos = state.todos.filter(t => t.isComplete)
      break
    case 'incomplete':
      newTodos = state.todos.filter(t => !t.isComplete)
      break
    default:
      newTodos = [ ...state.todos ]
  }

  return { todos: newTodos, filter: state.filter }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    deleteTodo: todosActions.deleteTodo,
    toggleTodoCompleted: todosActions.toggleTodoCompleted,
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Todos)

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    marginVertical: 2,
  },

  todoTouch: {
    flex: 1,
  },
  todoText: {
    fontSize: 18,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  todoTextComplete: {
    color: '#888',
    textDecorationLine: 'line-through',
  },

  deleteTouch: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 18,
    color: 'white',
  }
})
