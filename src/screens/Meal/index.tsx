import { Button } from '@components/Button'
import { ContentContainer } from '@components/ContentContainer'
import { Header } from '@components/Header'
import { Title } from '@components/Title'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Circle, PencilSimpleLine, Trash } from 'phosphor-react-native'
import { Alert, Modal, Text, View, ViewProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import {
  BadgeMeal,
  DateContent,
  MealWrapper,
  ModalContent,
  OverlayModal,
  TitleContent,
} from './styles'
import { useEffect, useState } from 'react'
import { useMeal } from '@view-model/meal'
import { formatToDate, formatToHour } from '@utils/formatters/date'
import { MealError } from '@utils/errors/meal'

type MealProps = ViewProps

type RouteParams = {
  mealId?: string
}

export function Meal({ ...rest }: MealProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { colors } = useTheme()
  const { getMeal, newMealState, setNewMealState, deleteMeal } = useMeal()

  const { navigate } = useNavigation()
  const { params } = useRoute()

  const { mealId } = params as RouteParams

  async function removeMeal() {
    try {
      await deleteMeal(mealId as string)

      setIsModalVisible(false)

      return navigate('home')
    } catch (error) {
      if (error instanceof MealError) {
        return Alert.alert('Erro ao excluir refeição', error.message)
      }

      return Alert.alert(
        'Erro ao excluir refeição',
        'Ocorreu um erro ao excluir a refeição, tente novamente mais tarde.',
      )
    }
  }

  function handleRemoveMeal() {
    setIsModalVisible(true)
  }

  function handleEdit() {
    navigate('newMeal', { mealId })
  }

  useEffect(() => {
    async function getMealById() {
      const meal = await getMeal(mealId as string)
      setNewMealState(meal)
    }

    if (mealId) {
      getMealById()
    }

    return () => {
      setNewMealState({
        id: '',
        name: '',
        description: '',
        date: new Date(),
        hour: new Date(),
        isDiet: null,
      })
    }
  }, [mealId])

  const date = formatToDate(newMealState.date)
  const hour = formatToHour(newMealState.hour)

  return (
    <MealWrapper {...rest}>
      <Header
        title="Refeição"
        linkTo="/home"
        topIcon={55}
        leftIcon={20}
        titleSize="s_18"
        height="small"
        variant={newMealState.isDiet ? 'primary' : 'secondary'}
      />

      <ContentContainer
        style={{
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ width: '100%', rowGap: 20 }}>
          <TitleContent>
            <Title size="s_18" weight="bold">
              {newMealState.name}
            </Title>
            <Text>{newMealState.description}</Text>
          </TitleContent>

          <DateContent>
            <Title weight="bold">Data e hora</Title>
            <Text>
              {date} às {hour}
            </Text>
          </DateContent>

          <BadgeMeal>
            <Circle
              size={10}
              weight="fill"
              color={
                newMealState.isDiet
                  ? colors.product.green.dark
                  : colors.product.red.dark
              }
            />
            <Text>
              {newMealState.isDiet ? 'Dentro da dieta' : 'Fora da dieta'}
            </Text>
          </BadgeMeal>
        </View>

        <View style={{ width: '100%', rowGap: 15 }}>
          <Button
            title="Editar Refeição"
            Icon={PencilSimpleLine}
            onPress={handleEdit}
          />
          <Button
            title="Excluir Refeição"
            Icon={Trash}
            variant="ghost"
            onPress={handleRemoveMeal}
          />
        </View>
      </ContentContainer>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <OverlayModal>
          <ModalContent>
            <Title size="s_18" weight="bold" style={{ textAlign: 'center' }}>
              Deseja realmente excluir o registro da refeição?
            </Title>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <Button
                title="Cancelar"
                Icon={Trash}
                variant="ghost"
                style={{ width: '48%' }}
                onPress={() => setIsModalVisible(false)}
              />
              <Button
                title="Sim, excluir"
                Icon={PencilSimpleLine}
                style={{ width: '48%' }}
                onPress={removeMeal}
              />
            </View>
          </ModalContent>
        </OverlayModal>
      </Modal>
    </MealWrapper>
  )
}
