const PRODUCTS = [
  {
    id: "p1",
    name: "Teclado Tempest K2",
    price: 14999,
    category: "Teclado",
    desc: "Teclado retroiluminado en rojo, con un diseño robusto y audaz, ideal para gamers que buscan durabilidad y estilo.",
    image: "img/products/keyboard-1.jpg",
  },
  {
    id: "p2",
    name: "Teclado Tempest K3",
    price: 7499,
    category: "Teclado",
    desc: "Teclado mecánico con iluminación RGB personalizable, perfecto para una experiencia de juego inmersiva y una estética vibrante.",
    image: "img/products/keyboard-2.jpg",
  },
  {
    id: "p3",
    name: "Combo Logitech MK270",
    price: 9999,
    category: "Teclado",
    desc: "Conjunto inalámbrico de teclado y mouse Logitech, diseñado para la productividad diaria con la comodidad de un diseño compacto y funcional.",
    image: "img/products/keyboard-3.jpg",
  },
  {
    id: "p4",
    name: 'Teclado Newskill Suiko TKL',
    price: 27499,
    category: "Teclado",
    desc: "Teclado mecánico con retroiluminación RGB, que incluye un reposamuñecas para máxima comodidad durante largas sesiones de uso.",
    image: "img/products/keyboard-4.jpg",
  },
  {
    id: "p5",
    name: "Teclado Newskill Gungnyr RGB",
    price: 7999,
    category: "Teclado",
    desc: "Teclado mecánico con un diseño minimalista y robusto, con iluminación RGB completa y para un soporte ergonómico superior.",
    image: "img/products/keyboard-5.jpg",
  },
  {
    id: "p6",
    name: "HyperX Cloud Alpha Wireless",
    price: 8999,
    category: "Teclado",
    desc: "Teclado mecánico con un diseño retroiluminado en rojo, robusto y audaz, ideal para gamers que buscan durabilidad y estilo.",
    image: "img/products/audio-1.jpg",
  },
  {
    id: "p7",
    name: "Dareu EH726",
    price: 6499,
    category: "Teclado",
    desc: "Auriculares con sonido envolvente 7.1, micrófono con cancelación de ruido y un elegante diseño azul con iluminación RGB, ideales para gaming.",
    image: "img/products/audio-2.jpg",
  },
  {
    id: "p8",
    name: "Sades Spirit Wolf",
    price: 5999,
    category: "Teclado",
    desc: "Auriculares para juegos con un diseño llamativo, calidad de sonido superior, claridad de voz y un control remoto en línea para ajustes intuitivos.",
    image: "img/products/audio-3.jpg",
  },
  {
    id: "p9",
    name: "Select Gaming SG-H3",
    price: 7999,
    category: "Teclado",
    desc: "Auriculares gaming con luces LED RGB y micrófono incorporado, que ofrecen una experiencia de sonido potente y un diseño ergonómico.",
    image: "img/products/audio-4.jpg",
  },
  {
    id: "p10",
    name: "Redragon Chroma Lamia 2 H320RGB",
    price: 9999,
    category: "Teclado",
    desc: "Auriculares gamer inalámbricos con iluminación RGB circular en las orejeras, que proporcionan un sonido envolvente y total libertad de movimiento.",
    image: "img/products/audio-5.jpg",
  },
  {
    id: "p11",
    name: "Monitor 24'' Gamer Pro",
    price: 64999,
    category: "Teclado",
    desc: "Monitor de 24 pulgadas con resolución Full HD y tiempo de respuesta rápido, ideal para sesiones de juego intensas.",
    image: "img/products/monitor-1.jpg",
  },
  {
    id: "p12",
    name: "Gigabyte G34WQC",
    price: 85499,
    category: "Teclado",
    desc: "Monitor curvo GIGABYTE ultrawide de 34 pulgadas con curvatura 1500R, tasa de refresco de 144Hz y 1ms de tiempo de respuesta, diseñado para una inmersión total en tus juegos.",
    image: "img/products/monitor-2.jpg",
  },
  {
    id: "p13",
    name: "Hannspree Hanns.G",
    price: 59999,
    category: "Teclado",
    desc: "Monitor Hanns.G con tecnología anti-reflejo y Flicker-free, que ofrece una visualización Full HD nítida y cómoda para el uso diario y la oficina.",
    image: "img/products/monitor-3.jpg",
  },
  {
    id: "p14",
    name: "LG 24MP400-B",
    price: 65499,
    category: "Teclado",
    desc: "Monitor LG de 24 pulgadas con panel IPS FHD y una tasa de refresco de 75Hz. Su diseño prácticamente sin bordes es perfecto para configuraciones de múltiples monitores.",
    image: "img/products/monitor-4.jpg",
  },
  {
    id: "p15",
    name: "LG Ergo Monitor",
    price: 79999,
    category: "Teclado",
    desc: "Monitor LG Ergo con un soporte ergonómico y totalmente ajustable, que permite una gran flexibilidad para inclinar, girar y ajustar la altura para la máxima comodidad.",
    image: "img/products/monitor-5.jpg",
  },
];

// ------------------------------
// Estado y helpers
// ------------------------------
const state = {
  cart: load("cart") || [],
  coupon: load("coupon") || null,
  search: "",
};

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_) { }
}
function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (_) {
    return null;
  }
}

const fmt = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});
const money = (n) => fmt.format(n);

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 1800);
}


