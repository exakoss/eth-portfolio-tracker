import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './styles/token-tile.scss'
import './styles/searchbar.scss'
import './styles/dropdown.scss'
import './styles/app.scss'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

// store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
