

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

    /* Add this inside the dashboardStyles template string in dashboardUi.ts */
  .chart-card {
    background: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 32px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  }

  .chart-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #111111;
  }

  .chart-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .chart-label {
    width: 60px;
    font-size: 13px;
    color: #444444;
    font-weight: 500;
    text-align: right;
  }

  .chart-bar-container {
    flex-grow: 1;
    background: #f4f4f4;
    height: 16px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }

  .chart-bar-fill {
    background: linear-gradient(90deg, #0070f3, #00dfd8);
    height: 100%;
    border-radius: 8px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    width: 0%; /* Dynamic fill hook */
  }

  .chart-count {
    width: 35px;
    font-size: 13px;
    color: #666666;
    font-weight: 600;
  }
  
    /* Add these inside the dashboardStyles template string in dashboardUi.ts */
  .btn-logout {
    background-color: transparent;
    color: #ff3333;
    border: 1px solid #ff3333;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-logout:hover {
    background-color: #fff5f5;
  }

  .btn-export {
    background-color: #2f855a;
    color: #ffffff;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    margin-left: auto; /* Pushes the export button to the far right of the control bar */
    transition: background-color 0.2s ease;
  }

  .btn-export:hover {
    background-color: #22643c;
  }


    /* Add these inside the dashboardStyles string block in dashboardUi.ts */
  .badge-cat {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    color: #ffffff;
    margin-right: 6px;
  }
  .badge-cat.bug { background-color: #ff3333; }      /* High priority red */
  .badge-cat.request { background-color: #0070f3; }  /* Request feature blue */
  .badge-cat.praise { background-color: #2f855a; }   /* Delight green */
  .badge-cat.general { background-color: #666666; }  /* Charcoal neutral */

  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 32px;
    padding: 20px 0;
  }

    /* Add these inside the dashboardStyles template string in dashboardUi.ts */
  .analytics-insights-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }

  .location-leaderboard-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }

  .location-leaderboard-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    background: #fafafa;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    font-size: 14px;
  }

  .location-name {
    font-weight: 500;
    color: #333333;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .location-count-badge {
    background: #0070f3;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 2px 8px;
    border-radius: 20px;
  }
`;

export function injectDashboardStyles(): void {
  if (document.getElementById("dashboard-styles")) return;
  const styleTag = document.createElement("style");
  styleTag.id = "dashboard-styles";
  styleTag.textContent = dashboardStyles;
  document.head.appendChild(styleTag);
}
