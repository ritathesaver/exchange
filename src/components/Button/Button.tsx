import { Pressable, StyleProp, Text, TextStyle } from 'react-native'
import React, { memo, useCallback, useMemo, useState } from 'react'
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { COLORS } from '../../constants/colors'
import { IButtonProps, EButtonTheme } from './types'
import { styles } from './styles'

const Button = memo<IButtonProps>(
  ({
    disabled,
    theme = disabled ? EButtonTheme.DISABLED : EButtonTheme.DEFAULT,
    title,
    onPress,
    style,
  }) => {
    const animatedValue = useSharedValue(0)
    const [isPressed, setIsPressed] = useState<boolean>(false)

    const onPressIn = useCallback(() => {
      setIsPressed(true)
      animatedValue.value = withTiming(1, {
        easing: Easing.ease,
        duration: 100,
      })
    }, [animatedValue])

    const onPressOut = useCallback(() => {
      setIsPressed(false)
      animatedValue.value = withTiming(0, {
        easing: Easing.ease,
        duration: 100,
      })
    }, [animatedValue])

    const animatedContainerStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 1],
        [
          ButtonThemeStyles[theme].backgroundColor,
          ButtonThemeStyles[theme].pressedBackgroundColor,
        ],
      ),
      borderColor: interpolateColor(
        animatedValue.value,
        [0, 1],
        [
          ButtonThemeStyles[theme].borderColor,
          ButtonThemeStyles[theme].pressedBorderColor,
        ],
      ),
    }))

    const textColorStyle = useMemo<StyleProp<TextStyle>>(
      () => ({
        color: isPressed
          ? ButtonThemeStyles[theme].pressedTitleColor
          : ButtonThemeStyles[theme].titleColor,
      }),
      [isPressed, theme],
    )

    return (
      <Animated.View style={[style, styles.container, animatedContainerStyle]}>
        <Pressable
          disabled={disabled}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={styles.touchContainer}
        >
          <Text numberOfLines={1} style={[styles.title, textColorStyle]}>
            {title}
          </Text>
        </Pressable>
      </Animated.View>
    )
  },
)

const ButtonThemeStyles = {
  [EButtonTheme.DEFAULT]: {
    backgroundColor: COLORS.WHITE,
    pressedBackgroundColor: COLORS.LIGHT_GRAY,
    borderColor: COLORS.WHITE,
    pressedBorderColor: COLORS.LIGHT_GRAY,
    titleColor: COLORS.BLACK,
    pressedTitleColor: COLORS.BLACK,
  },
  [EButtonTheme.DISABLED]: {
    backgroundColor: COLORS.DARK_GRAY,
    pressedBackgroundColor: COLORS.LIGHT_GRAY,
    borderColor: COLORS.DARK_GRAY,
    pressedBorderColor: COLORS.DARK_GRAY,
    titleColor: COLORS.WHITE,
    pressedTitleColor: COLORS.DARK_GRAY,
  },
}

export default Button
