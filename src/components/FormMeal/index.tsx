import { ContentContainer } from '@components/ContentContainer'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Title } from '@components/Title'

import { Circle } from 'phosphor-react-native'
import { View, ViewProps } from 'react-native'
import { BottomContent } from './styles'
import { useMeal } from '@view-model/meal'

type FormMealProps = ViewProps & {
  onCreatedMeal: () => void
  mealId?: string
}

export function FormMeal({ onCreatedMeal, mealId, ...rest }: FormMealProps) {
  const { newMealState, setNewMealState } = useMeal()

  return (
    <ContentContainer style={{ justifyContent: 'space-between' }} {...rest}>
      {mealId && <Title>É EDIÇÃO: {mealId}</Title>}
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
          <Input label="Data" placeholder="Quando?" widthWrapper={48} />
          <Input label="Hora" placeholder="Que horas?" widthWrapper={48} />
        </View>

        <Title size="s_14" weight="bold">
          Está dentro da dieta?
        </Title>
        <BottomContent>
          <Button
            Icon={Circle}
            title="Sim"
            variant="primary"
            iconColor="green"
          />
          <Button Icon={Circle} title="Não" variant="primary" iconColor="red" />
        </BottomContent>
      </View>

      <Button
        title={mealId ? 'Salvar alterações' : 'Cadastrar Refeição'}
        onPress={onCreatedMeal}
      />
    </ContentContainer>
  )
}
