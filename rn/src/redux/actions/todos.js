export const deleteTodo = id => {
  // console.log('action deleteTodo', id)
  return {
    type: 'DELETE_TODO',
    payload: { id },
  }
}

export const toggleTodoCompleted = id => {
  // console.log('action toggleTodoCompleted', id)
  return {
    type: 'TOGGLE_TODO_COMPLETED',
    payload: { id },
  }
}

export const addTodo = text => {
  // console.log('action addTodo', text)
  return {
    type: 'ADD_TODO',
    payload: { text },
  }
}
