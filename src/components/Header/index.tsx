import { Link } from '@components/Link'
import { Title } from '@components/Title'
import { Text, ViewProps } from 'react-native'
import { DefaultTheme, useTheme } from 'styled-components/native'
import { HeaderContent, HeaderWrapper, IHeaderProps } from './styles'

type HeaderProps = ViewProps &
  IHeaderProps & {
    title: string
    titleSize?: keyof DefaultTheme['fonts']['sizes']
    subTitle?: string
    linkTo: '/home' | '/statistics'
    topIcon?: number
    leftIcon?: number
  }

export function Header({
  linkTo,
  variant,
  title,
  subTitle,
  topIcon,
  leftIcon,
  titleSize = 's_32',
  height = 'default',
  ...rest
}: HeaderProps) {
  const { colors } = useTheme()

  const getColor = (param?: { isArrow?: boolean }) => {
    if (variant === 'primary') {
      return param?.isArrow
        ? colors.product.green.dark
        : colors.product.green.light
    } else if (variant === 'secondary') {
      return param?.isArrow ? colors.product.red.dark : colors.product.red.light
    }

    return param?.isArrow ? colors.base.gray.gray1 : colors.base.gray.gray4
  }

  return (
    <HeaderWrapper variant={variant} height={height} {...rest}>
      <Link
        to={linkTo}
        top={topIcon}
        left={leftIcon}
        colorIcon={getColor({ isArrow: true })}
      />
      <HeaderContent>
        <Title size={titleSize} weight="bold">
          {title}
        </Title>
        {subTitle && <Title size="s_14">{subTitle}</Title>}
      </HeaderContent>
    </HeaderWrapper>
  )
}
