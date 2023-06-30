LinkedIn Event Inviter
======================

This project automates the process of inviting LinkedIn connections to an event. It is split into two phases: a Chrome extension for capturing session cookies, and a server that uses Puppeteer to automate browser actions.

Project Structure
-----------------

* **linkedin-event-inviter-extension**: Contains the Chrome extension code.
  * **popup.html**: The HTML for the popup interface of the extension.
  * **popup.js**: The JavaScript that powers the popup's functionality.
  * **background.js**: The JavaScript that runs in the background.
  * **manifest.json**: Defines settings and permissions for the Chrome extension.
* **linkedin-event-inviter-server**: Contains the server code.
  * **index.js**: The main server file.
  * **package.json**: Lists the dependencies and scripts for the server.

Setup
-----

1. Clone the repository ```git clone https://github.com/ZicsX/linkedin-event-inviter.git```.
2. Navigate to the `linkedin-event-inviter-server` directory and run `npm install` to install the server dependencies.
3. Start the server by running `node server.js` in the `linkedin-event-inviter-server` directory.
4. Open a web browser and go to the extensions page, such as `chrome://extensions/` or `edge://extensions`. Enable Developer mode, then load the directory of the `linkedin-event-inviter-extension` as an unpacked extension.
5. Go to the LinkedIn event page and click the extension icon in your web browser. Then, click on 'Invite Connections'

Node.js Dependencies
--------------------

The server part of this project relies on several Node.js dependencies for its functionality.

* **express**: A web application framework for Node.js, used to create the server.
* **puppeteer**: A Node library that provides a high-level API to control headless browsers or browsers over the DevTools Protocol, used for automating web actions.
* **puppeteer-extra**: A wrapper for puppeteer to enable additional plugins and functionality.
* **puppeteer-extra-plugin-stealth**: A plugin for puppeteer-extra to evade certain bot detection mechanisms.
* **cors**: A Node.js package for providing a Connect/Express middleware that can be used to enable Cross-Origin Resource Sharing (CORS) with various options.
