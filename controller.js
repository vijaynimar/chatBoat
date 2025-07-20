import {user} from "./userModel.js"
import connection from "./db.js"
connection()
import { sendTemplateMessage ,sendExerciseTypeTemplate,sendTextMessage,sendNutritionActivityTypeTemplate,sendActivityTypeTemplate,socialTemplate,emotionalTemplate,timeSlot} from "./chatBoat.js"

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
            city,
            activityOption: null,
            timeSlot: null,
            selectedActivity: null,
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
          } else if (template === "physical") {
              let activityLabel = "";
              // You can store user's physical activity here
              switch (option) {
                case "a":
                  activityLabel = "Yoga";
                  break;
                case "b":
                  activityLabel = "Sport";
                  break;
                case "c":
                  activityLabel = "Walk";
                  break;
                case "d":
                  activityLabel = "Walking/Jogging";
                  break
                case "e":
                  activityLabel = "Workout";  
                  break;
              }
              if (activityLabel) {
                await updateActivityOption(userPhone, option); // create this function in your DB logic
              }
            
          } else if (template === "emotional") {
              let activityLabel = "";
              // You can store user's physical activity here
              switch (option) {
                case "a":
                  activityLabel = "Meditation";
                  break;
                case "b":
                  activityLabel = "Breathing Exercise";
                  break;
                case "c":
                  activityLabel = "Creative Hobby";
                  break;
                case "d":
                  activityLabel = "Gratitude Journaling"; 
                  break;
              }
              if (activityLabel) {
                await updateActivityOption(userPhone, option); // create this function in your DB logic
              }
          }else if (template === "social") {
              let activityLabel = "";
              // You can store user's physical activity here
              switch (option) {
                case "a":
                  activityLabel = "Social/Community";
                  break;
                case "b":
                  activityLabel = "Volunteer";
                  break;
                case "c":
                  activityLabel = "Family Time";
                  break;
                case "d":
                  activityLabel = "Group Sport";
                  break
                case "e":
                  activityLabel = "Social Initiatives";  
                  break;
              }
              if (activityLabel) {
                await updateActivityOption(userPhone, option); // create this function in your DB logic
              }
            }else if (template === "nutrition") {
              let activityLabel = "";
              // You can store user's physical activity here
              switch (option) {
                case "a":
                  activityLabel = "Eat Rainbow of Vegetables";
                  break;
                case "b":
                  activityLabel = "Wholesome Meals";
                  break;
                case "c":
                  activityLabel = "Eliminate Processed Foods";
                  break;
                case "d":
                  activityLabel = "Drink Water";
                case "e":
                  activityLabel = "Mindfully for One Meal";  
                  break;
                case "f":
                  activityLabel="Fast for 12 Hours"
                  break  
              }
              if (activityLabel) {
                await updateActivityOption(userPhone, option); // create this function in your DB logic
              }
            }else if (template === "timeslot") {
              let activityLabel = "";
              // You can store user's physical activity here
              switch (option) {
                case "a":
                  activityLabel = "Morning 8:00 AM";
                  break;
                case "b":
                  activityLabel = "Morning 9:00 AM";
                  break;
                case "c":
                  activityLabel = "Morning 10:00 AM";
                  break;
                case "d":
                  activityLabel = "Evening 8:00 PM";
                  break
                case "e":
                  activityLabel = "Evening 9:00 PM";  
                  break;
                case "f":
                  activityLabel="Evening 10:00 PM"
                  break  
              }
              if (activityLabel) {
                await updateTimeSlot(userPhone, option); // create this function in your DB logic
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

const updateTimeSlot=async(phone,option)=>{
  try{
    const userExist=await user.findOne({phone})
    if(userExist.timeSlot){
      await sendTextMessage(phone)
      return
    }
    await user.updateOne({phone},{$set:{timeSlot:option}})
    return{status:true}
  }catch(err){
    console.log("error in updateTimeSLot",err);
  }
}

const updateActivityOption=async(phone,option)=>{
  try{
    const userExist=await user.findOne({phone:phone})
    if(userExist.activityOption){
      await sendTextMessage(phone)
      return
    }
    await user.updateOne({phone:phone},{$set:{activityOption:option}})
    await timeSlot(phone)
    return {status:true}
  }catch(err){
    console.log("error in update Activity option",err);
  }
}

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
    if(userDoc.selectedActivity){
      await sendTextMessage(phone)
      return
    }
    userDoc.selectedActivity = activity;
    await userDoc.save();
    
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
