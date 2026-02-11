 // Gestion de l'authentification
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    init() {
        this.loadUser();
        this.updateAuthUI();
        this.initEventListeners();
    }
    
    // Charger l'utilisateur depuis localStorage
    loadUser() {
        const savedUser = localStorage.getItem('Maison des Bonnes Chose_user');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
            } catch (e) {
                console.error('Erreur parsing user:', e);
                localStorage.removeItem('Maison des Bonnes Chose_user');
            }
        }
    }
    
    // Mettre à jour l'interface d'authentification
    updateAuthUI() {
        const authButton = document.getElementById('authButton');
        if (!authButton) return;
        
        if (this.currentUser) {
            authButton.innerHTML = `
                <i class="fas fa-user-check"></i> 
                ${this.currentUser.prenom}
            `;
            authButton.style.background = 'var(--success-color)';
            authButton.onclick = () => this.showUserMenu();
        } else {
            authButton.innerHTML = `
                <i class="fas fa-user"></i> 
                Connexion
            `;
            authButton.style.background = '';
            authButton.onclick = () => this.showAuthModal();
        }
    }
    
    // Initialiser les écouteurs d'événements
    initEventListeners() {
        // Fermer le modal en cliquant en dehors
        document.addEventListener('click', (e) => {
            const authModal = document.getElementById('authModal');
            if (authModal && e.target === authModal) {
                this.closeAuthModal();
            }
        });
        
        // Fermer avec Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAuthModal();
            }
        });
    }
    
    // Afficher le modal d'authentification
    showAuthModal(tab = 'login') {
        const modalHTML = `
            <div class="modal" id="authModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-user-circle"></i> Maison des Bonnes Chose</h3>
                        <button class="close-modal" onclick="authManager.closeAuthModal()">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="auth-tabs">
                            <button class="auth-tab ${tab === 'login' ? 'active' : ''}" 
                                    onclick="authManager.switchAuthTab('login')">
                                Connexion
                            </button>
                            <button class="auth-tab ${tab === 'register' ? 'active' : ''}" 
                                    onclick="authManager.switchAuthTab('register')">
                                Inscription
                            </button>
                        </div>
                        
                        <div class="auth-forms">
                            <!-- Formulaire de connexion -->
                            <form id="loginForm" class="auth-form ${tab === 'login' ? 'active' : ''}" 
                                  onsubmit="authManager.login(event)">
                                <div class="form-group">
                                    <label for="loginEmail"><i class="fas fa-envelope"></i> Email</label>
                                    <input type="email" id="loginEmail" class="form-control" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="loginPassword"><i class="fas fa-lock"></i> Mot de passe</label>
                                    <div class="password-input">
                                        <input type="password" id="loginPassword" class="form-control" required>
                                        <button type="button" class="toggle-password" 
                                                onclick="authManager.togglePassword('loginPassword')">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <button type="submit" class="btn btn-primary" style="width: 100%;">
                                    <i class="fas fa-sign-in-alt"></i> Se connecter
                                </button>
                            </form>
                            
                            <!-- Formulaire d'inscription -->
                            <form id="registerForm" class="auth-form ${tab === 'register' ? 'active' : ''}" 
                                  onsubmit="authManager.register(event)">
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label for="registerNom"><i class="fas fa-user"></i> Nom</label>
                                        <input type="text" id="registerNom" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="registerPrenom"><i class="fas fa-user"></i> Prénom</label>
                                        <input type="text" id="registerPrenom" class="form-control" required>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="registerEmail"><i class="fas fa-envelope"></i> Email</label>
                                    <input type="email" id="registerEmail" class="form-control" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="registerPassword"><i class="fas fa-lock"></i> Mot de passe</label>
                                    <div class="password-input">
                                        <input type="password" id="registerPassword" class="form-control" required>
                                        <button type="button" class="toggle-password" 
                                                onclick="authManager.togglePassword('registerPassword')">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="registerConfirmPassword">
                                        <i class="fas fa-lock"></i> Confirmer le mot de passe
                                    </label>
                                    <div class="password-input">
                                        <input type="password" id="registerConfirmPassword" class="form-control" required>
                                        <button type="button" class="toggle-password" 
                                                onclick="authManager.togglePassword('registerConfirmPassword')">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <button type="submit" class="btn btn-primary" style="width: 100%;">
                                    <i class="fas fa-user-plus"></i> S'inscrire
                                </button>
                            </form>
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
            document.getElementById('authModal').classList.add('show');
            document.body.style.overflow = 'hidden';
        }, 10);
    }
    
    // Fermer le modal d'authentification
    closeAuthModal() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    // Changer d'onglet
    switchAuthTab(tab) {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const tabs = document.querySelectorAll('.auth-tab');
        
        if (!loginForm || !registerForm) return;
        
        // Mettre à jour les tabs
        tabs.forEach(tabElement => {
            tabElement.classList.remove('active');
            if (tabElement.textContent.toLowerCase().includes(tab)) {
                tabElement.classList.add('active');
            }
        });
        
        // Afficher le bon formulaire
        loginForm.classList.remove('active');
        registerForm.classList.remove('active');
        
        if (tab === 'login') {
            loginForm.classList.add('active');
        } else {
            registerForm.classList.add('active');
        }
    }
    
    // Basculer la visibilité du mot de passe
    togglePassword(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        const icon = field.parentNode.querySelector('i');
        if (field.type === 'password') {
            field.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            field.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    // Connexion
    async login(event) {
        event.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulation de connexion (à remplacer par un appel API)
        try {
            // Pour l'instant, simulation avec un compte test
            if (email === 'test@Maison des Bonnes Chose.bf' && password === 'Maison des Bonnes Chose123') {
                this.currentUser = {
                    nom: 'Test',
                    prenom: 'Utilisateur',
                    email: email
                };
                
                localStorage.setItem('Maison des Bonnes Chose_user', JSON.stringify(this.currentUser));
                this.updateAuthUI();
                this.closeAuthModal();
                
                showNotification('Connexion réussie !', 'success');
            } else {
                throw new Error('Email ou mot de passe incorrect');
            }
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }
    
    // Inscription
    async register(event) {
        event.preventDefault();
        
        const nom = document.getElementById('registerNom').value;
        const prenom = document.getElementById('registerPrenom').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        // Validation
        if (password !== confirmPassword) {
            showNotification('Les mots de passe ne correspondent pas', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('Le mot de passe doit contenir au moins 6 caractères', 'error');
            return;
        }
        
        // Simulation d'inscription (à remplacer par un appel API)
        try {
            this.currentUser = {
                nom: nom,
                prenom: prenom,
                email: email
            };
            
            localStorage.setItem('Maison des Bonnes Chose_user', JSON.stringify(this.currentUser));
            this.updateAuthUI();
            this.closeAuthModal();
            
            showNotification('Inscription réussie ! Bienvenue chez Maison des Bonnes Chose', 'success');
        } catch (error) {
            showNotification('Erreur lors de l\'inscription', 'error');
        }
    }
    
    // Déconnexion
    logout() {
        this.currentUser = null;
        localStorage.removeItem('Maison des Bonnes Chose_user');
        this.updateAuthUI();
        showNotification('Déconnexion réussie', 'success');
    }
    
    // Afficher le menu utilisateur
    showUserMenu() {
        const userMenuHTML = `
            <div class="modal" id="userMenuModal">
                <div class="modal-content" style="max-width: 300px;">
                    <div class="modal-header">
                        <h3><i class="fas fa-user-circle"></i> Mon compte</h3>
                        <button class="close-modal" onclick="authManager.closeUserMenu()">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="user-info" style="text-align: center; margin-bottom: 20px;">
                            <div style="width: 80px; height: 80px; background: linear-gradient(45deg, var(--secondary-color), var(--accent-color)); 
                                 border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                                 color: white; font-size: 2rem; margin: 0 auto 15px;">
                                ${this.currentUser.prenom[0]}${this.currentUser.nom[0]}
                            </div>
                            <h4>${this.currentUser.prenom} ${this.currentUser.nom}</h4>
                            <p>${this.currentUser.email}</p>
                        </div>
                        
                        <div class="user-menu-options">
                            <button class="user-menu-btn" onclick="authManager.goToProfile()">
                                <i class="fas fa-user"></i> Mon profil
                            </button>
                            <button class="user-menu-btn" onclick="authManager.viewOrders()">
                                <i class="fas fa-shopping-bag"></i> Mes commandes
                            </button>
                            <button class="user-menu-btn" onclick="authManager.viewCart()">
                                <i class="fas fa-shopping-cart"></i> Mon panier
                            </button>
                            <button class="user-menu-btn" style="color: #e74c3c;" onclick="authManager.logoutAndClose()">
                                <i class="fas fa-sign-out-alt"></i> Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = userMenuHTML;
        document.body.appendChild(modalContainer);
        
        setTimeout(() => {
            document.getElementById('userMenuModal').classList.add('show');
            document.body.style.overflow = 'hidden';
        }, 10);
    }
    
    // Fermer le menu utilisateur
    closeUserMenu() {
        const modal = document.getElementById('userMenuModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    // Déconnexion et fermer le menu
    logoutAndClose() {
        this.closeUserMenu();
        setTimeout(() => {
            this.logout();
        }, 300);
    }
    
    // Aller au profil
    goToProfile() {
        this.closeUserMenu();
        showNotification('Page profil en développement', 'info');
    }
    
    // Voir les commandes
    viewOrders() {
        this.closeUserMenu();
        showNotification('Historique des commandes en développement', 'info');
    }
    
    // Voir le panier
    viewCart() {
        this.closeUserMenu();
        // Implémenter l'ouverture du panier
        showNotification('Panier en développement', 'info');
    }
}

// Initialiser l'authentification
const authManager = new AuthManager();

// Exporter pour utilisation globale
window.authManager = authManager;