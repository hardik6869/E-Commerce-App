import useForm from "../lib/useForm";
import Form from "./styles/Form";

const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: "",
    name: "Shoes",
    price: 31586,
    description: "These are the best Shoes",
  });
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <fieldset>
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>

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

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit"> + Add Product </button>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;
