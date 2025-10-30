// auth.js
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const res = await fetch("https://finddoctor-backend.onrender.com/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    
    if (res.ok) {
      localStorage.setItem("token", data.token); // store JWT
      alert("Login successful!");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error(err);
  }
});
