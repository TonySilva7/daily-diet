import styled from 'styled-components/native'

export const ListItemWrapper = styled.Pressable`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.base.gray.gray4};
  border-radius: 6px;
  height: 49px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin: 5px 0;
`

export const Badge = styled.View<{ badgeColor: 'primary' | 'secondary' }>`
  height: 14px;
  width: 14px;
  border-radius: 1000px;
  background: ${({ theme, badgeColor }) =>
    badgeColor === 'primary'
      ? theme.colors.product.green.mid
      : theme.colors.product.red.mid};
`

export const TextContent = styled.View`
  /* flex: 1; */
  flex-direction: row;
  column-gap: 6px;
  align-items: center;
`
