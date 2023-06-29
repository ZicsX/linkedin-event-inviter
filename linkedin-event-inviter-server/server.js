const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const inviteToEvent = require('./scripts/invite-to-event');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/invite', async (req, res) => {
    try {
        const { cookies, eventUrl } = req.body;
        await inviteToEvent(cookies, eventUrl);
        res.status(200).send('Invitations sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send invitations');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
