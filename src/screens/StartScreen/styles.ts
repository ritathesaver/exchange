import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  blockContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    zIndex: 50,
  },
  textInput: {
    borderColor: 'gray',
    width: '50%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'gray',
  },
  picker: {
    width: '48%',
    marginLeft: 5,
  },
  btn: {
    paddingTop: 8,
    paddingBottom: 16,
    zIndex: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
})
