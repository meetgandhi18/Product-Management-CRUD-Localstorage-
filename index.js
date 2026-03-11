import { validateProduct } from "./validate.js";
import { getProducts, setProducts } from "./helper.js";

$(function () {
  //Clears the input field when form is submitted
  const clearInputFiels = function () {
    $("#productId").val("");
    $("#productName").val("");
    $("#imageUrl").val("");
    $("#price").val("");
    $("#description").val("");
  };

  if ($("#save-btn")) {
    $("#save-btn").click(function (e) {
      e.preventDefault();
      let pId = $("#productId").val().trim();
      let pName = $("#productName").val().trim();
      let imageInput = $("#imageUrl");
      let price = $("#price").val().trim();
      let des = $("#description").val().trim();
      let file = imageInput[0].files[0];

      let isValid = validateProduct({ pId, pName, file, price, des });
      if (!isValid) {
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
});
