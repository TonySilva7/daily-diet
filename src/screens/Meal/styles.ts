import styled from 'styled-components/native'

export const MealWrapper = styled.View`
  position: relative;
  height: 100%;
`

export const BadgeMeal = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  height: 34px;
  width: 144px;
  border-radius: 1000px;
  background: ${({ theme }) => theme.colors.base.gray.gray6};
`

export const DateContent = styled.View`
  row-gap: 8px;
`

export const TitleContent = styled.View`
  row-gap: 8px;
`

export const OverlayModal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`

export const ModalContent = styled.View`
  /* height: 192px; */
  width: 327px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  row-gap: 12px;
`
