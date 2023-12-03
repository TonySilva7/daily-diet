import { Text, ViewProps } from 'react-native'
import { IStatsCardWrapperProps, StatsCardWrapper } from './styles'
import { Title } from '@components/Title'

type StatsCardProps = ViewProps &
  IStatsCardWrapperProps & {
    title: string
    subtitle: string
  }

export function StatsCard({ title, subtitle, ...rest }: StatsCardProps) {
  return (
    <StatsCardWrapper {...rest}>
      <Title size="s_24" weight="bold">
        {title}
      </Title>
      <Title>{subtitle}</Title>
    </StatsCardWrapper>
  )
}
