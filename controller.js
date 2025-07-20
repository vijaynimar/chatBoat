// userController.js

import { user } from "./userModel.js";
import connection from "./db.js";
connection();

import {
  sendTemplateMessage,
  sendExerciseTypeTemplate,
  sendTextMessage,
  sendNutritionActivityTypeTemplate,
  sendActivityTypeTemplate,
  socialTemplate,
  emotionalTemplate,
  timeSlot,
} from "./chatBoat.js";

export const createUser = async (req, res) => {
  const { phone, name, city } = req.body;
  try {
    const phoneExist = await user.findOne({ phone, deletedAt: null });
    if (phoneExist) {
      return res.status(400).json({ message: "This Phone number already exists" });
    }

    const newUser = new user({
      phone,
      name,
      city,
      activityOption: null,
      timeSlot: null,
      selectedActivity: null,
    });

    await newUser.save();
    await sendTemplateMessage(phone);
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error in creating user" });
  }
};

export const choosePath = async (req, res) => {
  const VERIFY_TOKEN = "my_secret_token_987";

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

        const activityOptions = {
          activity: ["Physical Wellbeing", "Nutritional Wellbeing", "Emotional Wellbeing", "Social Wellbeing"],
          physical: ["Yoga", "Sport", "Walk", "Walking/Jogging", "Workout"],
          emotional: ["Meditation", "Breathing Exercise", "Creative Hobby", "Gratitude Journaling"],
          social: ["Social/Community", "Volunteer", "Family Time", "Group Sport", "Social Initiatives"],
          nutrition: ["Eat Rainbow of Vegetables", "Wholesome Meals", "Eliminate Processed Foods", "Drink Water", "Mindfully for One Meal", "Fast for 12 Hours"],
          timeslot: ["Morning 8:00 AM", "Morning 9:00 AM", "Morning 10:00 AM", "Evening 8:00 PM", "Evening 9:00 PM", "Evening 10:00 PM"],
        };

        const index = option.charCodeAt(0) - 97; // 'a' -> 0
        const selected = activityOptions[template]?.[index];

        if (!selected) return res.sendStatus(400);

        if (template === "activity") {
          await updateActivity(userPhone, selected);
        } else if (template === "timeslot") {
          await updateTimeSlot(userPhone, selected);
        } else {
          await updateActivityOption(userPhone, selected);
        }
      }

      return res.sendStatus(200);
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.sendStatus(500);
    }
  }

  res.sendStatus(404);
};

const updateUser = async (phone) => {
  try {
    const userDoc = await user.findOne({ phone });
    if (!userDoc) return { status: false, message: "User not found" };

    userDoc.joined = true;
    await userDoc.save();
    return { status: true };
  } catch (err) {
    console.log("Error in updateUser", err);
  }
};

const updateActivity = async (phone, activity) => {
  try {
    const userDoc = await user.findOne({ phone });
    if (!userDoc) return { status: false, message: "User not found" };

    if (userDoc.selectedActivity) {
      await sendTextMessage(phone);
      return;
    }

    userDoc.selectedActivity = activity;
    await userDoc.save();

    if (activity === "Physical Wellbeing") await sendActivityTypeTemplate(phone);
    else if (activity === "Nutritional Wellbeing") await sendNutritionActivityTypeTemplate(phone);
    else if (activity === "Emotional Wellbeing") await emotionalTemplate(phone);
    else if (activity === "Social Wellbeing") await socialTemplate(phone);

    return { status: true };
  } catch (err) {
    console.log("Error in updateActivity", err);
  }
};

const updateActivityOption = async (phone, option) => {
  try {
    const userExist = await user.findOne({ phone });
    if (!userExist) return { status: false, message: "User not found" };

    if (userExist.activityOption) {
      await sendTextMessage(phone);
      return;
    }

    userExist.activityOption = option;
    await userExist.save();
    await timeSlot(phone);
    return { status: true };
  } catch (err) {
    console.log("Error in updateActivityOption:", err);
    return { status: false };
  }
};

const updateTimeSlot = async (phone, option) => {
  try {
    const userExist = await user.findOne({ phone });
    if (!userExist) return { status: false, message: "User not found" };

    if (userExist.timeSlot) {
      await sendTextMessage(phone);
      return;
    }

    userExist.timeSlot = option;
    await userExist.save();
    return { status: true };
  } catch (err) {
    console.log("Error in updateTimeSlot:", err);
    return { status: false };
  }
};
