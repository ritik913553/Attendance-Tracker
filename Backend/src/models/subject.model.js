import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    totalClassesConducted: {
      type: Number,
      default: 0,
    },
    totalClassesAttended: {
      type: Number,
      default: 0,
    },
    holidays: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

subjectSchema.index({ userId: 1, name: 1 }, { unique: true });

export const Subject = mongoose.model("Subject", subjectSchema);
