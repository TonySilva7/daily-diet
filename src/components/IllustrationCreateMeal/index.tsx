import { Title } from '@components/Title'
import { Image, ViewProps } from 'react-native'

import negativeImg from '@assets/imgs/bg-vector-not.png'
import positiveImg from '@assets/imgs/bg-vector-yes.png'
import { IllustrationCreateMealWrapper } from './styles'

type IllustrationCreateMealProps = ViewProps & {
  variant?: 'positive' | 'negative'
}

export function IllustrationCreateMeal({
  variant = 'positive',
  ...rest
}: IllustrationCreateMealProps) {
  return (
    <IllustrationCreateMealWrapper {...rest}>
      <Title
        size="s_24"
        weight="bold"
        color={
          variant === 'positive' ? 'product.green.dark' : 'product.red.dark'
        }
      >
        {variant === 'positive' ? 'Continue assim!' : 'Que pena!'}
      </Title>
      {variant === 'positive' ? (
        <Title>
          Você continua <Title weight="bold">dentro da dieta</Title> . Muito
          bem!
        </Title>
      ) : (
        <Title style={{ textAlign: 'center' }}>
          Você <Title weight="bold">saiu da dieta</Title> dessa vez, mas
          continue se esforçando e não desista!
        </Title>
      )}

      <Image
        source={variant === 'positive' ? positiveImg : negativeImg}
        alt="imagem de fundo"
        style={{ marginTop: 30, marginBottom: 30 }}
      />
    </IllustrationCreateMealWrapper>
  )
}
