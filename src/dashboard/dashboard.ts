
import {fetchDashboardData} from "./dashboardApi";
import {renderDashboard} from "./dashboardUi";

async function initDashboard() {
    const containerId = "dashboard-root";
    const container = document.getElementById(containerId);

    if(container) {
        container.innerHTML = `<div style="font-family: sans-serif; padding: 40px; color: #666;">Loading analytics streams...</div>`;

        //request data stream using your fetch controller
        const data = await fetchDashboardData();
        //== pass it off to the usual lauout layer if data is retrived cleanly
        if(data) {
            renderDashboard(containerId, data);
        }
    }
    //kick off initialization as soon as the DOM finishes building
    if(document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initDashboard);
    } else {
        initDashboard();
    }
}