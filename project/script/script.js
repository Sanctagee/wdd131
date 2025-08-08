// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const prevTestimonialBtn = document.getElementById('prevTestimonial');
const nextTestimonialBtn = document.getElementById('nextTestimonial');
const testimonials = document.querySelectorAll('.testimonial');
const orderForm = document.getElementById('orderForm');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const lastModified = document.getElementById('lastModified');
const currentYear = document.getElementById('currentYear');
const whatsappCheckoutBtn = document.getElementById('whatsappCheckout');

// Initialize variables
let currentTestimonial = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Set current year and last modified date
currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Testimonial slider
function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
    currentTestimonial = index;
}

prevTestimonialBtn.addEventListener('click', () => {
    let newIndex = currentTestimonial - 1;
    if (newIndex < 0) newIndex = testimonials.length - 1;
    showTestimonial(newIndex);
});

nextTestimonialBtn.addEventListener('click', () => {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
});

// Auto-rotate testimonials
setInterval(() => {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
}, 7000);

// Form submission
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const eventType = document.getElementById('event').value;
    const date = document.getElementById('date').value;
    const orderDetails = document.getElementById('orderDetails').value;
    
    // Create order object
    const order = {
        name,
        email,
        phone,
        eventType,
        date,
        orderDetails,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Show success message
    alert('Thank you for your order! We will contact you shortly to confirm details.');
    
    // Reset form
    orderForm.reset();
});

// Cart functionality
function updateCart() {
    // Update cart count
    cartCount.textContent = cart.length;
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart modal
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart-message" style="text-align: center; padding: 2rem; color: #666;"><p>Your cart is empty</p><p>Add some delicious cakes and treats!</p></div>';
        cartTotal.textContent = '₦0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-img">
                <i class="fas fa-birthday-cake"></i>
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.product}</div>
                <div class="cart-item-price">₦${item.price.toLocaleString()}</div>
            </div>
            <button class="remove-item" data-index="${index}">✕</button>
        `;
        
        cartItems.appendChild(cartItem);
        total += item.price;
    });
    
    cartTotal.textContent = `₦${total.toLocaleString()}`;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.dataset.index);
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Add to cart
addToCartBtns.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.dataset.product;
        const price = parseFloat(button.dataset.price);
        
        cart.push({
            product,
            price
        });
        
        updateCart();
        
        // Show confirmation
        alert(`${product} added to your order!`);
    });
});

// WhatsApp Checkout
whatsappCheckoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before checking out.');
        return;
    }

    let message = `Hello AustraFavy's Cakes! I would like to place an order:\n\n`;
    cart.forEach(item => {
        message += `- ${item.product}: ₦${item.price.toLocaleString()}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `\n*Total: ₦${total.toLocaleString()}*\n\n`;
    message += `Please contact me to confirm the order. Thank you!`;
    
    // Encode the message
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '2349169822417'; // WhatsApp number without '+' prefix
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
});

// Toggle cart modal
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
    cartOverlay.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('active');
    cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
    cartModal.classList.remove('active');
    cartOverlay.classList.remove('active');
});

// Initialize cart
updateCart();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        }
    });
});

// Form validation for date
const dateInput = document.getElementById('date');
dateInput.min = new Date().toISOString().split('T')[0];