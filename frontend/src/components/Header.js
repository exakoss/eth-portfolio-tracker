import React from 'react'
import Dropdown from './Dropdown'
import SearchBar from './SearchBar'

const Header = () => {
  return(
    <div className='app-header'>
      <h1>ETH Portfolio Tracker</h1>
      <h6>Powered by <a href='https://ethplorer.io/'>Ethplorer.io</a></h6>
      <SearchBar/>
      <Dropdown/>
    </div>

  )
}

export default Header
