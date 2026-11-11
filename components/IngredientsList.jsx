export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>
      <span className="ingredient-name">{ingredient}</span>
      <button
        type="button"
        className="remove-ingredient-btn"
        onClick={() => props.removeIngredient(ingredient)}
        aria-label={`Remove ${ingredient}`}
        title={`Remove ${ingredient}`}
      >
        &times;
      </button>
    </li>
  ));

  return (
    <section className="ingredients-section">
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div ref={props.ref}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.getRecipe} disabled={props.loading}>
            {props.loading ? "Generating..." : "Get a recipe"}
          </button>
        </div>
      )}
    </section>
  );
}
