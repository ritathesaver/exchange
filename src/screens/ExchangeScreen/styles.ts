import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 18,
    marginVertical: 10,
  },
  result: {
    fontSize: 18,
  },
  currency: {
    color: 'red',
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 24,
  },
  btn: {
    paddingTop: 12,
    paddingBottom: 48,
  },
})
