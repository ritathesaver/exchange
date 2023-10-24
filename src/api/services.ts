import axios from 'axios'
import { ApiEndpoints, HttpHeaders } from '../constants/network'

export const getAllCurrencies = async () => {
  const response = await axios.get(ApiEndpoints.GET_ALL_CURRENCIES, {
    headers: HttpHeaders,
  })
  return response.data
}

export const getEstimated = async (data = {}) => {
  const response = await axios.get(ApiEndpoints.GET_ESTIMATED, {
    ...data,
    headers: HttpHeaders,
  })
  return response.data
}

export const createExchange = async (data = {}) => {
  const response = await axios.post(ApiEndpoints.CREATE_EXCHANGE, {
    ...data,
    headers: HttpHeaders,
  })
  const mappedResponseData = {
    currencyFrom: response.data.currency_from,
    currencyTo: response.data.currency_to,
    amountFrom: response.data.amount_from,
    amountTo: response.data.amount_to,
    addressFrom: response.data.address_from,
    addressTo: response.data.address_to,
    status: response.data.status,
  }
  return mappedResponseData
}
