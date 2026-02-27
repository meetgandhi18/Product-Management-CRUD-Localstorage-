import { getProducts, setProducts } from "./helper.js";
import { validateProduct } from "./validate.js";
import { sortProducts } from "./helper.js";

function displayProducts( products = getProducts()) {
  let productList = document.getElementById("productList");
  if (products.length === 0 || null) {
    productList.innerHTML = `
    <center>
    <h1 class="text-dark mt-5">No Products Added Please Add Products!!</h1>
    </center>
    `;
    return;
  }

  productList.innerHTML = "";

  products.forEach((product) => {
    productList.innerHTML += `
        <div class="card m-3" style="width:250px;">
            <div class="card-body d-flex flex-column text-center">
                <h5 class="card-title">${product.productName}</h5>
                <img src="${product.productImage}" class="img-fluid mb-2" height="100">
                <p><strong>Price:</strong> ${product.productPrice}</p>
                <p class="flex-grow-1">${product.productDescription}</p>

                <div class="d-flex justify-content-between mt-auto">
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.productId})">Delete</button>
                    <button class="btn btn-warning btn-sm" onClick="editProduct(${product.productId})">Edit</button>
                </div>
            </div>
        </div>
    `;
  });
}

displayProducts();

//We Can' Acces Globally Created onclick listeners So we have to add winodw to use it
window.deleteProduct = function (id) {
  if (!confirm("Are you sure you want to delete this product?")) {
    return;
  }
  let products = getProducts();
  const updatedProducts = products.filter((p) => id != p.productId); //Keep The element Which Return True Removes Element Which Returns False That Got Removed From Object Array

  setProducts(updatedProducts);
  displayProducts();
  alert("Product Deleted!!");
};



//We Can' Acces Globally Created onclick listeners So we have to add winodw to use it
window.editProduct = function (id) {
  let products = getProducts();
  let product = products.filter((p) => p.productId == id)[0]; //Returns Us An Object So We Take Only The first Array element From it
  if (!product) return;

  document.getElementById("editProductId").value = product.productId;
  document.getElementById("editProductName").value = product.productName;
  document.getElementById("editPrice").value = product.productPrice;
  document.getElementById("editDescription").value = product.productDescription;

  // Clear file input every time modal opens
  document.getElementById("editFile").value = "";

  //Model shows after The Value is Set
  let modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
};

let form = document.getElementById("editForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let id = document.getElementById("editProductId").value; // ID is fixed
  let name = document.getElementById("editProductName").value.trim();
  let price = document.getElementById("editPrice").value.trim();
  let description = document.getElementById("editDescription").value.trim();
  let fileInput = document.getElementById("editFile");
  let file = fileInput.files[0]; // Gets The Fisrt File Selected by User If User Selects Multiple Files

  let isValid = validateProduct({
    pId: id,
    pName: name,
    file: file,
    price: price,
    des: description,
    isEdit: true,

  }); // {size: 0 handle Optional Image}
  if (!isValid) return;

  let products = getProducts();

  let currentProduct = products.filter((p) => p.productId == id)[0]; //Returns Us An Object So We Take Only The first Array element From it
  if (!currentProduct) return;

  function saveProduct(finalImage) {
    // Remove old product
    let updatedProducts = products.filter((p) => p.productId != id);

    // Push updated product
    updatedProducts.push({
      productId: id,
      productName: name,
      productPrice: price,
      productDescription: description,
      productImage: finalImage,
    });

    setProducts(updatedProducts);

    alert("Product Updated Successfully!");
    displayProducts();

    // Get the existing Bootstrap modal instance of #editModal
    // (used to control the modal like hide(), show(), etc.)
    let modal = bootstrap.Modal.getInstance(
      document.getElementById("editModal"),
    );
    modal.hide();
  }

  // If new image selected
  if (!file) {
    saveProduct(currentProduct.productImage);
  } else {
    let reader = new FileReader();
    reader.onload = function () {
      saveProduct(reader.result);
    };
    reader.readAsDataURL(file);
  }
});

//Event Deligation Put Event Listner On Parent (Bubbling)

let sortFilter = document.getElementById("sortFilter");
if (sortFilter) {
  sortFilter.addEventListener("change", function () {
    let products = getProducts();
    let value = this.value;
    const sortedProducts = sortProducts(products, value);
    displayProducts(sortedProducts);
  });
}
