import styled from 'styled-components/native'

export type IInputProps = {
  width?: number
  height?: number
}

export const InputWrapper = styled.View<{ widthWrapper?: number }>`
  width: ${({ widthWrapper }) => widthWrapper}%;
`

export const CustomInput = styled.TextInput.attrs<IInputProps>(({ theme }) => ({
  placeholderTextColor: theme.colors.base.gray.gray5,
}))`
  border-color: ${({ theme }) => theme.colors.base.gray.gray5};
  border-width: 1px;
  width: ${({ width }) => width}%;
  height: ${({ height }) => height}px;
  border-radius: 7px;
  padding: 10px;
  margin-top: 5px;
`
