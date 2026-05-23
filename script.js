let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ========================
   إضافة للسلة
======================== */
function addToCart(name, price){
  cart.push({name, price});
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

/* ========================
   تحديث العداد (كل الصفحات)
======================== */
function updateCartCount(){
  const counter = document.getElementById("cart-count");
  if(counter){
    counter.innerText = cart.length;
  }
}

/* ========================
   عرض السلة (صفحة cart.html فقط)
======================== */
function renderCart(){
  const container = document.getElementById("cart");
  const totalEl = document.getElementById("total");

  if(!container) return;

  container.innerHTML = "";
  let total = 0;

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item, index)=>{
    total += Number(item.price);

    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <span>${item.name} - ${item.price}$</span>
      <button onclick="removeItem(${index})">حذف</button>
    `;

    container.appendChild(div);
  });

  if(totalEl){
    totalEl.innerText = total;
  }
}

/* ========================
   حذف عنصر
======================== */
function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
  updateCartCount();
}

/* ========================
   واتساب
======================== */
function sendWhatsApp(){
  let msg = "طلب من طعم البيت:%0A";

  cart.forEach(item=>{
    msg += `- ${item.name} (${item.price}$)%0A`;
  });

  window.open(
    "https://wa.me/201012345678?text=" + encodeURIComponent(msg),
    "_blank"
  );
}

/* ========================
   تشغيل تلقائي
======================== */
document.addEventListener("DOMContentLoaded", ()=>{
  updateCartCount();
  renderCart();
});