import React, { FC, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { styles } from './styles'
import Button from '../../components/Button/Button'
import { useNavigation } from '@react-navigation/native'
import { createExchange } from '../../api/services'
import {
  ExchangeScreenProps,
  InfoScreenNavigationProp,
} from '../../navigators/types'

const ExchangeScreen: FC<ExchangeScreenProps> = ({ route }) => {
  const { currencyFrom, currencyTo, amountFrom, amountTo } = route.params
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [address, setAddress] = useState('')
  const navigation = useNavigation<InfoScreenNavigationProp>()

  const onExchangePress = async () => {
    try {
      setIsLoading(true)
      const exchangedResult = await createExchange({
        fixed: true,
        currency_from: currencyFrom,
        currency_to: currencyTo,
        amount: amountFrom,
        address_to: address,
        extra_id_to: '',
        user_refund_address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        user_refund_extra_id: '',
      })
      navigation.navigate('Info', exchangedResult)
      setIsLoading(false)
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={'padding'} style={styles.wrapper}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>You are converting:</Text>
          <Text style={styles.amount}>
            {amountFrom} <Text style={styles.currency}>{currencyFrom}</Text> to{' '}
            {currencyTo}.
          </Text>
          <Text style={styles.result}>
            You'll get {amountTo}{' '}
            <Text style={styles.currency}>{currencyTo}</Text>.
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter address"
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View style={styles.btn}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Button
              disabled={isError || !address}
              title="Exchange"
              onPress={onExchangePress}
            />
          )}
        </View>
        {isError && <Text>Error while exchanging, please try again</Text>}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ExchangeScreen
