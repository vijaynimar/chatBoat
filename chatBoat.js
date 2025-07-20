import "dotenv/config";
import axios from "axios";

const ACCESS_TOKEN = "EAAXDm2Rivn0BPLt1cqjoff0ZABaKz2pbm35C903YaZAeBPhBXfaXcl6pShG1ZA2flETGVHlAQKwZCvsYERtgi6rh0JZAQ7yAr5ZBKrZASlC8rnp1TuiaDPqnI63alHFYoiIwN3J3ptlBZAHFPwuA75ZACBbPs4gmicbvhVvYvXX8yuvn2Mxlvasugjve8gEhpcJAt69tWH4kZBmE6ya92ZBKzxXnwB8Gc53kLz1L7ZBOrH3u7xXRKgZDZD";
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
      body: `This response is already tracked`
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
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "2",
          parameters: [{ type: "payload", payload: "nutrition_e" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "3",
          parameters: [{ type: "payload", payload: "nutrition_f" }]
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

export const emotionalTemplate=async(recipientPhone)=>{
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`
  
    const data = {
    messaging_product: "whatsapp",
    to: recipientPhone,
    type: "template",
    template: {
      name: "emotional", // 👈 Template name registered on WhatsApp Manager
      language: { code: "en_US" },
      components: [
        {
          type: "button",
          sub_type: "quick_reply",
          index: "0",
          parameters: [{ type: "payload", payload: "emotional_a" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "1",
          parameters: [{ type: "payload", payload: "emotional_b" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "2",
          parameters: [{ type: "payload", payload: "emotional_c" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "3",
          parameters: [{ type: "payload", payload: "emotional_d" }]
        }
      ]
    }
    }
    try{
       const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    });
    console.log("✅ Sent exercise type selection:", res.data);
    }catch(err){
      console.log("error in emotional template",err);
    }
}

export const socialTemplate=async(recipientPhone)=>{
  console.log("line ");
  const url=`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`
  const data = {
    messaging_product: "whatsapp",
    to: recipientPhone,
    type: "template",
    template: {
      name: "social", // 👈 Template name registered on WhatsApp Manager
      language: { code: "en_US" },
      components: [
        {
          type: "button",
          sub_type: "quick_reply",
          index: "0",
          parameters: [{ type: "payload", payload: "social_a" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "1",
          parameters: [{ type: "payload", payload: "social_b" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "2",
          parameters: [{ type: "payload", payload: "social_c" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "3",
          parameters: [{ type: "payload", payload: "social_d" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "4",
          parameters: [{ type: "payload", payload: "social_e" }]
        }
      ]
    }
    }
    try{
       const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    });
    console.log("✅ Sent exercise type selection:", res.data);
    }catch(err){
      console.log("error in emotional template",err);
    }
}


export const timeSlot=async(recipientPhone)=>{
  console.log("line ");
  const url=`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`
  const data = {
    messaging_product: "whatsapp",
    to: recipientPhone,
    type: "template",
    template: {
      name: "timeslot", // 👈 Template name registered on WhatsApp Manager
      language: { code: "en" },
      components: [
        {
          type: "button",
          sub_type: "quick_reply",
          index: "0",
          parameters: [{ type: "payload", payload: "timeslot_a" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "1",
          parameters: [{ type: "payload", payload: "timeslot_b" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "2",
          parameters: [{ type: "payload", payload: "timeslot_c" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "3",
          parameters: [{ type: "payload", payload: "timeslot_d" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "4",
          parameters: [{ type: "payload", payload: "timeslot_e" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "5",
          parameters: [{ type: "payload", payload: "timeslot_f" }]
        }
      ]
    }
    }
    try{
       const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    });
    console.log("✅ Sent exercise type selection:", res.data);
    }catch(err){
      console.log("error in emotional template",err);
    }
}
