export const HttpHeaders = {
  accept: 'application/json',
}

export const API_KEY = '695894e7-c0d8-4b55-9af4-256fd5e835c8'
export const BASE_URL = 'https://api.simpleswap.io'

export const ApiEndpoints = {
  BASE_URL,
  GET_ALL_CURRENCIES: `${BASE_URL}/get_all_currencies?api_key=${API_KEY}`,
  GET_ESTIMATED: `${BASE_URL}/get_estimated?api_key=695894e7-c0d8-4b55-9af4-256fd5e835c8`,
  CREATE_EXCHANGE: `${BASE_URL}/create_exchange`,
}
