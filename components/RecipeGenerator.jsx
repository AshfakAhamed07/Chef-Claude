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
  const [ingredientError, setIngredientError] = React.useState("");
  const [editingIngredient, setEditingIngredient] = React.useState(null);

  const recipeSection = React.useRef(null);

  React.useEffect(() => {
    if (recipe && recipeSection.current) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  React.useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  function handleInputChange() {
    if (ingredientError) {
      setIngredientError("");
    }
  }

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
    const newIngredient = formData.get("ingredient").trim();

    if (newIngredient === "") {
      setIngredientError("Please enter an ingredient.");
      return;
    }

    const ingredientExist = ingredients.some((existingIngredient) => {
      return existingIngredient.toLowerCase() === newIngredient.toLowerCase();
    });

    if (ingredientExist) {
      setIngredientError("This ingredient is already in your list!");
    } else {
      setIngredientError("");
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
  }

  function removeIngredient(ingredientToRemove) {
    setIngredientError("");

    setIngredients((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredientToRemove),
    );

    setRecipeShown(false);
  }

  function startEditing(ingredient) {
    setEditingIngredient(ingredient);
  }

  function saveIngredient(oldIngredient, newIngredient) {
    const trimmedIngredient = newIngredient.trim();

    if (trimmedIngredient === "") {
      setIngredientError("Please enter an ingredient.");
      return;
    }

    const isDuplicate = ingredients.some(
      (item) =>
        item.toLowerCase() === trimmedIngredient.toLowerCase() &&
        item.toLowerCase() !== oldIngredient.toLowerCase(),
    );

    if (isDuplicate) {
      setIngredientError("This ingredient already exists.");
      return;
    }

    setIngredients((prevIngredients) =>
      prevIngredients.map((item) =>
        item === oldIngredient ? trimmedIngredient : item,
      ),
    );

    setIngredientError("");
    setEditingIngredient(null);
  }

  function cancelEditing() {
    setEditingIngredient(null);
    setIngredientError("");
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
          onChange={handleInputChange}
        />
        <button>Add ingredient</button>
      </form>
      {ingredientError && (
        <p className="error-message" role="alert">
          {ingredientError}
        </p>
      )}

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          ref={recipeSection}
          loading={loading}
          removeIngredient={removeIngredient}
          editingIngredient={editingIngredient}
          startEditing={startEditing}
          saveIngredient={saveIngredient}
          cancelEditing={cancelEditing}
        />
      )}
      {error && <p className="error-message">{error}</p>}
      {recipeShown && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
