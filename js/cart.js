 // Gestion du panier
class CartManager {
    constructor() {
        this.cart = [];
        this.init();
    }
    
    init() {
        this.loadCart();
        this.updateCartUI();
        this.initEventListeners();
    }
    
    // Charger le panier depuis localStorage
    loadCart() {
        const savedCart = localStorage.getItem('Maison des Bonnes Chose_cart');
        this.cart = savedCart ? JSON.parse(savedCart) : [];
    }
    
    // Sauvegarder le panier
    saveCart() {
        localStorage.setItem('Maison des Bonnes Chose_cart', JSON.stringify(this.cart));
    }
    
    // Mettre à jour l'UI du panier
    updateCartUI() {
        this.updateCartCount();
        this.updateCartModal();
    }
    
    // Mettre à jour le compteur du panier
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalItems = this.getTotalItems();
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }
    
    // Obtenir le nombre total d'articles
    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Obtenir le total du panier
    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Ajouter un produit au panier
    addToCart(productId, productData) {
        let product;
        
        if (productData) {
            product = productData;
        } else {
            // Chercher dans les données des produits
            product = window.productsData?.find(p => p.id === productId);
        }
        
        if (!product) {
            showNotification('Produit non trouvé', 'error');
            return;
        }
        
        // Vérifier le stock
        if (product.stock <= 0) {
            showNotification('Ce produit est en rupture de stock', 'error');
            return;
        }
        
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            if (existingItem.quantity >= product.stock) {
                showNotification(`Stock limité : seulement ${product.stock} unités disponibles`, 'warning');
                return;
            }
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                maxStock: product.stock
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        
        // Animation du panier
        this.animateCartIcon();
        
        showNotification(`${product.name} ajouté au panier !`, 'success');
    }
    
    // Supprimer un article du panier
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        showNotification('Article retiré du panier', 'info');
    }
    
    // Mettre à jour la quantité
    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;
        
        if (newQuantity < 1) {
            this.removeFromCart(productId);
            return;
        }
        
        if (item.maxStock && newQuantity > item.maxStock) {
            showNotification(`Stock limité : seulement ${item.maxStock} unités disponibles`, 'warning');
            newQuantity = item.maxStock;
        }
        
        item.quantity = newQuantity;
        this.saveCart();
        this.updateCartUI();
    }
    
    // Vider le panier
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        showNotification('Panier vidé', 'info');
    }
    
    // Afficher le modal du panier
    showCartModal() {
        const modalHTML = `
            <div class="modal" id="cartModal">
                <div class="modal-content" style="max-width: 500px;">
                    <div class="modal-header">
                        <h3><i class="fas fa-shopping-cart"></i> Mon panier (${this.getTotalItems()} articles)</h3>
                        <button class="close-modal" onclick="cartManager.closeCartModal()">×</button>
                    </div>
                    <div class="modal-body">
                        ${this.renderCartItems()}
                        
                        <div class="cart-footer">
                            <div class="cart-total">
                                <span>Total :</span>
                                <span class="total-price">${this.formatPrice(this.getCartTotal())}</span>
                            </div>
                            
                            <div class="cart-actions">
                                <button class="btn btn-secondary" onclick="cartManager.clearCart()">
                                    <i class="fas fa-trash"></i> Vider le panier
                                </button>
                                <button class="btn btn-primary" onclick="cartManager.checkout()">
                                    <i class="fab fa-whatsapp"></i> Commander (${this.formatPrice(this.getCartTotal())})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);
        
        setTimeout(() => {
            document.getElementById('cartModal').classList.add('show');
            document.body.style.overflow = 'hidden';
        }, 10);
    }
    
    // Fermer le modal du panier
    closeCartModal() {
        const modal = document.getElementById('cartModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    // Rendre les articles du panier
    renderCartItems() {
        if (this.cart.length === 0) {
            return `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart fa-3x"></i>
                    <p>Votre panier est vide</p>
                    <button class="btn btn-primary" onclick="cartManager.closeCartModal(); window.location.href='produits.html'">
                        <i class="fas fa-store"></i> Voir les produits
                    </button>
                </div>
            `;
        }
        
        return `
            <div class="cart-items">
                ${this.cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <div class="cart-item-price">${this.formatPrice(item.price)}</div>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <div class="cart-item-total">${this.formatPrice(item.price * item.quantity)}</div>
                        <button class="cart-item-remove" onclick="cartManager.removeFromCart(${item.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Mettre à jour le modal du panier
    updateCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            const cartItemsContainer = cartModal.querySelector('.modal-body');
            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = this.renderCartItems() + cartModal.querySelector('.cart-footer').outerHTML;
            }
        }
    }
    
    // Animation de l'icône du panier
    animateCartIcon() {
        const cartIcons = document.querySelectorAll('.cart-icon');
        cartIcons.forEach(icon => {
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 300);
        });
    }
    
    // Passer à la caisse
    checkout() {
        if (this.cart.length === 0) {
            showNotification('Votre panier est vide', 'warning');
            return;
        }
        
        // Générer le message WhatsApp
        const message = this.generateWhatsAppMessage();
        const phone = '22656323077';
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        
        // Ouvrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Vider le panier
        this.clearCart();
        this.closeCartModal();
        
        showNotification('Commande envoyée sur WhatsApp !', 'success');
    }
    
    // Générer le message WhatsApp
    generateWhatsAppMessage() {
        const items = this.cart.map(item => 
            `• ${item.name} x${item.quantity} = ${this.formatPrice(item.price * item.quantity)}`
        ).join('\n');
        
        const total = this.formatPrice(this.getCartTotal());
        
        return `🛒 *COMMANDE Maison des Bonnes Chose BANFORA*

👤 *Informations client :*
• Site : Maison des Bonnes Chose Banfora
• Date : ${new Date().toLocaleString('fr-FR')}
• Numéro de commande : CMD-${Date.now().toString().slice(-8)}

📦 *Articles commandés :*
${items}

💰 *Total :* ${total}

📝 *Détails supplémentaires :*
• Livraison gratuite à Banfora
• Paiement à la livraison disponible
• Contact : +226 56 32 30 77

📍 *Adresse de livraison :*
(À confirmer par téléphone)

Merci pour votre commande ! 🚀`;
    }
    
    // Formater le prix
    formatPrice(price) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0
        }).format(price);
    }
    
    // Initialiser les écouteurs d'événements
    initEventListeners() {
        // Bouton panier
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cart-icon')) {
                e.preventDefault();
                this.showCartModal();
            }
        });
        
        // Fermer le modal en cliquant en dehors
        document.addEventListener('click', (e) => {
            const cartModal = document.getElementById('cartModal');
            if (cartModal && e.target === cartModal) {
                this.closeCartModal();
            }
        });
        
        // Fermer avec Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCartModal();
            }
        });
    }
}

// Initialiser le gestionnaire du panier
const cartManager = new CartManager();

// Exporter pour utilisation globale
window.cartManager = cartManager;

// Fonction d'aide pour ajouter au panier
function addToCart(productId, productData) {
    cartManager.addToCart(productId, productData);
}