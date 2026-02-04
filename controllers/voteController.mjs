import * as voteService from "../services/voteService.mjs";
import { AppError } from "../utils/AppError.js";

// vote ให้กับ question
export const voteQuestion = async (req, res, next) => {
    try {
        const {questionId} = req.params;
        const {vote} = req.body;
        const result = await voteService.voteQuestion(questionId, vote);
        return res.status(200).json({message: "Vote on the question has been recorded successfully."});
    } catch (error) {
        next(new AppError("Unable to vote question.", 500));
    }
}

//vote ให้กับ answer
export const voteAnswer = async (req, res, next) => {
    try {
        const {answerId} = req.params;
        const {vote} = req.body;
        const result = await voteService.voteAnswer(answerId, vote);
        console.log(result);
        return res.status(200).json({message: "Vote on the answer has been recorded successfully."});
    } catch (error) {
        next(new AppError("Unable to vote answer.", 500));
    }
}