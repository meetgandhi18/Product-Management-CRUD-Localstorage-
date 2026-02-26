// Get products from localStorage
export const getProducts = () => {
  let products = JSON.parse(localStorage.getItem("Products")) || [];
  return products;
};

// Save products to localStorage
export const setProducts = (products) => {
  localStorage.setItem("Products", JSON.stringify(products));
};

// Filter sort by id , name and price
export function sortProducts(products, value) {
  switch (value) {
    case "id-asc":
      products.sort((a, b) => Number(a.productId) - Number(b.productId));
      break;

    case "id-desc":
      products.sort((a, b) => Number(b.productId) - Number(a.productId));
      break;

    case "name-asc":
      products.sort((a, b) => a.productName.localeCompare(b.productName));
      break;

    case "name-desc":
      products.sort((a, b) => b.productName.localeCompare(a.productName));
      break;

    case "price-asc":
      products.sort((a, b) => Number(a.productPrice) - Number(b.productPrice));
      break;

    case "price-desc":
      products.sort((a, b) => Number(b.productPrice) - Number(a.productPrice));
      break;
  }
  return products;
}

