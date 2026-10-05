const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#searchInput");
const forms = document.querySelectorAll("form");
const inputFields = document.querySelectorAll("input, select, textarea");

const navigationLinks = document.querySelectorAll(".nav-link");
const categoryButtons = document.querySelectorAll(".category-btn");
const productGrid = document.querySelector("#productGrid");
const resultsCount = document.querySelector(".results-count span");
const mode = document.querySelector(".topbar-settings");
let productCards = document.querySelectorAll(".product-card");
let favoriteButtons = document.querySelectorAll(".favorite-button");
let addToCartButtons = document.querySelectorAll(".add-button");

let allButtons = document.querySelectorAll("button");
const settingsButtons = document.querySelectorAll(".profile-settings, .topbar-settings");
const cartLinks = document.querySelectorAll(".header-cart, .cart-link");
const dialogCloseButtons = document.querySelectorAll(".dialog-close");
const quantityButtons = document.querySelectorAll(".quantity-control button");
const removeFromCartButtons = document.querySelectorAll(".remove-button");
const checkoutButton = document.querySelector(".checkout-button");

const productDetail = document.querySelector("#productDetail");
const cartPanel = document.querySelector("#cart-panel");
const noProductsState = document.querySelector("#noProductsState");
const emptyCartState = document.querySelector("#emptyCartState");
const cartItems = document.querySelector(".cart-items");
const cartBadge = document.querySelector(".cart-badge");
const headerCart = document.querySelector(".header-cart");
const sidebarItemCount = document.querySelector(".item-count");
const sidebarCartSummary = document.querySelector(".sidebar-cart .cart-summary");
const drawerCount = document.querySelector(".drawer-count");
const cartSummaryValues = cartPanel.querySelectorAll(
  ".summary-row > span:last-child",
);
const detailQuantity = document.querySelector(
  ".detail-quantity .quantity-control span",
);

let selectedCategory = "All";
let showFavoritesOnly = false;

let favorites = [];
let cart = [];

const products = [
  {
    id: "macbook-air-m2",
    name: "MacBook Air M2",
    category: "Electronics",
    price: 1099.00,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85",
    description: "Lightweight laptop with a brilliant display and all-day battery life.",
  },
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5",
    category: "Electronics",
    price: 349.00,
    rating: 4.8,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    description: "Over-ear headphones designed for immersive listening.",
  },
  {
    id: "keychron-k8",
    name: "Keychron K8",
    category: "Accessories",
    price: 99.00,
    rating: 4.7,
    reviews: 74,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85",
    description: "Compact mechanical keyboard for a comfortable desktop setup.",
  },
  {
    id: "nike-air-force-1",
    name: "Nike Air Force 1",
    category: "Clothing",
    price: 115.00,
    rating: 4.9,
    reviews: 213,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    description: "Classic low-top sneaker with a timeless everyday style.",
  },
  {
    id: "playstation-5",
    name: "PlayStation 5",
    category: "Gaming",
    price: 499.00,
    rating: 4.9,
    reviews: 182,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=85",
    description: "Modern game console for immersive home gaming.",
  },
  {
    id: "minimal-backpack",
    name: "Minimal Backpack",
    category: "Accessories",
    price: 89.00,
    rating: 4.6,
    reviews: 58,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    description: "A clean, versatile backpack for everyday carry.",
  },
  {
    id: "iphone",
    name: "iPhone 15",
    category: "Electronics",
    price: 799.00,
    rating: 4.8,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85",
    description: "Smartphone with a refined design for everyday communication and photography.",
  },
  {
    id: "apple-watch",
    name: "Apple Watch SE",
    category: "Electronics",
    price: 249.00,
    rating: 4.7,
    reviews: 103,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=900&q=85",
    description: "Smartwatch with a dark band and essential everyday features.",
  },
  {
    id: "bose-soundlink-flex",
    name: "Bose SoundLink Flex",
    category: "Electronics",
    price: 149.00,
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
    description: "Compact portable wireless speaker for listening on the go.",
  },
  {
    id: "fujifilm-x100vi",
    name: "Fujifilm X100VI",
    category: "Electronics",
    price: 1599.00,
    rating: 4.9,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
    description: "Digital camera ready for a photo walk.",
  },
  {
    id: "stanley-quencher",
    name: "Stanley Quencher H2.0",
    category: "Accessories",
    price: 45.00,
    rating: 4.7,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
    description: "Reusable insulated stainless steel bottle.",
  },
  {
    id: "ray-ban-wayfarer",
    name: "Ray-Ban Wayfarer",
    category: "Accessories",
    price: 163.00,
    rating: 4.6,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
    description: "Classic sunglasses with dark lenses.",
  },
  {
    id: "aeropress-coffee-maker",
    name: "AeroPress Coffee Maker",
    category: "Accessories",
    price: 39.95,
    rating: 4.8,
    reviews: 111,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85",
    description: "A compact coffee maker for freshly brewed coffee at home or on the go.",
  },
  {
    id: "patagonia-better-sweater",
    name: "Patagonia Better Sweater",
    category: "Clothing",
    price: 139.00,
    rating: 4.8,
    reviews: 97,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    description: "Versatile everyday outerwear.",
  },
  {
    id: "kindle-paperwhite",
    name: "Kindle Paperwhite",
    category: "Electronics",
    price: 149.99,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85",
    description: "An e-reader for bringing your books along wherever you go.",
  },
  {
    id: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S",
    category: "Accessories",
    price: 99.99,
    rating: 4.7,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85",
    description: "Ergonomic wireless computer mouse for a comfortable workspace.",
  },
];

