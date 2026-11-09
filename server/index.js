require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const SYSTEM_PROMPT = `
You are Chef Claude, an assistant that receives a list of ingredients
and suggests a recipe the user could make with some or all of them.

You don't need to use every ingredient.

You may include additional ingredients, but avoid too many extras.

Format your response in Markdown so it can be rendered on a web page.
`;

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
    });

    const recipe = completion.choices[0].message.content;

    response.json({ recipe });
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
