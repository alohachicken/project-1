alert("app.js loaded");
console.log("app.js loaded");

const API = "http://localhost:3000";

// ---------- helpers ----------
function getToken() {
  return localStorage.getItem("token");
}

function requireAuth() {
  const token = getToken();
  if (!token) window.location.href = "/";
  return token;
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/";
}

function goProfile() {
  window.location.href = "/profile.html";
}

function goCreate() {
  window.location.href = "/create.html";
}

// ---------- LOGIN ----------
async function login() {
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });





  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "/main.html";
    const el = document.getElementById("loginStatus");
    if (el) el.innerText = "✅ Logged in";
  } else {
    const el = document.getElementById("loginStatus");
    if (el) el.innerText = data.error || "Login failed";
    else alert(data.error || "Login failed");
  }
}

// ---------- REGISTER ----------
async function register() {
  const username = document.getElementById("reg-username")?.value;
  const email = document.getElementById("reg-email")?.value;
  const password = document.getElementById("reg-password")?.value;

  const res = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  const msg = document.getElementById("register-msg");
  if (msg) {
    msg.innerText = res.ok
      ? "✅ Registered! You can now log in."
      : (data.error || "Register failed");
  }
}

// ---------- CREATE PRODUCT ----------
async function createProduct() {
  const token = requireAuth();

  const title = document.getElementById("title")?.value;
  const price = document.getElementById("price")?.value;
  const imageUrl = document.getElementById("imageUrl")?.value;

  const res = await fetch(`${API}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, price, imageUrl })
  });

  const data = await res.json();
  alert(res.ok ? "✅ Product created" : (data.error || "Create failed"));
}

// ---------- MARKETPLACE (LOAD PRODUCTS) ----------
async function loadProducts() {
  const token = getToken();
  if (!token) {
    window.location.href = "/";
    return;
  }

  const res = await fetch(`${API}/api/products`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const products = await res.json();
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";

    const seller = p.owner && p.owner.username
      ? p.owner.username
      : "Unknown";

    div.innerHTML = `
      <img src="${p.imageUrl || 'https://via.placeholder.com/300'}">
      <h3>${p.title}</h3>
      <p>RM ${p.price}</p>
      <p><strong>Posted by:</strong> ${seller}</p>
    `;

    if (p.isOwner) {
      const btn = document.createElement("button");
      btn.innerText = "Delete";
      btn.onclick = () => deleteProduct(p._id);
      div.appendChild(btn);
    }

    container.appendChild(div);
  });
}

// ---------- DELETE PRODUCT ----------
async function deleteProduct(id) {
  const token = requireAuth();

  await fetch(`${API}/api/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  loadProducts();
}

// ---------- auto-run on certain pages ----------
if (window.location.pathname.includes("main.html")) loadProducts();