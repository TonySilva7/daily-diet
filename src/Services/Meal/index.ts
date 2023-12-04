import { IMeal } from '@models/Meal'
import { IMealDTO } from './dto'

export interface IMealServiceDTO {
  toDTO: (meal: IMeal) => IMealDTO
  fromDTO: (meal: IMealDTO) => IMeal

  getMeals: () => Promise<IMealDTO[]>
  getMeal: (mealId: string) => Promise<IMealDTO>
  createMeal: (meal: IMealDTO) => Promise<void>
  updateMeal: (meal: IMealDTO) => Promise<void>
  deleteMeal: (mealId: string) => Promise<void>
}

export interface IMealService extends IMealServiceDTO {
  getTotalMeals: () => Promise<number>

  getMealsWithinDiets: () => Promise<number>
  getMealsOutsideDiets: () => Promise<number>
  getDietsOnPercentage: () => Promise<number>
  bestSequencePlates: () => Promise<number>
}
