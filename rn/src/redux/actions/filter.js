export const setFilter = filter => {
  console.log('action setFilter', filter)
  return {
    type: 'SET_FILTER',
    payload: { filter }
  }
}
