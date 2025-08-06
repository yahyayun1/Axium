
import os
import json
from flask import Flask, request, jsonify
from langchain_community.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

# Define the prompt template for recipe generation
recipe_prompt = PromptTemplate(
    input_variables=["ingredients"],
    template="""
You are a helpful AI chef. Given the following ingredients: {ingredients}, suggest 2 to 3 creative recipes that use only these ingredients (or commonly available pantry items).

For each recipe, provide:
- Name
- Ingredients list
- Step-by-step instructions
- Estimated cooking time
- Difficulty level (Easy, Medium, Hard)
- Basic nutrition info (calories, protein, carbs)

Format your entire response in strict JSON:
{{
  "recipes": [...]
}}
""",
)

# Initialize OpenAI LLM
openai_api_key = os.getenv("OPENAI_API_KEY")
api_base_url = os.getenv("API_BASE_URL")
llm = OpenAI(model_name="gpt-4", temperature=0.7, openai_api_key=openai_api_key, base_url=api_base_url)

# Create the LangChain chain
recipe_chain = recipe_prompt | llm

@app.route("/api/recipes", methods=["POST"])
def generate_recipes():
    data = request.get_json()
    ingredients = data.get("ingredients", "").strip()

    if not ingredients:
        return jsonify({"error": "Please provide at least one ingredient."}), 400

    try:
        response = recipe_chain.invoke({"ingredients": ingredients})
        # response is expected to be a JSON string
        print("Raw LLM response:", response)
        recipes = json.loads(response)
        return jsonify({"recipes": recipes["recipes"]})
    except Exception as e:
        print(f"Error generating recipes: {e}")
        return jsonify({"error": "Failed to generate recipes."}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
