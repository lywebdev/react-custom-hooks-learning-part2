import React, { useEffect, useState } from "react";

import Products from "./components/Products/Products";
import NewProduct from "./components/NewProduct/NewProduct";
import useHttp from "./hooks/use-https";

function App() {
  const [products, setProducts] = useState([]);

  const manageProducts = (productsData) => {
    console.log('manageProducts')
    const loadedProducts = [];

    for (const productKey in productsData) {
      loadedProducts.push({ id: productKey, text: productsData[productKey].text });
    }

    setProducts(loadedProducts);
  }

  const httpRequestData = useHttp({
    endpoint: "https://react-udemy-http-requests-default-rtdb.firebaseio.com/products.json",
  }, manageProducts)

  const { isLoading, error, sendHttpRequest: fetchProducts } = httpRequestData;

  useEffect(() => {
    fetchProducts();
  }, []);

  const productAddHandler = (product) => {
    setProducts((prevProducts) => prevProducts.concat(product));
  };

  return (
    <React.Fragment>
      <NewProduct onAddProduct={productAddHandler} />
      <Products
        items={products}
        loading={isLoading}
        error={error}
        onFetch={fetchProducts}
      />
    </React.Fragment>
  );
}

export default App;
