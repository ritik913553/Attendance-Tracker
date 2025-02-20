import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    subjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["Present","Absent","Holiday"],
        default:"Holiday"
    }
}, { timestamps: true });

attendanceSchema.index({ userId: 1, subjectId: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model("Attendance", attendanceSchema);




/*

const Attendance = require("../models/Attendance");

const markAttendance = async (userId, subjectId, status = "holiday") => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize date to avoid time differences

  try {
    // Try updating an existing attendance document
    const attendance = await Attendance.findOneAndUpdate(
      { userId, subjectId, date: today },
      { status }, // Update status if already exists
      { upsert: true, new: true, setDefaultsOnInsert: true } // Create if doesn't exist
    );

    return attendance;
  } catch (error) {
    console.error("Error marking attendance:", error);
  }
};




const cron = require("node-cron");
const Attendance = require("../models/Attendance");
const Subject = require("../models/Subject");

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily attendance setup...");

  const subjects = await Subject.find({});
  
  for (let subject of subjects) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      await Attendance.updateOne(
        { userId: subject.userId, subjectId: subject._id, date: today },
        { $setOnInsert: { status: "holiday" } },
        { upsert: true }
      );
    } catch (error) {
      console.error("Error inserting daily attendance:", error);
    }
  }
});

*/