import { FormMeal } from '@components/FormMeal'
import { Header } from '@components/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { ViewProps } from 'react-native'
import { Container } from './styles'

type NewMealProps = ViewProps

type IParams = {
  mealId?: string
}

export function NewMeal({ ...rest }: NewMealProps) {
  // const { navigate } = useNavigation()
  const { params } = useRoute()

  // const handleCreateMeal = () => {
  //   navigate('confirmCreateMeal')
  // }
  return (
    <Container {...rest}>
      <Header
        title={
          (params as IParams)?.mealId ? 'Editar Refeição' : 'Nova refeição'
        }
        linkTo="/home"
        topIcon={55}
        leftIcon={20}
        titleSize="s_18"
        height="small"
      />

      <FormMeal
        // onCreatedMeal={handleCreateMeal}
        mealId={(params as IParams)?.mealId}
      />
    </Container>
  )
}
