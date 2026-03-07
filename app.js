// ===== SMART CAMPUS CANTEEN - APP.JS =====
// Connected to admin panel via localStorage

// ===== GRADIENT MAP FOR MENU IMAGES =====
const gradientMap = {
    'plat': ['linear-gradient(135deg,#ff6b35,#f7931e)', 'linear-gradient(135deg,#00b4d8,#0077b6)', 'linear-gradient(135deg,#e63946,#d62828)', 'linear-gradient(135deg,#8b5e3c,#a0522d)', 'linear-gradient(135deg,#2d6a4f,#40916c)', 'linear-gradient(135deg,#b5651d,#8b4513)'],
    'accompagnement': ['linear-gradient(135deg,#f4a261,#e76f51)', 'linear-gradient(135deg,#52b788,#40916c)', 'linear-gradient(135deg,#bc6c25,#dda15e)'],
    'boisson': ['linear-gradient(135deg,#9b2226,#ae2012)', 'linear-gradient(135deg,#fca311,#e5a100)', 'linear-gradient(135deg,#48cae4,#0096c7)', 'linear-gradient(135deg,#d00000,#9d0208)'],
    'dessert': ['linear-gradient(135deg,#fff1e6,#f0efeb)', 'linear-gradient(135deg,#3c1518,#69140e)', 'linear-gradient(135deg,#fb8500,#ffb703)']
};

function getGradient(category, index) {
    const grads = gradientMap[category] || gradientMap['plat'];
    return grads[index % grads.length];
}

// ===== LOAD MENU DATA (synced with admin) =====
function loadMenuData() {
    const saved = localStorage.getItem('canteen_menu');
    if (saved) {
        const items = JSON.parse(saved);
        return items.map((item, i) => ({
            ...item,
            image: item.image || getGradient(item.category, i)
        }));
    }
    return [
        { id: 1, name: "Riz au Poulet Braisé", desc: "Riz parfumé avec poulet braisé croustillant", price: 1000, calories: 520, protein: 28, carbs: 65, emoji: "🍛", category: "plat", image: "linear-gradient(135deg,#ff6b35,#f7931e)" },
        { id: 2, name: "Attiéké Poisson", desc: "Attiéké frais avec poisson grillé et piment", price: 1200, calories: 480, protein: 32, carbs: 55, emoji: "🐟", category: "plat", image: "linear-gradient(135deg,#00b4d8,#0077b6)" },
        { id: 3, name: "Spaghetti Bolognaise", desc: "Pâtes italiennes sauce tomate et viande", price: 800, calories: 450, protein: 22, carbs: 70, emoji: "🍝", category: "plat", image: "linear-gradient(135deg,#e63946,#d62828)" },
        { id: 4, name: "Alloco Plantain", desc: "Bananes plantains frites dorées et croustillantes", price: 500, calories: 320, protein: 4, carbs: 60, emoji: "🍌", category: "accompagnement", image: "linear-gradient(135deg,#f4a261,#e76f51)" },
        { id: 5, name: "Foutou Sauce Graine", desc: "Foutou traditionnel avec sauce graine onctueuse", price: 1500, calories: 680, protein: 25, carbs: 85, emoji: "🥘", category: "plat", image: "linear-gradient(135deg,#8b5e3c,#a0522d)" },
        { id: 6, name: "Garba Thon", desc: "Attiéké avec thon frit et piment frais", price: 600, calories: 420, protein: 26, carbs: 50, emoji: "🥗", category: "plat", image: "linear-gradient(135deg,#2d6a4f,#40916c)" },
        { id: 7, name: "Jus de Bissap", desc: "Boisson rafraîchissante à l'hibiscus", price: 400, calories: 80, protein: 0, carbs: 20, emoji: "🥤", category: "boisson", image: "linear-gradient(135deg,#9b2226,#ae2012)" },
        { id: 8, name: "Jus de Gingembre", desc: "Boisson énergisante au gingembre frais", price: 400, calories: 60, protein: 0, carbs: 15, emoji: "🍹", category: "boisson", image: "linear-gradient(135deg,#fca311,#e5a100)" },
        { id: 9, name: "Salade Composée", desc: "Salade fraîche avec légumes variés et vinaigrette", price: 700, calories: 180, protein: 8, carbs: 20, emoji: "🥬", category: "accompagnement", image: "linear-gradient(135deg,#52b788,#40916c)" },
        { id: 10, name: "Beignets Haricots", desc: "Beignets croustillants de haricots frits", price: 300, calories: 250, protein: 12, carbs: 30, emoji: "🧆", category: "accompagnement", image: "linear-gradient(135deg,#bc6c25,#dda15e)" },
        { id: 11, name: "Eau Minérale", desc: "Eau fraîche 50cl", price: 200, calories: 0, protein: 0, carbs: 0, emoji: "💧", category: "boisson", image: "linear-gradient(135deg,#48cae4,#0096c7)" },
        { id: 12, name: "Yaourt Sucré", desc: "Yaourt onctueux nature sucré", price: 300, calories: 120, protein: 6, carbs: 18, emoji: "🥛", category: "dessert", image: "linear-gradient(135deg,#fff1e6,#f0efeb)" },
        { id: 13, name: "Gâteau Chocolat", desc: "Part de gâteau au chocolat fondant", price: 500, calories: 350, protein: 5, carbs: 45, emoji: "🍫", category: "dessert", image: "linear-gradient(135deg,#3c1518,#69140e)" },
        { id: 14, name: "Fruit de Saison", desc: "Un fruit frais de saison", price: 200, calories: 80, protein: 1, carbs: 20, emoji: "🍊", category: "dessert", image: "linear-gradient(135deg,#fb8500,#ffb703)" },
        { id: 15, name: "Coca-Cola", desc: "Boisson gazeuse fraîche 33cl", price: 500, calories: 140, protein: 0, carbs: 39, emoji: "🥫", category: "boisson", image: "linear-gradient(135deg,#d00000,#9d0208)" },
        { id: 16, name: "Kedjenou de Poulet", desc: "Poulet mijoté aux légumes à l'étouffée", price: 1300, calories: 550, protein: 35, carbs: 40, emoji: "🍗", category: "plat", image: "linear-gradient(135deg,#b5651d,#8b4513)" }
    ];
}

