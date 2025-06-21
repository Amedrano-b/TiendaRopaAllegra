document.addEventListener('DOMContentLoaded', () => {
    loadCartFromAPI();
});

async function loadCartFromAPI() {
  // Simulación de productos en el carrito (puedes cambiar los IDs según tu lógica de carrito)
  const cartProductIds = [1, 2]; // IDs de ejemplo
  const response = await fetch('asset/apis/products.json');
  const products = await response.json();
  const cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.innerHTML = '';

  cartProductIds.forEach((id, idx) => {
    const product = products.find(p => p.id === id);
    if (product) {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <div class="item-details">
          <h3>${product.title}</h3>
          <p><strong>Categoría:</strong> ${product.category}</p>
          <p><strong>Nuevo:</strong> ${product.isNew ? 'Sí' : 'No'}</p>
          <p>Talla: M</p>
          <p>Color: Negro</p>
          <p>Precio: $<span class="item-price">${product.price}</span></p>
          <div class="item-quantity">
            <label for="qty-${id}">Cantidad:</label>
            <input type="number" id="qty-${id}" value="1" min="1" onchange="updateCart()" />
          </div>
          <button class="remove-item" onclick="removeItem(this)">Eliminar</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    }
  });
  updateCart();
}

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

  let shipping = 5.0;
  if (subtotal === 0) {
    shipping = 0.0;
  }
  document.getElementById("shipping").textContent = shipping.toFixed(2);

  const total = subtotal + shipping;
  document.getElementById("total").textContent = total.toFixed(2);
  updateProductCount();
}

function removeItem(button) {
  const itemToRemove = button.closest(".cart-item");
  itemToRemove.remove();
  updateCart();
}

function updateProductCount() {
  const quantityInputs = document.querySelectorAll(
    '.cart-item input[type="number"]'
  );
  let totalCount = 0;
  quantityInputs.forEach((input) => {
    totalCount += parseInt(input.value, 10);
  });
  document.getElementById("contador-productos").textContent = totalCount;
}
