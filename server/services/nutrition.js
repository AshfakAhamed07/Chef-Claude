const SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes/analyze";

async function analyzeRecipe(recipeData) {
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!apiKey) {
    throw new Error("Spoonacular API key is missing.");
  }

  const response = await fetch(
    `${SPOONACULAR_API_URL}?apiKey=${encodeURIComponent(apiKey)}&includeNutrition=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: recipeData.title,
        servings: recipeData.servings,
        ingredients: recipeData.ingredients.map(
          (ingredient) => `${ingredient.quantity} ${ingredient.name}`,
        ),
        instructions: recipeData.instructions.join("\n"),
      }),
    },
  );

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Spoonacular returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(
      data.message || `Spoonacular API error: ${response.status}`,
    );
  }

  return data;
}

module.exports = analyzeRecipe;
