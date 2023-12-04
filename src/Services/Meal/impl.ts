import { IMeal } from '@models/Meal'
import { IMealService } from '.'
import { IMealRepository } from '@repositories/Meal'
import { MealError } from '@utils/errors/meal'
import { IMealDTO } from './dto'
import { formatToDate } from '@utils/formatters/date'

export class MealService implements IMealService {
  mealRepository: IMealRepository

  constructor(mealRepository: IMealRepository) {
    this.mealRepository = mealRepository
  }

  toDTO(meal: IMeal): IMealDTO {
    return {
      id: meal.id,
      name: meal.name,
      description: meal.description,
      date: new Date(meal.date),
      hour: new Date(meal.hour),
      isDiet: meal.isDiet,
    }
  }

  fromDTO(meal: IMealDTO): IMeal {
    return {
      id: meal.id,
      name: meal.name,
      description: meal.description,
      date: meal.date.toISOString(),
      hour: meal.hour.toISOString(),
      isDiet: meal.isDiet,
    }
  }

  async getMeals(): Promise<IMealDTO[]> {
    const meals = (await this.mealRepository.getMeals()) as IMeal[]

    if (!meals) throw new MealError('A lista está vazia')

    const mealsDTO = meals.map((meal) => this.toDTO(meal))

    return mealsDTO
  }

  async getMeal(mealId: string): Promise<IMealDTO> {
    const meal = await this.mealRepository.getMeal(mealId)

    if (!meal) throw new MealError('Refeição não encontrada')

    const mealDTO = this.toDTO(meal)
    return mealDTO
  }

  async createMeal(meal: IMealDTO): Promise<void> {
    const toMeal = this.fromDTO(meal)
    await this.mealRepository.createMeal(toMeal)
  }

  async updateMeal(meal: IMealDTO): Promise<void> {
    const toMeal = this.fromDTO(meal)
    await this.mealRepository.updateMeal(toMeal)
  }

  async deleteMeal(mealId: string): Promise<void> {
    await this.mealRepository.deleteMeal(mealId)
  }

  async getTotalMeals(): Promise<number> {
    const meals = await this.mealRepository.getMeals()

    if (!meals) throw new MealError('A lista está vazia')

    return meals.length
  }

  async getMealsWithinDiets(): Promise<number> {
    const meals = await this.mealRepository.getMeals()

    if (!meals)
      throw new MealError('Sem dados para calcular pratos dentro da dieta')

    const mealsWithinDiets = meals.filter((meal) => meal.isDiet)

    if (!mealsWithinDiets) {
      throw new MealError('Nenhuma refeição encontrada dentro da dieta')
    }

    return mealsWithinDiets.length
  }

  async getMealsOutsideDiets(): Promise<number> {
    const meals = await this.mealRepository.getMeals()

    if (!meals)
      throw new MealError('Sem dados para calcular pratos fora da dieta')

    const mealsOutsideDiets = meals.filter((meal) => !meal.isDiet)

    if (!mealsOutsideDiets) {
      throw new MealError('Nenhuma refeição encontrada fora da dieta')
    }

    return mealsOutsideDiets.length
  }

  async getDietsOnPercentage(): Promise<number> {
    const mealsWithinDiets = await this.getMealsWithinDiets()
    const totalMeals = await this.getTotalMeals()
    const totalInPercentage = (mealsWithinDiets * 100) / totalMeals

    if (!totalInPercentage) {
      throw new MealError('Sem dados suficientes para calcular a porcentagem')
    }

    return totalInPercentage
  }

  async bestSequencePlates(): Promise<number> {
    const meals = await this.getMeals()

    const mealsInDiet = meals.filter((meal) => meal.isDiet)

    if (!mealsInDiet) {
      throw new MealError('Sem dados para calcular a melhor sequência')
    }

    let currentSequence: IMealDTO[] = []
    let longestSequence: IMealDTO[] = []

    mealsInDiet.forEach((meal: IMealDTO) => {
      const currDay =
        currentSequence.length > 0
          ? formatToDate(currentSequence[currentSequence.length - 1].date)
          : ''
      console.log('currDay: ', currDay)

      const mealDate = formatToDate(meal.date)
      console.log('mealDate: ', mealDate)

      const isSameDay = currDay === mealDate

      if (isSameDay) {
        longestSequence.push(meal)
      } else {
        // if not, verify if current sequence is bigger than longest sequence
        if (currentSequence.length > longestSequence.length) {
          longestSequence = currentSequence
        }

        // then, clean current sequence and add current plate
        currentSequence = []
        currentSequence.push(meal)
      }
    })

    return longestSequence.length
  }
}
