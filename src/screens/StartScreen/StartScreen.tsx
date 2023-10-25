import { useNavigation } from '@react-navigation/native'
import React, { FC, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { getAllCurrencies, getEstimated } from '../../api/services'
import Button from '../../components/Button/Button'
import { ExchangeScreenNavigationProp } from '../../navigators/types'
import { styles } from './styles'

const StartScreen: FC = () => {
  const navigation = useNavigation<ExchangeScreenNavigationProp>()
  const [allCurrencies, setAllCurrencies] = useState()

  const [openPickerFrom, setOpenPickerFrom] = useState(false)
  const [openPickerTo, setOpenPickerTo] = useState(false)

  const [currencyFrom, setCurrencyFrom] = useState('btc')
  const [currencyTo, setCurrencyTo] = useState('eth')

  const [amountFrom, setAmountFrom] = useState('0.1')
  const [amountTo, setAmountTo] = useState('')

  const [activeAmountField, setActiveAmountField] = useState('1')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const currencies = await getAllCurrencies()
        setAllCurrencies(currencies)
        const estimated = await getEstimated({
          params: {
            fixed: true,
            currency_from: currencyFrom,
            currency_to: currencyTo,
            amount: amountFrom,
          },
        })
        setIsLoading(false)
        setAmountTo(estimated)
      } catch (error) {
        setIsError(true)
        setIsLoading(false)
      }
    })()
  }, [])

  const calculateEstimatedAmount = async (
    val1: string,
    val2: string,
    am1: string,
  ) => {
    try {
      const estimated = await getEstimated({
        params: {
          fixed: true,
          currency_from: val1,
          currency_to: val2,
          amount: am1,
        },
      })
      if (activeAmountField === '1') {
        setAmountTo(estimated)
      } else if (activeAmountField === '2') {
        setAmountFrom(estimated)
      }
      setIsError(false)
    } catch (error) {
      setIsError(true)
    }
  }

  useEffect(() => {
    if (activeAmountField === '1') {
      calculateEstimatedAmount(currencyFrom, currencyTo, amountFrom)
    } else if (activeAmountField === '2') {
      calculateEstimatedAmount(currencyTo, currencyFrom, amountTo)
    }
  }, [activeAmountField, currencyFrom, currencyTo, amountFrom, amountTo])

  const handleAmountToChange = (newAmountTo: string) => {
    const numericInput = newAmountTo.replace(/[^0-9.]/g, '')
    setActiveAmountField('2')
    setAmountTo(numericInput)
    calculateEstimatedAmount(currencyTo, currencyFrom, amountTo)
  }

  const handleAmountFromChange = (newAmountFrom: string) => {
    const numericInput = newAmountFrom.replace(/[^0-9.]/g, '')
    setActiveAmountField('1')
    setAmountFrom(numericInput)
    calculateEstimatedAmount(currencyFrom, currencyTo, amountFrom)
  }

  const [pickerItems, setPickerItems] = useState<any>([])
  useEffect(() => {
    if (allCurrencies) {
      setPickerItems(allCurrencies)
    }
  }, [allCurrencies])

  const onNextPress = () => {
    navigation.navigate('Exchange', {
      currencyFrom,
      currencyTo,
      amountFrom,
      amountTo,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading || !currencyFrom || !currencyTo ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <KeyboardAvoidingView behavior={'padding'} style={styles.wrapper}>
          <View style={[styles.blockContainer, { zIndex: 100 }]}>
            <TextInput
              value={amountFrom}
              onChangeText={handleAmountFromChange}
              keyboardType="decimal-pad"
              maxLength={15}
              allowFontScaling={false}
              style={styles.textInput}
            />

            <DropDownPicker
              zIndex={300}
              containerStyle={styles.picker}
              schema={{
                label: 'symbol',
                value: 'symbol',
              }}
              searchable={true}
              open={openPickerFrom}
              value={currencyFrom}
              items={pickerItems}
              setItems={setPickerItems}
              setOpen={setOpenPickerFrom}
              setValue={setCurrencyFrom}
            />
          </View>
          <View style={styles.blockContainer}>
            <TextInput
              value={amountTo}
              onChangeText={handleAmountToChange}
              keyboardType="decimal-pad"
              maxLength={15}
              allowFontScaling={false}
              style={styles.textInput}
            />
            <DropDownPicker
              zIndex={300}
              containerStyle={styles.picker}
              schema={{
                label: 'symbol',
                value: 'symbol',
              }}
              searchable={true}
              open={openPickerTo}
              value={currencyTo}
              items={pickerItems}
              setItems={setPickerItems}
              setOpen={setOpenPickerTo}
              setValue={setCurrencyTo}
            />
          </View>
          <View style={styles.btn}>
            <Button
              title="Next"
              onPress={onNextPress}
              disabled={isError || !amountTo || !amountFrom}
            />
          </View>
          {isError && (
            <Text style={styles.errorText}>
              Something went wrong. Change the currency or amount and try again.
            </Text>
          )}
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  )
}

export default StartScreen
