
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

    // Fallback protection if distribution keys are uninitialized
  const dist = data.distribution || { _5: 0, _4: 0, _3: 0, _2: 0, _1: 0 };
  const maxCount = Math.max(dist._5, dist._4, dist._3, dist._2, dist._1, 1); // Avoid division by zero

  // Calculate percentages safely for CSS filling rules
  const pct5 = ((dist._5 / maxCount) * 100).toFixed(0);
  const pct4 = ((dist._4 / maxCount) * 100).toFixed(0);
  const pct3 = ((dist._3 / maxCount) * 100).toFixed(0);
  const pct2 = ((dist._2 / maxCount) * 100).toFixed(0);
  const pct1 = ((dist._1 / maxCount) * 100).toFixed(0);

  // Fallback protection for top traffic locations array
  const topLocs = data.topLocations || [];

  // Build structure safely via standard literal templates
  rootElement.innerHTML = `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div>
          <h2 style="margin: 0 0 4px 0;">Analytics Dashboard</h2>
          <span style="color: #666; font-size: 14px;">Live Stream Pipeline</span>
        </div>
        <button id="dashboard-logout-btn" class="btn-logout">Log Out</button>

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

      <div class="analytics-insights-row">
        
        <!-- Rating Distribution Trend Bar Chart Component -->
        <div class="chart-card" style="margin-bottom: 0;">
          <div class="chart-title">Rating Distribution Breakdown</div>
          <div class="chart-row"><div class="chart-label">5 Star</div><div class="chart-bar-container"><div class="chart-bar-fill" style="width: ${pct5}%;"></div></div><div class="chart-count">${dist._5}</div></div>
          <div class="chart-row"><div class="chart-label">4 Star</div><div class="chart-bar-container"><div class="chart-bar-fill" style="width: ${pct4}%;"></div></div><div class="chart-count">${dist._4}</div></div>
          <div class="chart-row"><div class="chart-label">3 Star</div><div class="chart-bar-container"><div class="chart-bar-fill" style="width: ${pct3}%;"></div></div><div class="chart-count">${dist._3}</div></div>
          <div class="chart-row"><div class="chart-label">2 Star</div><div class="chart-bar-container"><div class="chart-bar-fill" style="width: ${pct2}%;"></div></div><div class="chart-count">${dist._2}</div></div>
          <div class="chart-row"><div class="chart-label">1 Star</div><div class="chart-bar-container"><div class="chart-bar-fill" style="width: ${pct1}%;"></div></div><div class="chart-count">${dist._1}</div></div>
        </div>

        <div class="chart-card" style="margin-bottom: 0;">
          <div class="chart-title">Top Traffic Locations</div>
          <div class="location-leaderboard-list">
            ${topLocs.length === 0 ? `
              <div style="text-align: center; color: #999; padding: 30px; font-size: 14px;">No geographic traffic captured yet.</div>
            ` : topLocs.map((loc: any) => `
              <div class="location-leaderboard-item">
                <div class="location-name">📍 \${loc.name}</div>
                <div class="location-count-badge">\${loc.count} entries</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- 📊 NEW: Native CSS Rating Distribution Trend Bar Chart Component -->
      <div class="chart-card">
        <div class="chart-title">Rating Distribution Breakdown</div>
        
        <div class="chart-row">
          <div class="chart-label">5 Star</div>
          <div class="chart-bar-container">
            <div class="chart-bar-fill" style="width: ${pct5}%;"></div>
          </div>
          <div class="chart-count">${dist._5}</div>
        </div>

        <div class="chart-row">
          <div class="chart-label">4 Star</div>
          <div class="chart-bar-container">
            <div class="chart-bar-fill" style="width: ${pct4}%;"></div>
          </div>
          <div class="chart-count">${dist._4}</div>
        </div>

        <div class="chart-row">
          <div class="chart-label">3 Star</div>
          <div class="chart-bar-container">
            <div class="chart-bar-fill" style="width: ${pct3}%;"></div>
          </div>
          <div class="chart-count">${dist._3}</div>
        </div>

        <div class="chart-row">
          <div class="chart-label">2 Star</div>
          <div class="chart-bar-container">
            <div class="chart-bar-fill" style="width: ${pct2}%;"></div>
          </div>
          <div class="chart-count">${dist._2}</div>
        </div>

        <div class="chart-row">
          <div class="chart-label">1 Star</div>
          <div class="chart-bar-container">
            <div class="chart-bar-fill" style="width: ${pct1}%;"></div>
          </div>
          <div class="chart-count">${dist._1}</div>
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
        <button id="export-csv-btn" class="btn-export">Export to CSV</button>

      </div>

      <!-- Feed Stream Submissions -->
      <h3 class="feed-section-title">Recent Submissions (\${data.pagination.totalItems})</h3>

      <div class="feedback-list">
        ${data.reviews.length === 0 ? `
          <div style="text-align: center; color: #999; padding: 40px; background: white; border: 1px solid #eaeaea; border-radius: 12px;">
            No feedback entries match your chosen criteria.
          </div>
        ` : data.reviews.map((review: any) => `
          <div class="feedback-item">
            <div class="feedback-meta">
              <div>
                <!-- 🌟 VALUE ADD: Render the automated priority categorization badge -->
                <span class="badge-cat ${review.category}">${review.category === 'request' ? '💡 Request' : review.category === 'bug' ? '🚨 Urgent Bug' : review.category === 'praise' ? '🎉 Praise' : '💬 General'}</span>
                <span class="rating-stars">${review.rating ? "★".repeat(review.rating) + "☆".repeat(5 - review.rating) : "No Rating"}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <!-- 🌟 VALUE ADD DISPLAY: Render client pin location data -->
                <span style="color: #666; font-size: 12px; font-weight: 500; background: #f4f4f4; padding: 2px 6px; border-radius: 4px;">📍 ${review.location || "Unknown"}</span>
                <span class="badge-source">${review.source}</span>
                <span>${new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
             
            </div>
            <div class="feedback-text">"${review.text}"</div>
          </div>
        `).join("")}
      </div>
      <div class="pagination-container">
        <button id="prev-page-btn" class="filter-select" ${data.pagination.currentPage === 1 ? "disabled style='opacity: 0.5; cursor: not-allowed;'" : ""}>← Previous</button>
        <span style="font-size: 14px; font-weight: 500; color: #444;">Page ${data.pagination.currentPage} of ${data.pagination.totalPages || 1}</span>
        <button id="next-page-btn" class="filter-select" ${!data.pagination.hasNextPage ? "disabled style='opacity: 0.5; cursor: not-allowed;'" : ""}>Next →</button>
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
