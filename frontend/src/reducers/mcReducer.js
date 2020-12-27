const mcReducer = (state='NONE', action) => {
  switch (action.type) {
    case 'SET_MC_FILTER':
      return action.filter
    default:
      return state
}
}

export const mcFilterChange = filter => {
  return {
    type: 'SET_MC_FILTER',
    filter
  }
}

export default mcReducer
