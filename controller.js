import { user } from "./userModel.js";
import {
  sendTemplateMessage,
  sendExerciseTypeTemplate,
  sendTextMessage,
  sendNutritionActivityTypeTemplate,
  sendActivityTypeTemplate,
  socialTemplate,
  emotionalTemplate,
  timeSlot,
  generateAndSendImage
} from "./chatBoat.js";

export const createUser = async (req, res) => {
  const { phone, name, city } = req.body;
  try {
    const phoneExist = await user.findOne({
      phone: phone,
      deletedAt: null,
    });
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
    return res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "error in create user" });
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
          return res.send("success");
        }
      }

      if (payload) {
        const [template, option] = payload.split("_");

        console.log("📩 User responded to template:", template);
        console.log("✅ User chose option:", option);

        let activityLabel = "";

        switch (template) {
          case "activity":
            switch (option) {
              case "a": activityLabel = "Physical Wellbeing"; break;
              case "b": activityLabel = "Nutritional Wellbeing"; break;
              case "c": activityLabel = "Emotional Wellbeing"; break;
              case "d": activityLabel = "Social Wellbeing"; break;
            }
            if (activityLabel) {
              await updateActivity(userPhone, activityLabel);
              return res.send("success");
            }
            break;

          case "physical":
            switch (option) {
              case "a": activityLabel = "Yoga"; break;
              case "b": activityLabel = "Sport"; break;
              case "c": activityLabel = "Walk"; break;
              case "d": activityLabel = "Walking/Jogging"; break;
              case "e": activityLabel = "Workout"; break;
            }
            if (activityLabel) {
              await updateActivityOption(userPhone, activityLabel);
              return res.send("success");
            }
            break;

          case "emotional":
            switch (option) {
              case "a": activityLabel = "Meditation"; break;
              case "b": activityLabel = "Breathing Exercise"; break;
              case "c": activityLabel = "Creative Hobby"; break;
              case "d": activityLabel = "Gratitude Journaling"; break;
            }
            if (activityLabel) {
              await updateActivityOption(userPhone, activityLabel);
              return res.send("success");
            }
            break;

          case "social":
            switch (option) {
              case "a": activityLabel = "Social/Community"; break;
              case "b": activityLabel = "Volunteer"; break;
              case "c": activityLabel = "Family Time"; break;
              case "d": activityLabel = "Group Sport"; break;
              case "e": activityLabel = "Social Initiatives"; break;
            }
            if (activityLabel) {
              await updateActivityOption(userPhone, activityLabel);
              return res.send("success");
            }
            break;

          case "nutrition":
            switch (option) {
              case "a": activityLabel = "Eat Rainbow of Vegetables"; break;
              case "b": activityLabel = "Wholesome Meals"; break;
              case "c": activityLabel = "Eliminate Processed Foods"; break;
              case "d": activityLabel = "Drink Water"; break;
              case "e": activityLabel = "Mindfully for One Meal"; break;
              case "f": activityLabel = "Fast for 12 Hours"; break;
            }
            if (activityLabel) {
              await updateActivityOption(userPhone, activityLabel);
              return res.send("success");
            }
            break;

          case "timeslot":
            switch (option) {
              case "a": activityLabel = "Morning 8:00 AM"; break;
              case "b": activityLabel = "Morning 9:00 AM"; break;
              case "c": activityLabel = "Morning 10:00 AM"; break;
              case "d": activityLabel = "Evening 8:00 PM"; break;
              case "e": activityLabel = "Evening 9:00 PM"; break;
              case "f": activityLabel = "Evening 10:00 PM"; break;
            }
            if (activityLabel) {
              await updateTimeSlot(userPhone, activityLabel);
              return res.send("success");
            }
            break;
        }
      }

      return res.send("success");
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.sendStatus(500);
    }
  }

  res.sendStatus(404);
};

const updateTimeSlot = async (phone, option) => {
  try {
    const userExist = await user.findOne({ phone });
    if (!userExist) {
      console.log("User not found");
      return { status: false, message: "User not found" };
    }
    if (userExist.timeSlot) {
      await sendTextMessage(phone,"This response is already exixts");
      return { status: false, message: "Time slot already set" };
    }
    userExist.timeSlot = option;
    await userExist.save();
    await sendTextMessage(phone,"Thank you for taking up the initiative. #HealthyBeginnings")
    await generateAndSendImage(phone)
    return { status: true };
  } catch (err) {
    console.log("Error in updateTimeSlot:", err);
    return { status: false, message: "Error in updateTimeSlot" };
  }
};

const updateActivityOption = async (phone, option) => {
  try {
    const userExist = await user.findOne({ phone });
    if (!userExist) {
      console.log("User not found");
      return { status: false, message: "User not found" };
    }
    if (userExist.activityOption) {
      await sendTextMessage(phone,"This response is already exixts");
      return { status: false, message: "Activity option already set" };
    }
    userExist.activityOption = option;
    await userExist.save();
    await timeSlot(phone);
    return { status: true };
  } catch (err) {
    console.log("Error in updateActivityOption:", err);
    return { status: false, message: "Error in updateActivityOption" };
  }
};

const updateUser = async (phone) => {
  try {
    const userDoc = await user.findOne({ phone });
    if (!userDoc) {
      return { status: false, message: "User not found" };
    }
    userDoc.joined = true;
    await userDoc.save();
    return { status: true };
  } catch (err) {
    console.log("error in updateUser");
    return { status: false, message: "Error in updateUser" };
  }
};

const updateActivity = async (phone, activity) => {
  try {
    const userDoc = await user.findOne({ phone });
    if (!userDoc) {
      return { status: false, message: "User not found" };
    }
    if (userDoc.selectedActivity) {
      await sendTextMessage(phone,"This response is already exixts");
      return { status: false, message: "Activity already selected" };
    }
    userDoc.selectedActivity = activity;
    await userDoc.save();

    switch (activity) {
      case "Physical Wellbeing":
        await sendActivityTypeTemplate(phone);
        break;
      case "Nutritional Wellbeing":
        await sendNutritionActivityTypeTemplate(phone);
        break;
      case "Emotional Wellbeing":
        await emotionalTemplate(phone);
        break;
      case "Social Wellbeing":
        await socialTemplate(phone);
        break;
    }

    return { status: true };
  } catch (err) {
    console.log("error in updateActivity", err);
    return { status: false, message: "Error in updateActivity" };
  }
};
