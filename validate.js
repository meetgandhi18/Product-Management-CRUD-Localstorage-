export function validateProduct({ pId, pName, file, price, des }) {
  if (!pId || Number(pId) <= 0) {
    alert("Product ID must be a positive number");
    return false;
  }

  if (!pName || !/^[a-zA-Z0-9\s]+$/.test(pName)) {
    alert("Product Name must contain only letters and numbers");
    return false;
  }

  if (!file) {
    alert("Please select an image");
    return false;
  }

  // Validate extension
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    alert("Only JPG, PNG and WEBP image files are allowed");
    return false;
  }
  
  if (file.size > 2 * 1024 * 1024) {
    alert("Image size must be less than 2MB");
    return false;
  }

  if (!price || Number(price) <= 0) {
    alert("Price must be greater than 0");
    return false;
  }

  if (!des || !/^[a-zA-Z0-9\s.,!]+$/.test(des)) {
    alert("Description contains invalid characters");
    return false;
  }

  return true;
}
