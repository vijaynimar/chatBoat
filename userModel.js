import { Schema, model } from "mongoose";

const userSchema = new Schema({
  phone: { type: Number, required: true, unique: true },
  name: { type: String },
  city: { type: String },
  timeSlot: { type: String, default: null },
  selectedActivity: { type: String, default: null },
  activityOption: { type: String, default: null },
  joined: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

const user = model("user", userSchema);
export { user };
