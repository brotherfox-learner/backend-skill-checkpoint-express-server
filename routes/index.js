import { Router } from "express";
import questionRouter from "./questionRouter.mjs";
import answerRouter from "./answerRouter.mjs";
import voteRouter from "./voteRouter.mjs";

const router = Router();

router.use("/questions", questionRouter);
router.use("", answerRouter);
router.use("", voteRouter);

export default router;