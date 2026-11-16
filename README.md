# Sage & Spoon 🌿

Sage & Spoon is an AI-powered recipe generation application that helps users turn their available ingredients into practical recipe ideas.

Users can manage an ingredient list, generate structured recipes using the Groq API, view nutritional information through Spoonacular, and save their favourite recipes for later.

The project started as a learning exercise while following **Bob Ziroll's React Fundamentals course on Scrimba** and has since been extended with additional frontend functionality, a custom Express backend, and external API integrations.

## 🚧 Project Status

**In Development**

Core application features have been implemented, including AI-powered recipe generation, nutritional analysis, ingredient management, and saved favourites.

The project is currently being prepared for further testing, production deployment, and portfolio presentation.

## ✨ Features

### Ingredient Management
- Add ingredients to the available ingredient list.
- Edit existing ingredients.
- Remove ingredients.
- Prevent empty and duplicate ingredient entries.
- Validate ingredient input.

### AI Recipe Generation
- Generate recipe recommendations based on available ingredients.
- Use the Groq API to generate structured recipe data.
- Display recipe titles and descriptions.
- Show ingredient quantities and cooking instructions.
- Display preparation time, cooking time, and serving information.

### Nutritional Analysis
- Integrate the Spoonacular API for recipe nutritional analysis.
- Display estimated nutritional information per serving.
- Show calories, protein, carbohydrates, and fat.
- Handle nutritional analysis failures without preventing recipe generation.

### Saved Favourites
- Save generated recipes to favourites.
- View previously saved recipes.
- Restore saved recipes, including their nutritional information.
- Delete saved favourites with confirmation.
- Persist favourites using browser `localStorage`.

### Search and Sorting
- Search saved recipes by recipe title or ingredient.
- Sort saved recipes by newest or oldest.
- Display the number of matching results alongside the total number of favourites.
- Handle empty search results.

### User Experience
- Display loading feedback during recipe generation.
- Provide error feedback when requests fail.
- Automatically scroll to the generated recipe.
- Responsive layouts for different screen sizes.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React, JavaScript, HTML |
| Build Tool | Vite |
| Styling | CSS |
| Backend | Node.js, Express.js |
| AI Integration | Groq API |
| Nutritional Analysis | Spoonacular API |
| Data Persistence | Browser localStorage |
| Development Tools | Git, GitHub, VS Code |

## 🏗️ Application Architecture

Sage & Spoon uses a React frontend connected to a custom Express backend.

The backend handles communication with external APIs, keeping API credentials out of the frontend application.

### Recipe Generation Flow

1. The user manages their available ingredients in the React application.
2. The frontend sends the ingredient list to the Express backend.
3. The backend validates the request.
4. The Groq API generates structured recipe data.
5. The backend sends the generated recipe to Spoonacular for nutritional analysis.
6. The backend returns the recipe and available nutritional information to the frontend.
7. React displays the recipe and its nutritional breakdown.

**External API responsibilities:**

- **Groq API:** Generates structured recipe data using JSON Schema.
- **Spoonacular API:** Analyzes the generated recipe and provides nutritional information.

Nutritional analysis is handled independently, so a Spoonacular failure does not prevent an otherwise successful recipe generation.

## 📁 Project Structure

```text
sage-and-spoon/
├── components/
│   ├── ClaudeRecipe.jsx
│   ├── IngredientsList.jsx
│   ├── RecipeGenerator.jsx
│   └── SavedRecipes.jsx
├── images/
│   └── sage-and-spoon-logo.png
├── utils/
│   └── nutrition.js
├── server/
│   ├── services/
│   │   └── nutrition.js
│   ├── index.js
│   └── package.json
├── ai.js
├── App.jsx
├── index.css
├── index.html
├── index.jsx
├── vite.config.js
└── README.md
```

*The structure above highlights the main application files; other configuration and dependency files are omitted for clarity.*

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- A Groq API key
- A Spoonacular API key

### 1. Clone the repository

Using SSH:

```bash
git clone git@github.com:AshfakAhamed07/sage-and-spoon.git
cd sage-and-spoon
```

Alternatively, clone using HTTPS:

```bash
git clone https://github.com/AshfakAhamed07/sage-and-spoon.git
cd sage-and-spoon
```

### 2. Install frontend dependencies

From the project root:

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` directory:

```env
GROQ_API_KEY=your_groq_api_key
SPOONACULAR_API_KEY=your_spoonacular_api_key
```

Replace the placeholder values with your own API keys.

**Important:** Never commit API keys or `.env` files to version control.

### 5. Start the backend server

From the `server` directory:

```bash
node --watch index.js
```

The backend runs on port `3001` during local development.

### 6. Start the frontend development server

Open a second terminal, navigate to the project root, and run:

```bash
npm run dev
```

Open the local development URL provided by Vite in your browser.

Both the frontend and backend must be running for recipe generation and nutritional analysis to work.

## 🔐 Environment Variables

The backend requires the following environment variables:

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | API key used for Groq recipe generation |
| `SPOONACULAR_API_KEY` | API key used for nutritional analysis |

Keep these credentials in the backend's local `.env` file and never expose them in frontend code or commit them to GitHub.

## 📚 Learning and Development

This project began as part of **Bob Ziroll's React Fundamentals course on Scrimba**.

The original project provided an opportunity to practise React fundamentals. It was subsequently extended to explore additional application development concepts, including:

- Component-based architecture.
- React state management and hooks.
- Props and component communication.
- Forms and event handling.
- Conditional rendering and list rendering.
- Asynchronous JavaScript and API requests.
- Frontend and backend communication.
- Express API development and request validation.
- External API integration.
- Structured JSON responses and JSON Schema.
- Environment variable management.
- Persistent browser storage.
- Error handling and application reliability.
- Git version control and incremental development.

## 🔮 Future Improvements

Planned improvements include:

- Automated frontend and backend testing.
- Improved data validation and persistence reliability.
- Production deployment.
- Additional accessibility and user experience improvements.
- Expanded documentation.

## 🎓 Acknowledgment

The initial version of this project was inspired by **Bob Ziroll's React Fundamentals course on Scrimba**.

The application has since been extended with additional functionality and integrations as part of my ongoing React and full-stack development learning journey.

## 👨‍💻 Author

**Ashfak Ahamed**

- GitHub: [AshfakAhamed07](https://github.com/AshfakAhamed07)