import { Header } from '@components/Header'
import { IHeaderProps } from '@components/Header/styles'
import { StatsCard } from '@components/StatsCard'
import { Title } from '@components/Title'
import { ViewProps } from 'react-native'
import { BottomContent, Container } from './styles'
import { ContentContainer } from '@components/ContentContainer'

type StatisticsProps = ViewProps

export function Statistics({ ...rest }: StatisticsProps) {
  const variant: IHeaderProps['variant'] = 'primary'

  return (
    <Container {...rest}>
      <Header
        title="30,21%"
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
          title="22"
          subtitle="Melhor sequência de pratos dentro da dieta"
        />
        <StatsCard title="109" subtitle="refeições registradas" />
        <BottomContent>
          <StatsCard
            title="32"
            subtitle="refeições dentro da dieta"
            variant="primary"
            width={48}
          />
          <StatsCard
            title="77"
            subtitle="refeições fora da dieta"
            variant="secondary"
            width={48}
          />
        </BottomContent>
      </ContentContainer>
    </Container>
  )
}
