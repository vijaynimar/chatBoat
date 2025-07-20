import {user} from "./userModel.js"
import { sendTemplateMessage ,sendExerciseTypeTemplate,sendTextMessage} from "./chatBoat.js"

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
    if (["a", "b", "c", "d"].includes(payload)) {
      // You can respond accordingly
       if (payload === "a") {
        await updateActivity(userPhone,"Physical Welbing")
      } else if (payload === "b") {
         await updateActivity(userPhone,"Nutritional Welbing")
      } else if (payload === "c") {
         await updateActivity(userPhone,"Emotional Welbing")
      } else if (payload === "d") {
         await updateActivity(userPhone,"Social Welbing")
      }

      // Here you can store their choice in DB or send a welcome message
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
        return res.status(500).json({message:"error in update User"})
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
    await sendTextMessage(phone,activity)
    return { status: true };
    }catch(err){
        return res.status(500).json({message:"error in updateActivity"})
    }
}
