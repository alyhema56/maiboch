 // Données des produits (à remplacer par un appel API)
const productsData = [
    {
        id: 1,
        name: "iPhone 14 Pro Max",
        category: "telephone",
        subcategory: "Apple",
        description: "Reconditionné garanti 12 mois, écran 6.7\", 256 Go, état comme neuf",
        price: 450000,
        oldPrice: 520000,
        image: "https://images.unsplash.com/photo-1663499482523-1c0c1eae63ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Nouveau",
        stock: 5,
        features: ["Garantie 12 mois", "Batterie neuve", "Écran OLED", "iOS 16"]
    },
    {
        id: 2,
        name: "Samsung Galaxy S23",
        category: "telephone",
        subcategory: "Samsung",
        description: "Neuf sous boîte, écran Dynamic AMOLED 6.1\", 256 Go, 50 MP",
        price: 380000,
        oldPrice: 420000,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Promo",
        stock: 8,
        features: ["Garantie 12 mois", "Écran 120Hz", "Charge rapide", "Android 13"]
    },
    {
        id: 3,
        name: "Infinix Hot 30",
        category: "telephone",
        subcategory: "Infinix",
        description: "Neuf sous boîte, 6.78\", 8 Go RAM, 128 Go, 5000 mAh",
        price: 125000,
        oldPrice: 145000,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Meilleur vente",
        stock: 12,
        features: ["Garantie 12 mois", "8 Go RAM", "Batterie 5000mAh", "Android 12"]
    },
    {
        id: 4,
        name: "Tecno Spark 10 Pro",
        category: "telephone",
        subcategory: "Tecno",
        description: "Écran 6.8\", 256 Go, 8 Go RAM, 32MP selfie, 5000 mAh",
        price: 95000,
        oldPrice: 115000,
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Promo",
        stock: 15,
        features: ["Garantie 12 mois", "256 Go stockage", "Écran large", "Android 13"]
    },
    {
        id: 5,
        name: "Radio Portable Sony",
        category: "radio",
        subcategory: "Audio",
        description: "FM/AM avec Bluetooth, batterie longue durée 48h, haut-parleur puissant",
        price: 25000,
        oldPrice: 32000,
        image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Livraison gratuite",
        stock: 20,
        features: ["Bluetooth", "Batterie 48h", "FM/AM", "Portable"]
    },
    {
        id: 6,
        name: "Radio Panasonic",
        category: "radio",
        subcategory: "Audio",
        description: "Radio réveil avec USB, auxiliaire, affichage LED, 10 stations mémoire",
        price: 18000,
        oldPrice: 22000,
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "",
        stock: 25,
        features: ["Réveil", "USB", "LED", "10 stations"]
    },
    {
        id: 7,
        name: "Écouteurs Bluetooth TWS",
        category: "accessory",
        subcategory: "Audio",
        description: "Sans fil, autonomie 20h, étanches IPX7, charge rapide USB-C",
        price: 15000,
        oldPrice: 20000,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Promo",
        stock: 30,
        features: ["Étanche IPX7", "20h autonomie", "USB-C", "Charge rapide"]
    },
    {
        id: 8,
        name: "Chargeur Rapide 30W",
        category: "accessory",
        subcategory: "Power",
        description: "Charge rapide 30W, compatible iPhone/Android, câble inclus",
        price: 8000,
        oldPrice: 12000,
        image: "https://images.unsplash.com/photo-1600003263720-95b45a4035d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Économisez",
        stock: 50,
        features: ["30W", "Universel", "Câble inclus", "Compact"]
    },
    {
        id: 9,
        name: "Coque iPhone 14",
        category: "accessory",
        subcategory: "Protection",
        description: "Coque silicone avec protection militaire, anti-chocs, designs variés",
        price: 5000,
        oldPrice: 7000,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "",
        stock: 100,
        features: ["Anti-choc", "Silicone", "Designs", "Protection militaire"]
    },
    {
        id: 10,
        name: "Power Bank 20000mAh",
        category: "accessory",
        subcategory: "Power",
        description: "Batterie externe 20000mAh, double USB, charge rapide, LCD écran",
        price: 18000,
        oldPrice: 22000,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Nouveau",
        stock: 15,
        features: ["20000mAh", "Double USB", "LCD", "Charge rapide"]
    },
    {
        id: 11,
        name: "Oppo Reno 8",
        category: "telephone",
        subcategory: "Oppo",
        description: "Écran AMOLED 6.4\", 128 Go, 8 Go RAM, 50MP, charge 65W",
        price: 195000,
        oldPrice: 225000,
        image: "https://images.unsplash.com/photo-1598327105854-c8674faddf74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "Promo",
        stock: 6,
        features: ["Charge 65W", "AMOLED", "50MP", "Android 13"]
    },
    {
        id: 12,
        name: "Câble USB-C 2m",
        category: "accessory",
        subcategory: "Câble",
        description: "Câble USB-C nylon tressé, charge et données, durable 10000 flexions",
        price: 2500,
        oldPrice: 4000,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        badge: "",
        stock: 80,
        features: ["2m", "Nylon", "Durable", "USB-C"]
    }
];

