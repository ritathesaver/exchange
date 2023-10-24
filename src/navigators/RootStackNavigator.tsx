import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StartScreen from '../screens/StartScreen/StartScreen'
import ExchangeScreen from '../screens/ExchangeScreen/ExchangeScreen'
import { RootStackParamList } from './types'
import InfoScreen from '../screens/InfoScreen/InfoScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={'Start'}
      options={() => ({
        headerShown: false,
      })}
      component={StartScreen}
    />
    <Stack.Screen
      options={() => ({
        headerTitle: '',
        headerBackTitleVisible: false,
      })}
      name={'Exchange'}
      component={ExchangeScreen}
    />
    <Stack.Screen
      options={() => ({
        headerShown: false,
      })}
      name={'Info'}
      component={InfoScreen}
    />
  </Stack.Navigator>
)

export default RootStackNavigator
