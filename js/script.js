  // DOM Elements
  const cards = document.getElementById("cards");
  const cartBadge = document.getElementById("cartBadge");
  const cartButton = document.getElementById("cartButton");
  const cartSidebar = document.getElementById("cartSidebar");
  const closeCart = document.getElementById("closeCart");
  const cartItemsContainer = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const productPopup = document.getElementById("productPopup");
  const closePopup = document.getElementById("closePopup");
  const popupContent = document.getElementById("popupContent");

  closePopup.addEventListener('click', () => {
    productPopup.classList.remove('active');
  });

  cartButton.addEventListener('click', () => {
    cartSidebar.classList.remove('translate-x-full');
  });

  closeCart.addEventListener('click', () => {
    cartSidebar.classList.add('translate-x-full');
  });

  const response = async () => {
    try {
      let res = await fetch("https://fakestoreapi.com/products");
      let data = await res.json();

      let content = "";
      data.forEach((item, idx) => {
        content += `
          <div class="product-card bg-white rounded-lg overflow-hidden shadow-md" onclick="showProductDetails(${idx})">
            <div class="h-48 overflow-hidden flex items-center justify-center p-4 bg-white">
              <img src="${item.image}" alt="${item.title}" class="h-full object-contain">
            </div>
            <div class="p-4">
              <h3 class="font-bold text-lg mb-2 truncate">${item.title}</h3>
              <div class="flex items-center justify-between mb-3">
                <span class="price-tag rounded-full px-3 py-1 text-sm">$${item.price}</span>
                <span class="rating-tag rounded-full px-3 py-1 text-sm">⭐ ${item.rating.rate}</span>
              </div>
              <button onclick="event.stopPropagation(); addToCart(${idx})"
                      class="add-to-cart-btn w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                Add to Cart
              </button>
            </div>
          </div>
        `;
      });
      cards.innerHTML = content;
    } catch (error) {
      console.error("Error fetching products:", error);
      cards.innerHTML = `<p class="text-red-500 col-span-full text-center">Failed to load products. Please try again later.</p>`;
    }
  };

  const showProductDetails = async (productIndex) => {
    try {
      let res = await fetch("https://fakestoreapi.com/products");
      let data = await res.json();
      const item = data[productIndex];

      popupContent.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/2 flex items-center justify-center bg-white p-4 rounded-lg">
            <img src="${item.image}" alt="${item.title}" class="max-h-64 object-contain">
          </div>
          <div class="md:w-1/2">
            <h2 class="text-2xl font-bold mb-2">${item.title}</h2>
            <p class="text-gray-600 mb-4">${item.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="price-tag rounded-full px-3 py-1">$${item.price}</span>
              <span class="category-tag rounded-full px-3 py-1">${item.category}</span>
              <span class="rating-tag rounded-full px-3 py-1">Rating: ${item.rating.rate}</span>
            </div>
            <button onclick="addToCart(${productIndex})"
                    class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
              Add to Cart
            </button>
          </div>
        </div>
      `;
      productPopup.classList.add('active');
    } catch (error) {
      console.error("Error showing product details:", error);
    }
  };

  let cart = JSON.parse(localStorage.getItem('DATA')) || [];

  const addToCart = async (productIndex) => {
    try {
      let res = await fetch("https://fakestoreapi.com/products");
      let data = await res.json();
      cart.push(data[productIndex]);
      localStorage.setItem('DATA', JSON.stringify(cart));
      updateCartUI();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateCartUI = () => {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;
      cartItemsContainer.innerHTML += `
        <div class="bg-gray-100 rounded-lg p-3 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-contain rounded">
            <div>
              <h6 class="font-semibold text-sm">${item.title}</h6>
              <p class="text-gray-600 text-xs">${item.category}</p>
              <span class="text-green-600 font-bold text-sm">$${item.price}</span>
            </div>
          </div>
          <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
    });

    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    cartBadge.textContent = cart.length;
  };

  const removeFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('DATA', JSON.stringify(cart));
    updateCartUI();
  };

  document.addEventListener('DOMContentLoaded', () => {
    response();
    updateCartUI();
  });

// Mobile view Side bar


const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

menuButton.addEventListener('click', () => {
  mobileMenu.classList.remove('-translate-x-full');
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.add('-translate-x-full');
});
