import { Button } from '@components/Button'
import { ViewProps } from 'react-native'
import { ConfirmCreateMealWrapper } from './styles'

import { IllustrationCreateMeal } from '@components/IllustrationCreateMeal'
import { useNavigation } from '@react-navigation/native'

type ConfirmCreateMealProps = ViewProps

export function ConfirmCreateMeal({ ...rest }: ConfirmCreateMealProps) {
  const { navigate } = useNavigation()

  const handleNavigateToHome = () => {
    navigate('home')
  }
  return (
    <ConfirmCreateMealWrapper {...rest}>
      <IllustrationCreateMeal />

      <Button
        title="Ir para a página inicial"
        style={{ width: '60%' }}
        onPress={handleNavigateToHome}
      />
    </ConfirmCreateMealWrapper>
  )
}
