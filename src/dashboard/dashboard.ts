
import  {fetchDashboardData} from "./dashboardApi";
import {renderDashboard} from  "./dashboardUi";


//track active selection scops in the browser memory runtime
let activeRatingFilter = "";
let activeSourceFilter = "";
let currentPageTracker = 1;// track active cursor pagination
const containerId = "dashboard-root";

// Hold active server response in memory to make local export generation instant
let currentCachedData: any = null;


async function updateDashboardView() {
    //fetch data stream matching the live filter configuration state
    const data = await fetchDashboardData(activeRatingFilter, activeSourceFilter, currentPageTracker);
    if(data){
        currentCachedData = data;
        //render out the elements to the viewport screen container
        renderDashboard(containerId, data, activeRatingFilter, activeSourceFilter);
        //rebind structural observer element hooks dynamically after DOM re-generation
        bindFilterListeners();
        bindActionListeners();
        bindPaginationListeners();
    }
}

function bindFilterListeners() {
    const ratingSelect = document.getElementById("filter-rating") as HTMLSelectElement;
    const sourceSelect = document.getElementById("filter-source") as HTMLSelectElement;

    if (ratingSelect){
        ratingSelect.onchange = () => {
            activeRatingFilter = ratingSelect.value;
            updateDashboardView();// re-trigger live fetch sync stream
        };
    }
    if(sourceSelect){
        sourceSelect.onchange = () => {
            activeSourceFilter = sourceSelect.value;
            updateDashboardView(); //re-trigger live fetch sync stream
        };
    }
}

//binds transactional events for logging out and exporting data
function bindActionListeners() {
    const logoutBtn = document.getElementById("dashboard-logout-btn");
    const exportBtn = document.getElementById("export-csv-btn");

    //logout handler: clear identity variables and push back to security gate
    if(logoutBtn){
        logoutBtn.onclick = () => {
            localStorage.removeItem("dashboard_jwt_token");
            window.location.href = "/auth.html";
        };
    }
    // CSV parser engine: builds standard row cells and kicks off download thread
    if(exportBtn){
        exportBtn.onclick = () => {
            if(!currentCachedData || currentCachedData.reviews.length === 0){
                alert("There is no review data available in this feed scope to export.");
                return;
            }
            // Define standard structural CSV spreadsheet columns
            const headers = ["Feedback ID", "Submission Date", "Channel Source", "Star Rating", "Review Message"];
            const csvRows = [
                headers.join(","), //header row
                ...currentCachedData.reviews.map((review: any) => {
                    // Escape standard internal string characters to prevent column breaking errors
                    const escapedText = `"${review.text.replace(/"/g, '""')}"`;
                    const formattedDate = new Date(review.createdAt).toLocaleDateString();

                    return [
                        review._id,
                        formattedDate,
                        review.source,
                        review.rating || "N/A",
                        escapedText
                    ].join(",");
                })
            ];
            //bundle stringdata into an active binary layout blob array
            const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
            const encodeUri: string = encodeURI(csvContent);

            //forge a temporary un-appended link elemnent to force browser file capture
            const tempLink = document.createElement("a");
            tempLink.setAttribute("href", encodeUri);
            tempLink.setAttribute("download", `feedback_analytics_export_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(tempLink);

            tempLink.click();//automate execution click tracking thread
            document.body.removeChild(tempLink); //clean up trace garbage
        };
    }

}


function bindPaginationListeners() {
    const prevBtn = document.getElementById("prev-page-btn");
    const nextBtn = document.getElementById("next-page-btn");

    if(prevBtn){
        prevBtn.onclick = () => {
            if(currentPageTracker > 1){
                currentPageTracker--;
                updateDashboardView();
            }
        };
    }
    if(nextBtn && currentCachedData?.pagination.hasNextPage) {
        nextBtn.onclick = () => {
            currentPageTracker++;
            updateDashboardView();
        };
    }
}

//initial boot execution sequence loop
if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", updateDashboardView);
} else {
    updateDashboardView();
}


//async function initDashboard() {
//    const containerId = "dashboard-root";
//    const container = document.getElementById(containerId);

//    if(container) {
//        container.innerHTML = `<div style="font-family: sans-serif; padding: 40px; color: #666;">Loading analytics streams...</div>`;

        //request data stream using your fetch controller
//        const data = await fetchDashboardData();
        //== pass it off to the usual lauout layer if data is retrived cleanly
//        if(data) {
//            renderDashboard(containerId, data);
//        }
//    }
    //kick off initialization as soon as the DOM finishes building
//    if(document.readyState === "loading") {
//        document.addEventListener("DOMContentLoaded", initDashboard);
//    } else {
//        initDashboard();
//    }
//}