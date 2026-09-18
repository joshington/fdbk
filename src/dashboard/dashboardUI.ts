
// src/dashboard/dashboardUi.ts
import { injectDashboardStyles } from "./dashboardStyles";

interface FeedbackItem {
  _id: string;
  text: string;
  rating?: number;
  source: string;
  createdAt: string;
}

interface DashboardData {
  metrics: {
    totalSubmissions: number;
    averageRating: number;
  };
  reviews: FeedbackItem[];
}

export function renderDashboard(rootId: string, data: any, currentRating="", currentSource = ""): void {
  injectDashboardStyles();
  const rootElement = document.getElementById(rootId);
  if (!rootElement) return;

  // Build structure safely via standard literal templates
  rootElement.innerHTML = `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h2>Analytics Dashboard</h2>
        <span style="color: #666;">Live Stream Pipeline</span>
      </div>

      <div class="api-key-card">
        <div class="api-key-info">
          <h4>Your Live Integration Widget Key</h4>
          <p>Copy this key and paste it into the <code>data-api-key</code> attribute of your website's embed script tag.</p>
        </div>
        <div class="api-key-display">
          <div class="api-key-badge">${data.apiKey || "No key generated"}</div>
          <button id="copy-api-key-btn" class="filter-select" style="font-weight: 600; background: #0070f3; color: white; border: none;">Copy Key</button>
        </div>
      </div>

      <!-- Metrics Cards Grid Layout -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-title">Total Feedback Items</div>
          <div class="metric-value">${data.metrics.totalSubmissions}</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Average Rating</div>
          <div class="metric-value">${data.metrics.averageRating || "N/A"} ★</div>
        </div>
      </div>

      <!--NEW: Interactive Filter Control Bar Component -->
      <div class="control-bar">
        <div class="filter-group">
          <label class="filter-label">Rating</label>
          <select id="filter-rating" class="filter-select">
            <option value="" ${currentRating === "" ? "selected" : ""}>All Stars</option>
            <option value="5" ${currentRating === "5" ? "selected" : ""}>5 Stars ★★★★★</option>
            <option value="4" ${currentRating === "4" ? "selected" : ""}>4 Stars ★★★★</option>
            <option value="3" ${currentRating === "3" ? "selected" : ""}>3 Stars ★★★</option>
            <option value="2" ${currentRating === "2" ? "selected" : ""}>2 Stars ★★</option>
            <option value="1" ${currentRating === "1" ? "selected" : ""}>1 Star ★</option>
          </select>
        </div>

        <div class="filter-group">
          <label class="filter-label">Channel Source</label>
          <select id="filter-source" class="filter-select">
            <option value="" ${currentSource === "" ? "selected" : ""}>All Sources</option>
            <option value="website" ${currentSource === "website" ? "selected" : ""}>Website Widget</option>
            <option value="api" ${currentSource === "api" ? "selected" : ""}>Direct API</option>
            <option value="whatsapp" ${currentSource === "whatsapp" ? "selected" : ""}>WhatsApp</option>
            <option value="instagram" ${currentSource === "instagram" ? "selected" : ""}>Instagram</option>
          </select>
        </div>
      </div>

      <!-- Feed Stream Submissions -->
      <h3 class="feed-section-title">Recent Submissions (${data.reviews.length})</h3>
      <div class="feedback-list">
        ${data.reviews.length === 0 ? `
          <div style="text-align: center; color: #999; padding: 40px; background: white; border: 1px solid #eaeaea; border-radius: 12px;">
            No feedback entries match your chosen criteria.
          </div>
        ` : data.reviews.map((review: any) => `
          <div class="feedback-item">
            <div class="feedback-meta">
              <div>
                <span class="rating-stars">${review.rating ? "★".repeat(review.rating) + "☆".repeat(5 - review.rating) : "No Rating"}</span>
              </div>
              <div>
                <span class="badge-source">${review.source}</span>
                <span style="margin-left: 8px;">${new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div class="feedback-text">"${review.text}"</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  //bind copy clipboard button click behavior safely after template rendering
  const copyBtn = document.getElementById("copy-api-key-btn");
  if (copyBtn && data.apiKey) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(data.apiKey);
      copyBtn.innerText = "Copied!";
      copyBtn.style.backgroundColor = "#2f855a";
      setTimeout(() => {
        copyBtn.innerText = "Copy Key";
        copyBtn.style.backgroundColor = "#0070f3";
      }, 2000);
    };
  }
}