const grid = document.getElementById("productGrid");
function renderProducts() {
  const q = state.search.trim().toLowerCase();
  const items = PRODUCTS.filter(
    (p) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
  grid.innerHTML = items
    .map(
      (p) => `
        <article class="card" aria-label="${p.name}">
          <div class="card-media">
            <span class="chip">${p.category}</span>
             <img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;" />
          </div>
          <div class="card-body">
            <h3 class="title">${p.name}</h3>
            <p class="desc">${p.desc}</p>
          </div>
          <div class="card-footer">
            <span class="price">${money(p.price)}</span>
            <button class="btn" data-add="${p.id}">Añadir</button>
          </div>
        </article>
      `
    )
    .join("");
}

const overlay = document.getElementById("overlay");
const drawer = document.getElementById("drawer");
const cartList = document.getElementById("cartList");
const cartCount = document.getElementById("cartCount");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const shippingEl = document.getElementById("shipping");
const checkoutBtn = document.getElementById("checkout");

function openCart() {
  overlay.classList.add("show");
  drawer.classList.add("show");
  drawer.setAttribute("aria-hidden", "false");
}
function closeCart() {
  overlay.classList.remove("show");
  drawer.classList.remove("show");
  drawer.setAttribute("aria-hidden", "true");
}

function addToCart(id) {
  const prod = PRODUCTS.find((p) => p.id === id);
  if (!prod) return;
  const existing = state.cart.find((i) => i.id === id);
  if (existing) existing.qty += 1;
  else state.cart.push({ id, qty: 1 });
  save("cart", state.cart);
  updateCartUI();
  toast("Añadido al carrito");
}

function changeQty(id, delta) {
  const item = state.cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter((i) => i.id !== id);
  }
  save("cart", state.cart);
  updateCartUI();
}

function removeItem(id) {
  state.cart = state.cart.filter((i) => i.id !== id);
  save("cart", state.cart);
  updateCartUI();
  toast("Producto eliminado");
}

function clearCart() {
  state.cart = [];
  save("cart", state.cart);
  updateCartUI();
}

function applyCoupon(code) {
  if (code.toUpperCase() === "CUPON10") {
    state.coupon = { code: "CUPON10", type: "percent", value: 10 };
    toast("Cupón aplicado: 10%");
  } else {
    state.coupon = null;
    toast("Cupón inválido");
  }
  save("coupon", state.coupon);
  updateCartUI();
}

function calcTotals() {
  const enriched = state.cart
    .map((i) => ({ ...i, prod: PRODUCTS.find((p) => p.id === i.id) }))
    .filter((i) => i.prod);
  const subtotal = enriched.reduce((s, i) => s + i.prod.price * i.qty, 0);
  let discount = 0;
  if (state.coupon) {
    if (state.coupon.type === "percent")
      discount = Math.round(subtotal * (state.coupon.value / 100));
  }
  const shipping = subtotal > 150000 ? 0 : subtotal ? 6500 : 0;
  const total = Math.max(subtotal - discount + shipping, 0);
  return { enriched, subtotal, discount, shipping, total };
}

function updateCartUI() {
  const { enriched, subtotal, discount, shipping, total } = calcTotals();

  cartCount.textContent = state.cart.reduce((s, i) => s + i.qty, 0);

  if (!enriched.length) {
    cartList.innerHTML = `<div class="empty">Tu carrito está vacío. Agrega productos para continuar.</div>`;
    subtotalEl.textContent = money(0);
    totalEl.textContent = money(0);
    shippingEl.textContent = "—";
    checkoutBtn.disabled = true;
    return;
  }

  cartList.innerHTML = enriched
    .map(
      ({ id, qty, prod }) => `
        <div class="item">
          <div class="thumb"><img src="${prod.image}" alt="" loading="lazy"></div>
          <div>
            <h4>${prod.name}</h4>
            <div class="meta">${prod.category} • ${money(prod.price)}</div>
            <div style="margin-top:8px; display:flex; gap:8px; align-items:center;">
              <div class="qty" aria-label="Cantidad">
                <button data-dec="${id}" aria-label="Reducir">−</button>
                <span>${qty}</span>
                <button data-inc="${id}" aria-label="Aumentar">+</button>
              </div>
              <button class="btn ghost" data-remove="${id}">Quitar</button>
            </div>
          </div>
          <div class="actions">
            <div class="price">${money(prod.price * qty)}</div>
          </div>
        </div>
      `
    )
    .join("");

  subtotalEl.textContent = money(subtotal - discount);
  shippingEl.textContent = shipping === 0 ? "Gratis" : money(shipping);
  totalEl.textContent = money(total);
  checkoutBtn.disabled = false;
}

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  const rem = e.target.closest("[data-remove]");

  if (add) {
    addToCart(add.getAttribute("data-add"));
  }
  if (inc) {
    changeQty(inc.getAttribute("data-inc"), +1);
  }
  if (dec) {
    changeQty(dec.getAttribute("data-dec"), -1);
  }
  if (rem) {
    removeItem(rem.getAttribute("data-remove"));
  }
});

document
  .getElementById("openCartBtn")
  .addEventListener("click", openCart);
document
  .getElementById("closeCartBtn")
  .addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.getElementById("clearCart").addEventListener("click", () => {
  if (confirm("¿Vaciar carrito?")) clearCart();
});

document.getElementById("applyCoupon").addEventListener("click", () => {
  const code = document.getElementById("coupon").value.trim();
  applyCoupon(code);
});

document.getElementById("checkout").addEventListener("click", () => {
  const { total } = calcTotals();
  toast(`Total a pagar: ${money(total)}`);
});

const search = document.getElementById("search");
search.addEventListener("input", () => {
  state.search = search.value;
  renderProducts();
});

// Atajos rápidos
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    search.focus();
  }
  if (e.key === "Escape") closeCart();
});

// Init
renderProducts();
updateCartUI();