function createProductCard(product) {
  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-visual">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <button
          class="favorite-button${favorites.includes(product.id) ? " is-favorited" : ""}"
          type="button"
          aria-label="Add ${product.name} to favorites"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.8 8.7c0 5.4-8.8 11-8.8 11s-8.8-5.6-8.8-11A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z" />
          </svg>
        </button>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h2 class="product-name">${product.name}</h2>
        <div
          class="product-rating"
          aria-label="Rated ${product.rating} out of 5, ${product.reviews} reviews"
        >
          <span class="rating-star" aria-hidden="true">★</span>
          <span>${product.rating}</span>
          <span class="review-count">(${product.reviews})</span>
        </div>
        <div class="product-footer">
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button
            class="add-button"
            type="button"
            aria-label="Add ${product.name} to cart"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 1.9-1.4L21 8H6" />
              <path d="M12 9v5m-2.5-2.5h5" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts(productArray) {
  const productCardsHTML = productArray.map(function (product) {
    return createProductCard(product);
  });

  return productCardsHTML.join("");
}

function displayProducts(productArray) {
  productGrid.innerHTML = renderProducts(productArray);

  productCards = document.querySelectorAll(".product-card");
  favoriteButtons = document.querySelectorAll(".favorite-button");
  addToCartButtons = document.querySelectorAll(".add-button");
  allButtons = document.querySelectorAll("button");
}

function searchProducts(searchTerm) {
  const searchText = searchTerm.toLowerCase();

  return products.filter(function (product) {
    const productName = product.name.toLowerCase();
    const productCategory = product.category.toLowerCase();
    const matchesSearch =
      productName.includes(searchText) || productCategory.includes(searchText);
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesFavorite =
      !showFavoritesOnly || favorites.includes(product.id);

    return matchesSearch && matchesCategory && matchesFavorite;
  });
}

function toggleEmptyState(productArray) {
  const noProductsFound = productArray.length === 0;

  productGrid.hidden = noProductsFound;
  noProductsState.hidden = !noProductsFound;
}

function handleSearch(searchTerm) {
  const matchingProducts = searchProducts(searchTerm);

  displayProducts(matchingProducts);
  toggleEmptyState(matchingProducts);
  resultsCount.textContent = matchingProducts.length;
}

function formatPrice(price) {
  return "$" + price.toFixed(2);
}

function updateCart() {
  let itemCount = 0;
  let subtotal = 0;

  cart.forEach(function (item) {
    const product = products.find(function (product) {
      return product.id === item.id;
    });

    itemCount += item.quantity;
    subtotal += product.price * item.quantity;
  });

  cartItems.innerHTML = cart
    .map(function (item) {
      const product = products.find(function (product) {
        return product.id === item.id;
      });

      return `
        <article class="cart-item" data-product-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" />
          <div class="cart-item-copy">
            <h3>${product.name}</h3>
            <p>${formatPrice(product.price)}</p>
            <div class="quantity-control" aria-label="Quantity">
              <button type="button" data-cart-action="decrease" aria-label="Decrease ${product.name} quantity">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-cart-action="increase" aria-label="Increase ${product.name} quantity">+</button>
            </div>
          </div>
          <button class="remove-button" type="button" data-cart-action="remove" aria-label="Remove ${product.name} from cart">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16m-10 4v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3" />
            </svg>
          </button>
        </article>
      `;
    })
    .join("");

  sidebarItemCount.textContent = itemCount;
  drawerCount.textContent = itemCount;
  sidebarCartSummary.firstChild.textContent =
    itemCount + (itemCount === 1 ? " item " : " items ");
  sidebarCartSummary.querySelector("span").textContent = formatPrice(subtotal);
  cartBadge.textContent = itemCount;
  cartBadge.hidden = itemCount === 0;
  headerCart.setAttribute(
    "aria-label",
    itemCount === 0 ? "Cart, empty" : "Cart, " + itemCount + " items",
  );

  cartSummaryValues[0].textContent = formatPrice(subtotal);
  cartSummaryValues[1].textContent = itemCount === 0 ? "—" : "Free";
  cartSummaryValues[2].textContent = formatPrice(subtotal);
  emptyCartState.hidden = itemCount > 0;
  cartItems.hidden = itemCount === 0;
}

function addToCart(productId, quantity) {
  const existingItem = cart.find(function (item) {
    return item.id === productId;
  });

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity: quantity });
  }

  updateCart();
}

