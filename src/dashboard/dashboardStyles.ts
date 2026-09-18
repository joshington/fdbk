

// src/dashboard/dashboardStyles.ts

export const dashboardStyles = `
  .dashboard-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #111111;
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 20px;
  }

  /* Stat Card Grid System */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }

  .metric-card {
    background: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  }

  .metric-title {
    font-size: 14px;
    color: #666666;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .metric-value {
    font-size: 32px;
    font-weight: 700;
    color: #0070f3;
  }

  /* Feedback Feed Stream List */
  .feed-section-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .feedback-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .feedback-item {
    background: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.01);
  }

  .feedback-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #666666;
  }

  .feedback-text {
    font-size: 15px;
    line-height: 1.5;
    color: #333333;
  }

  .badge-source {
    background: #eaeaea;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .rating-stars {
    color: #ffca28;
    font-size: 16px;
  }

    /* Add this inside the dashboardStyles string block */
  .control-bar {
    display: flex;
    gap: 16px;
    align-items: center;
    background: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .filter-label {
    font-size: 12px;
    font-weight: 600;
    color: #666666;
    text-transform: uppercase;
  }

  .filter-select {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    background: #ffffff;
    cursor: pointer;
  }

    /* Add this inside the dashboardStyles template string in dashboardUi.ts */
  .api-key-card {
    background: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  }

  .api-key-info h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
    color: #111111;
  }

  .api-key-info p {
    margin: 0;
    font-size: 13px;
    color: #666666;
  }

  .api-key-display {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .api-key-badge {
    background: #f4f4f4;
    padding: 8px 12px;
    border-radius: 6px;
    font-family: monospace;
    font-size: 14px;
    color: #333333;
    border: 1px solid #ccc;
  }


`;

export function injectDashboardStyles(): void {
  if (document.getElementById("dashboard-styles")) return;
  const styleTag = document.createElement("style");
  styleTag.id = "dashboard-styles";
  styleTag.textContent = dashboardStyles;
  document.head.appendChild(styleTag);
}
