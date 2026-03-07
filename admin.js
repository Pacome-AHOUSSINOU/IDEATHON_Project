// ===== ADMIN.JS - SmartCanteen Admin Panel =====
// Connected to client via localStorage

// Admin credentials
const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' };

// Default menu
const defaultMenu = [
    { id: 1, name: "Riz au Poulet Braisé", desc: "Riz parfumé avec poulet braisé croustillant", price: 1000, calories: 520, protein: 28, carbs: 65, emoji: "🍛", category: "plat" },
    { id: 2, name: "Attiéké Poisson", desc: "Attiéké frais avec poisson grillé et piment", price: 1200, calories: 480, protein: 32, carbs: 55, emoji: "🐟", category: "plat" },
    { id: 3, name: "Spaghetti Bolognaise", desc: "Pâtes italiennes sauce tomate et viande", price: 800, calories: 450, protein: 22, carbs: 70, emoji: "🍝", category: "plat" },
    { id: 4, name: "Alloco Plantain", desc: "Bananes plantains frites dorées et croustillantes", price: 500, calories: 320, protein: 4, carbs: 60, emoji: "🍌", category: "accompagnement" },
    { id: 5, name: "Foutou Sauce Graine", desc: "Foutou traditionnel avec sauce graine onctueuse", price: 1500, calories: 680, protein: 25, carbs: 85, emoji: "🥘", category: "plat" },
    { id: 6, name: "Garba Thon", desc: "Attiéké avec thon frit et piment frais", price: 600, calories: 420, protein: 26, carbs: 50, emoji: "🥗", category: "plat" },
    { id: 7, name: "Jus de Bissap", desc: "Boisson rafraîchissante à l'hibiscus", price: 400, calories: 80, protein: 0, carbs: 20, emoji: "🥤", category: "boisson" },
    { id: 8, name: "Jus de Gingembre", desc: "Boisson énergisante au gingembre frais", price: 400, calories: 60, protein: 0, carbs: 15, emoji: "🍹", category: "boisson" },
    { id: 9, name: "Salade Composée", desc: "Salade fraîche avec légumes variés et vinaigrette", price: 700, calories: 180, protein: 8, carbs: 20, emoji: "🥬", category: "accompagnement" },
    { id: 10, name: "Beignets Haricots", desc: "Beignets croustillants de haricots frits", price: 300, calories: 250, protein: 12, carbs: 30, emoji: "🧆", category: "accompagnement" },
    { id: 11, name: "Eau Minérale", desc: "Eau fraîche 50cl", price: 200, calories: 0, protein: 0, carbs: 0, emoji: "💧", category: "boisson" },
    { id: 12, name: "Yaourt Sucré", desc: "Yaourt onctueux nature sucré", price: 300, calories: 120, protein: 6, carbs: 18, emoji: "🥛", category: "dessert" },
    { id: 13, name: "Gâteau Chocolat", desc: "Part de gâteau au chocolat fondant", price: 500, calories: 350, protein: 5, carbs: 45, emoji: "🍫", category: "dessert" },
    { id: 14, name: "Fruit de Saison", desc: "Un fruit frais de saison", price: 200, calories: 80, protein: 1, carbs: 20, emoji: "🍊", category: "dessert" },
    { id: 15, name: "Coca-Cola", desc: "Boisson gazeuse fraîche 33cl", price: 500, calories: 140, protein: 0, carbs: 39, emoji: "🥫", category: "boisson" },
    { id: 16, name: "Kedjenou de Poulet", desc: "Poulet mijoté aux légumes à l'étouffée", price: 1300, calories: 550, protein: 35, carbs: 40, emoji: "🍗", category: "plat" }
];

// Default student businesses
const defaultBusinesses = [
    { id: 1, studentName: "Sarah", business: "Crêpes Maison", product: "Crêpes sucrées artisanales", emoji: "🥞", price: 500, promo: "2 crêpes = 800 FCFA", location: "Bâtiment B, Hall", color: "linear-gradient(135deg,#ec4899,#f43f5e)" },
    { id: 2, studentName: "Kevin", business: "Fresh Juice Bar", product: "Jus naturels pressés", emoji: "🍊", price: 600, promo: "3 jus = 1500 FCFA", location: "Parking Campus", color: "linear-gradient(135deg,#6366f1,#8b5cf6)" },
    { id: 3, studentName: "Marie", business: "Yaourt Délice", product: "Yaourt maison aux fruits", emoji: "🍧", price: 400, promo: "Yaourt + topping = 550 FCFA", location: "Entrée Amphi A", color: "linear-gradient(135deg,#10b981,#06b6d4)" },
    { id: 4, studentName: "Paul", business: "Samossa Express", product: "Samossas poulet épicé", emoji: "🥟", price: 300, promo: "5 samossas = 1200 FCFA", location: "Cantine, Stand 3", color: "linear-gradient(135deg,#f59e0b,#ef4444)" },
    { id: 5, studentName: "Ange", business: "Smoothie Campus", product: "Smoothies protéinés", emoji: "🥤", price: 700, promo: "Smoothie + snack = 900 FCFA", location: "Bibliothèque", color: "linear-gradient(135deg,#8b5cf6,#6366f1)" }
];

