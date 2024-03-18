import Section from "../UI/Section";
import ProductForm from "./ProductForm";
import useHttp from "../../hooks/use-https";

const NewProduct = (props) => {
  const { isLoading, error, sendHttpRequest: sendProduct } = useHttp();

  const createProduct = (productText, productData) => {
    const generatedId = productData.name;
    const createdProduct = { id: generatedId, text: productText };

    props.onAddProduct(createdProduct);
  }

  const enterProductHandler = async (productText) => {
    sendProduct({
      endpoint: "https://react-udemy-http-requests-default-rtdb.firebaseio.com/products.json",
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: { text: productText },
    }, createProduct.bind(null, productText));
  };

  return (
    <Section>
      <ProductForm onEnterProduct={enterProductHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewProduct;
