import { IMeal } from '.'

export class Meal implements IMeal {
  id: string
  name: string
  description: string
  date: Date
  hour: Date
  isDiet: boolean

  constructor(meal: IMeal) {
    this.id = meal.id
    this.name = meal.name
    this.description = meal.description
    this.date = meal.date
    this.hour = meal.hour
    this.isDiet = meal.isDiet
  }
}
