const initialState = [

  {
    task: 'feed cat',
    isComplete: false,
  },
  {
    task: 'get mail',
    isComplete: false,
  },
  {
    task: 'do taxes',
    isComplete: true,
  },

  // {
  //   task: 'feed cat',
  //   isComplete: false,
  // },
  // {
  //   task: 'get mail',
  //   isComplete: false,
  // },
  // {
  //   task: 'do taxes',
  //   isComplete: true,
  // },
  // {
  //   task: 'feed cat',
  //   isComplete: false,
  // },
  // {
  //   task: 'get mail',
  //   isComplete: false,
  // },
  // {
  //   task: 'do taxes',
  //   isComplete: true,
  // },
  // {
  //   task: 'feed cat',
  //   isComplete: false,
  // },
  // {
  //   task: 'get mail',
  //   isComplete: false,
  // },
  // {
  //   task: 'do taxes',
  //   isComplete: true,
  // },
  // {
  //   task: 'feed cat',
  //   isComplete: false,
  // },
  // {
  //   task: 'get mail',
  //   isComplete: false,
  // },
  // {
  //   task: 'do taxes',
  //   isComplete: true,
  // },
  // {
  //   task: 'feed cat',
  //   isComplete: false,
  // },
  // {
  //   task: 'get mail',
  //   isComplete: false,
  // },
  // {
  //   task: 'do taxes',
  //   isComplete: true,
  // },
]

const todos = (state = initialState, action) => {
  // console.log('todos reducer:', state, action)

  switch (action.type) {

    case 'DELETE_TODO':
      return [
        ...state.slice(0, action.payload.id),
        ...state.slice(action.payload.id + 1)
      ]

    case 'TOGGLE_TODO_COMPLETED':
      const newTodos = [...state]
      newTodos[action.payload.id].isComplete = !newTodos[action.payload.id].isComplete
      return newTodos

    case 'ADD_TODO':
      return [ ...state, { task: action.payload.text, isComplete: false } ]

    default:
      return state
  }
}

export default todos
