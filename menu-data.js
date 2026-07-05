// Catálogo único del menú. Antes "Milanesa con papas" existía en index.html
// pero no en menu.html (el botón PEDIR llevaba a un producto que no existía
// en el carrito). Ahora ambas páginas leen de esta misma lista, así los
// precios, nombres e IDs nunca se desincronizan.
window.MENU_DATA = [
    // Milanesas
    { id: 15, name: 'Barroluco', desc: 'Hecho con la mejor carne de ternera, queso, tomate, jamon, queso, mayonesa y el mejor pan de miga.', price: 20000, icon: 'icon-milanesa', cat: 'Barroluco' },

    // Pizzas
    { id: 1, name: 'Pizza Muzzarella (familiar)', desc: 'Masa casera, salsa de tomate y muzzarella.', price: 2200, icon: 'icon-milanesa', cat: 'Pizzas' },
    { id: 2, name: 'Pizza Napolitana (familiar)', desc: 'Muzzarella, tomate, ajo, y orégano.', price: 2400, icon: 'icon-milanesa', cat: 'Pizzas' },
    { id: 3, name: 'Pizza Fugazzeta (familiar)', desc: 'Cebolla y muzzarella, bien jugosa.', price: 2500, icon: 'icon-milanesa', cat: 'Pizzas' },

    // Lomitos
    { id: 4, name: 'Lomito completo', desc: 'Pan, lomo, lechuga, tomate, huevo y papas.', price: 1300, icon: 'icon-milanesa', cat: 'Lomitos' },
    { id: 5, name: 'Lomito simple', desc: 'Pan, lomo, lechuga, tomate.', price: 1000, icon: 'icon-milanesa', cat: 'Lomitos' },

    // Hamburguesas
    { id: 6, name: 'Hamburguesa clásica', desc: 'Pan artesanal, medallón de carne, lechuga capuchina, tomate y queso fundido.', price: 16000, icon: 'icon-hamburguesa', cat: 'Hamburguesas' },
    { id: 7, name: 'Hamburguesa doble', desc: 'Doble carne, doble queso y papas.', price: 14500, icon: 'icon-hamburguesa', cat: 'Hamburguesas' },
    { id: 8, name: 'Hamburguesa vegana', desc: 'Hamburguesa vegetal con toppings frescos.', price: 9000, icon: 'icon-hamburguesa', cat: 'Hamburguesas' },

    // Choripán y Barroluco
    { id: 9, name: 'Pizza de Ternera', desc: 'La mejor pizza combinada con la carne mas tierna y sabrosa.', price: 12500, icon: 'icon-choripan', cat: 'pizzas' },
    { id: 10, name: 'Barroluco (porción)', desc: 'Porción tradicional de la casa.', price: 700, icon: 'icon-papas', cat: 'Barroluco' },

    // Guarniciones
    { id: 11, name: 'Papas fritas (porción)', desc: 'Porción grande, bien doradas.', price: 450, icon: 'icon-papas', cat: 'Guarniciones' },

    // Bebidas
    { id: 12, name: 'Coca-Cola 500ml', desc: 'Bebida gaseosa bien fría.', price: 250, icon: 'icon-gaseosa', cat: 'Bebidas' },
    { id: 13, name: 'Agua 600ml', desc: 'Agua mineral sin gas.', price: 150, icon: 'icon-gaseosa', cat: 'Bebidas' },
    { id: 14, name: 'Cerveza lata 350ml', desc: 'Cerveza lager bien helada o gaseosas de línea.', price: 300, icon: 'icon-cerveza', cat: 'Bebidas' }
];
