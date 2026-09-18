
import {fetchDashboardData} from "./dashboardApi";
import {renderDashboard} from "./dashboardUi";

//track active selection scops in the browser memory runtime
let activeRatingFilter = "";
let activeSourceFilter = "";
const containerId = "dashboard-root";

async function updateDashboardView() {
    //fetch data stream matching the live filter configuration state
    const data = await fetchDashboardData(activeRatingFilter, activeSourceFilter);
    if(data){
        //render out the elements to the viewport screen container
        renderDashboard(containerId, data, activeRatingFilter, activeSourceFilter);
        //rebind structural observer element hooks dynamically after DOM re-generation
        bindFilterListeners();
    }
}

function bindFilterListeners() {
    const ratingSelect = document.getElementById("filter-rating") as HTMLSelectElement;
    const sourceSelect = document.getElementById("filter-source") as HTMLSelectElement;

    if (ratingSelect){
        ratingSelect.onChange = () => {
            activeRatingFilter = ratingSelect.value;
            updateDashboardView();// re-trigger live fetch sync stream
        };
    }
    if(sourceSelect){
        sourceSelect.onChange = () => {
            activeSourceFilter = sourceSelect.value;
            updateDashboardView(); //re-trigger live fetch sync stream
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