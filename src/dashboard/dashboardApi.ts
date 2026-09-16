

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
export async function fetchDashboardData(): Promise<AnalyticsData | null> {
    try {
        //1 -grab the session token saved during a successful login flow
        const token = localStorage.getItem("dashboard_jwt_token");
        if(!token) {
            console.warn("Dashboard Fetch Redirect: No active session token found");
            //if no token exists, we handle the routing redirect to the login screen
            window.location.href = "/login.html";
            return null;
        }
        //2 - fire the secure GET request with the bearer schema header
        const response = await fetch(`${BASE_URL}/feed`, {
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
            window.location.href = "/login.html";
            return null;
        }

        if(!response.ok) {
            throw new Error(`Server returned error status: ${response.status}`);
        }
        //return the fully populated AnalyticsData block
        return await response.json();
    } catch (error) {
        console.error("Dashboard controller failed to establish data synchronization:", error);
        alert("Could not load metrics. Please ensure your backend server is running.");
        return null;
    }
}