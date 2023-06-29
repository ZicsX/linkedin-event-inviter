chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractCookiesAndSend") {
        const eventUrl = message.eventUrl;

        // Extract LinkedIn cookies
        chrome.cookies.getAll({ domain: "linkedin.com" }, (cookies) => {

            // Log the cookies and eventUrl
            // console.log("LinkedIn Cookies:", cookies);
            // console.log("Event URL:", eventUrl);
            
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
            .then(response => response.text()) // Use .text() instead of .json()
            .then(responseText => {
                console.log('Server Response:', responseText);
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
