import { IAppTheme } from '@theme/index'
import 'styled-components/native'

declare module 'styled-components/native' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends IAppTheme {}
}