let menuData = loadMenuData();

// ===== DEALS DATA =====
const dealsData = [
    { name: "Spaghetti Bolognaise", emoji: "🍝", oldPrice: 800, newPrice: 480, discount: "-40%", remaining: 5 },
    { name: "Riz au Poulet Braisé", emoji: "🍛", oldPrice: 1000, newPrice: 650, discount: "-35%", remaining: 3 },
    { name: "Salade Composée", emoji: "🥬", oldPrice: 700, newPrice: 400, discount: "-43%", remaining: 8 },
    { name: "Alloco Plantain", emoji: "🍌", oldPrice: 500, newPrice: 300, discount: "-40%", remaining: 12 },
    { name: "Jus de Bissap", emoji: "🥤", oldPrice: 400, newPrice: 250, discount: "-37%", remaining: 6 },
    { name: "Gâteau Chocolat", emoji: "🍫", oldPrice: 500, newPrice: 300, discount: "-40%", remaining: 2 }
];

// ===== DEFAULT MARKETPLACE DATA (fallback) =====
const defaultMarketplace = [
    { id: 1, seller: "Sarah", avatar: "S", color: "linear-gradient(135deg,#ec4899,#f43f5e)", business: "Crêpes Maison", product: "Crêpes sucrées artisanales", emoji: "🥞", price: 500, promo: "2 crêpes = 800 FCFA", location: "Bâtiment B, Hall" },
    { id: 2, seller: "Kevin", avatar: "K", color: "linear-gradient(135deg,#6366f1,#8b5cf6)", business: "Fresh Juice Bar", product: "Jus naturels pressés", emoji: "🍊", price: 600, promo: "3 jus = 1500 FCFA", location: "Parking Campus" },
    { id: 3, seller: "Marie", avatar: "M", color: "linear-gradient(135deg,#10b981,#06b6d4)", business: "Yaourt Délice", product: "Yaourt maison aux fruits", emoji: "🍧", price: 400, promo: "Yaourt + topping = 550 FCFA", location: "Entrée Amphi A" },
    { id: 4, seller: "Paul", avatar: "P", color: "linear-gradient(135deg,#f59e0b,#ef4444)", business: "Samossa Express", product: "Samossas poulet épicé", emoji: "🥟", price: 300, promo: "5 samossas = 1200 FCFA", location: "Cantine, Stand 3" },
    { id: 5, seller: "Ange", avatar: "A", color: "linear-gradient(135deg,#8b5cf6,#6366f1)", business: "Smoothie Campus", product: "Smoothies protéinés", emoji: "🥤", price: 700, promo: "Smoothie + snack = 900 FCFA", location: "Bibliothèque" }
];