// Variables pour la pagination
let currentPage = 1;
const productsPerPage = 9;
let filteredProducts = [];

// Initialiser les produits
function loadProducts() {
    filteredProducts = [...productsData];
    displayProducts();
    updatePagination();
    initProductFilters();
}

// Afficher les produits
function displayProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (productsToShow.length === 0) {
        container.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search fa-3x" style="color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666; margin-bottom: 10px;">Aucun produit trouvé</h3>
                <p style="color: #999;">Essayez d'autres termes de recherche ou filtres</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-category="${product.category}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
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
                <div class="product-stock">
                    ${product.stock < 5 ? 
                        `<span style="color: #e74c3c;"><i class="fas fa-exclamation-circle"></i> Plus que ${product.stock} en stock</span>` :
                        `<span style="color: #27ae60;"><i class="fas fa-check-circle"></i> En stock</span>`
                    }
                </div>
                <div class="product-actions">
                    <button class="btn-order" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Ajouter
                    </button>
                    <button class="btn-order btn-command" onclick="viewProductDetails(${product.id})">
                        <i class="fas fa-eye"></i> Détails
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialiser les filtres
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Filtrer les produits
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
}

// Filtrer les produits
function filterProducts(category) {
    if (category === 'all') {
        filteredProducts = [...productsData];
    } else {
        filteredProducts = productsData.filter(product => product.category === category);
    }
    
    currentPage = 1;
    displayProducts();
    updatePagination();
}

