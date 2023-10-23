import axios, { AxiosRequestConfig } from 'axios'
import { ApiEndpoints, HttpHeaders } from '../constants/network'

export const getAllCurrencies = async () => {
  const response = await axios.get(ApiEndpoints.GET_ALL_CURRENCIES, {
    headers: HttpHeaders,
  })
  //console.log(response, 'kek')
  return response.data
}

export const getEstimated = async (options = {}) => {
  const response = await axios.get(ApiEndpoints.GET_ESTIMATED, {
    ...options,
    headers: HttpHeaders,
  })
  return response.data
}

export const createExchange = async (
  data: any,
  options: AxiosRequestConfig<any> | undefined,
) => {
  const response = await axios.post(ApiEndpoints.CREATE_EXCHANGE, data, options)
  return response
}
