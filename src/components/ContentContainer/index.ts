import styled from 'styled-components/native'

export const ContentContainer = styled.View`
  padding: 45px 20px 22px 20px;
  align-items: center;
  width: 100%;
  height: 87%;
  background-color: ${({ theme }) => theme.colors.base.gray.gray7};
  border-radius: 15px 15px 0 0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  row-gap: 15px;
  position: absolute;
  bottom: 0;
`
