import { IMeal } from '.'

export class Meal implements IMeal {
  id: string
  name: string
  description: string
  date: string
  hour: string
  isDiet: boolean | null

  constructor(meal: IMeal) {
    this.id = meal.id
    this.name = meal.name
    this.description = meal.description
    this.date = meal.date
    this.hour = meal.hour
    this.isDiet = meal.isDiet
  }
}
