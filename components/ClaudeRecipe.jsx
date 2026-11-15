import nutritionValues from "../utils/nutrition";

function formatNutrient(nutrient) {
  if (nutrient?.amount == null) {
    return "—";
  }

  const amount =
    nutrient.unit === "kcal"
      ? Math.round(nutrient.amount)
      : Number(nutrient.amount.toFixed(1));

  return `${amount} ${nutrient.unit ?? ""}`.trim();
}

export default function ClaudeRecipe({
  recipe,
  onSave,
  isSaved,
  nutritionData,
}) {
  const { calories, protein, carbohydrates, fat } =
    nutritionValues(nutritionData);

  const hasNutrition = [calories, protein, carbohydrates, fat].some(
    (nutrient) => nutrient != null,
  );

  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <div className="recipe-header">
        <h2>Chef Claude Recommends:</h2>

        <button
          type="button"
          className="save-recipe-btn"
          onClick={onSave}
          disabled={isSaved}
          aria-pressed={isSaved}
        >
          {isSaved ? "Saved to Favourites" : "Save Recipe"}
        </button>
      </div>

      <article>
        <h2>{recipe.title}</h2>

        <p>{recipe.description}</p>

        <div className="recipe-details">
          <p>Prep time: {recipe.prepTimeMinutes} minutes</p>
          <p>Cook time: {recipe.cookTimeMinutes} minutes</p>
          <p>Servings: {recipe.servings}</p>
        </div>

        {hasNutrition && (
          <div className="nutrition-card">
            <h3>Nutritional Breakdown (Estimated per Serving)</h3>
            <div className="nutrition-grid">
              <div className="nutrition-item">
                <span className="nutrition-value">
                  {formatNutrient(calories)}
                </span>
                <span className="nutrition-label">Calories</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-value">
                  {formatNutrient(protein)}
                </span>
                <span className="nutrition-label">Protein</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-value">
                  {formatNutrient(carbohydrates)}
                </span>
                <span className="nutrition-label">Carbs</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-value">{formatNutrient(fat)}</span>
                <span className="nutrition-label">Fats</span>
              </div>
            </div>
          </div>
        )}

        <h3>Ingredients</h3>

        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.quantity} {ingredient.name}
            </li>
          ))}
        </ul>

        <h3>Instructions</h3>

        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </article>
    </section>
  );
}
