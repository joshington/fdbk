
// src/auth/auth.ts
import { injectAuthStyles } from "./authStyles";

const BASE_URL = "http://localhost:5000/api/auth";
let isLoginMode = true; // State tracker

function initAuth() {
  injectAuthStyles();
  renderForm();
}

function renderForm() {
  const root = document.getElementById("auth-root");
  if (!root) return;

  root.innerHTML = `
    <div class="auth-wrapper">
      <div class="auth-card">
        <h2 class="auth-title" id="auth-title">${isLoginMode ? "Welcome Back" : "Create Account"}</h2>
        <p class="auth-subtitle" id="auth-subtitle">
          ${isLoginMode ? "Log in to manage your customer feedback streams." : "Register your business to activate widgets."}
        </p>

        <form id="auth-form">
          <!-- Business Name Field (Only visible in Sign Up Mode) -->
          <div class="form-group" id="biz-name-group" style="display: ${isLoginMode ? "none" : "flex"}">
            <label class="form-label">Business Name</label>
            <input type="text" id="input-biz-name" class="form-input" placeholder="e.g. Cosmas Dev Shop" />
          </div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" id="input-email" class="form-input" placeholder="name@company.com" required />
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" id="input-password" class="form-input" placeholder="••••••••" required />
          </div>

          <div id="auth-message-box" class="auth-msg"></div>

          <button type="submit" id="submit-btn" class="auth-btn">
            ${isLoginMode ? "Sign In" : "Get Started"}
          </button>
        </form>

        <div class="auth-toggle-link">
          <p id="toggle-text">
            ${isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <span id="switch-mode-btn">${isLoginMode ? "Sign up" : "Log in"}</span>
          </p>
        </div>
      </div>
    </div>
  `;

  // Bind Event Listeners dynamically after inserting HTML
  document.getElementById("switch-mode-btn")!.onclick = toggleMode;
  document.getElementById("auth-form")!.onsubmit = handleFormSubmit;
}

function toggleMode() {
  isLoginMode = !isLoginMode;
  renderForm(); // Re-render fields smoothly
}

async function handleFormSubmit(e: Event) {
  e.preventDefault();
  
  const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
  const msgBox = document.getElementById("auth-message-box") as HTMLDivElement;
  
  const email = (document.getElementById("input-email") as HTMLInputElement).value.trim();
  const password = (document.getElementById("input-password") as HTMLInputElement).value;
  const businessName = (document.getElementById("input-biz-name") as HTMLInputElement).value.trim();

  msgBox.className = "auth-msg";
  msgBox.style.display = "none";
  submitBtn.disabled = true;
  submitBtn.innerText = "Processing...";

  try {
    const endpoint = isLoginMode ? "/login" : "/signup";
    const payload = isLoginMode ? { email, password } : { businessName, email, password };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Authentication transaction failed.");
    }

    if (isLoginMode) {
      // 🔑 LOGIN SUCCESS: Store the secure session token and route to dashboard
      localStorage.setItem("dashboard_jwt_token", data.token);
      msgBox.className = "auth-msg success";
      msgBox.innerText = "Success! Redirecting to dashboard...";
      setTimeout(() => {
        window.location.href = "/dashboard.html";
      }, 1500);
    } else {
      // 🎉 SIGNUP SUCCESS: Alert user to copy their key and flip over to login view
      msgBox.className = "auth-msg success";
      msgBox.innerText = "Registration complete! You can now log in.";
      setTimeout(() => {
        isLoginMode = true;
        renderForm();
      }, 2000);
    }

  } catch (error: any) {
    msgBox.className = "auth-msg error";
    msgBox.innerText = error.message || "Network layout timeout connection failure.";
    submitBtn.disabled = false;
    submitBtn.innerText = isLoginMode ? "Sign In" : "Get Started";
  }
}

// Instantiate view
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuth);
} else {
  initAuth();
}
