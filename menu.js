/* ============================================================
   Renderiza la grilla de productos y las categorías de menu.html.
   El carrito en sí (agregar, sumar/restar, WhatsApp, modal) vive en
   cart.js y se comparte con index.html.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    const menuEl = document.getElementById('menu');
    const tabsEl = document.getElementById('category-tabs');

    const cats = [...new Set(MENU_DATA.map(i => i.cat))];

    cats.forEach((cat, i) => {
        const tab = document.createElement('button');
        tab.type = 'button';
        tab.className = 'category-tab' + (i === 0 ? ' active' : '');
        tab.textContent = cat;
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('cat-' + cat).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        tabsEl.appendChild(tab);

        const block = document.createElement('div');
        block.className = 'category-block';
        block.id = 'cat-' + cat;
        block.innerHTML = `<h3 class="category-heading font-item-title text-xl text-paper-white uppercase">${cat}</h3><div class="dish-grid" id="grid-${cat}"></div>`;
        menuEl.appendChild(block);
    });

    MENU_DATA.forEach(item => {
        const grid = document.getElementById('grid-' + item.cat);
        const card = document.createElement('div');
        card.className = 'menu-card group bg-surface-container rounded-xl overflow-hidden shadow-2xl border border-grill-smoke hover:border-primary/50 transition-all flex flex-col';
        card.innerHTML = `
      <div class="menu-card-media h-48 flex items-center justify-center bg-surface-container-low">
        <svg class="w-24 h-24 text-primary"><use href="#${item.icon}"/></svg>
      </div>
      <div class="p-6 flex flex-col flex-grow">
        <h3 class="font-item-title text-xl text-paper-white mb-2">${item.name}</h3>
        <p class="font-body-md text-on-surface-variant mb-4 text-sm flex-grow">${item.desc}</p>
        <div class="flex items-center justify-between gap-3 mt-auto">
          <span class="font-price-tag text-xl text-secondary">$${item.price}</span>
          <button type="button" class="btn btn-primary add-btn" data-add-to-cart="${item.id}">
            <span class="material-symbols-outlined text-base">add_shopping_cart</span>
            Agregar
          </button>
        </div>
      </div>
    `;
        grid.appendChild(card);
    });

    // Los botones "Agregar" recién creados usan data-add-to-cart:
    // cart.js los conecta automáticamente en su propio DOMContentLoaded,
    // pero como este script agrega los botones al mismo tiempo, los
    // enganchamos también acá por si el orden de carga varía.
    document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            window.Cart.addToCart(btn.getAttribute('data-add-to-cart'), 1);
        });
    });

    document.getElementById('year').textContent = new Date().getFullYear();
});