// State
let adminMenu = [];
let notifHistory = [];
let studentBusinesses = [];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initAdminTheme();
    initAdminLogin();
    loadMenu();
    loadCanteenSettings();
    loadNotifHistory();
    loadStudentBusinesses();
    initSidebarNav();
    initCanteenForm();
    initMenuManagement();
    initNotifPanel();
    initSidebarToggle();
    initBusinessManagement();
    // Poll for new orders every 3 seconds
    setInterval(refreshOrders, 3000);
});

// ===== THEME =====
function initAdminTheme() {
    const saved = localStorage.getItem('smartcanteen_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updateAdminThemeIcon(saved);
    document.getElementById('admin-theme-toggle').addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('smartcanteen_theme', next);
        updateAdminThemeIcon(next);
    });
}
function updateAdminThemeIcon(theme) {
    const icon = document.getElementById('admin-theme-icon');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// ===== ADMIN LOGIN =====
function initAdminLogin() {
    const session = sessionStorage.getItem('admin_logged_in');
    if (session === 'true') showAdminDashboard();

    document.getElementById('admin-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('admin-username').value.trim();
        const password = document.getElementById('admin-password').value;
        const savedPassword = localStorage.getItem('admin_password') || ADMIN_CREDENTIALS.password;
        if (username === ADMIN_CREDENTIALS.username && password === savedPassword) {
            sessionStorage.setItem('admin_logged_in', 'true');
            showAdminDashboard();
            showToast('Bienvenue, Admin! 🔐');
        } else {
            document.getElementById('login-error').style.display = 'flex';
            setTimeout(() => document.getElementById('login-error').style.display = 'none', 3000);
        }
    });

    document.getElementById('btn-admin-logout').addEventListener('click', () => {
        sessionStorage.removeItem('admin_logged_in');
        document.getElementById('admin-login-overlay').style.display = '';
        document.getElementById('admin-app').style.display = 'none';
        document.getElementById('admin-login-form').reset();
        showToast('Déconnecté');
    });
}

function showAdminDashboard() {
    document.getElementById('admin-login-overlay').style.display = 'none';
    document.getElementById('admin-app').style.display = 'flex';
    renderMenuMgmtList();
    renderAdminOrders();
    renderRecentOrders();
    renderBusinessList();
    updateDashboardStats();
}

// ===== SIDEBAR NAV =====
function initSidebarNav() {
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const panelId = link.dataset.panel;
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
            const panel = document.getElementById('panel-' + panelId);
            if (panel) { panel.classList.add('active'); panel.style.animation = 'fadeInUp 0.4s ease'; }
            document.getElementById('admin-page-title').textContent = link.textContent.trim();
            document.getElementById('admin-sidebar').classList.remove('open');
            // Refresh data when switching panels
            if (panelId === 'orders') renderAdminOrders();
            if (panelId === 'dashboard') { renderRecentOrders(); updateDashboardStats(); }
            if (panelId === 'businesses') renderBusinessList();
        });
    });
}

function initSidebarToggle() {
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
        document.getElementById('admin-sidebar').classList.toggle('open');
    });
}

// ===== CANTEEN SETTINGS =====
function loadCanteenSettings() {
    const settings = JSON.parse(localStorage.getItem('canteen_settings') || '{}');
    if (settings.name) document.getElementById('canteen-name-input').value = settings.name;
    if (settings.hours) document.getElementById('canteen-hours').value = settings.hours;
    if (settings.location) document.getElementById('canteen-location').value = settings.location;
    updateCanteenNameDisplay(settings.name || '—');
}

