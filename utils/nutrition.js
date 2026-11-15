function nutritionValues(nutritionData) {
  const nutrients = nutritionData?.nutrition?.nutrients;

  if (!Array.isArray(nutrients)) {
    console.warn("Invalid or missing nutrition data provided.");
    return {
      calories: null,
      protein: null,
      carbohydrates: null,
      fat: null,
    };
  }

  const getNutrient = (name) =>
    nutrients.find((nutrient) => nutrient?.name === name) ?? null;

  return {
    calories: getNutrient("Calories"),
    protein: getNutrient("Protein"),
    carbohydrates: getNutrient("Carbohydrates"),
    fat: getNutrient("Fat"),
  };
}

export default nutritionValues;
