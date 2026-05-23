let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* إضافة للسلة */
function addToCart(name, price){
  cart.push({name, price});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/* العداد */
function updateCartCount(){
  const counter = document.getElementById("cart-count");
  if(counter){
    counter.innerText = cart.length;
  }
}

/* عرض السلة */
function renderCart(){
  const container = document.getElementById("cart");
  const totalEl = document.getElementById("total");

  if(!container) return;

  container.innerHTML = "";
  let total = 0;

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item, index)=>{
    total += item.price;

    container.innerHTML += `
      <div class="item">
        ${item.name} - ${item.price}$
        <button onclick="removeItem(${index})">حذف</button>
      </div>
    `;
  });

  if(totalEl){
    totalEl.innerText = total;
  }
}

/* حذف */
function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

/* واتساب */
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

/* تشغيل تلقائي */
document.addEventListener("DOMContentLoaded", ()=>{
  updateCartCount();
  renderCart();
});