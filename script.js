import { getProducts, setProducts } from "./helper.js";
import { validateProduct } from "./validate.js";
import { sortProducts } from "./helper.js";

function displayProducts(products = getProducts()) {
  let productList = $("#productList");

  if (!products || products.length === 0) {
    productList.html(`
      <center>
        <h1 class="text-dark mt-5">No Products Added Please Add Products!!</h1>
      </center>
    `);
    return;
  }

  productList.html("");

  products.forEach((product) => {
    productList.append(`
      <div class="card m-3" style="width:250px;">
        <div class="card-body d-flex flex-column text-center">
          <h5 class="card-title">${product.productName}</h5>
          <img src="${product.productImage}" class="img-fluid mb-2" height="100">
          <p><strong>Price:</strong> ${product.productPrice}</p>
          <p class="flex-grow-1 fw-bold">Product Id: ${product.productId}</p>
          <p class="flex-grow-1">${product.productDescription}</p>

          <div class="d-flex justify-content-between mt-auto">
            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.productId})">Delete</button>
            <button class="btn btn-warning btn-sm" onclick="editProduct(${product.productId})">Edit</button>
          </div>
        </div>
      </div>
    `);
  });
}

$(function () {
  displayProducts();

  //We Can' Acces Globally Created onclick listeners So we have to add winodw to use it
  window.deleteProduct = function (id) {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    let products = getProducts();

    const updatedProducts = products.filter((p) => id != p.productId);

    setProducts(updatedProducts);
    displayProducts();

    alert("Product Deleted!!");
  };

  //We Can' Acces Globally Created onclick listeners So we have to add winodw to use it
  window.editProduct = function (id) {
    let products = getProducts();

    let product = products.find((p) => p.productId == id);

    if (!product) return;

    $("#editProductId").val(product.productId);
    $("#editProductName").val(product.productName);
    $("#editPrice").val(product.productPrice);
    $("#editDescription").val(product.productDescription);

    $("#editFile").val("");

    let modal = new bootstrap.Modal($("#editModal")[0]);
    modal.show();
  };

  // Edit Form Submit
  $("#editForm").on("submit", function (e) {
    e.preventDefault();

    let id = $("#editProductId").val();
    let name = $("#editProductName").val().trim();
    let price = $("#editPrice").val().trim();
    let description = $("#editDescription").val().trim();

    let fileInput = $("#editFile")[0];
    let file = fileInput.files[0];

    let isValid = validateProduct({
      pId: id,
      pName: name,
      file: file,
      price: price,
      des: description,
      isEdit: true,
    });

    if (!isValid) return;

    let products = getProducts();

    let currentProduct = products.find((p) => p.productId == id);
    if (!currentProduct) return;

    function saveProduct(finalImage) {
      let updatedProducts = products.filter((p) => p.productId != id);

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

      let modal = bootstrap.Modal.getInstance($("#editModal")[0]);
      modal.hide();
    }

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

  // Sort Filter
  let sortFilter = $("#sortFilter");

  if (sortFilter.length) {
    sortFilter.on("change", function () {
      let products = getProducts();
      let value = $(this).val();

      const sortedProducts = sortProducts(products, value);

      displayProducts(sortedProducts);
    });
  }

  // Search Filter
  let searchInput = $("#searchInput");

  if (searchInput.length) {
    searchInput.on("input", function () {
      let value = $(this).val().trim();

      let products = getProducts();

      if (!value) {
        displayProducts(products);
        return;
      }

      let filteredProducts = products.filter((p) =>
        p.productId.includes(value),
      );

      displayProducts(filteredProducts);
    });
  }
});
