import { Router } from "express";
import {
  createNewSubject,
  getAllSubjects,
  getSubjectById,
  updateSubjectName,
  deleteSubject,
} from "../controllers/subject.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create").post(createNewSubject);
router.route("/get-all").get(getAllSubjects);
router.route("/get/:subjectId").get(getSubjectById);
router.route("/update-subject-name/:subjectId").patch(updateSubjectName);
router.route("/delete/:subjectId").delete(deleteSubject);

export default router;
