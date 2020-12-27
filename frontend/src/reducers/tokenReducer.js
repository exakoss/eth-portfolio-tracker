import {createToken, initializeTokens, deleteToken} from '../services/tokens'

const tokenReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return state.concat(action.data)
    case 'ERASE_TOKEN':
      return state.filter(token => token.id !== action.data)
    case 'INIT_TOKENS':
      return action.data
    default:
      return state
  }
}

//Defining Actions
export const addToken = address => {
  return async dispatch => {
    const newToken = await createToken(address)
    if (newToken.message === 'Request failed with status code 406') return
    dispatch({
      type: 'ADD_TOKEN',
      data: newToken
    })
  }
}

export const updateTokens = () => {
  return async dispatch => {
    const updatedTokens = await initializeTokens()
    dispatch({
      type: 'INIT_TOKENS',
      data: updatedTokens
    })
  }
}

export const eraseToken = id => {
  return async dispatch => {
    await deleteToken(id)
    dispatch({
      type: 'ERASE_TOKEN',
      data: id
    })
  }
}

export default tokenReducer
