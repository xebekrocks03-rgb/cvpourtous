const products=[
{id:1,name:"CV Moderne et Professionnel",cat:"CV",price:5000,badge:"Top vente",rating:5,reviews:124},
{id:2,name:"Lettre de motivation Moderne",cat:"CV",price:3000,badge:"Nouveau",rating:5,reviews:78},
{id:3,name:"Pack de templates Canva",cat:"Canva",price:7000,badge:"Canva",rating:5,reviews:96},
{id:4,name:"Facture Professionnelle",cat:"Documents",price:4000,badge:"Populaire",rating:5,reviews:61},
{id:5,name:"Présentation d’entreprise",cat:"PowerPoint",price:6000,badge:"PowerPoint",rating:5,reviews:42},
{id:6,name:"CV ATS — Design Minimal",cat:"CV",price:4500,badge:"ATS",rating:4,reviews:58},
{id:7,name:"Portfolio créatif Canva",cat:"Canva",price:6500,badge:"Nouveau",rating:5,reviews:34},
{id:8,name:"Pack contrats entreprise",cat:"Documents",price:8500,badge:"Pack",rating:5,reviews:27},
{id:9,name:"CV Élégant Word",cat:"Word",price:4000,badge:"Word",rating:4,reviews:49},
{id:10,name:"Pitch Deck Startup",cat:"PowerPoint",price:9000,badge:"Pro",rating:5,reviews:31}
];
let state={cat:"Tous",query:"",sort:"popular",cart:JSON.parse(localStorage.getItem("cv_cart")||"[]")};

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const money=n=>n.toLocaleString("fr-FR")+" FCFA";

function renderProducts(){
  let list=products.filter(p=>(state.cat==="Tous"||p.cat===state.cat)&&p.name.toLowerCase().includes(state.query.toLowerCase()));
  if(state.sort==="priceAsc") list.sort((a,b)=>a.price-b.price);
  if(state.sort==="priceDesc") list.sort((a,b)=>b.price-a.price);
  $("#resultInfo").textContent=list.length+" modèle(s) disponible(s)";
  $("#emptyState").classList.toggle("hidden",list.length>0);
  $("#productGrid").innerHTML=list.map(p=>`
  <article class="product">
    <div class="product-img"><span class="product-badge">${p.badge}</span><div class="sheet"><div class="head"></div><div class="line"></div><div class="line w"></div><div class="accent"></div><div class="line"></div><div class="line"></div><div class="line w"></div><div class="accent"></div></div></div>
    <div class="product-body"><div class="product-cat">${p.cat}</div><h3>${p.name}</h3><div class="price">${money(p.price)}</div><div class="rating">${"★".repeat(p.rating)}${"★".repeat(5-p.rating)} <span>(${p.reviews})</span></div><button class="add" data-id="${p.id}">🛒 Ajouter au panier</button></div>
  </article>`).join("");
  $$(".add").forEach(b=>b.onclick=()=>addToCart(+b.dataset.id));
}
function save(){localStorage.setItem("cv_cart",JSON.stringify(state.cart))}
function addToCart(id){if(!state.cart.includes(id))state.cart.push(id);save();renderCart();toast("Produit ajouté au panier");}
function removeCart(id){state.cart=state.cart.filter(x=>x!==id);save();renderCart()}
function renderCart(){
 $("#cartCount").textContent=state.cart.length;
 const items=state.cart.map(id=>products.find(p=>p.id===id)).filter(Boolean);
 $("#cartItems").innerHTML=items.length?items.map(p=>`<div class="cart-item"><div class="thumb">CV</div><div><b>${p.name}</b><small>${money(p.price)}</small></div><button class="remove" data-remove="${p.id}">Retirer</button></div>`).join(""):`<div class="empty">Votre panier est vide.<br>Ajoutez un modèle pour commencer.</div>`;
 items.forEach(p=>{$(`[data-remove="${p.id}"]`).onclick=()=>removeCart(p.id)});
 $("#cartTotal").textContent=money(items.reduce((s,p)=>s+p.price,0));
}
function openCart(){ $("#cartDrawer").classList.add("open");$("#overlay").classList.add("show");$("#cartDrawer").setAttribute("aria-hidden","false")}
function closeCart(){ $("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("show");$("#cartDrawer").setAttribute("aria-hidden","true")}
function toast(msg){let t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function openPaymentModal(total,ref){
  $("#paymentAmount").textContent=money(total);
  $("#orderRef").textContent=ref;
  const msg=encodeURIComponent("Bonjour, je viens d'effectuer un paiement pour la commande "+ref+" ("+money(total)+").");
  $("#contactSeller").href="https://wa.me/22898282062?text="+msg;
  $("#paymentModal").classList.remove("hidden");
  $("#overlay").classList.add("show");
}
function closePaymentModal(){ $("#paymentModal").classList.add("hidden");$("#overlay").classList.remove("show") }
function copyToClipboard(text){
  navigator.clipboard.writeText(text).then(()=>toast("Copié : "+text)).catch(()=>toast("Impossible de copier"));
}
function selectCat(cat){
 state.cat=cat; $$(".filter").forEach(b=>b.classList.toggle("active",b.dataset.cat===cat));
 renderProducts(); $("#catalogue").scrollIntoView({behavior:"smooth",block:"start"});
}
$$("[data-cat]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();selectCat(el.dataset.cat)}));
$("#searchInput").addEventListener("input",e=>{state.query=e.target.value;renderProducts()});
$("#searchBtn").onclick=()=>{$("#catalogue").scrollIntoView({behavior:"smooth"})};
$("#sort").onchange=e=>{state.sort=e.target.value;renderProducts()};
$("#cartOpen").onclick=openCart;$("#cartClose").onclick=closeCart;
$("#overlay").onclick=()=>{closeCart();closePaymentModal()};
$("#paymentClose").onclick=closePaymentModal;
$$("[data-copy]").forEach(b=>b.onclick=()=>copyToClipboard(b.dataset.copy));
$("#copyOrderRef").onclick=()=>copyToClipboard($("#orderRef").textContent);
$("#checkout").onclick=()=>{
  if(!state.cart.length){toast("Votre panier est vide");return}
  const total=state.cart.map(id=>products.find(p=>p.id===id)).filter(Boolean).reduce((s,p)=>s+p.price,0);
  const ref="CVTP-"+Date.now().toString().slice(-6);
  closeCart();
  openPaymentModal(total,ref);
};
$("#newsletter").onsubmit=e=>{e.preventDefault();toast("Merci ! Vous êtes inscrit à la newsletter.");e.target.reset()};
renderProducts();renderCart();
