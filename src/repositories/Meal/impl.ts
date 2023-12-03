import { IMeal } from '@models/Meal'
import { IMealRepository } from '.'
import AsyncStorage, {
  AsyncStorageStatic,
} from '@react-native-async-storage/async-storage'

export class MealRepository implements IMealRepository {
  static MEAL_KEY = '@daily-diet:meals'
  _store: AsyncStorageStatic = AsyncStorage

  async getMeals(): Promise<IMeal[]> {
    const meals = await this._store.getItem(MealRepository.MEAL_KEY)
    return JSON.parse(meals || '[]')
  }

  async getMeal(mealId: string): Promise<IMeal> {
    const meals = await this.getMeals()

    if (!meals) throw new Error('Refeição não encontrada!')

    const meal = meals.find((meal) => meal.id === mealId)

    if (!meal) throw new Error('Meal not found')

    return meal
  }

  async createMeal(meal: IMeal): Promise<void> {
    const meals = await this.getMeals()
    meals.push(meal)
    await this._store.setItem(MealRepository.MEAL_KEY, JSON.stringify(meals))
  }

  async updateMeal(currentMeal: IMeal): Promise<void> {
    const meals = await this.getMeals()
    const mealIndex = meals.findIndex(
      (oldMeal) => oldMeal.id === currentMeal.id,
    )

    if (mealIndex === -1) throw new Error('Meal not found')

    meals[mealIndex] = currentMeal

    await this._store.setItem(MealRepository.MEAL_KEY, JSON.stringify(meals))
  }

  async deleteMeal(mealId: string): Promise<void> {
    const meals = await this.getMeals()
    const mealIndex = meals.findIndex((meal) => meal.id === mealId)

    if (mealIndex === -1) throw new Error('Meal not found')

    meals.splice(mealIndex, 1)

    await this._store.setItem(MealRepository.MEAL_KEY, JSON.stringify(meals))
  }
}
