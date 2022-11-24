import { useState } from "react";
import useForm from "../lib/useForm";

const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: "Shoes",
    price: 31586,
    description: " These are the best Shoes",
  });
  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>

      <button type="button" onClick={clearForm}>
        Clear
      </button>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
    </form>
  );
};

export default CreateProduct;