// ===== STATE =====
let cart = [];
let currentSection = 'home';
let currentUser = null;
let lastNotifCount = 0;
let lastOrderStatuses = {};

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLogin();
    initNavigation();
    initMobileMenu();
    initNotifications();
    syncCanteenName();
    renderMenuGrid();
    renderOrderList();
    renderDeals();
    renderMarketplace();
    initBudget();
    initCart();
    animateCounters();
    initScrollEffects();
    initLogout();
    loadMyOrders();
    // Poll for updates every 3 seconds
    setInterval(pollForUpdates, 3000);
});

// ===== POLLING FOR REAL-TIME SYNC =====
function pollForUpdates() {
    syncCanteenName();
    loadClientNotifications();
    checkOrderStatusChanges();
}

// ===== CANTEEN NAME SYNC =====
function syncCanteenName() {
    const settings = JSON.parse(localStorage.getItem('canteen_settings') || '{}');
    const name = settings.name || 'SmartCanteen';
    // Update logo text
    const logoText = document.querySelector('.logo-text');
    if (logoText) logoText.textContent = name;
    // Update page title
    document.title = name + ' — Cantine Intelligente';
}

// ===== LOGIN SYSTEM =====
function initLogin() {
    const saved = localStorage.getItem('smartcanteen_user');
    if (saved) {
        currentUser = JSON.parse(saved);
        document.getElementById('login-overlay').classList.add('hidden');
        updateUserUI();
    }
}

function handleLogin(e) {
    e.preventDefault();
    const name = document.getElementById('login-name').value.trim();
    const studentId = document.getElementById('login-student-id').value.trim();
    const password = document.getElementById('login-password').value;
    if (!name || !studentId || !password) return false;

    currentUser = { name, studentId, password: btoa(password) };
    localStorage.setItem('smartcanteen_user', JSON.stringify(currentUser));
    document.getElementById('login-overlay').classList.add('hidden');
    updateUserUI();
    showToast('Bienvenue, ' + name + '! 🎉');
    return false;
}

function updateUserUI() {
    if (!currentUser) return;
    const letter = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('user-avatar-letter').textContent = letter;
    const nameInput = document.getElementById('student-name');
    if (nameInput) nameInput.value = currentUser.name;
    const rewardsName = document.querySelector('.rewards-username');
    if (rewardsName) rewardsName.textContent = currentUser.name;
    const greeting = document.querySelector('.phone-greeting');
    if (greeting) greeting.textContent = 'Bonjour, ' + currentUser.name.split(' ')[0] + '! 👋';
    // Load their notifications
    loadClientNotifications();
    loadMyOrders();
}

function initLogout() {
    document.getElementById('btn-logout').addEventListener('click', () => {
        localStorage.removeItem('smartcanteen_user');
        currentUser = null;
        document.getElementById('login-overlay').classList.remove('hidden');
        document.getElementById('login-form').reset();
        showToast('Déconnecté avec succès');
    });
}

