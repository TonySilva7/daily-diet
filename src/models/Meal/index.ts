export interface IMeal {
  id: string
  name: string
  description: string
  date: string
  hour: string
  isDiet: boolean | null
}

export interface IMealService {
  getMeals: () => Promise<IMeal[]>
  getMeal: (mealId: string) => Promise<IMeal | undefined>
  createMeal: (meal: IMeal) => Promise<void>
  updateMeal: (meal: IMeal) => Promise<void>
  deleteMeal: (mealId: string) => Promise<void>

  getTotalMeals: () => Promise<number>

  getMealsWithinDiets: () => Promise<number>
  getMealsOutsideDiets: () => Promise<number>
  getMealsWithinDietsInPercentage: () => Promise<number>
}
