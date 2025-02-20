import { Subject } from "../models/subject.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createNewSubject = asyncHandler(async (req, res) => {
  //TODO: {name,userID,totalClassesConducted,totalClassesAttended,holidays}
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }
  const { name, totalClassesConducted, totalClassesAttended, holidays } =
    req.body;
  if (!name) {
    throw new ApiError(400, "Subject name is required");
  }
  const newSubject = await new Subject.create({
    userId: user._id,
    name,
    totalClassesAttended,
    totalClassesConducted,
    holidays,
  });
  if (!newSubject) {
    throw new ApiError(500, "Error creating subject");
  }
  res
    .status(201)
    .json(new ApiResponse(201, "Subject created successfully", newSubject));
});
const getAllSubjects = asyncHandler(async (req, res) => {
  //TODO: return all subjects of a user
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }
  const subjects = await Subject.find({ userId: user._id });
  if (!subjects) {
    throw new ApiError(404, "No subjects found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Subjects fetched successfully", subjects));
});
const getSubjectById = asyncHandler(async (req, res) => {
  //TODO: return a single subject by id
  const user = req.user;
  const { subjectId } = req.params;
  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }
  if (!subjectId) {
    throw new ApiError(400, "Subject id is required");
  }
  const subject = await Subject.findById(subjectId);
  if (!subject) {
    throw new ApiError(404, "Subject not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Subject fetched successfully", subject));
});
const updateSubjectName = asyncHandler(async (req, res) => {
  //TODO: update a subject by id and new data
  const { subjectId } = req.params;
  const { name } = req.body;
  if (!subjectId) {
    throw new ApiError(400, "Subject id is required");
  }
  if (!name) {
    throw new ApiError(400, "Subject name is required for updating name");
  }
  const updatedSubject = await Subject.findByIdAndUpdate(
    subjectId,
    { $set: { name } },
    { new: true }
  );
  if (!updatedSubject) {
    throw new ApiError(404, "Subject not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Subject name updated successfully", updatedSubject)
    );
});
const deleteSubject = asyncHandler(async (req, res) => {
  //TODO: delete a subject by id
  const user = req.user;
  const { subjectId } = req.params;
  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }
  if (!subjectId) {
    throw new ApiError(400, "Subject id is required");
  }
  const subject = await Subject.findByIdAndDelete(subjectId);
  if (!subject) {
    throw new ApiError(404, "Subject not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Subject deleted successfully", subject));
});

export {
  createNewSubject,
  getAllSubjects,
  getSubjectById,
  updateSubjectName,
  deleteSubject,
};
