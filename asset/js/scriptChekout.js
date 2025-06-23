// Billing address toggle
const sameAsShipping = document.getElementById("sameAsShipping");
const billingAddress = document.getElementById("billingAddress");

sameAsShipping.addEventListener("change", function () {
  billingAddress.style.display = this.checked ? "none" : "block";
});

document.addEventListener('DOMContentLoaded', () => {
  loadOrderSummaryFromAPI();
});

async function loadOrderSummaryFromAPI() {
  const cartProductIds = [1, 2];
  const response = await fetch('asset/apis/products.json');
  const products = await response.json();
  const orderItemsContainer = document.querySelector('.order-items');
  orderItemsContainer.innerHTML = '';

  let subtotal = 0;
  cartProductIds.forEach((id) => {
    const product = products.find(p => p.id === id);
    if (product) {
      const orderItem = document.createElement('div');
      orderItem.className = 'order-item';
      orderItem.innerHTML = `
        <div class="item-name">${product.title}</div>
        <div class="item-price">$${product.price.toFixed(2)}</div>
      `;
      orderItemsContainer.appendChild(orderItem);
      subtotal += product.price;
    }
  });

  // Resumen de totales
  let shipping = subtotal === 0 ? 0 : 5.0;
  let total = subtotal + shipping;
  const orderTotalContainer = document.querySelector('.order-total');
  orderTotalContainer.innerHTML = `
    <div class="total-row">
      <div>Subtotal:</div>
      <div>$${subtotal.toFixed(2)}</div>
    </div>
    <div class="total-row">
      <div>Envío:</div>
      <div>$${shipping.toFixed(2)}</div>
    </div>
    <div class="total-row final">
      <div>Total:</div>
      <div>$${total.toFixed(2)}</div>
    </div>
  `;
}


const placeOrderBtn = document.getElementById("placeOrder");
placeOrderBtn.addEventListener("click", function () {
  this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
  this.disabled = true;


  setTimeout(() => {
    alert("¡Pedido realizado con éxito! Gracias por su compra.");
    window.location.href = 'index.html';
    this.innerHTML = '<i class="fas fa-lock"></i> Realizar Pedido';
    this.disabled = false;
  }, 2000);
});

document
  .querySelector(".checkout-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    placeOrderBtn.click();
  });
