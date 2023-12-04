import { Button } from '@components/Button'
import { ContentContainer } from '@components/ContentContainer'
import { Input } from '@components/Input'
import { Title } from '@components/Title'

import DateTimePicker from '@react-native-community/datetimepicker'
import { MealError } from '@utils/errors/meal'
import { useMeal } from '@view-model/meal'
import { Circle } from 'phosphor-react-native'
import { Alert, View, ViewProps } from 'react-native'
import { BottomContent } from './styles'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

type FormMealProps = ViewProps & {
  // onCreatedMeal: () => void
  mealId?: string
}

export function FormMeal({ mealId, ...rest }: FormMealProps) {
  const { newMealState, setNewMealState, createMeal, getMeal, updateMeal } =
    useMeal()
  const { navigate } = useNavigation()

  const validateForm = () => {
    const isValidName = newMealState.name.length > 0
    if (!isValidName) {
      throw new MealError('Preencha o nome da refeição')
    }
    const isValidDescription = newMealState.description.length > 0
    if (!isValidDescription) {
      throw new MealError('Preencha a descrição da refeição')
    }
    const isValidDate =
      newMealState.date !== null &&
      newMealState.date.getTime() <= new Date().getTime()
    if (!isValidDate) {
      throw new MealError('Data da refeição inválida')
    }
    const isValidHour = newMealState.hour !== null
    if (!isValidHour) {
      throw new MealError('Hora da refeição inválida')
    }

    const isValidIsDiet = newMealState.isDiet !== null
    if (!isValidIsDiet) {
      throw new MealError('Selecione se a refeição está dentro da dieta')
    }

    return (
      isValidName &&
      isValidDescription &&
      isValidDate &&
      isValidHour &&
      isValidIsDiet
    )
  }

  const handleCreateMeal = async () => {
    try {
      const isValid = validateForm()

      if (!isValid) {
        throw new MealError('Preencha todos os campos')
      }

      if (mealId) {
        await updateMeal(newMealState)
      } else {
        await createMeal(newMealState)
      }

      setNewMealState({
        id: '',
        name: '',
        description: '',
        date: new Date(),
        hour: new Date(),
        isDiet: null,
      })

      return navigate('confirmCreateMeal', {
        isWithinDiets: newMealState.isDiet as boolean,
      })
    } catch (error) {
      if (error instanceof MealError) {
        Alert.alert(error.message)
      } else {
        Alert.alert('Erro ao criar refeição')
      }
    }
  }

  useEffect(() => {
    async function loadMeal() {
      const meal = await getMeal(mealId as string)
      setNewMealState(meal)
    }

    if (mealId) {
      loadMeal()
    }
  }, [mealId])

  return (
    <ContentContainer style={{ justifyContent: 'space-between' }} {...rest}>
      <View style={{ width: '100%', rowGap: 18 }}>
        <Input
          label="Nome da refeição"
          placeholder="Qual refeição?"
          value={newMealState.name}
          onChangeText={(text) =>
            setNewMealState({ ...newMealState, name: text })
          }
        />
        <Input
          label="Descrição"
          height={120}
          placeholder="Sobre a refeição"
          textAlignVertical="top"
          multiline
          value={newMealState.description}
          onChangeText={(text) =>
            setNewMealState({ ...newMealState, description: text })
          }
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <View
            style={{
              height: 60,
            }}
          >
            <Title
              size="s_14"
              weight="bold"
              style={{ marginLeft: 10, marginBottom: 2 }}
            >
              Data
            </Title>
            <DateTimePicker
              testID="datePicker"
              value={newMealState.date}
              mode={'date'}
              is24Hour={true}
              onChange={(event, selectedDate) =>
                setNewMealState({ ...newMealState, date: selectedDate as Date })
              }
              style={{ margin: 0, padding: 0, flex: 1 }}
            />
          </View>

          <View
            style={{
              height: 60,
            }}
          >
            <Title
              size="s_14"
              weight="bold"
              style={{ marginLeft: 10, marginBottom: 2 }}
            >
              Hora
            </Title>
            <DateTimePicker
              testID="timePicker"
              value={newMealState.hour}
              mode={'time'}
              is24Hour={true}
              onChange={(event, selectedDate) =>
                setNewMealState({ ...newMealState, hour: selectedDate as Date })
              }
            />
          </View>

          {/* <Input label="Data" placeholder="Quando?" widthWrapper={48} />
          <Input label="Hora" placeholder="Que horas?" widthWrapper={48} /> */}
        </View>

        <Title size="s_14" weight="bold">
          Está dentro da dieta?
        </Title>
        <BottomContent>
          <Button
            Icon={Circle}
            title="Sim"
            variant={newMealState.isDiet ? 'success' : 'primary'}
            iconColor="green"
            onPress={() => setNewMealState({ ...newMealState, isDiet: true })}
          />
          <Button
            Icon={Circle}
            title="Não"
            variant={
              newMealState.isDiet === false && newMealState.isDiet !== null
                ? 'error'
                : 'primary'
            }
            iconColor="red"
            onPress={() => setNewMealState({ ...newMealState, isDiet: false })}
          />
        </BottomContent>
      </View>

      <Button
        title={mealId ? 'Salvar alterações' : 'Cadastrar Refeição'}
        onPress={handleCreateMeal}
      />
    </ContentContainer>
  )
}
