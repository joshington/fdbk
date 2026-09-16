
// src/auth/authStyles.ts

export const authStyles = `
  .auth-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #fafafa;
    padding: 20px;
    box-sizing: border-box;
  }

  .auth-card {
    background: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
  }

  .auth-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #111111;
  }

  .auth-subtitle {
    font-size: 14px;
    color: #666666;
    margin-bottom: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
  }

  .form-label {
    font-size: 13px;
    font-weight: 500;
    color: #444444;
  }

  .form-input {
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
    box-sizing: border-box;
    width: 100%;
  }

  .form-input:focus {
    outline: none;
    border-color: #0070f3;
  }

  .auth-btn {
    background-color: #0070f3;
    color: #ffffff;
    border: none;
    padding: 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    margin-top: 8px;
    transition: background-color 0.2s ease;
  }

  .auth-btn:hover {
    background-color: #0051cb;
  }

  .auth-btn:disabled {
    background-color: #accfff;
    cursor: not-allowed;
  }

  .auth-toggle-link {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #666666;
  }

  .auth-toggle-link span {
    color: #0070f3;
    cursor: pointer;
    font-weight: 500;
  }

  .auth-toggle-link span:hover {
    text-decoration: underline;
  }

  .auth-msg {
    font-size: 14px;
    text-align: center;
    margin-top: 12px;
    padding: 8px;
    border-radius: 6px;
    display: none;
  }

  .auth-msg.error {
    display: block;
    background: #fff5f5;
    color: #ff3333;
    border: 1px solid #ffebeb;
  }

  .auth-msg.success {
    display: block;
    background: #f0fff4;
    color: #2f855a;
    border: 1px solid #c6f6d5;
  }
`;

export function injectAuthStyles(): void {
  if (document.getElementById("auth-styles")) return;
  const styleTag = document.createElement("style");
  styleTag.id = "auth-styles";
  styleTag.textContent = authStyles;
  document.head.appendChild(styleTag);
}