// Mettre à jour la pagination
function updatePagination() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Bouton précédent
    paginationHTML += `
        <button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" 
                onclick="changePage(${currentPage - 1})" 
                ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Pages numérotées
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                        onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="page-dots">...</span>`;
        }
    }
    
    // Bouton suivant
    paginationHTML += `
        <button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                onclick="changePage(${currentPage + 1})" 
                ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

// Changer de page
function changePage(page) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayProducts();
    updatePagination();
    
    // Scroll vers le haut
    window.scrollTo({
        top: document.querySelector('.products-section').offsetTop - 100,
        behavior: 'smooth'
    });
}

// Voir les détails d'un produit
function viewProductDetails(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    // Créer le modal de détails
    const modalHTML = `
        <div class="modal" id="productModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-mobile-alt"></i> Détails du produit</h3>
                    <button class="close-modal" onclick="closeModal()">×</button>
                </div>
                <div class="modal-body">
                    <img src="${product.image}" alt="${product.name}" class="product-modal-image">
                    
                    <div class="product-modal-details">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                        
                        <div class="product-modal-price">
                            ${formatPrice(product.price)}
                            ${product.oldPrice > 0 ? 
                                `<span style="font-size: 1rem; color: #999; text-decoration: line-through; margin-left: 10px;">
                                    ${formatPrice(product.oldPrice)}
                                </span>` : 
                                ''}
                        </div>
                        
                        ${product.features ? `
                            <div style="margin: 20px 0;">
                                <h5 style="margin-bottom: 10px;"><i class="fas fa-check-circle"></i> Caractéristiques</h5>
                                <ul style="list-style: none; padding: 0;">
                                    ${product.features.map(feature => `
                                        <li style="padding: 5px 0; display: flex; align-items: center; gap: 10px;">
                                            <i class="fas fa-check" style="color: #27ae60;"></i>
                                            <span>${feature}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        <div class="quantity-selector">
                            <button class="quantity-btn" onclick="updateQuantity(-1)">-</button>
                            <input type="number" id="productQuantity" class="quantity-input" value="1" min="1" max="${product.stock}">
                            <button class="quantity-btn" onclick="updateQuantity(1)">+</button>
                        </div>
                        
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button class="btn btn-primary" style="flex: 1;" onclick="addToCartAndClose(${product.id})">
                                <i class="fas fa-cart-plus"></i> Ajouter au panier
                            </button>
                            <button class="btn btn-secondary" style="flex: 1;" onclick="orderProduct(${product.id})">
                                <i class="fab fa-whatsapp"></i> Commander via WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Ajouter le modal au DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Afficher le modal
    setTimeout(() => {
        document.getElementById('productModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    }, 10);
    
    // Stocker le produit courant
    window.currentModalProduct = product;
}

// Fermer le modal
function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Mettre à jour la quantité
function updateQuantity(change) {
    const input = document.getElementById('productQuantity');
    if (!input) return;
    
    let quantity = parseInt(input.value) || 1;
    const product = window.currentModalProduct;
    
    quantity += change;
    
    if (quantity < 1) quantity = 1;
    if (quantity > product.stock) quantity = product.stock;
    
    input.value = quantity;
}

// Ajouter au panier et fermer
function addToCartAndClose(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const quantityInput = document.getElementById('productQuantity');
    const quantity = parseInt(quantityInput.value) || 1;
    
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    
    closeModal();
}

// Commander un produit via WhatsApp
function orderProduct(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const quantityInput = document.getElementById('productQuantity');
    const quantity = parseInt(quantityInput.value) || 1;
    
    const message = `Bonjour Maison des Bonnes Chose Banfora !%0A%0AJe souhaite commander :%0A%0A📱 *${product.name}*%0A📦 Quantité : ${quantity}%0A💰 Prix unitaire : ${formatPrice(product.price)}%0A💵 Total : ${formatPrice(product.price * quantity)}%0A%0AMerci de me contacter pour finaliser la commande.%0A%0ACordialement`;
    
    const phone = '22656323077';
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    closeModal();
}

// Recherche de produits
function performSearch() {
    const searchInput = document.getElementById('productSearch');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredProducts = [...productsData];
    } else {
        filteredProducts = productsData.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.subcategory.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    displayProducts();
    updatePagination();
}

// Formater le prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0
    }).format(price);
}

// Ajouter au panier (fonction globale)
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    // Récupérer le panier actuel
    let cart = JSON.parse(localStorage.getItem('Maison des Bonnes Chose_cart')) || [];
    
    // Vérifier si le produit est déjà dans le panier
    const existingItem = cart.find(item => item.id === productId);
    
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
    
    // Sauvegarder le panier
    localStorage.setItem('Maison des Bonnes Chose_cart', JSON.stringify(cart));
    
    // Mettre à jour l'UI
    updateCartUI();
    
    // Afficher une notification
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

// Mettre à jour l'UI du panier
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('Maison des Bonnes Chose_cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Afficher une notification
function showNotification(message, type = 'success') {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Afficher
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Cacher après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialiser quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('productsGrid')) {
        loadProducts();
        
        // Écouteur pour la recherche
        const searchButton = document.getElementById('searchButton');
        const searchInput = document.getElementById('productSearch');
        
        if (searchButton && searchInput) {
            searchButton.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }
});

// Gérer les clics en dehors du modal
document.addEventListener('click', function(event) {
    const modal = document.getElementById('productModal');
    if (modal && event.target === modal) {
        closeModal();
    }
});

// Gérer la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});