// ===== THEME SYSTEM =====
function initTheme() {
    const saved = localStorage.getItem('smartcanteen_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
    document.getElementById('theme-toggle').addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('smartcanteen_theme', next);
        updateThemeIcon(next);
    });
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// ===== CLIENT NOTIFICATIONS (from admin) =====
function loadClientNotifications() {
    const adminNotifs = JSON.parse(localStorage.getItem('client_notifications') || '[]');
    const notifList = document.getElementById('notif-list');
    const badge = document.getElementById('notif-badge');
    if (!notifList) return;

    // Filter: show notifications for this user or "all"
    let relevant = adminNotifs;
    if (currentUser) {
        relevant = adminNotifs.filter(n =>
            n.target === 'Tous les étudiants' ||
            n.target.toLowerCase() === currentUser.name.toLowerCase()
        );
    }

    // Also add order-ready notifications
    const orderNotifs = JSON.parse(localStorage.getItem('order_notifications_' + (currentUser?.studentId || '')) || '[]');

    const allNotifs = [...orderNotifs, ...relevant].sort((a, b) => (b.id || 0) - (a.id || 0));

    // Update badge
    const readIds = JSON.parse(localStorage.getItem('read_notif_ids') || '[]');
    const unreadCount = allNotifs.filter(n => !readIds.includes(n.id)).length;
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'flex' : 'none';

    // Check if there are new notifications since last check
    if (unreadCount > lastNotifCount && lastNotifCount > 0) {
        showToast('🔔 Nouvelle notification!');
    }
    lastNotifCount = unreadCount;

    if (allNotifs.length === 0) {
        notifList.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text-muted);">Aucune notification</div>';
        return;
    }

    notifList.innerHTML = allNotifs.slice(0, 15).map(n => {
        const isUnread = !readIds.includes(n.id);
        const iconBg = n.type === 'order-ready' ? '#10b981' : (n.icon ? '#6366f1' : '#f59e0b');
        const iconClass = n.type === 'order-ready' ? 'fas fa-check-circle' : (n.icon || 'fas fa-bell');
        return `
            <div class="notif-item ${isUnread ? 'unread' : ''}" onclick="markNotifRead(${n.id})">
                <div class="notif-icon" style="background:${iconBg};"><i class="${iconClass}"></i></div>
                <div class="notif-content">
                    <strong>${n.title}</strong>
                    <p>${n.message}</p>
                    <small>${n.time || ''}</small>
                </div>
            </div>
        `;
    }).join('');
}

function markNotifRead(id) {
    const readIds = JSON.parse(localStorage.getItem('read_notif_ids') || '[]');
    if (!readIds.includes(id)) {
        readIds.push(id);
        localStorage.setItem('read_notif_ids', JSON.stringify(readIds));
        loadClientNotifications();
    }
}

// ===== ORDER STATUS TRACKING =====
function checkOrderStatusChanges() {
    if (!currentUser) return;
    const orders = JSON.parse(localStorage.getItem('canteen_orders') || '[]');
    const myOrders = orders.filter(o => o.studentId === currentUser.studentId);

    myOrders.forEach(order => {
        const prevStatus = lastOrderStatuses[order.id];
        if (prevStatus && prevStatus !== order.status) {
            if (order.status === 'ready') {
                showToast('✅ Votre commande #' + order.id + ' est prête! Venez la récupérer!');
                // Push a notification
                const orderNotifs = JSON.parse(localStorage.getItem('order_notifications_' + currentUser.studentId) || '[]');
                if (!orderNotifs.find(n => n.orderId === order.id && n.type === 'order-ready')) {
                    orderNotifs.unshift({
                        id: Date.now() + Math.random(),
                        orderId: order.id,
                        type: 'order-ready',
                        title: '🎉 Commande prête!',
                        message: 'Votre commande est prête. Venez la récupérer au comptoir!',
                        time: new Date().toLocaleString('fr-FR')
                    });
                    localStorage.setItem('order_notifications_' + currentUser.studentId, JSON.stringify(orderNotifs));
                    loadClientNotifications();
                }
            } else if (order.status === 'paid') {
                showToast('💳 Paiement confirmé pour commande #' + order.id);
            }
        }
        lastOrderStatuses[order.id] = order.status;
    });
}

function loadMyOrders() {
    if (!currentUser) return;
    const orders = JSON.parse(localStorage.getItem('canteen_orders') || '[]');
    const myOrders = orders.filter(o => o.studentId === currentUser.studentId);
    // Initialize tracking
    myOrders.forEach(o => { lastOrderStatuses[o.id] = o.status; });
}

