
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

export function renderDashboard(rootId: string, data: DashboardData): void {
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

      <!-- Feed Stream Submissions -->
      <h3 class="feed-section-title">Recent Submissions</h3>
      <div class="feedback-list">
        ${data.reviews.map(review => `
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
}
