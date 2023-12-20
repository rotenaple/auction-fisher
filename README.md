# Auction Fisher

A utility to notify you via discord webhook if any of the cards you have active bids or asks on are involved in an auction. Not intended to be easy to set up.

![Webhook sample](https://github.com/Kractero/auction-observer/assets/115837402/5186fcc7-b0de-4f5c-afe3-e7c94195479d)

## Setup

1. Download the [Node.js](https://nodejs.org/en/download/current) matching your operating system.
2. When finished, [download the zip](https://codeload.github.com/Kractero/auction-observer/zip/refs/heads/main) and extract the file.
3. Enter the directory and run npm install.
4. Create a server and enter the settings.

![Settings](img/Settings.png)

5. Go to integrations and create a new webhook.

![Integrations](img/Integrations.png)

6. Copy the webhook url.
   
![Webhook](img/Webhook.png)

7. At line 5 of main.js, put in the webhook url, main nation (which will also act as the user agent) as well as the @ you want to be notified (here, your username, etc).
8. Schedule it with windows task scheduler or crontab or something to run like every 50 minutes.
