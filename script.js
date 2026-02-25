function displayProducts() {
  let products = JSON.parse(localStorage.getItem("Products")) || [];
  productList.innerHTML = "";

  products.forEach((product) => {
    productList.innerHTML += `
        <div class="card m-3" style="width:250px;">
            <div class="card-body d-flex flex-column text-center">
                <h5 class="card-title">${product.productname}</h5>
                <img src="${product.image}" class="img-fluid mb-2" height="100">
                <p><strong>Price:</strong> ${product.price}</p>
                <p class="flex-grow-1">${product.description}</p>

                <div class="d-flex justify-content-between mt-auto">
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.productid})">Delete</button>
                    <button class="btn btn-warning btn-sm" onClick="editProduct(${product.productid})">Edit</button>
                </div>
            </div>
        </div>
    `;
  });
}
function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) {
    return;
  }
  let products = JSON.parse(localStorage.getItem("Products"));
  const updatedProducts = products.filter((p) => id != p.productid); //Keep The element Which Return True Removes Element Which Returns False That Got Removed From Object Array

  // Using Reduce

  //   let products = JSON.parse(localStorage.getItem("Products")) || [];
  //   const updatedProducts = products.reduce((acc, crr) => {
  //     if (crr.productid != id) {   // This Matches The All Productid with the id if it does not matches it pushes it to localstorage and if it matches it will skip it
  //       acc.push(crr);
  //     }
  //     console.log(acc)
  //     return acc;
  //   }, []);

  localStorage.setItem("Products", JSON.stringify(updatedProducts));
  displayProducts();
  alert("Product Deleted!!");
}

displayProducts();

function editProduct(id) {
  let products = JSON.parse(localStorage.getItem("Products")) || [];
  let product = products.filter((p) => p.productid == id)[0];//Returns Us An Object So We Take Only The first Array element From it
  if (!product) return;

  document.getElementById("editProductId").value = product.productid;
  document.getElementById("editProductName").value = product.productname;
  document.getElementById("editPrice").value = product.price;
  document.getElementById("editDescription").value = product.description;

  // Clear file input every time modal opens
  document.getElementById("editFile").value = "";

 //Model shows after The Value is Set
  let modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
}

let form = document.getElementById("editForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let id = document.getElementById("editProductId").value; // ID is fixed
  let name = document.getElementById("editProductName").value.trim();
  let price = document.getElementById("editPrice").value.trim();
  let description = document.getElementById("editDescription").value.trim();
  let fileInput = document.getElementById("editFile");
  let file = fileInput.files[0]; // Gets The Fisrt File Selected by User If User Selects Multiple Files

  let products = JSON.parse(localStorage.getItem("Products")) || [];

  let currentProduct = products.filter((p) => p.productid == id)[0];//Returns Us An Object So We Take Only The first Array element From it
  if (!currentProduct) return;

  function saveProduct(finalImage) {
    // Remove old product
    let updatedProducts = products.filter((p) => p.productid != id);

    // Push updated product
    updatedProducts.push({
      productid: id,
      productname: name,
      price: price,
      description: description,
      image: finalImage,
    });

    localStorage.setItem("Products", JSON.stringify(updatedProducts));

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
  if (file) {
    let reader = new FileReader();
    reader.onload = function () {
      saveProduct(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    saveProduct(currentProduct.image);
  }
});
