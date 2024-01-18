export interface Macronutrients {
  protein: number;
  carbohydrates: number;
  fat: number;
}

export interface FoodItem {
  food_name: string;
  servings: number;
  macronutrients: Macronutrients;
}

export interface Totals {
  total_calories: number;
  total_carbohydrates: number;
  total_fats: number;
  total_protein: number;
}

export interface Result {
  foods: FoodItem[];
  totals: Totals;
}
  