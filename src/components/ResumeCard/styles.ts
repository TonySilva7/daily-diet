import { ArrowUpRight } from 'phosphor-react-native'
import styled from 'styled-components/native'

type IResumeCardWrapperProps = {
  backColor: 'primary' | 'secondary'
  margin?: number[]
}

export const ResumeCardWrapper = styled.Pressable<IResumeCardWrapperProps>`
  position: relative;
  height: 102px;
  width: 100%;
  background: ${({ theme, backColor }) =>
    backColor === 'primary'
      ? theme.colors.product.green.light
      : theme.colors.product.red.light};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: ${({ margin }) => margin?.map((n) => `${n}px `) || '0px'};
`

export const Icon = styled(ArrowUpRight).attrs<IResumeCardWrapperProps>(
  ({ theme, backColor }) => ({
    color:
      backColor === 'primary'
        ? theme.colors.product.green.dark
        : theme.colors.product.red.dark,
    size: 20,
  }),
)`
  margin-left: 10px;
  position: absolute;
  right: 10px;
  top: 10px;
`
