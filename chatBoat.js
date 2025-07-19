import "dotenv/config";
import axios from "axios";

const ACCESS_TOKEN = 'EAAXDm2Rivn0BPMldH8iz6sAMxIKVeyquVFZB7yOdYcxKEMoPChwZBTRD8aNfc9AzsgG32QieGCE1cZBOylbp2Nir0BIr9w5U3ncSvMSd7xwYzqMM0YoZBvtlVZBPM2HE0WnNMnGD9s1wNPkY6LlwzZCudEx9ozWwHHxOIeATYEAbi4iAfU6KOaYiVKXzyo0pvCHHw8dvoL6D3jeamm9lBw7cw1ZCcv1hZAeZAvl9yx6sgOhJnPucZD';
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
      name: "activity", // 👈 your 2nd template name
      language: { code: "en_US" }
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