// ===== NAVIGATION =====
function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateTo(section);
        });
    });
}

function navigateTo(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
        section.style.animation = 'fadeInUp 0.5s ease';
    }
    const navLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (navLink) navLink.classList.add('active');
    currentSection = sectionId;
    document.getElementById('nav-links').classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ===== NOTIFICATION PANEL =====
function initNotifications() {
    const bell = document.getElementById('notification-bell');
    const panel = document.getElementById('notification-panel');
    const close = document.getElementById('close-notif');
    bell.addEventListener('click', () => {
        panel.classList.toggle('open');
        if (panel.classList.contains('open')) loadClientNotifications();
    });
    close.addEventListener('click', () => panel.classList.remove('open'));
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && !bell.contains(e.target)) panel.classList.remove('open');
    });
    loadClientNotifications();
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    document.querySelectorAll('.hero-stat-number').forEach(el => {
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current);
        }, 25);
    });
}

// ===== RENDER MENU GRID =====
function renderMenuGrid() {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = menuData.map(item => `
        <div class="menu-item" data-category="${item.category}" onclick="addToCartFromMenu(${item.id})">
            <div class="menu-item-image" style="background:${item.image}">
                <span class="menu-item-badge">${item.category}</span>
                <span class="menu-item-emoji">${item.emoji}</span>
            </div>
            <div class="menu-item-content">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-desc">${item.desc}</div>
                <div class="menu-item-meta">
                    <span class="menu-item-price">${item.price} FCFA</span>
                    <span class="menu-item-cal"><i class="fas fa-fire"></i> ${item.calories} kcal</span>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.menu-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.menu-cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.category;
            document.querySelectorAll('.menu-item').forEach(item => {
                item.style.display = (cat === 'all' || item.dataset.category === cat) ? '' : 'none';
            });
        });
    });
}

// ===== RENDER ORDER LIST =====
function renderOrderList(filter = '') {
    const list = document.getElementById('order-items-list');
    const filtered = menuData.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );
    list.innerHTML = filtered.map(item => {
        const inCart = cart.find(c => c.id === item.id);
        const qty = inCart ? inCart.qty : 0;
        return `
        <div class="order-item">
            <span class="order-item-emoji">${item.emoji}</span>
            <div class="order-item-info">
                <h4>${item.name}</h4>
                <p>${item.calories} kcal • ${item.protein}g protéines</p>
            </div>
            <span class="order-item-price">${item.price} FCFA</span>
            <div class="order-item-actions">
                <button class="qty-btn" onclick="updateCart(${item.id}, -1)">−</button>
                <span class="qty-display">${qty}</span>
                <button class="qty-btn" onclick="updateCart(${item.id}, 1)">+</button>
            </div>
        </div>`;
    }).join('');
}

// ===== CART =====
function initCart() {
    document.getElementById('order-search-input').addEventListener('input', (e) => {
        renderOrderList(e.target.value);
    });
    document.getElementById('btn-clear-cart').addEventListener('click', () => {
        cart = [];
        updateCartUI();
        renderOrderList();
        showToast('Panier vidé');
    });
    document.getElementById('btn-place-order').addEventListener('click', placeOrder);
}

function addToCartFromMenu(id) {
    updateCart(id, 1);
    showToast('Ajouté au panier!');
}

function updateCart(id, delta) {
    const item = menuData.find(m => m.id === id);
    if (!item) return;
    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.qty += delta;
        if (existing.qty <= 0) cart = cart.filter(c => c.id !== id);
    } else if (delta > 0) {
        cart.push({ ...item, qty: 1 });
    }
    updateCartUI();
    renderOrderList(document.getElementById('order-search-input')?.value || '');
}

function updateCartUI() {
    const cartEl = document.getElementById('cart-items');
    const summaryEl = document.getElementById('cart-summary');
    const studentInfoEl = document.getElementById('cart-student-info');
    const placeBtn = document.getElementById('btn-place-order');

    if (cart.length === 0) {
        cartEl.innerHTML = `<div class="cart-empty"><i class="fas fa-cart-plus"></i><p>Votre panier est vide</p><small>Ajoutez des plats depuis le menu</small></div>`;
        summaryEl.style.display = 'none';
        studentInfoEl.style.display = 'none';
        placeBtn.disabled = true;
        return;
    }

    cartEl.innerHTML = cart.map(c => `
        <div class="cart-item">
            <div class="cart-item-left">
                <span>${c.emoji}</span>
                <div>
                    <div class="cart-item-name">${c.name}</div>
                    <div class="cart-item-qty">x${c.qty}</div>
                </div>
            </div>
            <span class="cart-item-price">${c.price * c.qty} FCFA</span>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
    const totalCal = cart.reduce((sum, c) => sum + c.calories * c.qty, 0);
    document.getElementById('cart-subtotal').textContent = subtotal + ' FCFA';
    document.getElementById('cart-calories').textContent = totalCal + ' kcal';
    document.getElementById('cart-total').textContent = subtotal + ' FCFA';
    summaryEl.style.display = 'block';
    studentInfoEl.style.display = 'block';
    placeBtn.disabled = false;
}

// ===== PLACE ORDER (saves to localStorage for admin) =====
function placeOrder() {
    const name = document.getElementById('student-name').value.trim();
    if (!name) {
        showToast('⚠️ Entrez votre nom pour la commande');
        document.getElementById('student-name').focus();
        return;
    }
    const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
    const itemsList = cart.map(c => `${c.emoji} ${c.name} x${c.qty}`).join(', ');
    const details = cart.map(c => `${c.emoji} ${c.name} x${c.qty} — ${c.price * c.qty} FCFA`).join('<br>');

    // Save order to localStorage for admin to see
    const orders = JSON.parse(localStorage.getItem('canteen_orders') || '[]');
    const newOrder = {
        id: Date.now(),
        studentName: name,
        studentId: currentUser ? currentUser.studentId : 'GUEST',
        items: itemsList,
        itemsDetail: cart.map(c => ({ emoji: c.emoji, name: c.name, qty: c.qty, price: c.price })),
        total: total,
        status: 'pending', // pending → ready → paid
        paid: false,
        time: new Date().toLocaleString('fr-FR')
    };
    orders.unshift(newOrder);
    localStorage.setItem('canteen_orders', JSON.stringify(orders));

    // Track this order's status
    lastOrderStatuses[newOrder.id] = 'pending';

    const modalDetails = document.getElementById('modal-order-details');
    modalDetails.innerHTML = `
        <div style="margin-bottom:10px"><strong>📛 Étiquette:</strong> ${name}</div>
        <div>${details}</div>
        <div style="margin-top:10px;font-weight:700;font-size:16px">Total: ${total} FCFA</div>
        <div style="margin-top:8px;font-size:13px;color:var(--text-secondary);">N° Commande: #${newOrder.id}</div>
    `;

    document.getElementById('order-modal').classList.add('active');
    cart = [];
    updateCartUI();
    renderOrderList();
    if (currentUser) document.getElementById('student-name').value = currentUser.name;
    else document.getElementById('student-name').value = '';
}

function closeModal() {
    document.getElementById('order-modal').classList.remove('active');
}

// ===== BUDGET SUGGESTION =====
function initBudget() {
    document.querySelectorAll('.budget-preset').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.budget-preset').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('budget-amount').value = btn.dataset.amount;
        });
    });
    document.getElementById('btn-suggest').addEventListener('click', suggestMeal);
}

