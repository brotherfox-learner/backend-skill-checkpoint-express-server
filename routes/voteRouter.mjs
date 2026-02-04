import { Router } from "express";
import { voteController } from "../controllers/index.js";
import { validate } from "../middlewares/index.js";
import { voteSchema } from "../schemas/voteSchema.js";

const voteRouter = Router();

voteRouter.post("/questions/:questionId/vote", validate(voteSchema, "body"), voteController.voteQuestion);
voteRouter.post("/answers/:answerId/vote", validate(voteSchema, "body"), voteController.voteAnswer);

export default voteRouter;