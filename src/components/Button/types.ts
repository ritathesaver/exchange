import { ReactElement } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native/types'

export enum EButtonTheme {
  DEFAULT,
  DISABLED,
}

export interface IButtonProps {
  disabled?: boolean
  theme?: EButtonTheme
  title: string
  textTransform?: TextStyle['textTransform']
  onPress?: () => void
  delayPressIn?: number
  style?: StyleProp<ViewStyle>
}
