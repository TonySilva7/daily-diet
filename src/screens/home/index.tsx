import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Logo } from '@components/Logo'
import { MealItem } from '@components/MealItem'
import { ResumeCard } from '@components/ResumeCard'
import { Title } from '@components/Title'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { MealError } from '@utils/errors/meal'
import { formatToHour } from '@utils/formatters/date'
import { IPayload, useMeal } from '@view-model/meal'
import { Plus } from 'phosphor-react-native'
import { ComponentProps, useCallback, useState } from 'react'
import { SafeAreaView, SectionList } from 'react-native'
import { useTheme } from 'styled-components/native'
import { Header, HomeWrapper } from './styles'

type HomeProps = ComponentProps<typeof HomeWrapper>

export function Home({ ...rest }: HomeProps) {
  const [meals, setMeals] = useState<IPayload[]>([])
  const [mealsWithinDietsInPercentage, setMealsWithinDietsInPercentage] =
    useState<string>('0')
  const { colors } = useTheme()
  const { navigate } = useNavigation()
  const { getMeals, getMealsWithinDietsInPercentage } = useMeal()

  useFocusEffect(
    useCallback(() => {
      async function loadMeals() {
        try {
          const meals = await getMeals()
          setMeals(meals)

          const result = await getMealsWithinDietsInPercentage()
          setMealsWithinDietsInPercentage(result)
        } catch (error) {
          if (error instanceof MealError) {
            // setMealsWithinDietsInPercentage(0)
            // setMeals([])
          }

          console.log(error)
        }
      }

      loadMeals()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  // useEffect(() => {
  //   async function loadMeals() {
  //     const meals = await getMeals()
  //     setMeals(meals)

  //     const result = await getMealsWithinDietsInPercentage()
  //     setMealsWithinDietsInPercentage(result)
  //   }

  //   loadMeals()
  // }, [])

  return (
    <SafeAreaView style={{ backgroundColor: colors.base.gray.gray7 }}>
      <HomeWrapper {...rest}>
        <Header>
          <Logo />
          <Avatar
            source={{
              uri: 'https://github.com/TonySilva7.png',
            }}
            alt="Tony Silva"
          />
        </Header>

        <ResumeCard
          titleContent={`${mealsWithinDietsInPercentage}%`}
          subTitleContent="das refeições dentro da dieta"
          onPress={() => navigate('statistics')}
          titleStyle={{
            color: 'base.gray.gray2',
            size: 's_32',
            weight: 'bold',
          }}
          backColor="primary"
          margin={[2, 0, 20, 0]}
        />

        <Title>Refeições</Title>
        <Button
          title="Nova refeição"
          Icon={Plus}
          onPress={() => navigate('newMeal')}
        />

        <SectionList
          sections={meals}
          keyExtractor={(item, index) => item.id + index}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          // ItemSeparatorComponent={() => <View style={{ marginVertical: 7 }} />}
          renderItem={({ item }) => (
            <MealItem
              hour={formatToHour(item.hour)}
              foodName={item.name}
              badgeColor={item.isDiet ? 'primary' : 'secondary'}
              onPress={() => navigate('mealDetails', { mealId: item.id })}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Title size="s_18" weight="bold" margin={[15, 0, 0]}>
              {title.replaceAll('/', '.')}
            </Title>
          )}
          ListEmptyComponent={() => (
            <Title
              size="s_16"
              weight="bold"
              color="base.gray.gray3"
              margin={[15, 0, 0]}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                textAlign: 'center',
              }}
            >
              Lista vazia...
            </Title>
          )}
        />
      </HomeWrapper>
    </SafeAreaView>
  )
}
