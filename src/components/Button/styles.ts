import styled, { css } from 'styled-components/native'

export type IButtonProps = {
  variant?: 'primary' | 'success' | 'error' | 'default' | 'ghost'
}

export const ButtonWrapper = styled.TouchableOpacity<IButtonProps>`
  ${({ theme, variant = 'default' }) => {
    if (variant === 'primary') {
      return css`
        background-color: ${theme.colors.base.gray.gray5};
        width: 48%;
      `
    }
    if (variant === 'success') {
      return css`
        background-color: ${theme.colors.product.green.light};
        border-width: 1px;
        border-color: ${theme.colors.product.green.dark};
        width: 48%;
      `
    }
    if (variant === 'error') {
      return css`
        background-color: ${theme.colors.product.red.light};
        border-width: 1px;
        border-color: ${theme.colors.product.red.dark};
        width: 48%;
      `
    }
    if (variant === 'ghost') {
      return css`
        background-color: transparent;
        border-width: 1px;
        border-color: ${theme.colors.base.gray.gray1};
        width: 100%;
      `
    }
    return css`
      background-color: ${theme.colors.base.gray.gray1};
      width: 100%;
    `
  }}
  height: 50px;
  /* width: 100%; */
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  column-gap: ${({ theme }) => theme.fonts.sizes.s_12 - 6}px;
`