function suggestMeal() {
    const budget = parseInt(document.getElementById('budget-amount').value);
    if (!budget || budget < 100) {
        showToast('⚠️ Entrez un budget valide');
        return;
    }

    const sorted = [...menuData].sort((a, b) => b.calories / b.price - a.calories / a.price);
    const selected = [];
    let remaining = budget;
    const categories = new Set();

    const mainDishes = sorted.filter(i => i.category === 'plat' && i.price <= remaining);
    if (mainDishes.length > 0) {
        const main = mainDishes[0];
        selected.push(main);
        remaining -= main.price;
        categories.add('plat');
    }

    for (const item of sorted) {
        if (remaining < item.price) continue;
        if (selected.find(s => s.id === item.id)) continue;
        if (categories.has(item.category) && item.category === 'plat') continue;
        selected.push(item);
        remaining -= item.price;
        categories.add(item.category);
        if (selected.length >= 4) break;
    }

    const totalPrice = selected.reduce((s, i) => s + i.price, 0);
    const totalCal = selected.reduce((s, i) => s + i.calories, 0);

    const panel = document.getElementById('budget-result-panel');
    panel.innerHTML = `
        <div class="budget-suggestion">
            <h3>✨ Suggestion pour ${budget} FCFA</h3>
            <div class="suggestion-items">
                ${selected.map(item => `
                    <div class="suggestion-item">
                        <div class="suggestion-item-left">
                            <span>${item.emoji}</span>
                            <span class="suggestion-item-name">${item.name}</span>
                        </div>
                        <span class="suggestion-item-price">${item.price} FCFA</span>
                    </div>
                `).join('')}
            </div>
            <div class="suggestion-total">
                <div>
                    <div class="total-label">Total</div>
                    <div class="total-value price">${totalPrice} FCFA</div>
                </div>
                <div>
                    <div class="total-label">Calories</div>
                    <div class="total-value cal">${totalCal} kcal</div>
                </div>
            </div>
            <div class="suggestion-remaining">
                Reste: <strong>${remaining} FCFA</strong>
            </div>
        </div>
    `;
}

