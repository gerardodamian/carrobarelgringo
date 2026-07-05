/* ============================================================
   Carrito compartido — Carro Bar El Gringo
   Se usa igual en index.html y menu.html:
   - guarda el pedido en localStorage (antes se perdía al cambiar de página)
   - dibuja un MODAL centrado (antes era un cajón/sidebar distinto en cada
     página y confuso en mobile)
   - actualiza automáticamente los contadores del carrito en el header y
     en la barra inferior de ambas páginas
   ============================================================ */
(function () {
    const STORAGE_KEY = 'elgringo_cart_v1';
    const PHONE_E164 = '5493804683331'; // mismo número que los links de WhatsApp del sitio
    const DEFAULT_DELIVERY_COST = 200;

    let cart = loadCart();

    function loadCart() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    }

    function saveCart() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (e) { /* localStorage no disponible: el carrito sigue funcionando en memoria */ }
    }

    function findItem(id) {
        return (window.MENU_DATA || []).find(i => i.id === Number(id));
    }

    function addToCart(id, qty) {
        qty = qty || 1;
        const item = findItem(id);
        if (!item) return;
        if (cart[id]) {
            cart[id].qty += qty;
        } else {
            cart[id] = { id: item.id, name: item.name, price: item.price, qty: qty };
        }
        saveCart();
        renderAll();
        openModal();
    }

    function changeQty(id, delta) {
        if (!cart[id]) return;
        cart[id].qty += delta;
        if (cart[id].qty <= 0) delete cart[id];
        saveCart();
        renderAll();
    }

    function removeItem(id) {
        delete cart[id];
        saveCart();
        renderAll();
    }

    function clearCart() {
        cart = {};
        saveCart();
        renderAll();
    }

    function getItems() {
        return Object.values(cart);
    }

    function getCount() {
        return getItems().reduce((s, i) => s + i.qty, 0);
    }

    /* ---------------- Modal: se inyecta una sola vez ---------------- */
    let modalInjected = false;

    function injectModal() {
        if (modalInjected) return;
        modalInjected = true;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
      <div id="cart-backdrop" class="cart-backdrop"></div>
      <div id="cart-modal" class="cart-modal" role="dialog" aria-modal="true" aria-labelledby="cart-modal-title">
        <div class="cart-modal-header">
          <h2 id="cart-modal-title" class="font-item-title text-2xl text-paper-white">Tu pedido</h2>
          <button type="button" id="cart-modal-close" class="cart-modal-close" aria-label="Cerrar carrito">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="cart-modal-body">
          <div id="cart-empty" class="cart-empty">
            <span class="material-symbols-outlined text-4xl text-on-surface-variant mb-2">shopping_cart</span>
            <p class="font-body-md text-on-surface-variant">Todavía no agregaste nada.<br>Elegí algo del menú para empezar tu pedido.</p>
          </div>

          <div id="cart-items" class="cart-items"></div>

          <div id="cart-order-details" class="cart-order-details" style="display:none">
            <div class="cart-step">
              <span class="cart-step-number">1</span>
              <span class="font-label-mono text-label-mono text-on-surface-variant">CÓMO LO RECIBÍS</span>
            </div>
            <div class="mode-options">
              <label class="mode-option">
                <input type="radio" name="cart-mode" value="pickup" checked>
                <span class="material-symbols-outlined text-lg">storefront</span>
                Retiro en el local
              </label>
              <label class="mode-option">
                <input type="radio" name="cart-mode" value="delivery">
                <span class="material-symbols-outlined text-lg">two_wheeler</span>
                Delivery
              </label>
            </div>

            <div id="cart-delivery-fields" style="display:none">
              <label class="cart-field-label" for="cart-address">Dirección de entrega</label>
              <input id="cart-address" type="text" placeholder="Calle, número, referencia">
            </div>

            <div class="cart-step" style="margin-top:1.25rem">
              <span class="cart-step-number">2</span>
              <span class="font-label-mono text-label-mono text-on-surface-variant">FORMA DE PAGO</span>
            </div>
            <select id="cart-payment" class="cart-select">
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
            </select>

            <div class="cart-step" style="margin-top:1.25rem">
              <span class="cart-step-number">3</span>
              <span class="font-label-mono text-label-mono text-on-surface-variant">CONFIRMÁ Y ENVIÁ</span>
            </div>
            <div class="cart-totals">
              <div class="cart-totals-row"><span>Subtotal</span><strong id="cart-subtotal">$0</strong></div>
              <div class="cart-totals-row" id="cart-delivery-row" style="display:none"><span>Delivery</span><strong id="cart-delivery-fee">$0</strong></div>
              <div class="cart-totals-row cart-totals-total"><span>Total</span><strong id="cart-total">$0</strong></div>
            </div>
          </div>
        </div>

        <div class="cart-modal-footer">
          <button type="button" id="cart-whatsapp-btn" class="btn btn-whatsapp btn-block" disabled>
            <span class="material-symbols-outlined text-lg">chat</span>
            Enviar pedido por WhatsApp
          </button>
        </div>
      </div>
    `;
        document.body.appendChild(wrapper);

        document.getElementById('cart-modal-close').addEventListener('click', closeModal);
        document.getElementById('cart-backdrop').addEventListener('click', closeModal);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeModal();
        });

        document.querySelectorAll('input[name="cart-mode"]').forEach(r => {
            r.addEventListener('change', e => {
                document.getElementById('cart-delivery-fields').style.display = e.target.value === 'delivery' ? 'block' : 'none';
                renderTotals();
            });
        });

        document.getElementById('cart-whatsapp-btn').addEventListener('click', sendWhatsApp);
    }

    function openModal() {
        injectModal();
        document.getElementById('cart-modal').classList.add('open');
        document.getElementById('cart-backdrop').classList.add('open');
        document.body.classList.add('cart-modal-locked');
    }

    function closeModal() {
        const modal = document.getElementById('cart-modal');
        const backdrop = document.getElementById('cart-backdrop');
        if (modal) modal.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
        document.body.classList.remove('cart-modal-locked');
    }

    /* ---------------- Render ---------------- */

    function renderItems() {
        if (!modalInjected) return;
        const itemsEl = document.getElementById('cart-items');
        const emptyEl = document.getElementById('cart-empty');
        const detailsEl = document.getElementById('cart-order-details');
        const items = getItems();

        itemsEl.innerHTML = '';
        items.forEach(ci => {
            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
        <div class="cart-item-info">
          <span class="cart-item-name">${ci.name}</span>
          <span class="cart-item-unit-price">$${ci.price} c/u</span>
        </div>
        <div class="stepper">
          <button type="button" data-act="minus" aria-label="Quitar uno">−</button>
          <span class="stepper-value">${ci.qty}</span>
          <button type="button" data-act="plus" aria-label="Agregar uno">+</button>
        </div>
        <span class="cart-item-total">$${ci.price * ci.qty}</span>
        <button type="button" class="cart-item-remove" aria-label="Eliminar">
          <span class="material-symbols-outlined text-base">delete</span>
        </button>
      `;
            row.querySelector('[data-act="minus"]').addEventListener('click', () => changeQty(ci.id, -1));
            row.querySelector('[data-act="plus"]').addEventListener('click', () => changeQty(ci.id, 1));
            row.querySelector('.cart-item-remove').addEventListener('click', () => removeItem(ci.id));
            itemsEl.appendChild(row);
        });

        emptyEl.style.display = items.length ? 'none' : 'flex';
        detailsEl.style.display = items.length ? 'block' : 'none';
        renderTotals();
    }

    function renderTotals() {
        if (!modalInjected) return;
        const items = getItems();
        const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
        const modeInput = document.querySelector('input[name="cart-mode"]:checked');
        const mode = modeInput ? modeInput.value : 'pickup';
        const deliveryFee = mode === 'delivery' ? DEFAULT_DELIVERY_COST : 0;
        const total = subtotal + deliveryFee;

        document.getElementById('cart-subtotal').textContent = '$' + subtotal;
        document.getElementById('cart-delivery-row').style.display = mode === 'delivery' ? 'flex' : 'none';
        document.getElementById('cart-delivery-fee').textContent = '$' + deliveryFee;
        document.getElementById('cart-total').textContent = '$' + total;
        document.getElementById('cart-whatsapp-btn').disabled = items.length === 0;
    }

    function renderBadges() {
        const count = getCount();
        document.querySelectorAll('[data-cart-badge]').forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
        document.querySelectorAll('[data-cart-bar]').forEach(bar => {
            bar.classList.toggle('visible', count > 0);
        });
        document.querySelectorAll('[data-cart-bar-count]').forEach(el => {
            el.textContent = count + (count === 1 ? ' producto' : ' productos');
        });
        const subtotal = getItems().reduce((s, i) => s + i.price * i.qty, 0);
        document.querySelectorAll('[data-cart-bar-total]').forEach(el => {
            el.textContent = '$' + subtotal;
        });
    }

    function renderAll() {
        renderItems();
        renderBadges();
    }

    function sendWhatsApp() {
        const items = getItems();
        if (!items.length) return;
        const modeInput = document.querySelector('input[name="cart-mode"]:checked');
        const mode = modeInput ? modeInput.value : 'pickup';
        const payment = document.getElementById('cart-payment').value;
        const address = document.getElementById('cart-address').value.trim();
        const deliveryFee = mode === 'delivery' ? DEFAULT_DELIVERY_COST : 0;

        let subtotal = 0;
        const lines = ['Pedido — Carro Bar El Gringo', '--------------------------------'];
        items.forEach(ci => {
            lines.push(`${ci.name} x ${ci.qty} = $${ci.price * ci.qty}`);
            subtotal += ci.price * ci.qty;
        });
        lines.push('--------------------------------');
        lines.push(`Subtotal: $${subtotal}`);
        if (mode === 'delivery') {
            lines.push(`Delivery: $${deliveryFee}`);
            lines.push('Dirección: ' + (address || '(sin especificar)'));
        }
        lines.push('Total: $' + (subtotal + deliveryFee));
        lines.push('Forma de pago: ' + (payment === 'efectivo' ? 'Efectivo' : 'Transferencia'));
        lines.push('Modo: ' + (mode === 'delivery' ? 'Delivery' : 'Retira en el local'));
        lines.push('Muchas gracias, por favor confirme su pedido.');

        const waUrl = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(lines.join('\n'))}`;
        window.open(waUrl, '_blank');
        // Vaciar carrito y actualizar UI después de enviar el pedido
        clearCart();
        try { closeModal(); } catch (e) { /* ignore */ }
    }

    function wireOpenButtons() {
        document.querySelectorAll('[data-cart-open]').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                openModal();
            });
        });
        document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                addToCart(btn.getAttribute('data-add-to-cart'), 1);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        injectModal();
        wireOpenButtons();
        renderAll();
    });

    window.Cart = {
        addToCart,
        changeQty,
        removeItem,
        clearCart,
        getItems,
        getCount,
        openModal,
        closeModal,
        renderAll
    };
})();
