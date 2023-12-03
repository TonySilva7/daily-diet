import { Title } from '@components/Title'
import { TextInputProps } from 'react-native'
import { CustomInput, IInputProps, InputWrapper } from './styles'

type InputCustomProps = TextInputProps &
  IInputProps & {
    label: string
    widthWrapper?: number
  }

export function Input({
  label,
  width = 100,
  height = 48,
  widthWrapper = 100,
  ...rest
}: InputCustomProps) {
  return (
    <InputWrapper widthWrapper={widthWrapper}>
      <Title weight="bold">{label}</Title>
      <CustomInput width={width} height={height} {...rest} />
    </InputWrapper>
  )
}
