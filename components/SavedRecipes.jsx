export default function SavedRecipes({ favourites, onSelect, onDelete }) {
  if (!favourites || favourites.length === 0) {
    return null;
  }

  function getRecipeTitle(markdown) {
    const firstHeading = markdown
      .split("\n")
      .find((line) => line.trim().startsWith("#"));
    if (firstHeading) {
      return firstHeading
        .replace(/^#{1,6}\s+/, "")
        .replace(/\*\*/g, "")
        .trim();
    }
    return "Saved Recipe";
  }

  function formatDate(isoString) {
    try {
      return new Date(isoString).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  }

  function handleDelete(fav) {
    const recipeTitle = getRecipeTitle(fav.recipe);

    const confirmed = window.confirm(
      `Are you sure you want to delete "${recipeTitle}" from your favourites?`,
    );

    if (confirmed) {
      onDelete(fav.id);
    }
  }

  return (
    <section className="saved-recipes-section" aria-label="Saved recipes">
      <h2>Saved Favourites ({favourites.length})</h2>
      <ul className="saved-recipes-list">
        {favourites.map((fav) => (
          <li key={fav.id} className="saved-recipe-card">
            <div className="saved-recipe-info">
              <h3>{getRecipeTitle(fav.recipe)}</h3>
              <p className="saved-recipe-meta">
                {fav.ingredients.length} ingredients
                {fav.createdAt ? ` · Saved ${formatDate(fav.createdAt)}` : ""}
              </p>
            </div>
            <div className="saved-recipe-actions">
              <button
                type="button"
                className="view-recipe-btn"
                onClick={() => onSelect(fav)}
              >
                View
              </button>
              <button
                type="button"
                className="remove-ingredient-btn"
                onClick={() => handleDelete(fav)}
                aria-label={`Delete ${getRecipeTitle(fav.recipe)}`}
                title="Delete saved recipe"
              >
                &times;
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
