// Configuration globale
const CONFIG = {
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxRlM2gV8ekqzjd3iwtn-tqnII5o-Sa-miFNYTaENvsuPVEGjDMgFmOL9WZaFR3smmk/exec',
    PRODUCTS_PER_PAGE: 12,
    CURRENT_PAGE: 1,
    TOTAL_PAGES: 1
};

// Variables globales
let products = [];
let filteredProducts = [];
let cart = [];

// Initialisation de l'application
function initApp() {
    loadCart();
    updateCartUI();
    initEventListeners();
    loadFeaturedProducts();
    updateOpeningStatus();
    
    // Vérifier l'authentification
    checkAuthStatus();
    
    // Mettre à jour le statut toutes les 30 secondes
    setInterval(updateOpeningStatus, 30000);
}

// Charger le panier depuis localStorage
function loadCart() {
    const savedCart = localStorage.getItem('Telecom Les Bonnes Chose_cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
}

// Sauvegarder le panier
function saveCart() {
    localStorage.setItem('Telecom Les Bonnes Chose_cart', JSON.stringify(cart));
}

// Mettre à jour l'UI du panier
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Ajouter au panier
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showNotification(`${product.name} ajouté au panier !`);
    
    // Animation du panier
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
    }
}

// Basculer l'affichage du panier
function toggleCart() {
    // À implémenter selon les besoins
    showNotification('Fonction panier en cours de développement');
}

// Charger les produits phares
function loadFeaturedProducts() {
    if (!document.getElementById('featuredProducts')) return;
    
    const featured = productsData.slice(0, 6);
    const container = document.getElementById('featuredProducts');
    
    container.innerHTML = featured.map(product => `
        <div class="product-card">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.subcategory}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.oldPrice > 0 ? 
                        `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : 
                        ''}
                </div>
                <div class="product-actions">
                    <button class="btn-order" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="fas fa-cart-plus"></i> Ajouter
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Mettre à jour le statut d'ouverture
function updateOpeningStatus() {
    const now = new Date();
    const hour = now.getHours();
    const isOpen = hour >= 8 && hour < 22;
    
    // Vous pouvez ajouter un badge de statut dans le header si besoin
}

// Formater le prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0
    }).format(price);
}

// Afficher une notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialiser les écouteurs d'événements
function initEventListeners() {
    // Authentification
    const authBtn = document.getElementById('authButton');
    if (authBtn) {
        authBtn.addEventListener('click', () => {
            // Implémenter l'authentification
            showNotification('Système d\'authentification en cours de développement');
        });
    }
    
    // Recherche de produits
    const searchInput = document.getElementById('productSearch');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
    
    // Filtres
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProducts(button.dataset.filter);
        });
    });
}

// Filtrer les produits
function filterProducts(category) {
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    CONFIG.CURRENT_PAGE = 1;
    displayProducts();
    updatePagination();
}

// Recherche de produits
function performSearch() {
    const searchInput = document.getElementById('productSearch');
    if (!searchInput) return;
    
    const term = searchInput.value.toLowerCase().trim();
    
    if (term === '') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.subcategory.toLowerCase().includes(term)
        );
    }
    
    CONFIG.CURRENT_PAGE = 1;
    displayProducts();
    updatePagination();
}

// Vérifier le statut d'authentification
function checkAuthStatus() {
    const user = localStorage.getItem('Telecom Les Bonnes Chose_user');
    const authBtn = document.getElementById('authButton');
    
    if (user && authBtn) {
        try {
            const userData = JSON.parse(user);
            authBtn.innerHTML = `<i class="fas fa-user-check"></i> ${userData.prenom}`;
            authBtn.style.background = 'var(--success-color)';
        } catch (e) {
            console.error('Erreur parsing user:', e);
        }
    }
}

// Données des produits (exemple)
const productsData = [
    {
        id: 1,
        name: "iPhone 14 Pro Max",
        category: "telephone",
        subcategory: "Apple",
        description: "Reconditionné garanti 12 mois, écran 6.7\", 256 Go",
        price: 450000,
        oldPrice: 520000,
        image: "/images/produits/Galaxy.jpg",
        badge: "Nouveau",
        stock: 5
    },
    // ... autres produits
];