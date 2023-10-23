import { useNavigation } from '@react-navigation/native'
import React, { FC, useEffect, useState } from 'react'
import { SafeAreaView, TextInput, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { getAllCurrencies, getEstimated } from '../../api/services'
import Button from '../../components/Button/Button'
import { styles } from './styles'

const StartScreen: FC = () => {
  const navigation = useNavigation()
  const [allCurrencies, setAllCurrencies] = useState()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('btc')
  const [open2, setOpen2] = useState(false)
  const [value2, setValue2] = useState('eth')
  const [activeAmountField, setActiveAmountField] = useState('1') // Активное поле amount (1 или 2)

  const [amount, setAmount] = useState('0.1')
  const [amount2, setAmount2] = useState('')

  useEffect(() => {
    ;(async () => {
      const currencies = await getAllCurrencies()
      setAllCurrencies(currencies)
      const estimated = await getEstimated({
        params: {
          fixed: true,
          currency_from: 'btc',
          currency_to: 'eth',
          amount: amount,
        },
      })
      setAmount2(estimated)
    })()
  }, [])

  const calculateEstimatedAmount = async (
    val1: string,
    val2: string,
    am1: string,
  ) => {
    console.log(val1, val2)
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
        setAmount2(estimated)
      } else if (activeAmountField === '2') {
        setAmount(estimated)
      }
    } catch (error) {
      console.error('Произошла ошибка при расчете estimated amount:', error)
    }
  }

  useEffect(() => {
    // Общий код для обработки изменений value1, value2, amount1 и amount2 и расчета estimated amount
    calculateEstimatedAmount(value, value2, amount)
  }, [value, value2, amount, amount2])

  // Добавьте обработчик события для изменения amount2
  const handleAmount2Change = (newAmount2: string) => {
    setActiveAmountField('2')
    setAmount2(newAmount2)
    // Вызовите функцию для пересчета amount1
    calculateEstimatedAmount(value, value2, amount)
  }

  const handleAmount1Change = (newAmount1: string) => {
    setActiveAmountField('1')
    setAmount(newAmount1)
    // Вызовите функцию для пересчета amount2
    calculateEstimatedAmount(value, value2, amount2)
  }

  const [items, setItems] = useState<any>([])
  useEffect(() => {
    if (allCurrencies) {
      setItems(allCurrencies)
    }
  }, [allCurrencies])

  const onNextPress = () => {}

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', paddingBottom: 40 }}>
        <TextInput
          value={amount}
          onChangeText={handleAmount1Change}
          keyboardType="decimal-pad"
          maxLength={11}
          allowFontScaling={false}
          style={{
            borderColor: 'gray',
            width: '50%',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: 'gray',
          }}
        />

        <DropDownPicker
          containerStyle={{ width: '50%' }}
          schema={{
            label: 'symbol',
            value: 'symbol',
          }}
          searchable={true}
          open={open}
          value={value}
          items={items}
          setItems={setItems}
          setOpen={setOpen}
          setValue={setValue}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          value={amount2}
          onChangeText={handleAmount2Change}
          keyboardType="decimal-pad"
          maxLength={11}
          allowFontScaling={false}
          style={{
            borderColor: 'gray',
            width: '50%',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: 'gray',
          }}
        />
        <DropDownPicker
          containerStyle={{ width: '50%' }}
          schema={{
            label: 'symbol',
            value: 'symbol',
          }}
          searchable={true}
          open={open2}
          value={value2}
          items={items}
          setItems={setItems}
          setOpen={setOpen2}
          setValue={setValue2}
        />
      </View>
      <View style={{ marginTop: 70 }}>
        <Button title="Next" onPress={() => null} />
      </View>
    </SafeAreaView>
  )
}

export default StartScreen