function initCanteenForm() {
    document.getElementById('btn-save-canteen').addEventListener('click', () => {
        const name = document.getElementById('canteen-name-input').value.trim();
        const hours = document.getElementById('canteen-hours').value.trim();
        const location = document.getElementById('canteen-location').value.trim();
        if (!name) { showToast('⚠️ Entrez le nom de la cantine'); return; }
        const settings = { name, hours, location };
        localStorage.setItem('canteen_settings', JSON.stringify(settings));
        updateCanteenNameDisplay(name);
        showToast('✅ Nom de la cantine mis à jour! Les clients verront "' + name + '"');
    });
}

function updateCanteenNameDisplay(name) {
    document.getElementById('header-canteen-name').textContent = name;
}

// ===== MENU MANAGEMENT =====
function loadMenu() {
    const saved = localStorage.getItem('canteen_menu');
    adminMenu = saved ? JSON.parse(saved) : [...defaultMenu];
    if (!saved) saveMenu();
}

function saveMenu() {
    localStorage.setItem('canteen_menu', JSON.stringify(adminMenu));
}

function renderMenuMgmtList() {
    const list = document.getElementById('menu-mgmt-list');
    if (adminMenu.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted);"><i class="fas fa-inbox" style="font-size:40px;display:block;margin-bottom:12px;"></i>Aucun plat dans le menu</div>';
        return;
    }
    list.innerHTML = adminMenu.map(item => `
        <div class="menu-mgmt-item">
            <span class="mmi-emoji">${item.emoji}</span>
            <div class="mmi-info">
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
            </div>
            <div class="mmi-meta">
                <span class="mmi-price">${item.price} FCFA</span>
                <span class="mmi-cal">${item.calories} kcal</span>
                <span class="mmi-cat">${item.category}</span>
            </div>
            <div class="mmi-actions">
                <button class="btn-edit" onclick="editMenuItem(${item.id})" title="Modifier"><i class="fas fa-pen"></i></button>
                <button class="btn-delete" onclick="deleteMenuItem(${item.id})" title="Supprimer"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
    updateDashboardStats();
}

function initMenuManagement() {
    document.getElementById('btn-add-item').addEventListener('click', () => {
        document.getElementById('item-modal-title').innerHTML = '<i class="fas fa-plus-circle"></i> Ajouter un plat';
        document.getElementById('item-form').reset();
        document.getElementById('item-edit-id').value = '';
        document.getElementById('item-modal').style.display = 'flex';
    });

    document.getElementById('btn-close-item-modal').addEventListener('click', () => {
        document.getElementById('item-modal').style.display = 'none';
    });

    document.getElementById('item-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('item-edit-id').value;
        const itemData = {
            name: document.getElementById('item-name').value.trim(),
            emoji: document.getElementById('item-emoji').value.trim(),
            desc: document.getElementById('item-desc').value.trim(),
            price: parseInt(document.getElementById('item-price').value),
            calories: parseInt(document.getElementById('item-calories').value),
            protein: parseInt(document.getElementById('item-protein').value),
            carbs: parseInt(document.getElementById('item-carbs').value),
            category: document.getElementById('item-category').value,
        };

        if (editId) {
            const idx = adminMenu.findIndex(m => m.id === parseInt(editId));
            if (idx !== -1) {
                adminMenu[idx] = { ...adminMenu[idx], ...itemData };
                showToast('✅ Plat modifié!');
            }
        } else {
            const newId = adminMenu.length > 0 ? Math.max(...adminMenu.map(m => m.id)) + 1 : 1;
            adminMenu.push({ id: newId, ...itemData });
            showToast('✅ Plat ajouté au menu!');
        }

        saveMenu();
        renderMenuMgmtList();
        document.getElementById('item-modal').style.display = 'none';
    });
}

function editMenuItem(id) {
    const item = adminMenu.find(m => m.id === id);
    if (!item) return;
    document.getElementById('item-modal-title').innerHTML = '<i class="fas fa-pen"></i> Modifier le plat';
    document.getElementById('item-edit-id').value = item.id;
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-emoji').value = item.emoji;
    document.getElementById('item-desc').value = item.desc;
    document.getElementById('item-price').value = item.price;
    document.getElementById('item-calories').value = item.calories;
    document.getElementById('item-protein').value = item.protein;
    document.getElementById('item-carbs').value = item.carbs;
    document.getElementById('item-category').value = item.category;
    document.getElementById('item-modal').style.display = 'flex';
}

function deleteMenuItem(id) {
    if (!confirm('Supprimer ce plat du menu?')) return;
    adminMenu = adminMenu.filter(m => m.id !== id);
    saveMenu();
    renderMenuMgmtList();
    showToast('🗑️ Plat supprimé');
}

// ===== REAL ORDERS (from client localStorage) =====
function renderAdminOrders() {
    const orders = JSON.parse(localStorage.getItem('canteen_orders') || '[]');
    const list = document.getElementById('admin-orders-list');

    if (orders.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted);"><i class="fas fa-inbox" style="font-size:40px;display:block;margin-bottom:12px;"></i>Aucune commande pour le moment</div>';
        return;
    }

    list.innerHTML = orders.map(order => {
        const statusClass = order.status === 'ready' ? 'ready' : (order.status === 'paid' ? 'paid' : 'pending');
        const statusLabel = order.status === 'ready' ? '✅ Prêt' : (order.status === 'paid' ? '💳 Payé' : '⏳ En cours');
        return `
        <div class="admin-order-item ${statusClass}">
            <div class="ao-info">
                <div class="ao-label"><i class="fas fa-tag"></i> ${order.studentName}</div>
                <div class="ao-time"><i class="fas fa-clock"></i> ${order.time}</div>
            </div>
            <div class="ao-items">${order.items}</div>
            <div class="ao-total">${order.total} FCFA</div>
            <div class="ao-status-badge ${statusClass}">${statusLabel}</div>
            <div class="ao-actions">
                ${order.status === 'pending' ? `<button class="btn btn-sm btn-primary" onclick="markOrderReady(${order.id})"><i class="fas fa-check"></i> Prêt</button>` : ''}
                ${order.status === 'ready' ? `<button class="btn btn-sm btn-success" onclick="markOrderPaid(${order.id})"><i class="fas fa-money-bill-wave"></i> Payé</button>` : ''}
                ${order.status !== 'paid' ? `<button class="btn btn-sm btn-glass" onclick="deleteOrder(${order.id})" title="Supprimer"><i class="fas fa-trash"></i></button>` : ''}
            </div>
        </div>`;
    }).join('');
}

function markOrderReady(orderId) {
    const orders = JSON.parse(localStorage.getItem('canteen_orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    order.status = 'ready';
    localStorage.setItem('canteen_orders', JSON.stringify(orders));

    // Send notification to the user
    const clientNotifs = JSON.parse(localStorage.getItem('client_notifications') || '[]');
    clientNotifs.unshift({
        id: Date.now(),
        target: order.studentName,
        title: '🎉 Commande prête!',
        message: `${order.studentName}, votre commande (${order.items}) est prête! Venez la récupérer au comptoir.`,
        icon: 'fas fa-check-circle',
        time: new Date().toLocaleString('fr-FR')
    });
    localStorage.setItem('client_notifications', JSON.stringify(clientNotifs));

    renderAdminOrders();
    renderRecentOrders();
    updateDashboardStats();
    showToast('✅ Commande de ' + order.studentName + ' marquée comme prête!');
}

function markOrderPaid(orderId) {
    const orders = JSON.parse(localStorage.getItem('canteen_orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    order.status = 'paid';
    order.paid = true;
    localStorage.setItem('canteen_orders', JSON.stringify(orders));

    // Notify user of payment confirmation
    const clientNotifs = JSON.parse(localStorage.getItem('client_notifications') || '[]');
    clientNotifs.unshift({
        id: Date.now(),
        target: order.studentName,
        title: '💳 Paiement confirmé',
        message: `Paiement de ${order.total} FCFA confirmé pour votre commande. Merci!`,
        icon: 'fas fa-money-bill-wave',
        time: new Date().toLocaleString('fr-FR')
    });
    localStorage.setItem('client_notifications', JSON.stringify(clientNotifs));

    renderAdminOrders();
    renderRecentOrders();
    updateDashboardStats();
    showToast('💳 Paiement de ' + order.studentName + ' confirmé!');
}

function deleteOrder(orderId) {
    if (!confirm('Supprimer cette commande?')) return;
    let orders = JSON.parse(localStorage.getItem('canteen_orders') || '[]');
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('canteen_orders', JSON.stringify(orders));
    renderAdminOrders();
    renderRecentOrders();
    updateDashboardStats();
    showToast('🗑️ Commande supprimée');
}

function refreshOrders() {
    if (document.getElementById('admin-app').style.display !== 'none') {
        renderAdminOrders();
        renderRecentOrders();
        updateDashboardStats();
    }
}

// ===== RECENT ORDERS (dashboard) =====
function renderRecentOrders() {
    const orders = JSON.parse(localStorage.getItem('canteen_orders') || '[]');
    const container = document.getElementById('recent-orders');

    if (orders.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">Aucune commande récente</div>';
        return;
    }

    container.innerHTML = orders.slice(0, 6).map(order => {
        const statusCls = order.status === 'ready' ? 'ready' : (order.status === 'paid' ? 'paid' : 'pending');
        const statusTxt = order.status === 'ready' ? 'Prêt' : (order.status === 'paid' ? 'Payé' : 'En cours');
        return `
        <div class="recent-order">
            <span class="ro-name">${order.studentName}</span>
            <span class="ro-items">${order.items}</span>
            <span class="ro-total">${order.total} FCFA</span>
            <span class="ro-status ${statusCls}">${statusTxt}</span>
        </div>`;
    }).join('');
}

// ===== NOTIFICATIONS =====
function loadNotifHistory() {
    const saved = localStorage.getItem('admin_notifications');
    notifHistory = saved ? JSON.parse(saved) : [];
    renderNotifHistory();
}

function initNotifPanel() {
    document.getElementById('notif-target').addEventListener('change', (e) => {
        document.getElementById('notif-individual-group').style.display =
            e.target.value === 'individual' ? 'block' : 'none';
    });

    document.getElementById('btn-send-notif').addEventListener('click', () => {
        const target = document.getElementById('notif-target').value;
        const studentName = document.getElementById('notif-student-name')?.value?.trim() || '';
        const title = document.getElementById('notif-title').value.trim();
        const message = document.getElementById('notif-message').value.trim();

        if (!title || !message) { showToast('⚠️ Remplissez le titre et le message'); return; }
        if (target === 'individual' && !studentName) { showToast('⚠️ Entrez le nom de l\'étudiant'); return; }

        const notif = {
            id: Date.now(),
            target: target === 'all' ? 'Tous les étudiants' : studentName,
            title,
            message,
            time: new Date().toLocaleString('fr-FR')
        };

        // Save to admin history
        notifHistory.unshift(notif);
        localStorage.setItem('admin_notifications', JSON.stringify(notifHistory));

        // Push to client-side notifications
        const clientNotifs = JSON.parse(localStorage.getItem('client_notifications') || '[]');
        clientNotifs.unshift({
            ...notif,
            icon: 'fas fa-bell'
        });
        localStorage.setItem('client_notifications', JSON.stringify(clientNotifs));

        renderNotifHistory();
        document.getElementById('notif-title').value = '';
        document.getElementById('notif-message').value = '';
        document.getElementById('notif-student-name').value = '';
        showToast('📨 Notification envoyée à ' + notif.target + '!');
    });
}

function renderNotifHistory() {
    const container = document.getElementById('notif-history');
    if (notifHistory.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">Aucune notification envoyée</p>';
        return;
    }
    container.innerHTML = notifHistory.slice(0, 20).map(n => `
        <div class="notif-history-item">
            <div class="nh-header">
                <span class="nh-title">${n.title}</span>
                <span class="nh-target">→ ${n.target}</span>
            </div>
            <div class="nh-message">${n.message}</div>
            <div class="nh-time">${n.time}</div>
        </div>
    `).join('');
}

// ===== STUDENT BUSINESS MANAGEMENT =====
function loadStudentBusinesses() {
    const saved = localStorage.getItem('student_businesses');
    studentBusinesses = saved ? JSON.parse(saved) : [...defaultBusinesses];
    if (!saved) saveBusinesses();
}

function saveBusinesses() {
    localStorage.setItem('student_businesses', JSON.stringify(studentBusinesses));
}

function renderBusinessList() {
    const list = document.getElementById('business-list');
    if (!list) return;
    if (studentBusinesses.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted);"><i class="fas fa-store-slash" style="font-size:40px;display:block;margin-bottom:12px;"></i>Aucun business étudiant</div>';
        return;
    }

    const colors = [
        'linear-gradient(135deg,#ec4899,#f43f5e)',
        'linear-gradient(135deg,#6366f1,#8b5cf6)',
        'linear-gradient(135deg,#10b981,#06b6d4)',
        'linear-gradient(135deg,#f59e0b,#ef4444)',
        'linear-gradient(135deg,#8b5cf6,#6366f1)'
    ];

    list.innerHTML = studentBusinesses.map((biz, i) => `
        <div class="menu-mgmt-item">
            <div class="biz-avatar-small" style="background:${biz.color || colors[i % colors.length]};width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px;color:white;font-weight:700;flex-shrink:0;">
                ${(biz.studentName || '?').charAt(0).toUpperCase()}
            </div>
            <div class="mmi-info">
                <h4>${biz.studentName} — ${biz.business}</h4>
                <p>${biz.product} • ${biz.emoji || '🛒'} • ${biz.price} FCFA</p>
                <p style="font-size:11px;color:var(--text-muted);margin-top:2px;"><i class="fas fa-map-marker-alt"></i> ${biz.location || 'Non défini'}</p>
            </div>
            <div class="mmi-actions">
                <button class="btn-edit" onclick="editBusiness(${biz.id})" title="Modifier"><i class="fas fa-pen"></i></button>
                <button class="btn-delete" onclick="deleteBusiness(${biz.id})" title="Supprimer"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function initBusinessManagement() {
    const addBtn = document.getElementById('btn-add-business');
    if (!addBtn) return;

    addBtn.addEventListener('click', () => {
        document.getElementById('biz-modal-title').innerHTML = '<i class="fas fa-plus-circle"></i> Ajouter un business';
        document.getElementById('biz-form').reset();
        document.getElementById('biz-edit-id').value = '';
        document.getElementById('biz-modal').style.display = 'flex';
    });

    document.getElementById('btn-close-biz-modal').addEventListener('click', () => {
        document.getElementById('biz-modal').style.display = 'none';
    });

    document.getElementById('biz-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('biz-edit-id').value;
        const bizData = {
            studentName: document.getElementById('biz-student-name').value.trim(),
            business: document.getElementById('biz-name').value.trim(),
            product: document.getElementById('biz-product').value.trim(),
            emoji: document.getElementById('biz-emoji').value.trim() || '🛒',
            price: parseInt(document.getElementById('biz-price').value),
            promo: document.getElementById('biz-promo').value.trim(),
            location: document.getElementById('biz-location').value.trim(),
        };

        if (editId) {
            const idx = studentBusinesses.findIndex(b => b.id === parseInt(editId));
            if (idx !== -1) {
                studentBusinesses[idx] = { ...studentBusinesses[idx], ...bizData };
                showToast('✅ Business modifié!');
            }
        } else {
            const newId = studentBusinesses.length > 0 ? Math.max(...studentBusinesses.map(b => b.id)) + 1 : 1;
            const colors = ['linear-gradient(135deg,#ec4899,#f43f5e)', 'linear-gradient(135deg,#6366f1,#8b5cf6)', 'linear-gradient(135deg,#10b981,#06b6d4)', 'linear-gradient(135deg,#f59e0b,#ef4444)', 'linear-gradient(135deg,#8b5cf6,#6366f1)'];
            studentBusinesses.push({ id: newId, ...bizData, color: colors[newId % colors.length] });
            showToast('✅ Business ajouté!');
        }

        saveBusinesses();
        renderBusinessList();
        document.getElementById('biz-modal').style.display = 'none';
    });
}

