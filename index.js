const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cron = require("node-cron");

const app = express();
app.use(bodyParser.json());

const ACCESS_TOKEN = 'EAAXDm2Rivn0BPMigYZBxSpRMqWhxr77o2oeho2mPRhNBzQe3SsXumMV6zGeRdGglx8MK3H5MkGifKusrlLjZCQsDi9ZANR7f3Wzz8icX6JRd0Sh7LOSBqdtqJzKp245ZAjWIvWyfufIssiNf0DuFKj4ydWo7w16hVLrHRrr2elAZCrgeZBaxRM9py6vqDXGEAtrtBi62GsP09lDBubhgYvnu0Iji9QP7EVv2iHLZBn3oqTrDrnA';
const PHONE_NUMBER_ID = '639665239240564';
const RECIPIENT_PHONE = '919050328512';

// ✅ Send Template Message
const sendTemplateMessage = async () => {
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: "whatsapp",
    to: RECIPIENT_PHONE,
    type: "template",
    template: {
      name: "event",
      language: {
        code: "en_US"
      },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: "Mr. Vijay" },
            { type: "text", text: "19 July" },
            { type: "text", text: "Neuday AI" },
            { type: "text", text: "10:00 AM" },
            { type: "text", text: "Online Mode" }
          ]
        }
      ]
    }
  };

  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    });
    console.log("✅ Template sent:", res.data);
  } catch (err) {
    console.error("❌ Error sending template:", err.response?.data || err.message);
  }
};

// ⏲️ Trigger every 1 minute
cron.schedule("*/1 * * * *", () => {
  console.log("⏰ Sending template message...");
  sendTemplateMessage();
});
// 🌐 Webhook to receive user replies
app.post("/webhook", (req, res) => {
  const data = req.body;
console.log("🔔 Webhook received:", JSON.stringify(data, null, 2));
  if (
    data.object === 'whatsapp_business_account' &&
    data.entry &&
    data.entry[0].changes &&
    data.entry[0].changes[0].value.messages
  ) {
    const message = data.entry[0].changes[0].value.messages[0];
    const from = message.from;

    if (message.type === "button") {
      const selectedId = message.button.payload;
      const selectedText = message.button.text;
      console.log(`✅ User ${from} selected: ${selectedText} (payload: ${selectedId})`);
    } else if (message.type === "text") {
      const text = message.text.body;
      console.log(`✅ User ${from} sent message: ${text}`);
    } else {
      console.log(`ℹ️ Received message type: ${message.type}`);
    }
  } else {
    console.log("❌ No message found in webhook.");
  }

  res.sendStatus(200);
});

// ✅ Webhook verification
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "my_secret_token_987";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("🔐 Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