// ===== RENDER DEALS =====
function renderDeals() {
    const grid = document.getElementById('deals-grid');
    grid.innerHTML = dealsData.map(deal => `
        <div class="deal-card">
            <span class="deal-badge">${deal.discount}</span>
            <div class="deal-card-top">${deal.emoji}</div>
            <div class="deal-card-bottom">
                <div class="deal-name">${deal.name}</div>
                <div class="deal-prices">
                    <span class="deal-old-price">${deal.oldPrice} FCFA</span>
                    <span class="deal-new-price">${deal.newPrice} FCFA</span>
                </div>
                <div class="deal-remaining">🔥 Plus que ${deal.remaining} restants</div>
            </div>
        </div>
    `).join('');
}

// ===== RENDER MARKETPLACE (synced from admin) =====
function renderMarketplace() {
    // Load from admin-managed data, fallback to defaults
    const saved = localStorage.getItem('student_businesses');
    const marketplaceData = saved ? JSON.parse(saved) : defaultMarketplace;
    // Save defaults if nothing exists
    if (!saved) localStorage.setItem('student_businesses', JSON.stringify(defaultMarketplace));

    const grid = document.getElementById('marketplace-grid');
    if (marketplaceData.length === 0) {
        grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted);">Aucun business étudiant pour le moment</div>';
        return;
    }

    const colors = [
        'linear-gradient(135deg,#ec4899,#f43f5e)',
        'linear-gradient(135deg,#6366f1,#8b5cf6)',
        'linear-gradient(135deg,#10b981,#06b6d4)',
        'linear-gradient(135deg,#f59e0b,#ef4444)',
        'linear-gradient(135deg,#8b5cf6,#6366f1)'
    ];

    grid.innerHTML = marketplaceData.map((m, i) => `
        <div class="market-card">
            <div class="market-card-header">
                <div class="market-seller-avatar" style="background:${m.color || colors[i % colors.length]}">${(m.seller || m.studentName || '?').charAt(0).toUpperCase()}</div>
                <div class="market-seller-info">
                    <h4>${m.seller || m.studentName} — ${m.business}</h4>
                    <span>Entrepreneur étudiant</span>
                </div>
            </div>
            <div class="market-card-body">
                <div class="market-product">
                    <span class="market-product-emoji">${m.emoji || '🛒'}</span>
                    <div class="market-product-info">
                        <h5>${m.product}</h5>
                        <span class="market-product-price">${m.price} FCFA</span>
                    </div>
                </div>
                ${m.promo ? `<div class="market-promo">🎁 ${m.promo}</div>` : ''}
                ${m.location ? `<div class="market-location"><i class="fas fa-map-marker-alt"></i> ${m.location}</div>` : ''}
            </div>
        </div>
    `).join('');
}

// ===== TOAST =====
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