function openCart() {
  cartPanel.hidden = false;
}

categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedCategory = button.textContent.trim();

    categoryButtons.forEach(function (categoryButton) {
      const isSelected = categoryButton === button;

      categoryButton.classList.toggle("is-selected", isSelected);
      categoryButton.setAttribute("aria-pressed", isSelected);
    });

    handleSearch(searchInput.value);
  });
});

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    showFavoritesOnly = link.getAttribute("href") === "#favorites";
    handleSearch(searchInput.value);
  });
});

searchInput.addEventListener("input", function (event) {
  handleSearch(event.target.value);
});

cartLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    openCart();
  });
});

cartPanel.querySelector(".dialog-close").addEventListener("click", function () {
  cartPanel.hidden = true;
});

cartPanel.querySelector(".overlay-backdrop").addEventListener("click", function () {
  cartPanel.hidden = true;
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    cartPanel.hidden = true;
  }
});

productGrid.addEventListener("click", function (event) {
  const button = event.target.closest(".add-button");
  if (!button) {
    return;
  }

  const productId = button.closest(".product-card").dataset.productId;
  addToCart(productId, 1);
});

document
  .querySelector(".detail-quantity .quantity-control")
  .addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) {
      return;
    }

    const quantity = Number(detailQuantity.textContent);
    detailQuantity.textContent =
      button.getAttribute("aria-label") === "Increase quantity"
        ? quantity + 1
        : Math.max(1, quantity - 1);
  });

document
  .querySelector(".detail-add-button")
  .addEventListener("click", function () {
    addToCart("macbook-air-m2", Number(detailQuantity.textContent));
  });

cartItems.addEventListener("click", function (event) {
  const button = event.target.closest("[data-cart-action]");
  if (!button) {
    return;
  }

  const productId = button.closest(".cart-item").dataset.productId;
  const item = cart.find(function (cartItem) {
    return cartItem.id === productId;
  });
  if (!item) {
    return;
  }

  if (
    button.dataset.cartAction === "remove" ||
    (button.dataset.cartAction === "decrease" && item.quantity === 1)
  ) {
    cart = cart.filter(function (cartItem) {
      return cartItem.id !== productId;
    });
  } else if (button.dataset.cartAction === "decrease") {
    item.quantity -= 1;
  } else {
    item.quantity += 1;
  }

  updateCart();
});

productGrid.addEventListener("click", function (event) {
  const button = event.target.closest(".favorite-button");
  if (!button) {
    return;
  }

  const productId = button.closest(".product-card").dataset.productId;

  if (favorites.includes(productId)) {
    favorites = favorites.filter(function (favoriteId) {
      return favoriteId !== productId;
    });
    button.classList.remove("is-favorited");
  } else {
    favorites.push(productId);
    button.classList.add("is-favorited");
  }

  if (showFavoritesOnly) {
    handleSearch(searchInput.value);
  }
});

mode.addEventListener("click", function () {
  const isLightMode = document.body.classList.toggle("light-mode");
  mode.setAttribute("aria-pressed", isLightMode);
});

displayProducts(products);
toggleEmptyState(products);
updateCart();