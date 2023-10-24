import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'

type TExchangeData = {
  currencyFrom: string
  currencyTo: string
  amountFrom: string
  amountTo: string
}

type TExchangeInfo = {
  currencyFrom: string
  currencyTo: string
  amountFrom: string
  amountTo: string
  addressFrom: string
  addressTo: string
  status: string
}
export type RootStackParamList = {
  Start: undefined
  Exchange: TExchangeData
  Info: TExchangeInfo
}
export type ExchangeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Exchange'
>

type ExchangeScreenRouteProp = RouteProp<RootStackParamList, 'Exchange'>

export type ExchangeScreenProps = {
  route: ExchangeScreenRouteProp
}

export type InfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Info'
>

type InfoScreenRouteProp = RouteProp<RootStackParamList, 'Info'>

export type InfoScreenProps = {
  route: InfoScreenRouteProp
}
