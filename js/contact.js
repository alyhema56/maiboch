 // Formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validation
            if (!validatePhone(phone)) {
                showNotification('Veuillez entrer un numéro de téléphone valide', 'error');
                return;
            }
            
            if (email && !validateEmail(email)) {
                showNotification('Veuillez entrer un email valide', 'error');
                return;
            }
            
            // Générer le message WhatsApp
            const whatsappMessage = `Bonjour Maison des Bonnes Chose Banfora !%0A%0A📞 *Demande de contact*%0A%0A👤 *Nom :* ${name}%0A📱 *Téléphone :* ${phone}%0A${email ? `📧 *Email :* ${email}%0A` : ''}📝 *Sujet :* ${getSubjectText(subject)}%0A%0A💬 *Message :*%0A${message}%0A%0AMerci de me contacter rapidement.%0A%0ACordialement`;
            
            // Ouvrir WhatsApp
            const phoneNumber = '22656323077';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
            
            // Ouvrir dans un nouvel onglet
            window.open(whatsappUrl, '_blank');
            
            // Afficher confirmation
            showNotification('Ouverture de WhatsApp... Vous allez être redirigé');
            
            // Réinitialiser le formulaire
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }
    
    // Initialiser le sélecteur de sujet
    initSubjectSelector();
});

// Valider le téléphone
function validatePhone(phone) {
    const cleaned = phone.replace(/\s/g, '');
    const regex = /^(\+226|226|0)[0-9]{8}$/;
    return regex.test(cleaned);
}

// Valider l'email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Obtenir le texte du sujet
function getSubjectText(subject) {
    const subjects = {
        'reparation': 'Demande de réparation',
        'achat': 'Demande d\'achat',
        'devis': 'Demande de devis',
        'autre': 'Autre question'
    };
    return subjects[subject] || 'Demande générale';
}

// Initialiser le sélecteur de sujet
function initSubjectSelector() {
    const subjectSelect = document.getElementById('subject');
    if (subjectSelect) {
        subjectSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            const messageField = document.getElementById('message');
            
            // Pré-remplir le message selon le sujet
            if (selectedValue && !messageField.value) {
                const defaultMessages = {
                    'reparation': 'Bonjour, je souhaite faire réparer mon téléphone.\n\nModèle : \nProblème : \nDisponibilité : ',
                    'achat': 'Bonjour, je suis intéressé par l\'achat d\'un téléphone.\n\nModèle recherché : \nBudget : \nDisponibilité : ',
                    'devis': 'Bonjour, je souhaite obtenir un devis pour :\n\nService : \nDétails : \nDélai souhaité : '
                };
                
                if (defaultMessages[selectedValue]) {
                    messageField.value = defaultMessages[selectedValue];
                }
            }
        });
    }
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

// Initialiser les boutons d'appel direct
function initDirectCallButtons() {
    // Bouton d'appel sur mobile
    if (window.innerWidth <= 768) {
        const callButtons = document.querySelectorAll('[href^="tel:"]');
        callButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const phoneNumber = this.getAttribute('href').replace('tel:', '');
                if (confirm(`Appeler ${phoneNumber} ?`)) {
                    window.location.href = `tel:${phoneNumber}`;
                }
            });
        });
    }
}

// Ajouter les boutons flottants
function addFloatingButtons() {
    const floatingButtonsHTML = `
        <div class="floating-buttons">
            <a href="https://wa.me/22656323077" class="floating-btn whatsapp" target="_blank">
                <i class="fab fa-whatsapp"></i>
                <span class="floating-btn-tooltip">WhatsApp</span>
            </a>
            <a href="tel:+22656323077" class="floating-btn phone">
                <i class="fas fa-phone"></i>
                <span class="floating-btn-tooltip">Appeler</span>
            </a>
            <a href="https://www.google.com/maps/search/?api=1&query=Secteur+15+Banfora+Burkina+Faso" 
               class="floating-btn map" target="_blank">
                <i class="fas fa-map-marker-alt"></i>
                <span class="floating-btn-tooltip">Localisation</span>
            </a>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', floatingButtonsHTML);
}

// Initialiser quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    initDirectCallButtons();
    addFloatingButtons();
});