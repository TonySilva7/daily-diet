import { Button } from '@components/Button'
import { ContentContainer } from '@components/ContentContainer'
import { Header } from '@components/Header'
import { Title } from '@components/Title'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Circle, PencilSimpleLine, Trash } from 'phosphor-react-native'
import { Modal, Text, View, ViewProps } from 'react-native'
import { useTheme } from 'styled-components/native'
import {
  BadgeMeal,
  DateContent,
  MealWrapper,
  ModalContent,
  OverlayModal,
  TitleContent,
} from './styles'
import { useState } from 'react'

type MealProps = ViewProps

type RouteParams = {
  mealId?: string
}

export function Meal({ ...rest }: MealProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { colors } = useTheme()

  const { navigate } = useNavigation()
  const { params } = useRoute()

  const { mealId } = params as RouteParams

  function removeMeal() {
    // remover
    setIsModalVisible(false)
  }

  function handleRemoveMeal() {
    setIsModalVisible(true)
  }

  function handleEdit() {
    navigate('newMeal', { mealId })
  }

  return (
    <MealWrapper {...rest}>
      <Header
        title="Nova refeição"
        linkTo="/home"
        topIcon={55}
        leftIcon={20}
        titleSize="s_18"
        height="small"
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
              Sanduíche {mealId}
            </Title>
            <Text>
              Sanduíche de pão integral com atum e salada de alface e tomate
            </Text>
          </TitleContent>

          <DateContent>
            <Title weight="bold">Data e hora</Title>
            <Text>12/08/2022 às 16:00</Text>
          </DateContent>

          <BadgeMeal>
            <Circle size={10} weight="fill" color={colors.product.green.dark} />
            <Text>Dentro da dieta</Text>
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
