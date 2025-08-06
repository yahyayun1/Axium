import React, { useState } from "react";
import axios from "axios";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient.");
      return;
    }

    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/recipes", {
        ingredients,
      });

      setRecipes(response.data.recipes);
    } catch (err) {
      setError("Failed to generate recipes. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Smart Recipe Analyzer</h1>
      <textarea
        placeholder="Enter ingredients, separated by commas..."
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        rows={5}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Recipes"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {recipes.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Generated Recipes</h2>
          {recipes.map((recipe, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "5px",
              }}
            >
              <h3>{recipe.name}</h3>
              <p>
                <strong>Cooking Time:</strong> {recipe.cookingTime} <br />
                <strong>Difficulty:</strong> {recipe.difficulty}
              </p>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p>
                <strong>Instructions:</strong>
              </p>
              <ol>
                {recipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              <p>
                <strong>Nutrition:</strong> {recipe.nutrition.calories} calories,
                {` ${recipe.nutrition.protein} protein, ${recipe.nutrition.carbs} carbs`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

