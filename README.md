# Chef Claude 👨‍🍳

Chef Claude is a React application that generates recipe ideas based on the ingredients a user has available.

The application uses **Hugging Face Inference Providers** to generate recipes with an AI model and renders the generated response as Markdown.

This project is being built while following **Bob Ziroll's React course on Scrimba** as part of my React learning journey.

## 🚧 Project Status

**In progress**

I'm continuing to build and improve this project as I progress through the React course.

## ✨ Features

* Add ingredients to your ingredient list
* View ingredients currently available
* Generate an AI-powered recipe from the available ingredients
* Render AI-generated recipes as formatted Markdown
* Generate recipes using Hugging Face Inference Providers

## 🛠️ Technologies

* React
* JavaScript
* Vite
* CSS
* HTML
* Hugging Face Inference
* React Markdown

## 📚 React Concepts Practiced

Through this project, I'm practicing concepts including:

* React components
* Props
* State
* Event handling
* Forms
* Conditional rendering
* Rendering lists with `.map()`
* Component organization
* React hooks
* Async functions
* API integration
* Environment variables
* Rendering Markdown content

## 🤖 AI Integration

The application uses the Hugging Face JavaScript SDK to communicate with Hugging Face Inference Providers.

The current model used by the application is:

```text
openai/gpt-oss-120b:fastest
```

The model receives the user's available ingredients and generates a recipe recommendation in Markdown format.

> **Note:** The Hugging Face access token is stored in a local `.env` file and is not included in the repository.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:AshfakAhamed07/Chef-Claude.git
cd Chef-Claude
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create an environment file

Create a `.env` file in the project root:

```env
VITE_HF_ACCESS_TOKEN=your_hugging_face_token
```

Replace `your_hugging_face_token` with your own Hugging Face access token.

**Do not commit your `.env` file to GitHub.**

### 4. Start the development server

```bash
npm run dev
```

Then open the local development URL shown in the terminal.

## 🎓 Acknowledgment

This project is based on a project from **Bob Ziroll's React course on Scrimba**.

The project is being used for learning and practicing React development.

## 📌 Learning Journey

I'm building this project incrementally while learning React and using Git to track my progress.

The project started as a simple React recipe application and is gradually being expanded with more advanced React concepts and AI functionality.

More improvements and features will be added as I continue through the course.
