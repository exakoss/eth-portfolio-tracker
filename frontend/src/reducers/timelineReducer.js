const timelineReducer = (state='1D', action) => {
  switch (action.type) {
    case 'SET_TIMELINE_FILTER':
      return action.filter
    default:
      return state
  }
}

export const timelineFilterChange = filter => {
  return {
    type: 'SET_TIMELINE_FILTER',
    filter
  }
}

export default timelineReducer
