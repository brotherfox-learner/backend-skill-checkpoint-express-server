import {Router} from "express";
import { answerController } from "../controllers/index.js";
import { validate } from "../middlewares/index.js";
import { createAnswerBodySchema } from "../schemas/index.js";

const answerRouter = Router();

answerRouter.post("/questions/:questionId/answers", validate(createAnswerBodySchema, "body"), answerController.createAnswer);
answerRouter.get("/questions/:questionId/answers", answerController.getAnswerByQuestionId);
answerRouter.delete("/questions/:questionId/answers", answerController.deleteAllAnswersByQuestionId);

export default answerRouter;