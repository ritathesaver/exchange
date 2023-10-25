import { API_KEY, BASE_URL } from '@env'

export const HttpHeaders = {
  accept: 'application/json',
}

export const ApiEndpoints = {
  BASE_URL,
  GET_ALL_CURRENCIES: `${BASE_URL}/get_all_currencies?api_key=${API_KEY}`,
  GET_ESTIMATED: `${BASE_URL}/get_estimated?api_key=${API_KEY}`,
  CREATE_EXCHANGE: `${BASE_URL}/create_exchange?api_key=${API_KEY}`,
}
