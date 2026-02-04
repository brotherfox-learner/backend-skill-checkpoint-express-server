import {Router} from "express";
import { questionController } from "../controllers/index.js";
import { questionSchema } from "../schemas/questionSchema.js";
import { validate } from "../middlewares/index.js";

const questionRouter = Router();

questionRouter.get("/", questionController.getAllQuestions);
questionRouter.get("/search", questionController.searchQuestion);
questionRouter.get("/:id", questionController.getQuestionById);
questionRouter.post("/", validate(questionSchema, "body"), questionController.createQuestion);
questionRouter.put("/:id", validate(questionSchema, "body"), questionController.updateQuestion);
questionRouter.delete("/:id", questionController.deleteQuestion);

export default questionRouter;