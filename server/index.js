require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const SYSTEM_PROMPT = `
You are Chef Claude, an assistant that creates practical recipes
using ingredients supplied by the user.

You don't need to use every ingredient.

You may include additional ingredients, but avoid too many extras.

Provide realistic ingredient quantities and clear cooking instructions.

Preparation and cooking times must be expressed in minutes.

Estimate the number of servings.

Return recipe information matching the requested JSON structure.
`;

const RECIPE_SCHEMA = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          quantity: {
            type: "string",
          },
        },
        required: ["name", "quantity"],
        additionalProperties: false,
      },
    },
    instructions: {
      type: "array",
      items: {
        type: "string",
      },
    },
    prepTimeMinutes: {
      type: "integer",
    },
    cookTimeMinutes: {
      type: "integer",
    },
    servings: {
      type: "integer",
    },
  },
  required: [
    "title",
    "description",
    "ingredients",
    "instructions",
    "prepTimeMinutes",
    "cookTimeMinutes",
    "servings",
  ],
  additionalProperties: false,
};

const app = express();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Chef Claude backend is running!");
});

app.post("/api/recipes", async (request, response) => {
  const ingredients = request.body?.ingredients;

  if (
    !Array.isArray(ingredients) ||
    ingredients.length === 0 ||
    ingredients.some(
      (ingredient) => typeof ingredient !== "string" || !ingredient.trim(),
    )
  ) {
    return response.status(400).json({
      error: "Please provide a valid list of ingredients.",
    });
  }
  try {
    const ingredientsString = ingredients.join(", ");
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b", //llama-3.1-8b-instant
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "recipe",
          strict: true,
          schema: RECIPE_SCHEMA,
        },
      },
    });

    const message = completion.choices[0]?.message;

    if (!message?.content) {
      throw new Error("Groq returned an empty recipe response.");
    }
    const recipeData = JSON.parse(message.content);
    response.json({ recipeData });
  } catch (error) {
    console.error("Groq API error:", error);
    response.status(500).json({
      error: "Failed to generate recipe.",
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
