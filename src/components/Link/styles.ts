import { Link } from '@react-navigation/native'
import styled from 'styled-components/native'

export const LinkWrapper = styled.View<{ top?: number; left?: number }>`
  position: absolute;
  height: 35px;
  align-items: center;
  justify-content: center;
  top: ${({ top }) => top || 0}px;
  left: ${({ left }) => left || 0}px;
  z-index: 99;
`

export const LinkContent = styled(Link)``
