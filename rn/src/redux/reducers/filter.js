const initialState = 'all'

const filter = (state = initialState, action) => {
  // console.log('filter reducer:', state, action)

  switch (action.type) {
    case 'SET_FILTER':
      return action.payload.filter

    default:
      return state
  }
}

export default filter
