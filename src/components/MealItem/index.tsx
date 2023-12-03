import { Title } from '@components/Title'
import { PressableProps } from 'react-native'
import { Badge, ListItemWrapper, TextContent } from './styles'

type ListItemProps = PressableProps & {
  hour: string
  foodName: string
  badgeColor: 'primary' | 'secondary'
}

export function MealItem({
  hour,
  foodName,
  badgeColor,
  ...rest
}: ListItemProps) {
  return (
    <ListItemWrapper {...rest}>
      <TextContent>
        <Title weight="bold" size="s_12">
          {hour}
        </Title>
        <Title color="base.gray.gray4" size="s_16">
          |
        </Title>
        <Title size="s_16">{foodName}</Title>
      </TextContent>

      <Badge badgeColor={badgeColor} />
    </ListItemWrapper>
  )
}
