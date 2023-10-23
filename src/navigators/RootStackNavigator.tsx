import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StartScreen from '../screens/StartScreen/StartScreen'

const Stack = createNativeStackNavigator()

const RootStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name={'Start'} component={StartScreen} />
    <Stack.Screen name={'Exchange'} component={StartScreen} />
    <Stack.Screen name={'Info'} component={StartScreen} />
  </Stack.Navigator>
)

export default RootStackNavigator
