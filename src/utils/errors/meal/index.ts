export class MealError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MealError'
  }
}
