import { Header } from '@components/Header'
import { IHeaderProps } from '@components/Header/styles'
import { StatsCard } from '@components/StatsCard'
import { Title } from '@components/Title'
import { ViewProps } from 'react-native'
import { BottomContent, Container } from './styles'
import { ContentContainer } from '@components/ContentContainer'
import { useMeal } from '@view-model/meal'
import { useEffect, useState } from 'react'

type StatisticsProps = ViewProps

export function Statistics({ ...rest }: StatisticsProps) {
  const variant: IHeaderProps['variant'] = 'primary'
  const [stats, setStats] = useState({
    totalMeals: 0,
    mealsWithinDiets: 0,
    mealsOutsideDiets: 0,
    mealsDietsInPercentage: '0',
    bestSequence: 0,
  })

  const {
    getMealsOutsideDiets,
    getMealsWithinDiets,
    getMealsWithinDietsInPercentage,
    getTotalMeals,
    getBestSequencePlates,
  } = useMeal()

  useEffect(() => {
    async function loadStats() {
      const totalMeals = await getTotalMeals()
      const mealsWithinDiets = await getMealsWithinDiets()
      const mealsOutsideDiets = await getMealsOutsideDiets()
      const mealsDietsInPercentage = await getMealsWithinDietsInPercentage()
      const bestSequence = await getBestSequencePlates()

      setStats({
        totalMeals,
        mealsWithinDiets,
        mealsOutsideDiets,
        mealsDietsInPercentage,
        bestSequence,
      })
    }

    loadStats()
  }, [])

  return (
    <Container {...rest}>
      <Header
        title={`${stats.mealsDietsInPercentage}%`}
        subTitle="das refeições dentro da dieta"
        variant={variant}
        linkTo="/home"
        topIcon={60}
        leftIcon={20}
      />

      <ContentContainer style={{ height: '83%' }}>
        <Title size="s_14" weight="bold">
          Estatísticas gerais
        </Title>
        <StatsCard
          title={stats.bestSequence.toString()}
          subtitle="Melhor sequência de pratos dentro da dieta"
        />
        <StatsCard
          title={stats.totalMeals.toString()}
          subtitle="refeições registradas"
        />
        <BottomContent>
          <StatsCard
            title={stats.mealsWithinDiets.toString()}
            subtitle="refeições dentro da dieta"
            variant="primary"
            width={48}
          />
          <StatsCard
            title={stats.mealsOutsideDiets.toString()}
            subtitle="refeições fora da dieta"
            variant="secondary"
            width={48}
          />
        </BottomContent>
      </ContentContainer>
    </Container>
  )
}
