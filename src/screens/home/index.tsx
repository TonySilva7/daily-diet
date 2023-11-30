import { Logo } from '@components/Logo'
import { Text, View, ViewProps, StyleSheet } from 'react-native'

type HomeProps = ViewProps

export function Home({ ...rest }: HomeProps) {
  return (
    <View style={styles.container} {...rest}>
      <Logo />
      <Text>Hello Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
