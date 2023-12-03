import { ITitleProps, Title } from '@components/Title'
import { ComponentProps } from 'react'
import { Icon, ResumeCardWrapper } from './styles'

type ResumeCardProps = ComponentProps<typeof ResumeCardWrapper> & {
  titleStyle?: ITitleProps
  subTitleStyle?: ITitleProps
  titleContent: string
  subTitleContent: string
  backColor?: 'primary' | 'secondary'
  hasIcon?: boolean
  margin?: number[]
}

export function ResumeCard({
  titleStyle,
  subTitleStyle,
  titleContent,
  subTitleContent,
  backColor = 'primary',
  hasIcon = true,
  ...rest
}: ResumeCardProps) {
  return (
    <ResumeCardWrapper backColor={backColor} {...rest}>
      {hasIcon && <Icon backColor={backColor} />}
      <Title {...titleStyle}>{titleContent}</Title>
      <Title {...subTitleStyle}>{subTitleContent}</Title>
    </ResumeCardWrapper>
  )
}
