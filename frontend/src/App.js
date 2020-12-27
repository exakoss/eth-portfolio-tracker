import React, {useEffect} from 'react'
import './App.css';
import TokenList from './components/TokenList'
import {useDispatch} from 'react-redux'
import {updateTokens} from './reducers/tokenReducer'
import Header from './components/Header'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateTokens())
  })

  return (
    <div className='App'>
      <Header/>
      <TokenList/>
    </div>
  );
}

export default App;
