// Catálogo único del menú. Antes "Milanesa con papas" existía en index.html
// pero no en menu.html (el botón PEDIR llevaba a un producto que no existía
// en el carrito). Ahora ambas páginas leen de esta misma lista, así los
// precios, nombres e IDs nunca se desincronizan.
window.MENU_DATA = [
    // Destacados: los 3 combos con foto que se agregaron a mano en index.html.
    // Antes reusaban los IDs 6, 9 y 15 de otros productos (Hamburguesa clásica,
    // Choripán y Milanesa), así que al agregarlos desde el inicio en realidad
    // se sumaba al carrito un producto distinto al que se veía en la card.
    // Ahora tienen su propio ID y foto, y también aparecen en el menú.
    { id: 16, name: 'Barroluco', desc: 'Hecho con la mejor carne de ternera, queso, tomate, jamón, queso, mayonesa y el mejor pan de miga.', price: 20000, img: 'img/WhatsApp Image 2026-05-28 at 12.06.38.jpeg', badge: '🥇 ESPECIALIDAD', cat: 'Destacados' },
    { id: 17, name: 'Hamburguesa clásica + Coca cola', desc: 'Pan artesanal, medallón de carne, lechuga capuchina, tomate y queso fundido.', price: 8500, img: 'img/WhatsApp Image 2026-07-04 at 15.40.28 (1).jpeg', badge: '🔥 EL MÁS PEDIDO', cat: 'Destacados' },
    { id: 18, name: 'Pizza de Ternera', desc: 'La mejor pizza combinada con la carne más tierna y sabrosa.', price: 12500, img: 'img/WhatsApp Image 2026-07-04 at 15.40.25.jpeg', badge: '🔥 EL MÁS PEDIDO', cat: 'Destacados' },

    // Milanesas
    { id: 15, name: 'Milanesa con papas', desc: 'Milanesa de carne premium con guarnición de papas fritas crocantes y limón.', price: 1200, icon: 'icon-milanesa', cat: 'Milanesas' },

    // Pizzas
    { id: 1, name: 'Pizza Muzzarella (familiar)', desc: 'Masa casera, salsa de tomate y muzzarella.', price: 2200, icon: 'icon-milanesa', cat: 'Pizzas' },
    { id: 2, name: 'Pizza Napolitana (familiar)', desc: 'Muzzarella, tomate, ajo, y orégano.', price: 2400, icon: 'icon-milanesa', cat: 'Pizzas' },
    { id: 3, name: 'Pizza Fugazzeta (familiar)', desc: 'Cebolla y muzzarella, bien jugosa.', price: 2500, icon: 'icon-milanesa', cat: 'Pizzas' },

    // Lomitos
    { id: 4, name: 'Lomito completo', desc: 'Pan, lomo, lechuga, tomate, huevo y papas.', price: 1300, icon: 'icon-milanesa', cat: 'Lomitos' },
    { id: 5, name: 'Lomito simple', desc: 'Pan, lomo, lechuga, tomate.', price: 1000, icon: 'icon-milanesa', cat: 'Lomitos' },

    // Hamburguesas
    { id: 6, name: 'Hamburguesa clásica', desc: 'Pan artesanal, medallón de carne, lechuga capuchina, tomate y queso fundido.', price: 950, icon: 'icon-hamburguesa', cat: 'Hamburguesas' },
    { id: 7, name: 'Hamburguesa doble', desc: 'Doble carne, doble queso y papas.', price: 1450, icon: 'icon-hamburguesa', cat: 'Hamburguesas' },
    { id: 8, name: 'Hamburguesa vegana', desc: 'Hamburguesa vegetal con toppings frescos.', price: 900, icon: 'icon-hamburguesa', cat: 'Hamburguesas' },

    // Choripán y Barroluco
    { id: 9, name: 'Choripán', desc: 'Chorizo de cerdo artesanal con chimichurri de la casa en pan crocante.', price: 650, icon: 'icon-choripan', cat: 'Choripanes' },
    { id: 10, name: 'Barroluco (porción)', desc: 'Porción tradicional de la casa.', price: 700, icon: 'icon-papas', cat: 'Barroluco' },

    // Guarniciones 
    { id: 11, name: 'Papas fritas (porción)', desc: 'Porción grande, bien doradas.', price: 450, icon: 'icon-papas', cat: 'Guarniciones' },

    // Bebidas
    { id: 12, name: 'Coca-Cola 500ml', desc: 'Bebida gaseosa bien fría.', price: 250, icon: 'icon-gaseosa', cat: 'Bebidas' },
    { id: 13, name: 'Agua 600ml', desc: 'Agua mineral sin gas.', price: 150, icon: 'icon-gaseosa', cat: 'Bebidas' },
    { id: 14, name: 'Cerveza lata 350ml', desc: 'Cerveza lager bien helada o gaseosas de línea.', price: 1600, img: "img/cerveza.jpg", icon: 'icon-cerveza', cat: 'Bebidas' }
];
