import React from "react";
import IngredientsList from "./components/IngredientsList";
import ClaudeRecipe from "./components/ClaudeRecipe";
import { generateRecipe } from "./ai";

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = React.useState([]);

  const [recipeShown, setRecipeShown] = React.useState(false);

  const [recipe, setRecipe] = React.useState("");

  async function getRecipe() {
    const recipeMarkdown = await generateRecipe(ingredients);

    setRecipe(recipeMarkdown);
    setRecipeShown(true);
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
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {recipeShown && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
