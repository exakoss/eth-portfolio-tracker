import {createStore, combineReducers, applyMiddleware} from 'redux'

import tokenReducer from './reducers/tokenReducer'
import mcReducer from './reducers/mcReducer'
import timelineReducer from './reducers/timelineReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  // eslint-disable-next-line no-undef
  tokens: tokenReducer,
  mcFilter: mcReducer,
  timeline: timelineReducer
})

const composeEnhancers = composeWithDevTools({ trace: true})

const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

export default store
