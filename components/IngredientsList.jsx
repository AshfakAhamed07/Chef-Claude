export default function IngredientsList(props) {
  function handleSave(formData) {
    const newName = formData.get("editedIngredient");
    props.saveIngredient(props.editingIngredient, newName);
  }

  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>
      {props.editingIngredient === ingredient ? (
        <form action={handleSave} className="edit-ingredient-form">
          <input
            type="text"
            name="editedIngredient"
            defaultValue={ingredient}
            aria-label={`Edit ${ingredient}`}
            autoFocus
          />
          <div className="ingredient-actions">
            <button type="submit" className="save-ingredient-btn">
              Save
            </button>
            <button
              type="button"
              className="cancel-ingredient-btn"
              onClick={props.cancelEditing}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <span className="ingredient-name">{ingredient}</span>
          <div className="ingredient-actions">
            <button
              type="button"
              className="edit-ingredient-btn"
              onClick={() => props.startEditing(ingredient)}
              aria-label={`Edit ${ingredient}`}
            >
              Edit
            </button>
            <button
              type="button"
              className="remove-ingredient-btn"
              onClick={() => props.removeIngredient(ingredient)}
              aria-label={`Remove ${ingredient}`}
              title={`Remove ${ingredient}`}
            >
              &times;
            </button>
          </div>
        </>
      )}
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
