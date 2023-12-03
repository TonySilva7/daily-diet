import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Logo } from '@components/Logo'
import { MealItem } from '@components/MealItem'
import { ResumeCard } from '@components/ResumeCard'
import { Title } from '@components/Title'
import { useNavigation } from '@react-navigation/native'
import { Plus } from 'phosphor-react-native'
import { ComponentProps } from 'react'
import { SafeAreaView, SectionList } from 'react-native'
import { useTheme } from 'styled-components/native'
import { DATA } from './mocks'
import { Header, HomeWrapper } from './styles'

type HomeProps = ComponentProps<typeof HomeWrapper>

export function Home({ ...rest }: HomeProps) {
  const { navigate } = useNavigation()

  const { colors } = useTheme()

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
          titleContent="90,86%"
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
          sections={DATA}
          keyExtractor={(item, index) => item.id + index}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          // ItemSeparatorComponent={() => <View style={{ marginVertical: 7 }} />}
          renderItem={({ item }) => (
            <MealItem
              hour={item.hour}
              foodName={item.name}
              badgeColor={item.hour === '20:00' ? 'primary' : 'secondary'}
              onPress={() => navigate('mealDetails', { mealId: item.id })}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Title size="s_18" weight="bold" margin={[15, 0, 0]}>
              {title}
            </Title>
          )}
        />
      </HomeWrapper>
    </SafeAreaView>
  )
}
