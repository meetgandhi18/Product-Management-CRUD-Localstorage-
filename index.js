import { validateProduct } from "./validate.js";
let saveBtn = document.getElementById("save-btn");

// Get products from localStorage
export let getProducts = () => {
  let products = JSON.parse(localStorage.getItem("Products")) || [];
  return products;
};

// Save products to localStorage
export let setProducts = (products) => {
  localStorage.setItem("Products", JSON.stringify(products));
};

//Clears the input field when form is submitted
let clearInputFiels = () => {
  document.getElementById("productId").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("imageUrl").value = "";
  document.getElementById("price").value = "";
  document.getElementById("description").value = "";
};

if (saveBtn) {
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let pId = document.getElementById("productId").value.trim();
    let pName = document.getElementById("productName").value.trim();
    let imageInput = document.getElementById("imageUrl");
    let price = document.getElementById("price").value.trim();
    let des = document.getElementById("description").value.trim();
    let file = imageInput.files[0];

    console.log(pId);

    let isValid = validateProduct({ pId, pName, file, price, des });
    if (!isValid){
      clearInputFiels();
      return;
    }

    let reader = new FileReader();

    reader.onload = function () {
      let base64Image = reader.result;

      let newProduct = {
        productId: pId,
        productName: pName,
        productImage: base64Image,
        productPrice: price,
        productDescription: des,
      };

      let products = getProducts();

      // Check if ID already exists
      let idExist = products.reduce((acc, crr) => {
        if (crr.productId == newProduct.productId) {
          acc = true;
        }
        return acc;
      }, false);

      if (idExist) {
        alert("Product With this Id Already Exist!!");
      } else {
        products.push(newProduct);
        setProducts(products);
        alert("Product Successfully Added!!");
        clearInputFiels();
        window.location.href = "products.html";
      }
    };

    reader.readAsDataURL(file);
  });
}
