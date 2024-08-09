const products = [
  { id: 1, image: 'images/prod1.jpeg',  name: "RichRipple Headphones", price: 10.99 },
  { id: 2, image: 'images/prod2.jpeg',  name: "Bic Gas Lighter", price: 2.99 },
  { id: 3, image: 'images/prod3.jpeg',  name: "Lenovo Headphones", price: 19.99 },
  { id: 4, image: 'images/prod4.jpeg',  name: "Bingo washing detergent", price: 75.99 },
  { id: 5, image: 'images/prod5.jpeg',  name: "Toiletry Bag", price: 49.99 },
  { id: 6, image: 'images/prod6.jpeg',  name: "Serviette Holder", price: 5.99 },
  { id: 7, image: 'images/prod7.jpeg',  name: "Nivea Radiant&Beauty", price: 50.99 },
  { id: 8, image: 'images/prod8.jpeg',  name: "Amaya Headphones", price: 29.99 },
  { id: 9, image: 'images/prod9.jpeg',  name: "Nivea Deoderant", price: 5.99 },
  { id: 10, image: 'images/prod10.jpeg', name: "Nivea BodyLotion", price: 34.99 },
  { id: 11, image: 'images/prod11.jpeg', name: "Tide Washing Detergent", price: 9.99 },
];

let cart = [];
console.log("above display");

function mainproducts(products) {
  const productList = document.getElementById('product-list');
  products.forEach(product => {
      const productCard = document.createElement('div');
       productCard.className = 'product';
       productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>$${product.price.toFixed(2)}</p>
          <div class="quantity-controls">
              <button onclick="decreaseQuantity(${product.id})">-</button>
              <span id="quantity-${product.id}">0</span>
              <button onclick="increaseQuantity(${product.id})">+</button>
          </div>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(productCard);
  });
}
mainproducts(products);

function increaseQuantity(productId) {
  const quantityElement = document.getElementById(`quantity-${productId}`);
  let quantity = parseInt(quantityElement.textContent, 10);
  quantity++;
  quantityElement.textContent = quantity;
}

function decreaseQuantity(productId) {
  const quantityElement = document.getElementById(`quantity-${productId}`);
  let quantity = parseInt(quantityElement.textContent, 10);
  if (quantity > 0) {
      quantity--;
      quantityElement.textContent = quantity;
  }
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent, 10);
  cart.push({ ...product, quantity });
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} x${item.quantity}`;
      cartItemsContainer.appendChild(listItem);
      total += item.price * item.quantity;
  });

  document.getElementById('cart-total').textContent = total.toFixed(2);
}

function showTotalAmount() {
  const total = parseFloat(document.getElementById('cart-total').textContent);
  document.getElementById('total-amount').textContent = total.toFixed(2);
  document.getElementById('total-amount-modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('total-amount-modal').style.display = 'none';
}

document.getElementById('buy-btn').addEventListener('click', showTotalAmount);
document.querySelector('.close-btn').addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
  if (event.target === document.getElementById('total-amount-modal')) {
      closeModal();
  }
});

