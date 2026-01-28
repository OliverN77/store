// Productos de ejemplo
const products = [
    {
        id: 1,
        name: "Essence Noir",
        description: "Una fragancia misteriosa con notas de ámbar y vainilla oscura",
        price: 89.99,
        image: "/placeholder.svg?height=400&width=320"
    },
    {
        id: 2,
        name: "Aurora Lumière",
        description: "Frescura cítrica con toques florales de jazmín y bergamota",
        price: 95.00,
        image: "/placeholder.svg?height=400&width=320"
    },
    {
        id: 3,
        name: "Velvet Rose",
        description: "Rosa búlgara con acordes de madera de cedro y almizcle",
        price: 105.50,
        image: "/placeholder.svg?height=400&width=320"
    },
    {
        id: 4,
        name: "Oud Mystique",
        description: "Oud auténtico combinado con especias orientales exóticas",
        price: 125.00,
        image: "/placeholder.svg?height=400&width=320"
    },
    {
        id: 5,
        name: "Citrus Éclat",
        description: "Explosión de cítricos mediterráneos con neroli y limón",
        price: 79.99,
        image: "/placeholder.svg?height=400&width=320"
    },
    {
        id: 6,
        name: "Midnight Garden",
        description: "Flores nocturnas con notas de tuberosa y gardenia",
        price: 99.00,
        image: "/placeholder.svg?height=400&width=320"
    }
];

// Cargar productos
function loadProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(product => `
                <div class="product-card">
                    <div class="product-image-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-footer">
                            <p class="product-price">$${product.price.toFixed(2)}</p>
                            <a href="#" class="add-to-cart" onclick="addToCart(event, ${product.id})">
                                <i class="fas fa-plus"></i>
                                <span>Agregar</span>
                            </a>
                        </div>
                    </div>
                </div>
            `).join('');
}

// Toggle de tema
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

/* MODAL */
function initModalHandlers() {
    const modal = document.getElementById('modalSalida');
    // cerrar con clic fuera
    window.addEventListener('click', (ev) => {
        if (!modal) return;
        if (ev.target === modal) cerrarModal();
    });
    // cerrar con ESC
    document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') cerrarModal();
    });
}

// funciones globales usadas desde HTML inline
function abrirModal(e) {
    if (e && e.preventDefault) e.preventDefault();
    const modal = document.getElementById('modalSalida');
    if (modal) modal.classList.add('active');
}
function cerrarModal() {
    const modal = document.getElementById('modalSalida');
    if (modal) modal.classList.remove('active');
}

/* ADD TO CART bindings */
function bindAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const href = this.getAttribute('href') || '';
            const pid = this.dataset.productId || extractProductIdFromHref(href);

            // Si el enlace es '#' o vacío, evitamos navegación y manejamos localmente
            if (href === '#' || href === '' || href.startsWith('javascript:')) {
                e.preventDefault();
                handleAddToCartLocal(pid, this);
                return;
            }

            // Si es un enlace al servidor, damos feedback visual pero dejamos que navegue
            // (no preventDefault) para preservar comportamiento del backend.
            simpleButtonPulse(this);
            // También intentamos actualizar badge localmente (suponiendo que servidor añadirá sesión)
            incrementCartBadge();
        });
    });
}

function extractProductIdFromHref(href) {
    if (!href) return null;
    const m = href.match(/\/(\d+)(?:\/?$|$)/);
    return m ? m[1] : null;
}

function handleAddToCartLocal(productId, buttonEl) {
    // Aquí iría llamada fetch('/cart/add', ...) si deseas AJAX. Por ahora solo UI.
    simpleButtonPulse(buttonEl);
    createFloatingText(buttonEl, '+1');
    incrementCartBadge();
}

function simpleButtonPulse(el) {
    el.style.transform = 'scale(0.95)';
    setTimeout(() => el.style.transform = '', 180);
}

function createFloatingText(parent, text) {
    const ft = document.createElement('div');
    ft.textContent = text;
    ft.style.cssText = `
        position: absolute;
        top: -18px;
        left: 50%;
        transform: translateX(-50%);
        color: var(--accent);
        font-weight: 700;
        pointer-events: none;
        z-index: 2000;
        animation: floatUp 1s ease-out forwards;
    `;
    parent.style.position = parent.style.position || 'relative';
    parent.appendChild(ft);
    setTimeout(() => ft.remove(), 1000);
}

function incrementCartBadge() {
    const badge = document.getElementById('cartCount');
    if (!badge) return;
    const current = parseInt(badge.textContent) || 0;
    badge.textContent = current + 1;
}

/* FETCH PRODUCTS IF SERVER DIDN'T RENDER */
async function tryFetchProductsIfEmpty() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    // If there are already rendered product-card children, don't overwrite
    if (grid.querySelector('.product-card')) return;

    // try request to /api/products (expects JSON array)
    try {
        const res = await fetch('/api/products');
        if (!res.ok) return;
        const data = await res.json();
        renderProductsFromApi(data);
        // re-bind add-to-cart handlers for generated nodes
        bindAddToCartButtons();
    } catch (err) {
        console.warn('No se pudieron cargar productos desde /api/products:', err);
    }
}

function renderProductsFromApi(items) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    const html = items.map(p => {
        const img = p.image && p.image.startsWith('/') ? p.image : (`/static/${p.image || ''}`);
        const href = `/cart/add/${p.id}`;
        return `
            <article class="product-card">
                <div class="product-image-wrapper">
                    <img src="${img}" alt="${escapeHtml(p.name)}" class="product-image" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${escapeHtml(p.name)}</h3>
                    <p class="product-description">${escapeHtml(p.description || '')}</p>
                    <div class="product-footer">
                        <p class="product-price">$${(p.price || 0).toFixed(2)}</p>
                        <a href="${href}" class="add-to-cart" data-product-id="${p.id}">
                            <i class="fas fa-plus"></i>
                            <span>Agregar al carrito</span>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }).join('');
    grid.innerHTML = html || `<p class="no-products" style="color:var(--text-secondary); text-align:center; width:100%;">No hay productos disponibles.</p>`;
}

function escapeHtml(str = '') {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* CSS animations injected for floating text */
const animStyles = `
@keyframes floatUp {
    0% { opacity: 1; transform: translateX(-50%) translateY(0); }
    100% { opacity: 0; transform: translateX(-50%) translateY(-28px); }
}
`;
const s = document.createElement('style');
s.textContent = animStyles;
document.head.appendChild(s);

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initTheme();
    initModalHandlers();
    bindAddToCartButtons();
    tryFetchProductsIfEmpty();
});