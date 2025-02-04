import "./CocktailForm.css";
import React, { useState } from "react";
import { maxIngredients } from "../../consts";
import { CocktailFormState } from "../../types/types";
import { addNewCocktailToLocalStorage, transformCocktailData } from "../../utils";

const categories = ["Cocktail", "Mocktail", "Smoothie", "Other"];

const CocktailForm = () => {
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [formData, setFormData] = useState<CocktailFormState>({
    name: "",
    instructions: "",
    category: "",
    ingredients: [{ ingredient: "", measure: "" }],
    image: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.instructions.trim()) newErrors.instructions = "Instructions are required.";
    if (!formData.category.trim()) newErrors.category = "Category is required.";

    formData.ingredients.forEach((ing, index) => {
      if (!ing.ingredient.trim()) newErrors[`ingredient-${index}`] = "Ingredient is required.";
      if (ing.ingredient.trim() && !ing.measure.trim())
        newErrors[`measure-${index}`] = "Measure is required if ingredient is filled.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (
    index: number,
    field: "ingredient" | "measure",
    value: string,
  ) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    if (formData.ingredients.length < 15) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, { ingredient: "", measure: "" }],
      });
    }
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData({ ...formData, ingredients: newIngredients });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newCocktail = transformCocktailData(formData);
      addNewCocktailToLocalStorage(newCocktail);
      setIsSubmited(true);
    }
  };

  return (
    <>
      {isSubmited ? (
        <>
          <div className="success">Cocktail added successfully</div>
          <div className="home-btn">Go back to cockatil page</div>
        </>
      ) : (
        <div className="form-page">
          <div className="form-title">Add new cocktail</div>
          <form onSubmit={handleSubmit} className="cocktail-form">
            <div className="section">
              <label className="label">Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="section">
              <label className="label">Instructions:</label>
              <textarea name="instructions" value={formData.instructions} onChange={handleChange} />
              {errors.instructions && <span className="error-text">{errors.instructions}</span>}
            </div>

            <div className="section">
              <label className="label">Category:</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <span className="error-text">{errors.category}</span>}
            </div>

            {formData.ingredients.map((ing, index) => (
              <div key={index} className="ingredient-group">
                <input
                  type="text"
                  placeholder="Ingredient"
                  value={ing.ingredient}
                  onChange={(e) => handleIngredientChange(index, "ingredient", e.target.value)}
                />
                {errors[`ingredient-${index}`] && (
                  <span className="error-text">{errors[`ingredient-${index}`]}</span>
                )}

                <input
                  type="text"
                  placeholder="Measure"
                  value={ing.measure}
                  onChange={(e) => handleIngredientChange(index, "measure", e.target.value)}
                />
                {errors[`measure-${index}`] && (
                  <span className="error-text">{errors[`measure-${index}`]}</span>
                )}

                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeIngredient(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {formData.ingredients.length < maxIngredients && (
              <button className="add-ingredients" type="button" onClick={addIngredient}>
                Add Ingredient
              </button>
            )}

            <div>
              <label>Upload Image (Optional):</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {formData.image && (
                <img src={formData.image} alt="Cocktail Preview" className="preview-img" />
              )}
            </div>

            <button className="submit" type="submit">
              Save Cocktail
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CocktailForm;
