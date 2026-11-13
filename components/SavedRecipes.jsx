import React from "react";

export default function SavedRecipes({ favourites, onSelect, onDelete }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("newest");

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

  const search = searchTerm.toLowerCase().trim();

  const filteredAndSortedFavourites = favourites
    .filter((fav) => {
      const title = getRecipeTitle(fav.recipe).toLowerCase();
      const ingredients = fav.ingredients.join(" ").toLowerCase();

      return title.includes(search) || ingredients.includes(search);
    })
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <section className="saved-recipes-section" aria-label="Saved recipes">
      <h2>
        Saved Favourites (
        {searchTerm.trim()
          ? `${filteredAndSortedFavourites.length} of ${favourites.length}`
          : favourites.length}
        )
      </h2>

      <div className="saved-recipes-controls">
        <input
          type="search"
          className="saved-recipes-search-input"
          placeholder="Search by recipe or ingredient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search saved recipes"
        />

        <div className="select-wrapper">
          <select
            className="saved-recipes-sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            aria-label="Sort saved recipes"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
          <svg
            className="select-chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#6b7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {filteredAndSortedFavourites.length === 0 ? (
        <p className="no-saved-results">
          No saved recipes match "{searchTerm}".
        </p>
      ) : (
        <ul className="saved-recipes-list">
          {filteredAndSortedFavourites.map((fav) => (
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
      )}
    </section>
  );
}
