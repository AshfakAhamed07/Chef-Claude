import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { generateRecipe } from "../ai";

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = React.useState([
    "chicken",
    "all the main spices",
    "corn",
    "heavy cream",
    "pasta",
  ]);

  const [recipeShown, setRecipeShown] = React.useState(false);

  const [recipe, setRecipe] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const recipeSection = React.useRef(null);

  React.useEffect(() => {
    if (recipe && recipeSection.current) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  async function getRecipe() {
    setLoading(true);
    setError("");
    setRecipeShown(false);
    try {
      const recipeMarkdown = await generateRecipe(ingredients);
      setRecipe(recipeMarkdown);
      setRecipeShown(true);
    } catch (err) {
      setError("Sorry, something went wrong. Please try again.");
      setRecipeShown(false);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          ref={recipeSection}
          loading={loading}
        />
      )}

      {recipeShown && <ClaudeRecipe recipe={recipe} />}
      {error && <p className="error-message">{error}</p>}
    </main>
  );
}
