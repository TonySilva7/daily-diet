export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined
      statistics: undefined
      newMeal: { mealId?: string } | undefined
      confirmCreateMeal: undefined
      mealDetails: { mealId: string }
    }
  }
}
