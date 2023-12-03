import styled from 'styled-components/native'

export type IStatsCardWrapperProps = {
  variant?: 'primary' | 'secondary' | 'default'
  width?: number
}

export const StatsCardWrapper = styled.View<IStatsCardWrapperProps>`
  align-items: center;
  justify-content: center;
  height: 89px;
  width: ${({ width }) => width || 100}%;
  border-radius: 8px;
  background-color: ${({ theme, variant = 'default' }) => {
    if (variant === 'primary') return theme.colors.product.green.light
    if (variant === 'secondary') return theme.colors.product.red.light
    return theme.colors.base.gray.gray5
  }};
`
