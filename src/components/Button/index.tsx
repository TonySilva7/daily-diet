import { Title } from '@components/Title'
import { IconProps } from 'phosphor-react-native'
import { ComponentType } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { DefaultTheme, useTheme } from 'styled-components/native'
import { ButtonWrapper, IButtonProps } from './styles'

type ButtonProps = TouchableOpacityProps &
  IButtonProps & {
    title: string
    Icon?: ComponentType<IconProps>
    iconColor?: keyof DefaultTheme['colors']['product']
    callback?: () => void
  }

export function Button({
  callback,
  Icon,
  title,
  variant,
  iconColor,
  ...rest
}: ButtonProps) {
  const { fonts, colors } = useTheme()

  const notIsDefaultOrGhost =
    variant === 'primary' || variant === 'success' || variant === 'error'
  const isOnlyGhost = variant === 'ghost'
  return (
    <ButtonWrapper onPress={callback} variant={variant} {...rest}>
      {Icon && (
        <Icon
          size={notIsDefaultOrGhost ? fonts.sizes.s_12 : fonts.sizes.s_18}
          weight={notIsDefaultOrGhost ? 'fill' : 'bold'}
          color={
            iconColor
              ? colors.product[iconColor || 'green'].dark
              : isOnlyGhost
                ? colors.base.gray.gray1
                : colors.base.gray.white
          }
        />
      )}
      <Title
        color={
          notIsDefaultOrGhost || isOnlyGhost
            ? 'base.gray.gray1'
            : 'base.gray.white'
        }
        weight="bold"
        size="s_14"
      >
        {title}
      </Title>
    </ButtonWrapper>
  )
}
