

const BASE_URL = "http://localhost:5000/api/analytics"
//interface representing structure of our analytics API response payload

export interface AnalyticsData {
    metrics: {
        totalSubmissions: number;
        averageRating: number;
    };
    reviews: Array<{
        _id: string;
        text: string;
        rating?: number;
        source: string;
        createdAt: string;
    }>;
}

//ferches business metrics and review feed from the secured backend router
//automatically injects the JWT token from browserr localStorage
export async function fetchDashboardData(rating?: string, source?: string, page = 1): Promise<any> {
    try {
        //1 -grab the session token saved during a successful login flow
        const token = localStorage.getItem("dashboard_jwt_token");
        if(!token) {
            console.warn("Dashboard Fetch Redirect: No active session token found");
            //if no token exists, we handle the routing redirect to the login screen
            window.location.href = "/auth.html";
            return null; 
        }

        //construct the URL dynamically with search queries
        const url = new URL(`${BASE_URL}/feed`);
        if (rating) url.searchParams.append("rating", rating);
        if (source) url.searchParams.append("source", source);
        url.searchParams.append("page", page.toString());
        //2 - fire the secure GET request with the bearer schema header
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "applicatin/json",
                "Authorization": `Bearer ${token}` //injecting the secure JWT
            }
        });

        //3 -  if the token is invalid or expired, clear it out and boot them to login
        if(response.status === 401) {
            console.error("Session expired or token invalid.");
            localStorage.removeItem("dashboard_jwt_token");
            window.location.href = "/auth.html";
            return null;
        }

        if(!response.ok) {
            throw new Error(`Server returned error status: ${response.status}`);
        }
        //return the fully populated AnalyticsData block
        return await response.json();
    } catch (error) {
        console.error("Dashboard data sync failed:", error);
        //alert("Could not load metrics. Please ensure your backend server is running.");
        return null;
    }
}