import axios from 'axios'

const baseUrl = 'http://localhost:5000/tokens'

const deleteToken = async id => {
  await axios.delete(`${baseUrl}/${id}`)
}

const createToken = async address => {
    const token = await axios.post(baseUrl, {address: address})
    if (token.data.message === 'Request failed with status code 406') {
      alert('The token address is incorrect, try a different one')
    }
    return token.data
}

const initializeTokens = async () => {
  const response = await axios.get(`${baseUrl}`)
  return response.data
}

export {createToken, initializeTokens, deleteToken}
