document.addEventListener("DOMContentLoaded", function () {
    // Check current tab URL for event page
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Validate and sanitize URL
        var sanitizedUrl = sanitizeAndValidateUrl(tabs[0].url);
        if (sanitizedUrl) {
            // document.getElementById("url").textContent = sanitizedUrl;
            const inviteButton = document.getElementById("inviteButton");
            inviteButton.disabled = false;
            inviteButton.addEventListener("click", () => {
                chrome.runtime.sendMessage({ action: "extractCookiesAndSend", eventUrl: sanitizedUrl });
            });
        }        
    });
});

function sanitizeAndValidateUrl(string) {
    try {
        const url = new URL(string);

        // Check if the host is linkedin.com
        if (url.hostname !== 'www.linkedin.com') {
            return false;
        }

        // Check if the path starts with /events/
        const parts = url.pathname.split('/');
        if (!url.pathname.startsWith('/events/') || parts.length < 3 || !parts[2]) {
            return false;
        }

        // Truncate to base event URL
        url.pathname = `/${parts[1]}/${parts[2]}`;

        return url.toString();

    } catch (_) {
        return false;
    }
}
