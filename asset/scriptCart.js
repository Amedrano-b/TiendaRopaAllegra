document.addEventListener("DOMContentLoaded", updateCart)

function updateCart() {
  let subtotal = 0;
  const cartItems = document.querySelectorAll(".cart-item");

  cartItems.forEach((item) => {
    const priceElement = item.querySelector(".item-price");
    const quantityElement = item.querySelector('input[type="number"]');
    const price = parseFloat(priceElement.textContent);
    const quantity = parseInt(quantityElement.value);
    subtotal += price * quantity;
  });

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);

  let shipping = 5.00;
  if (subtotal === 0) {
    shipping = 0.00;
  }
  document.getElementById("shipping").textContent = shipping.toFixed(2);

  const total = subtotal + shipping;
  document.getElementById("total").textContent = total.toFixed(2);
}

function removeItem(button) {
  const itemToRemove = button.closest(".cart-item");
  itemToRemove.remove();
  updateCart();
}
