import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from 'react-native'
import { InfoScreenProps } from '../../navigators/types'
import { styles } from './styles'

const InfoScreen: FC<InfoScreenProps> = ({ route }) => {
  const {
    addressFrom,
    addressTo,
    amountFrom,
    amountTo,
    currencyFrom,
    currencyTo,
    status,
  } = route.params

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Transaction Details:</Text>
      <View style={styles.row}>
        <Text style={styles.label}>From address:</Text>
        <Text>{addressFrom}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>To address:</Text>
        <Text>{addressTo}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <Text>
          {amountFrom} {currencyFrom} to {currencyTo}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Received Amount:</Text>
        <Text>
          {amountTo} {currencyTo}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
    </SafeAreaView>
  )
}

export default InfoScreen
