import { useState } from "react";

import Section from "../UI/Section";
import ProductForm from "./ProductForm";

const NewProduct = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterProductHandler = async (productText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-udemy-http-requests-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          body: JSON.stringify({ text: productText }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка запроса.");
      }

      const data = await response.json();

      const generatedId = data.name;
      const createdProduct = { id: generatedId, text: productText };

      props.onAddProduct(createdProduct);
    } catch (e) {
      setError(e.message || "Что-то пошло не так...");
    }
    setIsLoading(false);
  };

  return (
    <Section>
      <ProductForm onEnterProduct={enterProductHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewProduct;
