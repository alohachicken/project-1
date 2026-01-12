const API = "http://localhost:3000";
const token = localStorage.getItem("token");

if (!token) window.location.href = "/index.html";

function authHeaders() {
  return { Authorization: "Bearer " + token };
}

async function loadMyProducts() {
  const container = document.getElementById("my-products");
  if (!container) return;

  container.innerHTML = "Loading...";

  try {
    const res = await fetch(API + "/api/products/mine", {
      headers: authHeaders(),
    });

    if (!res.ok) {
      const errText = await res.text();
      container.innerHTML = "Failed to load products: " + res.status + " " + errText;
      return;
    }

    const products = await res.json();

    if (!products || products.length === 0) {
      container.innerHTML = "<p>You haven't posted any products yet.</p>";
      return;
    }

    container.innerHTML = "";

    products.forEach(function (p) {
      const div = document.createElement("div");
      div.className = "product-card";

      const img = p.imageUrl ? '<img src="' + p.imageUrl + '" width="200" />' : "";

      div.innerHTML =
        img +
        "<h3>" + p.title + "</h3>" +
        "<p>RM " + p.price + "</p>" +
        '<button class="delete-btn">Delete</button>' +
        "<hr/>";

      div.querySelector(".delete-btn").addEventListener("click", function () {
        deleteProduct(p._id);
      });

      container.appendChild(div);
    });
  } catch (e) {
    container.innerHTML = "Error: " + e.message;
  }
}

async function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;

  const res = await fetch(API + "/api/products/" + id, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) {
    const errText = await res.text();
    alert("Delete failed: " + res.status + " " + errText);
    return;
  }

  loadMyProducts();
}

// Buttons (optional, but nice)
document.addEventListener("DOMContentLoaded", function () {
  const saveBtn = document.getElementById("save-btn");
  const backBtn = document.getElementById("back-btn");
  const logoutBtn = document.getElementById("logout-btn");

  if (backBtn) backBtn.addEventListener("click", function () {
    window.location.href = "/main.html";
  });

  if (logoutBtn) logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "/index.html";
  });

  // load products
  loadMyProducts();
});