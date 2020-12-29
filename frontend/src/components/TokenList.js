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
        text: `1 Day Price Difference: ${token.price.diff}%`,
        value: token.price.diff
      }
    case '7D':
      if (token.price.diff7d !== undefined) return {
        text: `7 Day Price Difference: ${token.price.diff7d}%`,
        value: token.price.diff7d
      };
      else return {}
    case '30D':
      if (token.price.diff30d !== undefined) return {
        value: token.price.diff30d.toFixed(2),
        text: `30 Day Price Difference: ${token.price.diff30d.toFixed(2)}%`
      };
      else return {}
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
      <ListGroupItem className='token-tile-price-change' variant={(getTimeline().value > 0) ? 'success' : 'danger'}>{(getTimeline().text !== undefined) ? getTimeline().text : 'Data for this time period is not available yet' }</ListGroupItem>
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
  const firstOverSecond = (a,b) => (a > b) ? 1 : -1
  const secondOverFirst = (a,b) => (a > b) ? -1 : 1
  const compareDescending = (filter) => {
    if (filter === 'DESCENDING_MC') return (t1,t2) => {
      const t1v = parseFloat(t1.info.price.marketCapUsd)
      const t2v = parseFloat(t2.info.price.marketCapUsd)
      return secondOverFirst(t1v,t2v)
    }
    if (filter === 'DESCENDING_PRICE') return (t1,t2) =>  {
      const t1v = parseFloat(t1.info.price.rate)
      const t2v = parseFloat(t2.info.price.rate)
      return secondOverFirst(t1v,t2v)
    }

  }
  const compareAscending = (filter) => {
    if (filter === 'ASCENDING_MC') return (t1,t2) => {
      const t1v = parseFloat(t1.info.price.marketCapUsd)
      const t2v = parseFloat(t2.info.price.marketCapUsd)
      return firstOverSecond(t1v,t2v)
    }
    if (filter === 'ASCENDING_PRICE') return (t1,t2) =>  {
      const t1v = parseFloat(t1.info.price.rate)
      const t2v = parseFloat(t2.info.price.rate)
      return firstOverSecond(t1v,t2v)
    }
  }
  const compareLosersOrGainers = (filter) => {
    return (t1,t2) => {
      let t1v, t2v;
      if (timelineFilter === '1D') {
        t1v = t1.info.price.diff
        t2v = t2.info.price.diff
      } else if (timelineFilter === '7D') {
        t1v = t1.info.price.diff7d
        t2v = t2.info.price.diff7d
      } else {
        t1v = t1.info.price.diff30d
        t2v = t2.info.price.diff30d
      }
      if (filter === 'GAINERS') {
        return secondOverFirst(t1v,t2v)
      } else if (filter === 'LOSERS') {
        return firstOverSecond(t1v,t2v)
      }
    }
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
      return inTokens.sort(compareDescending('DESCENDING_MC'))
    case 'ASCENDING_MC':
      return inTokens.sort(compareAscending('ASCENDING_MC'))
    case 'DESCENDING_PRICE':
      return inTokens.sort(compareDescending('DESCENDING_PRICE'))
    case 'ASCENDING_PRICE':
      return inTokens.sort(compareAscending('ASCENDING_PRICE'))
    case 'LOSERS':
      return inTokens.sort(compareLosersOrGainers('LOSERS'))
    case 'GAINERS':
      return inTokens.sort(compareLosersOrGainers('GAINERS'))
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
