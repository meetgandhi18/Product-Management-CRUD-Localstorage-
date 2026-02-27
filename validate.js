export function validateProduct({ pId, pName, file, price, des, isEdit = false }) {
  if (!pId || Number(pId) <= 0) {
    alert("Product ID must be a positive number");
    return false;
  }

  if (!pName || !/^[a-zA-Z0-9\s@&._-]+$/.test(pName)) {
    alert("Product Name Contains Invalid Characters");
    return false;
  }

    // Only validate image if: Adding new product OR user selected new image
  if(!isEdit || file){
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
  }

  if (!price || Number(price) <= 0) {
    alert("Price must be greater than 0");
    return false;
  }

  if (!des || !/^[a-zA-Z0-9\s@&.,!#%()/_-]+$/.test(des)) {
    alert("Description contains invalid characters");
    return false;
  }

  return true;
}
