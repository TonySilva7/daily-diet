import { IMeal } from '@models/Meal'

export interface IMealRepository {
  getMeals: () => Promise<IMeal[]>
  getMeal: (mealId: string) => Promise<IMeal>
  createMeal: (meal: IMeal) => Promise<void>
  updateMeal: (meal: IMeal) => Promise<void>
  deleteMeal: (mealId: string) => Promise<void>
}
