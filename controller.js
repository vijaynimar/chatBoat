import {user} from "./userModel.js"
import connection from "./db.js"
connection()
import { sendTemplateMessage ,sendExerciseTypeTemplate,sendTextMessage,sendNutritionActivityTypeTemplate,sendActivityTypeTemplate,socialTemplate,emotionalTemplate} from "./chatBoat.js"

export const createUser=async(req,res)=>{
    const {phone,name,city} =req.body
    try{
        const phoneExist=await user.findOne({
            phone:phone,
            deletedAt:null
        })
        if(phoneExist){
            return res.status(400).json({message:"This Phone number already exists"})
        }
        const newUser = new user({
            phone,
            name,
            city
        })
        await newUser.save()
        await sendTemplateMessage(phone)
        return res.status(201).json({message:"user created sucessfully"})
    }catch(err){
        return res.status(500).json({nessage:"error in create user"})
    }
}


export const choosePath = async (req, res) => {
  const VERIFY_TOKEN = "my_secret_token_987"; // replace with the token you set in Meta portal

  // 1. Handle webhook verification (GET request)
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  // 2. Handle incoming messages (POST request)
  if (req.method === "POST") {
    try {
      const entry = req.body.entry?.[0];
      const changes = entry?.changes?.[0];
      const message = changes?.value?.messages?.[0];

      const userPhone = message?.from;
      const payload = message?.button?.payload;

      if (payload === "start") {
        const update = await updateUser(userPhone);
        if (update.status) {
          await sendExerciseTypeTemplate(userPhone);
        }
      }

        if (payload) {
          const [template, option] = payload.split("_");

          console.log("📩 User responded to template:", template);
          console.log("✅ User chose option:", option);

          if (template === "activity") {
            let activityLabel = "";

            switch (option) {
              case "a":
                activityLabel = "Physical Wellbeing";
                break;
              case "b":
                activityLabel = "Nutritional Wellbeing";
                break;
              case "c":
                activityLabel = "Emotional Wellbeing";
                break;
              case "d":
                activityLabel = "Social Wellbeing";
                break;
            }

            if (activityLabel) {
              await updateActivity(userPhone, activityLabel);
            }
          }
        }

      return res.sendStatus(200);
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.sendStatus(500);
    }
  }

  // 3. Invalid method
  res.sendStatus(404);
};


const updateUser=async(phone)=>{
    try{
        const userDoc = await user.findOne({ phone });

    if (!userDoc) {
      return { status: false, message: "User not found" };
    }

    userDoc.joined = true;
    await userDoc.save();

    return { status: true };
    }catch(err){
        console.log("error in updateUser");
    }
}

const updateActivity=async(phone,activity)=>{
    try{
        const userDoc = await user.findOne({ phone });
    if (!userDoc) {
      return { status: false, message: "User not found" };
    }

    userDoc.selectedActivity = activity;
    await userDoc.save();
    // await sendTextMessage(phone,activity)
    if(userDoc.selectedActivity=="Physical Wellbeing"){
       await sendActivityTypeTemplate(phone)
    }else if(userDoc.selectedActivity=="Nutritional Wellbeing"){
      await sendNutritionActivityTypeTemplate(phone)
    }else if(userDoc.selectedActivity=="Emotional Wellbeing"){
      await emotionalTemplate(phone)
    }else if(userDoc.selectedActivity=="Social Wellbeing"){
      await socialTemplate(phone)
    }
    return { status: true };
    }catch(err){
        console.log("error in updateActivity",err);
    }
}
