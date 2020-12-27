import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addToken } from '../reducers/tokenReducer'
import { Button, FormControl } from 'react-bootstrap'

const SearchBar = () => {
  const dispatch = useDispatch()
  const initTokens = useSelector(state => state.tokens)
  const initTokensAddress = initTokens.map(t => t.info.address)
  const checkAddress = address => {
    return !!initTokensAddress.includes(address);
  }

  // const lettersAndNumbersOnly = input => {
  //   const regex = /[^A-Za-z0-9 ]/g
  //   if (input.value.match(regex)) {
  //     alert('Invalid character usage, please use numbers and english letters only.')
  //     input.value = input.value.replace(regex, '')
  //   }
  // }

  const addNewToken = event => {
    event.preventDefault()
    const tokenAddress = event.target.token.value
    if (checkAddress(tokenAddress)) {
      alert('This token has already been added to the portfolio, try adding a different one')
      event.target.token.value = ''
    }
    else {
      event.target.token.value = ''
      dispatch(addToken(tokenAddress))
    }
  }

  return(
    <form className='search-bar' onSubmit={addNewToken}>
        <FormControl
          placeholder='Input the contract address here'
          name = 'token'
          className='search-bar-input'
        />
      <Button variant='success' type='submit' className='search-bar-button'>Add Token</Button>
    </form>
  )
}

export default SearchBar
