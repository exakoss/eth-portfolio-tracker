import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {eraseToken} from '../reducers/tokenReducer'
import {Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap'

const TokenTile = ({token, timeline, id}) => {
  const dispatch = useDispatch()
  const toMoney = value => {
    return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  }
  const getTimeline = () => {
    switch (timeline) {
    case '1D':
      return {
        text: `1 Day Price Difference: ${token.price.diff}`,
        value: token.price.diff
      }
    case '7D':
      return {
        text: `7 Day Price Difference: ${token.price.diff7d}`,
        value: token.price.diff7d
      }
    case '30D':
      return {
        text: `30 Day Price Difference: ${token.price.diff30d.toFixed(2)}`,
        value: token.price.diff30d.toFixed(2)
      }
    default:
      return {
        text: `1 Day Price Difference: ${token.price.diff}`,
        value: token.price.diff
      }
  }}
  const imageLink = `https://ethplorer.io${token.image}`

  return(
    <Card className='tile-card' key={id.toString()}>
    <Card.Img variant="top" src={imageLink} alt='No image has been provided by the API'/>
    <Card.Body style = {{ height: '200px' }}>
      <Card.Title className='token-tile-symbol'>{token.symbol}</Card.Title>
      <Card.Text>{token.description || 'No description has been provided for this token'}</Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem className='token-tile-price'>Price: {toMoney(token.price.rate)}</ListGroupItem>
      <ListGroupItem className='token-tile-price-change' variant={(getTimeline().value > 0) ? 'success' : 'danger'}>{getTimeline().text}%</ListGroupItem>
      <ListGroupItem className='token-tile-market-cap'>MarketCap: {toMoney(token.price.marketCapUsd)}</ListGroupItem>
    </ListGroup>
    <Card.Body>
      <Card.Link href={token.website}>{(token.website) ? 'Official Website' : 'No Website Has been provided'}</Card.Link>
    </Card.Body>
      <Button className='token-delete-button' variant='danger' onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete ${token.symbol} ?`))
        {dispatch(eraseToken(id))}
      }}>Delete Token</Button>
  </Card>
  )
}

const TokenList = () => {
  const compareMCDescending = (t1, t2) => {
    const t1MC = parseFloat(t1.info.price.marketCapUsd)
    const t2MC = parseFloat(t2.info.price.marketCapUsd)
    if (t1MC > t2MC) {
      return -1
    }
    if (t1MC < t2MC) {
      return 1
    }
    return 0
  }
  const compareMCAscending = (t1, t2) => {
    const t1MC = parseFloat(t1.info.price.marketCapUsd)
    const t2MC = parseFloat(t2.info.price.marketCapUsd)
    if (t1MC > t2MC) {
      return 1
    }
    if (t1MC < t2MC) {
      return -1
    }
    return 0
  }
  const compareGainers = (t1,t2) => {
    let t1G, t2G
    if (timelineFilter === '1D') {
      t1G = t1.info.price.diff
      t2G = t2.info.price.diff
    } else if (timelineFilter === '7D') {
      t1G = t1.info.price.diff7d
      t2G = t2.info.price.diff7d
    } else {
      t1G = t1.info.price.diff30d
      t2G = t2.info.price.diff30d
    }
    if (t1G > t2G) {
      return -1
    }
    if (t1G < t2G) {
      return 1
    }
    return 0
  }
  const compareLosers = (t1,t2) => {
    let t1L, t2L
    if (timelineFilter === '1D') {
      t1L = t1.info.price.diff
      t2L = t2.info.price.diff
    } else if (timelineFilter === '7D') {
      t1L = t1.info.price.diff7d
      t2L = t2.info.price.diff7d
    } else {
      t1L = t1.info.price.diff30d
      t2L = t2.info.price.diff30d
    }
    if (t1L > t2L) {
      return 1
    }
    if (t1L < t2L) {
      return -1
    }
    return 0
  }

  const initTokens = useSelector(state => state.tokens)
  const mcFilter = useSelector(state => state.mcFilter)
  const timelineFilter = useSelector(state => state.timeline)
  const displayedTokens = [...initTokens]
  const getDisplayTokens = inTokens => {
    switch (mcFilter) {
    case 'NONE':
      return inTokens
    case 'DESCENDING_MC':
      return inTokens.sort(compareMCDescending)
    case 'ASCENDING_MC':
      return inTokens.sort(compareMCAscending)
    case 'LOSERS':
      return inTokens.sort(compareLosers)
    case 'GAINERS':
      return inTokens.sort(compareGainers)
    default:
      return inTokens
  }}
  return(
    <div className='container'>
      <div className='row'>{
        getDisplayTokens(displayedTokens).map(t =>
          <div className='my-col' key={t.id}>
            <TokenTile token={t.info} id={t.id} timeline={timelineFilter} key={t.id}/>
          </div>
      )}
      </div>
    </div>
  )
}

export default TokenList
