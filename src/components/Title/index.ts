import styled, { DefaultTheme } from 'styled-components/native'

type IParamBase =
  `${keyof DefaultTheme['colors']['base']}.${keyof DefaultTheme['colors']['base']['gray']}`
type IBase = `base.${IParamBase}`

type IParamProduct =
  `${keyof DefaultTheme['colors']['product']}.${keyof DefaultTheme['colors']['product']['green']}`
type IProduct = `product.${IParamProduct}`

export type ITitleProps = {
  size?: keyof DefaultTheme['fonts']['sizes']
  weight?: keyof DefaultTheme['fonts']['family']
  margin?: number[]
  color?: IBase | IProduct
}

const getColorByTheme = (theme: DefaultTheme, color: IBase | IProduct) => {
  if (color.includes('base')) {
    const [base, gray, hex] = color.split('.')
    const key1 = base as 'base'
    const key2 = gray as keyof DefaultTheme['colors']['base']
    const key3 = hex as keyof DefaultTheme['colors']['base']['gray']

    return theme.colors[key1][key2][key3]
  }

  const [product, clr, hex] = color.split('.')
  const key1 = product as 'product'
  const key2 = clr as keyof DefaultTheme['colors']['product']
  const key3 = hex as keyof DefaultTheme['colors']['product']['green']

  return theme.colors[key1][key2][key3]
}

export const Title = styled.Text<ITitleProps>`
  color: ${({ theme, color }) =>
    color ? getColorByTheme(theme, color) : theme.colors.base.gray.gray1};

  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme, size: titleSize }) =>
    theme.fonts.sizes[titleSize || 's_14']}px;
  font-family: ${({ theme, weight }) =>
    theme.fonts.family[weight || 'regular']};
  margin: ${({ margin }) => margin?.map((n) => `${n}px `) || '0px'};
`
