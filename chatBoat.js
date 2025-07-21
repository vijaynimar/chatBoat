import "dotenv/config";
import axios from "axios";

const ACCESS_TOKEN = "EAAXDm2Rivn0BPJK2No03GBUm8U3Egh3dcMaUZCnEbINadA5vFgYrDMcQG7XQXz6RZAhVEXBh7Fu6xcqTxwpFJzEzqUciW36d6r3AaZBrzLNYm7ZBGLGzN66VNZBMAYUf4yE9wKUOvdkZBXaU23LtZAI4knXsJhXIZCCMZAsuAUByQIei6Ph0K7zl0EBezxM9qyTPp8IYBE0oul27MTWbocb2rbZBlaAZAYjdK3PFMM6hUsguogHhQZDZD";
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
     return { status: true, data: res.data }
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
      body: message
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
     return { status: true, data: res.data }
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
     return { status: true, data: res.data }
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
          index: "4",
          parameters: [{ type: "payload", payload: "nutrition_e" }]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "5",
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
     return { status: true, data: res.data }
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
     return { status: true, data: res.data }
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
     return { status: true, data: res.data }
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
     return { status: true, data: res.data }
    }catch(err){
      console.log("error in emotional template",err);
    }
}

export const generateAndSendImage=async(recipientPhone)=>{
  try {
    // Step 1: Generate the image
    const imageResponse = await axios.request({
      method: 'POST',
      url: 'https://waimagegen.onrender.com/generate-image',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/11.3.0'
      },
      data: {
        duration: '7 Days',
        leadersBoard: [
          { pos: 1, name: 'Vijay', surname: 'Arora' },
          { pos: 2, name: 'Kashyapsinh', surname: 'Solanki' },
          { pos: 3, name: 'Manikappa', surname: 'Yanne' },
          { pos: 4, name: 'Deepak', surname: 'Dash' }
        ],
        highlighted: { pos: 6, name: 'Rohit', surname: 'Khot' },
        company: 'Reliance Industries Limited',
        logoUrl: 'https://example.com/logo.png'
      }
    });

    const imageUrl = imageResponse.data.imageUrl;

    if (!imageUrl) {
      console.error('❌ No imageUrl found in response');
      return;
    }

    // Step 2: Send the image to WhatsApp
    const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

    const data = {
      messaging_product: 'whatsapp',
      to: recipientPhone,
      type: 'image',
      image: {
        link: imageUrl,
        caption: `Celebrating Wellbeing Achievements 🎉\n\nDear Team,\nYour dedication to wellbeing shines! Here's a snapshot of our collective efforts.\n\nThank you for prioritising activities and keep embracing a healthy lifestyle! 💪`
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Image sent successfully:', result);
    } else {
      console.error('❌ Failed to send image:', result);
    }

  } catch (error) {
    console.error('❌ Error occurred:', error.message || error);
  }
}
