import { ArrowLeft } from 'phosphor-react-native'
import { ComponentProps } from 'react'
import { View } from 'react-native'
import { LinkContent, LinkWrapper } from './styles'

type LinkProps = ComponentProps<typeof LinkWrapper> & {
  to: '/home' | '/statistics' | '/newMeal'
  colorIcon?: string
  top?: number
  left?: number
}

export function Link({ to, top, left, colorIcon, ...rest }: LinkProps) {
  return (
    <LinkWrapper top={top} left={left} {...rest}>
      <LinkContent to={to}>
        <View>
          <ArrowLeft size={24} weight="bold" color={colorIcon} />
        </View>
      </LinkContent>
    </LinkWrapper>
  )
}
