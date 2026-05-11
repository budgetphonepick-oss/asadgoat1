// Sample Products Data with Real Images
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 2999,
        originalPrice: 5999,
        category: "electronics",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life."
    },
    {
        id: 2,
        name: "Premium T-Shirt",
        price: 599,
        originalPrice: 1299,
        category: "clothing",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        description: "Comfortable 100% cotton premium t-shirt available in multiple colors."
    },
    {
        id: 3,
        name: "Stainless Steel Water Bottle",
        price: 899,
        originalPrice: 1999,
        category: "home",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e9?w=300&h=300&fit=crop",
        description: "Insulated water bottle keeps drinks hot/cold for 12+ hours."
    },
    {
        id: 4,
        name: "Running Sports Shoes",
        price: 3999,
        originalPrice: 7999,
        category: "sports",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
        description: "Professional running shoes with gel cushioning and breathable mesh."
    },
    {
        id: 5,
        name: "Smartphone Stand",
        price: 499,
        originalPrice: 999,
        category: "electronics",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1586253408509-28ebc92c0dd8?w=300&h=300&fit=crop",
        description: "Adjustable aluminum phone stand for desk and streaming."
    },
    {
        id: 6,
        name: "Winter Jacket",
        price: 2499,
        originalPrice: 5999,
        category: "clothing",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1539533057352-76217267d69e?w=300&h=300&fit=crop",
        description: "Warm and stylish winter jacket with water-resistant coating."
    },
    {
        id: 7,
        name: "Coffee Maker",
        price: 4999,
        originalPrice: 9999,
        category: "home",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=300&h=300&fit=crop",
        description: "Automatic coffee maker with temperature control and timer."
    },
    {
        id: 8,
        name: "Yoga Mat",
        price: 799,
        originalPrice: 1999,
        category: "sports",
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop",
        description: "Non-slip eco-friendly yoga mat with carrying strap."
    },
    {
        id: 9,
        name: "USB-C Fast Charger",
        price: 1299,
        originalPrice: 2999,
        category: "electronics",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1596659406018-e666eef1c0fa?w=300&h=300&fit=crop",
        description: "65W fast charger compatible with all USB-C devices."
    },
    {
        id: 10,
        name: "Denim Jeans",
        price: 1299,
        originalPrice: 2999,
        category: "clothing",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=300&h=300&fit=crop",
        description: "Classic blue denim jeans with comfortable fit and durability."
    },
    {
        id: 11,
        name: "Kitchen Knife Set",
        price: 1999,
        originalPrice: 4999,
        category: "home",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=300&h=300&fit=crop",
        description: "Professional 5-piece stainless steel knife set with storage block."
    },
    {
        id: 12,
        name: "Dumbbells Set",
        price: 2499,
        originalPrice: 5999,
        category: "sports",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop",
        description: "10kg adjustable dumbbells set with carrying case."
    }
];

// Cart Array
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCart');
const productModal = document.getElementById('productModal');
const closeProductBtn = document.getElementById('closeProduct');
const successModal = document.getElementById('successModal');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');

const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');
const sortFilter = document.getElementById('sortFilter');

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Render Products
function renderProducts(productsToRender = products) {
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No products found</div>';
        return;
    }

    productsToRender.forEach(product => {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/200?text=${encodeURIComponent(product.name)}'">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div style="margin-bottom: 6px;">
                    <span class="product-price">₹${product.price}</span>
                    <span class="product-original-price">₹${product.originalPrice}</span>
                    <span class="product-discount">${discount}% OFF</span>
                </div>
                <div class="product-rating">
                    <i class="fas fa-star"></i> ${product.rating} (${Math.floor(Math.random() * 500) + 100} Reviews)
                </div>
                <div class="product-actions">
                    <button class="btn-add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn-quick-view" onclick="showProductDetail(${product.id})">View</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification('Added to cart!');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

// Update Cart Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCart();
        }
    }
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Render Cart
function renderCart() {
    const isEmpty = cart.length === 0;
    
    if (isEmpty) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p style="font-size: 12px; margin-top: 10px;">Add items to get started!</p>
            </div>
        `;
        checkoutBtn.disabled = true;
        updateCartTotals();
        return;
    }

    checkoutBtn.disabled = false;
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; border-radius: 4px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/60?text=${encodeURIComponent(item.name)}'">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
            </div>
            <div class="quantity-control">
                <button onclick="updateQuantity(${item.id}, -1)">−</button>
                <input type="number" value="${item.quantity}" readonly>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div style="font-weight: 600; min-width: 80px; text-align: right;">₹${item.price * item.quantity}</div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartTotals();
}

// Update Cart Totals
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal; // No shipping charges for now

    subtotalEl.textContent = `₹${subtotal}`;
    totalEl.textContent = `₹${total}`;
}

// Show Product Detail
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const content = document.getElementById('productDetailContent');
    content.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;" onerror="this.src='https://via.placeholder.com/300?text=${encodeURIComponent(product.name)}'">
        <div class="detail-info">
            <h3>${product.name}</h3>
            <div class="detail-price">₹${product.price}</div>
            <div style="color: #999; text-decoration: line-through; margin-bottom: 10px;">₹${product.originalPrice}</div>
            <div style="color: #388e3c; font-weight: bold; margin-bottom: 15px;">${discount}% OFF</div>
            <div class="detail-rating">
                <i class="fas fa-star"></i> ${product.rating} Rating
            </div>
            <div class="detail-description">${product.description}</div>
            <div class="detail-actions">
                <button class="detail-add-cart" onclick="addToCart(${product.id}); closeProductModal();">Add to Cart</button>
                <button class="detail-wishlist"><i class="fas fa-heart"></i> Wishlist</button>
            </div>
        </div>
    `;

    productModal.classList.add('active');
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 2000;
        animation: slideInRight 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Filter and Sort Products
function applyFilters() {
    let filtered = [...products];

    // Search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    // Category filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
        filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Price filter
    const maxPrice = parseInt(priceFilter.value);
    filtered = filtered.filter(p => p.price <= maxPrice);

    // Sort
    const sortBy = sortFilter.value;
    if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
}

// Modal Functions
function openCart() {
    renderCart();
    cartModal.classList.add('active');
}

function closeCart() {
    cartModal.classList.remove('active');
}

function closeProductModal() {
    productModal.classList.remove('active');
}

function showSuccessModal() {
    successModal.classList.add('active');
}

function closeSuccessModal() {
    successModal.classList.remove('active');
    closeCart();
    cart = [];
    saveCart();
    updateCartCount();
    applyFilters();
}

// Event Listeners
cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
closeProductBtn.addEventListener('click', closeProductModal);
continueShoppingBtn.addEventListener('click', closeSuccessModal);

searchInput.addEventListener('input', applyFilters);
searchBtn.addEventListener('click', applyFilters);
categoryFilter.addEventListener('change', applyFilters);
priceFilter.addEventListener('input', (e) => {
    priceValue.textContent = `₹${e.target.value}`;
    applyFilters();
});
sortFilter.addEventListener('change', applyFilters);

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        closeCart();
        showSuccessModal();
    }
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) closeCart();
    if (e.target === productModal) closeProductModal();
    if (e.target === successModal) closeSuccessModal();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderProducts();
    updateCartTotals();
});
