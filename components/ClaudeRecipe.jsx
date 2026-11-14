export default function ClaudeRecipe({ recipe, onSave, isSaved }) {
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
