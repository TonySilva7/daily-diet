import styled from 'styled-components/native'

export const Avatar = styled.Image.attrs({
  resizeMode: 'cover',
  width: 40,
  height: 40,
})`
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.base.gray.gray2};
  border-radius: 1000px;
`
