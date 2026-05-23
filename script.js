let cart = JSON.parse(localStorage.getItem("cart")) || [];

// إضافة للسلة
function add(name, price){
  cart.push({name, price});
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("تمت الإضافة 🛒");
}

// عرض السلة
function renderCart(){
  let container = document.getElementById("cart");
  let totalEl = document.getElementById("total");

  if(!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index)=>{
    total += item.price;

    let div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      ${item.name} - ${item.price}$
      <button onclick="removeItem(${index})">حذف</button>
    `;
    container.appendChild(div);
  });

  totalEl.innerText = total;
}

// حذف عنصر
function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// إرسال واتساب
function sendWhatsApp(){
  let msg = "طلب من طعم البيت:%0A";

  cart.forEach(item=>{
    msg += `- ${item.name} (${item.price}$)%0A`;
  });

  window.open("https://wa.me/201012345678?text=" + msg, "_blank");
}

renderCart();