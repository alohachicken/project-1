const token = localStorage.getItem("token");
if (!token) window.location.href = "/";

async function createProduct() {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const file = document.getElementById("image").files[0];

  // For file upload, must use FormData (NOT JSON)
  const fd = new FormData();
  fd.append("title", title);
  fd.append("price", price);
  if (file) fd.append("image", file);

  const res = await fetch("/api/products", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd
  });

  const data = await res.json();
  document.getElementById("msg").innerText = res.ok ? "✅ Created!" : (data.error || "Error");
}

function goBack() {
  window.location.href = "/main.html";
}