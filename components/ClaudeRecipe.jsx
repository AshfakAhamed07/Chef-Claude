import ReactMarkdown from "react-markdown";

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
        <ReactMarkdown>{recipe}</ReactMarkdown>
      </article>
    </section>
  );
}
