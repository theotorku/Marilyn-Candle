// Initialize Animate On Scroll (AOS)
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
    });

    // =========================================================================
    // Navigation Bar Scroll Effect
    // =========================================================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // =========================================================================
    // Hamburger Mobile Menu
    // =========================================================================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // =========================================================================
    // Transform-based Parallax (replaces background-attachment: fixed)
    // =========================================================================
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length && window.matchMedia("(pointer: fine)").matches) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    parallaxElements.forEach(el => {
                        const rect = el.parentElement.getBoundingClientRect();
                        const speed = 0.3;
                        const yPos = -(rect.top * speed);
                        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // =========================================================================
    // Custom Cursor Logic
    // =========================================================================
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        const animateCursor = () => {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Hover effects for interactive elements
        const interactables = document.querySelectorAll('a, button, .product-card, input');
        interactables.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('cursor-hover');
                cursorDot.style.opacity = '0';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('cursor-hover');
                cursorDot.style.opacity = '1';
            });
        });
    }

    // =========================================================================
    // Scroll Indicator
    // =========================================================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const target = document.getElementById('collections');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // =========================================================================
    // Cart System
    // =========================================================================
    let cart = [];

    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsEl = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartCountEls = document.querySelectorAll('.cart-count');
    const cartToggle = document.querySelector('.cart-toggle');
    const cartClose = document.querySelector('.cart-close');

    function openCart() {
        if (cartDrawer) cartDrawer.classList.add('open');
        if (cartOverlay) cartOverlay.classList.add('open');
    }

    function closeCart() {
        if (cartDrawer) cartDrawer.classList.remove('open');
        if (cartOverlay) cartOverlay.classList.remove('open');
    }

    if (cartToggle) cartToggle.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

        // Update badge
        cartCountEls.forEach(el => { el.textContent = totalItems; });

        // Update aria-label on cart toggle
        if (cartToggle) {
            cartToggle.setAttribute('aria-label', `Shopping cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`);
        }

        if (cart.length === 0) {
            cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
            cartFooter.style.display = 'none';
        } else {
            cartItemsEl.innerHTML = cart.map((item, i) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-qty">
                            <button aria-label="Decrease quantity" data-action="decrease" data-index="${i}">&minus;</button>
                            <span>${item.qty}</span>
                            <button aria-label="Increase quantity" data-action="increase" data-index="${i}">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-action="remove" data-index="${i}">Remove</button>
                </div>
            `).join('');
            cartFooter.style.display = 'block';
            cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
        }
    }

    // Delegate cart item actions
    if (cartItemsEl) {
        cartItemsEl.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const index = parseInt(btn.dataset.index, 10);
            const action = btn.dataset.action;

            if (action === 'increase') {
                cart[index].qty++;
            } else if (action === 'decrease') {
                cart[index].qty--;
                if (cart[index].qty <= 0) cart.splice(index, 1);
            } else if (action === 'remove') {
                cart.splice(index, 1);
            }
            updateCartUI();
        });
    }

    // Quick Add buttons
    document.querySelectorAll('.btn-quick-add').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            const name = card.dataset.productName;
            const price = parseFloat(card.dataset.productPrice);
            const image = card.dataset.productImage;

            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.qty++;
            } else {
                cart.push({ name, price, image, qty: 1 });
            }

            updateCartUI();
            openCart();
        });
    });

    // =========================================================================
    // Newsletter Form
    // =========================================================================
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                newsletterForm.style.display = 'none';
                if (newsletterSuccess) newsletterSuccess.classList.add('show');
            }
        });
    }
});
