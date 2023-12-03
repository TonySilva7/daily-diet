import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ConfirmCreateMeal } from '@screens/ConfirmCreateMeal'
import { Home } from '@screens/Home'
import { Meal } from '@screens/Meal'
import { NewMeal } from '@screens/NewMeal'
import { Statistics } from '@screens/Statistic'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home"
    >
      <Screen name="home" component={Home} />
      <Screen name="statistics" component={Statistics} />
      <Screen name="newMeal" component={NewMeal} />
      <Screen name="confirmCreateMeal" component={ConfirmCreateMeal} />
      <Screen name="mealDetails" component={Meal} />
    </Navigator>
  )
}
