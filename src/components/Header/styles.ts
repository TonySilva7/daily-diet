import styled from 'styled-components/native'

export type IHeaderProps = {
  variant?: 'primary' | 'secondary' | 'default'
  height?: 'default' | 'small'
}

export const HeaderWrapper = styled.View<IHeaderProps>`
  height: ${({ height }) => (height === 'small' ? 132 : 180)}px;
  width: 100%;
  flex-direction: row;
  background: ${({ theme, variant }) => {
    if (variant === 'primary') return theme.colors.product.green.light
    if (variant === 'secondary') return theme.colors.product.red.light
    return theme.colors.base.gray.gray5
  }};
`

export const HeaderContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
`
