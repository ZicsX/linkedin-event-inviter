document.getElementById("inviteButton").addEventListener("click", () => {
    const eventUrl = document.getElementById("eventUrlInput").value;

    // Validate URL
    if (!eventUrl || !isValidUrl(eventUrl)) {
        alert("Please enter a valid LinkedIn event URL.");
        return;
    }

    // Send a message to the background script to extract cookies and send the request
    chrome.runtime.sendMessage({ action: "extractCookiesAndSend", eventUrl });
});

function isValidUrl(string) {
    try {
        new URL(string);
    } catch (_) {
        return false;  
    }
    return true;
}
