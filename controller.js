import {user} from "./userModel.js"
import { sendTemplateMessage ,sendExerciseTypeTemplate} from "./chatBoat.js"

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


export const choosePath=async()=>async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    const userPhone = message?.from;
    const payload = message?.button?.payload;

    if (payload === "start") {
        const update=await updateUser(phone)
        if(update.status){
            await sendExerciseTypeTemplate(userPhone); 
        }
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.sendStatus(500);
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
        return res.status(500).json({message:"error in update User"})
    }
}