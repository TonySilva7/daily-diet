import { Button } from '@components/Button'
import { ViewProps } from 'react-native'
import { ConfirmCreateMealWrapper } from './styles'

import { IllustrationCreateMeal } from '@components/IllustrationCreateMeal'
import { useNavigation, useRoute } from '@react-navigation/native'

type ConfirmCreateMealProps = ViewProps

type IParams = {
  isWithinDiets: boolean
}

export function ConfirmCreateMeal({ ...rest }: ConfirmCreateMealProps) {
  const { navigate } = useNavigation()
  const { isWithinDiets } = useRoute().params as IParams

  const handleNavigateToHome = () => {
    navigate('home')
  }
  return (
    <ConfirmCreateMealWrapper {...rest}>
      <IllustrationCreateMeal
        variant={isWithinDiets ? 'positive' : 'negative'}
      />

      <Button
        title="Ir para a página inicial"
        style={{ width: '60%' }}
        onPress={handleNavigateToHome}
      />
    </ConfirmCreateMealWrapper>
  )
}
