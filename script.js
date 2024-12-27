// Lanyard API URL for the specific user
const apiUrl = "https://api.lanyard.rest/v1/users/1306472600536612884";

// Fetch data from the API and display it in the HTML
async function fetchProfile() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const { data } = await response.json();

        // Extract user data
        const user = data.discord_user;
        const status = data.discord_status;
        const activity = data.activities.find(a => a.type === 4)?.state || "No custom status";

        // Build the avatar URL
        const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

        // Insert data into the HTML
        const profileDiv = document.getElementById("profile");
        profileDiv.innerHTML = `
            <h2>${user.display_name || user.username}</h2>
            <img src="${avatarUrl}" alt="Avatar" width="100">
            <p>Status: ${status}</p>
            <p>Custom Status: ${activity}</p>
        `;
    } catch (error) {
        console.error("Error fetching profile:", error);
        document.getElementById("profile").innerHTML = `<p>Error loading profile.</p>`;
    }
}

// Call the function to fetch and display the profile
fetchProfile();
