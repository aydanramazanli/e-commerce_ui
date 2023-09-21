import Category from "../../Pages/Category";

//all products
export const getAllProducts = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

//product add to card
export const addProductToCard = (id) => {
  fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: id,
          quantity: 1,
        },
      ],
    }),
  }).then((res) => res.json());
};

//product category
export const productCategory = (category) => {
  return fetch(`https://dummyjson.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Hata:", error);
      throw error;
    });
};

// get to cart
export const getToCart = () => {
  return fetch("https://dummyjson.com/carts/1")
    .then((res) => res.json())
};
