import { IMeal } from '@models/Meal'
import { MealRepository } from '@repositories/Meal/impl'
import { IMealDTO } from '@services/Meal/dto'
import { MealService } from '@services/Meal/impl'
import { useState } from 'react'

export type IPayload = {
  title: string
  data: IMealDTO[]
}

export const useMeal = () => {
  const mealRepo = new MealRepository()
  const mealServices = new MealService(mealRepo)
  const [newMealState, setNewMealState] = useState<IMeal>({
    id: new Date().getTime().toString(),
    name: '',
    description: '',
    date: new Date(),
    hour: new Date(),
    isDiet: false,
  })

  return {
    newMealState,
    setNewMealState,

    getMeals: async (): Promise<IPayload[]> => {
      const meals = await mealServices.getMeals()

      const mealsGroupedByDate = meals.reduce(
        (acc: IPayload[], meal: IMealDTO): IPayload[] => {
          const date = meal.date

          const mealGroup = acc.find((group) => group.title === date)

          if (!mealGroup) {
            acc.push({
              title: date,
              data: [meal],
            })
          } else {
            mealGroup.data.push(meal)
          }

          return acc
        },
        [],
      )

      return mealsGroupedByDate
    },
    getMeal: async (mealId: string): Promise<IMeal> => {
      const meal = await mealServices.getMeal(mealId)
      const toMeal = mealServices.fromDTO(meal)
      return toMeal
    },
    createMeal: async (meal: IMeal): Promise<void> => {
      await mealServices.createMeal(meal)
    },
    updateMeal: async (meal: IMeal): Promise<void> => {
      const toMealDTO = mealServices.toDTO(meal)
      await mealServices.updateMeal(toMealDTO)
    },
    deleteMeal: async (mealId: string): Promise<void> => {
      await mealServices.deleteMeal(mealId)
    },
    getTotalMeals: async (): Promise<number> => {
      const totalMeals = await mealServices.getTotalMeals()
      return totalMeals
    },
    getMealsWithinDiets: async (): Promise<number> => {
      const mealsWithinDiets = await mealServices.getMealsWithinDiets()
      return mealsWithinDiets
    },
    getMealsOutsideDiets: async (): Promise<number> => {
      const mealsOutsideDiets = await mealServices.getMealsOutsideDiets()
      return mealsOutsideDiets
    },
    getMealsWithinDietsInPercentage: async (): Promise<number> => {
      const mealsWithinDietsInPercentage =
        await mealServices.getMealsWithinDietsInPercentage()
      return mealsWithinDietsInPercentage
    },
  }
}
