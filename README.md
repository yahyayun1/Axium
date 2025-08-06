# Smart Recipe Analyzer

## Overview
Smart Recipe Analyzer is a web application that allows users to input a list of ingredients and receive AI-generated recipe suggestions complete with cooking instructions and nutritional analysis. The app leverages React for the frontend and a Flask backend integrated with LangChain and OpenAI GPT-4 for natural language processing.

## Features
- Input ingredients as a comma-separated list.
- Generate 2-3 creative recipes using the provided ingredients.
- Detailed recipe information including:
  - Recipe name
  - Ingredients list
  - Step-by-step cooking instructions
  - Estimated cooking time
  - Difficulty level (Easy, Medium, Hard)
  - Nutritional information (calories, protein, carbs)
- Responsive and user-friendly interface.
- Loading and error states for better UX.

## Tech Stack
- Frontend: React, Axios
- Backend: Python Flask, LangChain, OpenAI GPT-4
- Styling: Basic CSS (can be extended)
- Environment management: Python virtual environment, Node.js for frontend

## Folder Structure
```
smart-recipe-analyzer/
├── server/
│   ├── app.py                  # Flask backend application
│   ├── chains/                 # LangChain chains (empty or modularized)
│   ├── prompts/                # Prompt templates (empty or modularized)
│   ├── __init__.py
├── smart-recipe-frontend/
│   ├── src/
│   │   ├── App.js              # React frontend main component
│   │   └── ...                 # Other React files
│   ├── public/
│   ├── package.json
│   └── node_modules/
├── .env                       # Environment variables (not committed)
├── .gitignore
├── README.md
```

## Setup Instructions

### Backend
1. Navigate to the `server` directory:
   ```
   cd smart-recipe-analyzer/server
   ```
2. Create and activate a Python virtual environment:
   ```
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
   (Alternatively, install manually: `pip install flask langchain openai python-dotenv flask-cors`)
4. Create a `.env` file in the `server` directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
5. Run the backend server:
   ```
   python app.py
   ```

### Frontend
1. Navigate to the frontend directory:
   ```
   cd smart-recipe-frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React development server:
   ```
   npm start
   ```
4. Open your browser and go to `http://localhost:3000`

## Usage
- Enter a list of ingredients separated by commas in the textarea.
- Click "Generate Recipes" to fetch AI-generated recipes.
- View the recipes with detailed instructions and nutritional info.

## Notes
- The backend server runs on port 5000 by default.
- The frontend expects the backend API at `http://127.0.0.1:5000/api/recipes`.
- CORS is enabled on the backend to allow frontend requests.
- The project currently uses LangChain's deprecated `LLMChain` class; future updates should migrate to the new API.

## Troubleshooting
- Ensure your OpenAI API key is valid and set in the `.env` file.
- If you encounter network errors, verify that both backend and frontend servers are running.
- For backend errors related to LangChain or OpenAI, check for deprecation warnings and update dependencies accordingly.

## License
This project is open source and available under the MIT License.