function editBusiness(id) {
    const biz = studentBusinesses.find(b => b.id === id);
    if (!biz) return;
    document.getElementById('biz-modal-title').innerHTML = '<i class="fas fa-pen"></i> Modifier le business';
    document.getElementById('biz-edit-id').value = biz.id;
    document.getElementById('biz-student-name').value = biz.studentName;
    document.getElementById('biz-name').value = biz.business;
    document.getElementById('biz-product').value = biz.product;
    document.getElementById('biz-emoji').value = biz.emoji;
    document.getElementById('biz-price').value = biz.price;
    document.getElementById('biz-promo').value = biz.promo || '';
    document.getElementById('biz-location').value = biz.location || '';
    document.getElementById('biz-modal').style.display = 'flex';
}

function deleteBusiness(id) {
    if (!confirm('Supprimer ce business?')) return;
    studentBusinesses = studentBusinesses.filter(b => b.id !== id);
    saveBusinesses();
    renderBusinessList();
    showToast('🗑️ Business supprimé');
}

// ===== DASHBOARD STATS =====
function updateDashboardStats() {
    const orders = JSON.parse(localStorage.getItem('canteen_orders') || '[]');
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    const uniqueStudents = new Set(orders.map(o => o.studentId)).size;

    document.getElementById('stat-orders').textContent = totalOrders.toLocaleString();
    document.getElementById('stat-revenue').textContent = totalRevenue.toLocaleString();
    document.getElementById('stat-users').textContent = uniqueStudents;
    document.getElementById('stat-menu-count').textContent = adminMenu.length;
}

// ===== TOAST =====
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
