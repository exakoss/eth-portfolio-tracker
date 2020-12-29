import React from 'react'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import {mcFilterChange} from '../reducers/mcReducer'
import {timelineFilterChange} from '../reducers/timelineReducer'
import { useDispatch } from 'react-redux'

const TimelineDropDown = () => {
  const dispatch = useDispatch()
  return (
    <DropdownButton id="timeline-dropdown-item" title="Timeline" variant='warning'>
      <Dropdown.Header>Show price difference on a different timeline</Dropdown.Header>
      <Dropdown.Item as="button" onClick={() => dispatch(timelineFilterChange('1D'))}>1 day</Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => dispatch(timelineFilterChange('7D'))}>7 days</Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => dispatch(timelineFilterChange('30D'))}>30 days</Dropdown.Item>
    </DropdownButton>
  )
}

const MCDropDown = () => {
  const dispatch = useDispatch()
  return (
    <DropdownButton id="mc-dropdown-item" title="Market Cap">
      <Dropdown.Header>Sort tokens according to their market cap</Dropdown.Header>
      <Dropdown.Item as="button" onClick={() => dispatch(mcFilterChange('NONE'))}>None</Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => dispatch(mcFilterChange('DESCENDING_MC'))}>Descending</Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => dispatch(mcFilterChange('ASCENDING_MC'))}>Ascending</Dropdown.Item>
    </DropdownButton>
  )
}

const PriceDropDown = () => {
  const dispatch = useDispatch()
  return (
    <DropdownButton id="price-dropdown-item" title="Price" variant='dark'>
      <Dropdown.Header>Sort tokens according to their price</Dropdown.Header>
      <Dropdown.Item as="button" onClick={() => dispatch(mcFilterChange('NONE'))}>None</Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => dispatch(mcFilterChange('DESCENDING_PRICE'))}>Highest First</Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => dispatch(mcFilterChange('ASCENDING_PRICE'))}>Lowest First</Dropdown.Item>
    </DropdownButton>
  )
}

const GainDropDown = () => {
  const dispatch = useDispatch()
  return (
    <DropdownButton id="gain-dropdown-item" title="Gain or Loss" variant='success'>
      <Dropdown.Header>Sort tokens according to their Gain or Loss</Dropdown.Header>
      <Dropdown.Item as="button" onClick={() => dispatch(mcFilterChange('NONE'))}>None</Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => dispatch(mcFilterChange('GAINERS'))}>Gainers First</Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => dispatch(mcFilterChange('LOSERS'))}>Losers First</Dropdown.Item>
    </DropdownButton>
  )
}

const DropDown = () => {
  return(
    <div className='dropdown'>
      <MCDropDown/>
      <PriceDropDown/>
      <GainDropDown/>
      <TimelineDropDown/>
    </div>
  )
}

export default DropDown



