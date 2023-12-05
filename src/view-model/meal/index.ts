import { MealRepository } from '@repositories/Meal/impl'
import { IMealDTO } from '@services/Meal/dto'
import { MealService } from '@services/Meal/impl'
import { formatToDate } from '@utils/formatters/date'
import { useState } from 'react'

export type IPayload = {
  title: string
  data: IMealDTO[]
}

export const useMeal = () => {
  const mealRepo = new MealRepository()
  const mealServices = new MealService(mealRepo)

  const [newMealState, setNewMealState] = useState<IMealDTO>({
    id: new Date().getTime().toString(),
    name: '',
    description: '',
    date: new Date(),
    hour: new Date(),
    isDiet: null,
  })

  return {
    newMealState,
    setNewMealState,

    getMeals: async (): Promise<IPayload[]> => {
      const meals = await mealServices.getMeals()

      const mealsGroupedByDate = meals.reduce(
        (acc: IPayload[], meal: IMealDTO): IPayload[] => {
          const date = formatToDate(meal.date)

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

    getMeal: async (mealId: string): Promise<IMealDTO> => {
      const meal = await mealServices.getMeal(mealId)

      return meal
    },

    createMeal: async (meal: IMealDTO): Promise<void> => {
      await mealServices.createMeal(meal)
    },

    updateMeal: async (meal: IMealDTO): Promise<void> => {
      await mealServices.updateMeal(meal)
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

    getMealsWithinDietsInPercentage: async (): Promise<string> => {
      const mealsWithinDietsInPercentage =
        await mealServices.getDietsOnPercentage()

      return mealsWithinDietsInPercentage.toFixed(0)
    },

    getBestSequencePlates: async (): Promise<number> => {
      const bestSequencePlates = await mealServices.bestSequencePlates()

      return bestSequencePlates
    },
  }
}
