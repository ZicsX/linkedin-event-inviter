document.getElementById("inviteButton").addEventListener("click", () => {
    let eventUrl = document.getElementById("eventUrlInput").value;

    // Validate and sanitize URL
    eventUrl = sanitizeAndValidateUrl(eventUrl);
    if (!eventUrl) {
        alert("Please enter a valid LinkedIn event URL.");
        return;
    }

    // Send a message to the background script to extract cookies and send the request
    chrome.runtime.sendMessage({ action: "extractCookiesAndSend", eventUrl });
});

function sanitizeAndValidateUrl(string) {
    try {
        const url = new URL(string);

        // Check if the host is linkedin.com
        if (url.hostname !== 'www.linkedin.com') {
            return false;
        }

        // Check if the path starts with /events/
        if (!url.pathname.startsWith('/events/')) {
            return false;
        }

        // Truncate to base event URL
        const parts = url.pathname.split('/');
        if (parts.length > 3) {
            url.pathname = `/${parts[1]}/${parts[2]}`;
        }

        return url.toString();

    } catch (_) {
        return false;
    }
}
