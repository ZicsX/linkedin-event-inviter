chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractCookiesAndSend") {
        const eventUrl = message.eventUrl;

        // Extract LinkedIn cookies
        chrome.cookies.getAll({ domain: "linkedin.com" }, (cookies) => {
            // Send a POST request to the server with cookies and event URL
            fetch('http://localhost:3000/invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cookies: cookies,
                    eventUrl: eventUrl,
                }),
            })
            .then(response => response.text())
            .then(responseText => {
                // Invitaion Notification
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: '../assets/icon.png',
                    title: 'Invitations Sent!',
                    message: 'Invitations sent successfully.'
                });
            })
            .catch(error => {console.error('Error:', error);
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: '../assets/icon.png',
                    title: 'Failed to send invitations',
                    message: 'There was an error sending the invitations.'
                });
            });
        });
    }
});
