import "dotenv/config";
import axios from "axios";

const ACCESS_TOKEN = "EAAXDm2Rivn0BPG52L3U2Elru1i1hYF2igrvdt6SyiEKsFD7KF7ZBjHDYDkhZBCyv6CE1jfSu6q1cbF3rtZC9atRJvn6LDhHp08XmwZAGcbl293eje33AjULjNzqBc6aqsQVfW5rUGXKXdhbz2TtSYF9SdFvwUkujWFzvHN3h3uYZBvHZBTWAMZBrPBBYUZAPXuoYA00ZBhe6TksyblvztwttRjmR4kehgLK37T9yYZBm6gfrIZC9AZDZD";
const PHONE_NUMBER_ID = "639665239240564";

export const sendTemplateMessage = async (RECIPIENT_PHONE) => {
  console.log(RECIPIENT_PHONE);

  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

 const data = {
  messaging_product: "whatsapp",
  to: RECIPIENT_PHONE,
  type: "template",
  template: {
    name: "usercreate",
    language: { code: "en_US" },
    components: [
      {
        type: "button",
        sub_type: "quick_reply",
        index: "0",
        parameters: [
          { type: "payload", payload: "start" }
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

export const sendExerciseTypeTemplate = async (recipientPhone) => {
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: "whatsapp",
    to: recipientPhone,
    type: "template",
    template: {
      name: "activity", // 👈 Template name registered on WhatsApp Manager
      language: { code: "en_US" },
      components: [
        {
          type: "button",
          sub_type: "quick_reply",
          index: "0",
          parameters: [{ type: "payload", payload: "activity_a" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "1",
          parameters: [{ type: "payload", payload: "activity_b" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "2",
          parameters: [{ type: "payload", payload: "activity_c" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "3",
          parameters: [{ type: "payload", payload: "activity_d" }]
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
    console.log("✅ Sent exercise type selection:", res.data);
  } catch (err) {
    console.error("❌ Error sending template:", err.response?.data || err.message);
  }
};

export const sendTextMessage = async (recipientPhone, message) => {
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: "whatsapp",
    to: recipientPhone,
    type: "text",
    text: {
      body: `Your response is ${message} recieved`
    }
  };

  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    });
    console.log("✅ Sent text message:", res.data);
  } catch (err) {
    console.error("❌ Error sending text message:", err.response?.data || err.message);
  }
};

export const sendActivityTypeTemplate = async (recipientPhone) => {
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: "whatsapp",
    to: recipientPhone,
    type: "template",
    template: {
      name: "physical", // 👈 Template name registered on WhatsApp Manager
      language: { code: "en_US" },
      components: [
        {
          type: "button",
          sub_type: "quick_reply",
          index: "0",
          parameters: [{ type: "payload", payload: "physical_a" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "1",
          parameters: [{ type: "payload", payload: "physical_b" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "2",
          parameters: [{ type: "payload", payload: "physical_c" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "3",
          parameters: [{ type: "payload", payload: "physical_d" }]
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
    console.log("✅ Sent exercise type selection:", res.data);
  } catch (err) {
    console.error("❌ Error sending template:", err.response?.data || err.message);
  }
};




export const sendNutritionActivityTypeTemplate = async (recipientPhone) => {
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: "whatsapp",
    to: recipientPhone,
    type: "template",
    template: {
      name: "nutrition", // 👈 Template name registered on WhatsApp Manager
      language: { code: "en_US" },
      components: [
        {
          type: "button",
          sub_type: "quick_reply",
          index: "0",
          parameters: [{ type: "payload", payload: "nutrition_a" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "1",
          parameters: [{ type: "payload", payload: "nutrition_b" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "2",
          parameters: [{ type: "payload", payload: "nutrition_c" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "3",
          parameters: [{ type: "payload", payload: "nutrition_d" }]
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
    console.log("✅ Sent exercise type selection:", res.data);
  } catch (err) {
    console.error("❌ Error sending template:", err.response?.data || err.message);
  }
};
