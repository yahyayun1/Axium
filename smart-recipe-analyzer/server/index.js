const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('langchain/llms/openai');
const { PromptTemplate } = require('langchain/prompts');
const { LLMChain } = require('langchain/chains');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Define the prompt template for recipe generation
const recipePrompt = new PromptTemplate({
  template: `You are a helpful AI chef. Given the following ingredients: {ingredients}, suggest 2 to 3 creative recipes that use only these ingredients (or commonly available pantry items).

For each recipe, provide:
- Name
- Ingredients list
- Step-by-step instructions
- Estimated cooking time
- Difficulty level (Easy, Medium, Hard)
- Basic nutrition info (calories, protein, carbs)

Format your entire response in strict JSON:
{
  "recipes": [...]
}`,
  inputVariables: ['ingredients'],
});

// Initialize OpenAI LLM
const llm = new OpenAI({
  modelName: 'gpt-4',
  temperature: 0.7,
});

// Create the LangChain chain
const recipeChain = new LLMChain({
  llm,
  prompt: recipePrompt,
});

// API route to generate recipes
app.post('/api/recipes', async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients.trim() === '') {
    return res.status(400).json({ error: 'Please provide at least one ingredient.' });
  }

  try {
    const response = await recipeChain.call({ ingredients });
    // The response.text should be a JSON string as per prompt
    const recipes = JSON.parse(response.text);
    res.json(recipes);
  } catch (error) {
    console.error('Error generating recipes:', error);
    res.status(500).json({ error: 'Failed to generate recipes.' });
  }
});

app.listen(port, () => {
  console.log(\`Server listening on port \${port}\`);
});
