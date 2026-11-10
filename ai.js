const API_URL = "http://localhost:3001/api/recipes";

export async function generateRecipe(ingredientsArr) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsArr,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate recipe.");
    }

    return data.recipe;
  } catch (error) {
    console.error("Recipe generation error:", error);
    throw error;
  }
}
