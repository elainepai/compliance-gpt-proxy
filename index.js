const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/proxy-send', async (req, res) => {
  const recipientIds = req.body['recipient.ids'];
  const messageText = req.body['message.text'];

  if (!recipientIds || !messageText) {
    return res.status(400).json({ error: 'Missing recipient.ids or message.text' });
  }

  try {
    const response = await axios.post(
      'https://graph.facebook.com/v22.0/me/messages',
      {
        recipient: {
          ids: Array.isArray(recipientIds) ? recipientIds : [recipientIds]
        },
        message: {
          text: messageText
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.FB_ACCESS_TOKEN}`
        }
      }
    );

    res.json({ success: true, fb_response: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Facebook API failed', detail: err.response?.data });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
