import styled from 'styled-components/native'

export const HomeWrapper = styled.View`
  background: ${({ theme }) => theme.colors.base.gray.gray7};
  padding: 0 17px;
  row-gap: 10px;
  height: 100%;
`

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
`
