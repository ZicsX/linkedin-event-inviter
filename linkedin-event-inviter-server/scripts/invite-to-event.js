const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

module.exports = async function inviteToEvent(cookies, eventUrl) {
    const browser = await puppeteer.launch({ headless: false });

    try {
        const page = await browser.newPage();

        // Set cookies
        await page.setCookie(...cookies);

        // Navigate to the event page
        await page.goto(eventUrl, { waitUntil: 'networkidle2' });

        // Check if the Share button is present
        const shareButton = await page.$('button.artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom');
        
        // If Share button is not present
        if (!shareButton) {
            const attendButton = await page.$('button.artdeco-button.artdeco-button--2.artdeco-button--primary');
            if (attendButton) {
                await attendButton.click();
                // Wait for the page to reload
                await page.waitForNavigation({ waitUntil: 'networkidle2' });
            }
        }

        // Go to the invite people page
        const invitePeoplePageUrl = `${eventUrl}/comments/?invite=true`;
        await page.goto(invitePeoplePageUrl, { waitUntil: 'networkidle2' });

        // Select the first 10 checkboxes to invite people
        const checkboxes = await page.$$('input.ember-checkbox.ember-view');
        for (let i = 0; i < Math.min(checkboxes.length, 10); i++) {
            await checkboxes[i].click();
        }

        // Click the Invite button
        const inviteButton = await page.$('button.artdeco-button.artdeco-button--2.artdeco-button--primary:not(.artdeco-button--disabled)');
        if (inviteButton) {
            await inviteButton.click();
        }

        // Close the browser
        await browser.close();
    } catch (error) {
        console.error(error);
        await browser.close();
        throw error;
    }
};
