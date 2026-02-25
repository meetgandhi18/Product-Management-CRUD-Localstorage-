let saveBtn = document.getElementById("save-btn");
let productList = document.getElementById("productList");
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let pId = document.getElementById("productId").value.trim();
  let pName = document.getElementById("productName").value.trim();
  let imageInput = document.getElementById("imageUrl");
  let price = document.getElementById("price").value.trim();
  let des = document.getElementById("description").value.trim();
  let file = imageInput.files[0];

  if (!pId || !pName || !file || !price || !des) {
    alert("Please Fill all fields");
    return;
  }
  let reader = new FileReader();
  reader.onload = function () {
    let base64Image = reader.result;

    let newProduct = {
      productid: pId,
      productname: pName,
      image: base64Image,
      price: price,
      description: des,
    };

    let products = JSON.parse(localStorage.getItem("Products")) || [];
    let idExist = products.reduce((acc, crr) => {
      if (crr.productid == newProduct.productid) {
        acc = true;
      }
      return acc;
    }, false);

    if (idExist) {
      alert("Product With this Id Already Exist!!");
    } else {
      products.push(newProduct);
      localStorage.setItem("Products", JSON.stringify(products));
      alert("Product Successfully Added!!");
      window.location.href = "products.html";
    }
  };
  reader.readAsDataURL(file);
});
