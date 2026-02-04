import * as voteRepository from "../repositories/voteRepository.mjs";
import { AppError } from "../utils/AppError.js";

// vote ให้กับ question
export const voteQuestion = async (questionId, vote) => {
    const result = await voteRepository.voteQuestion(questionId, vote);
    if(!result) {
        throw new AppError("Question not found.", 404);
    }
    return result;
}

//vote ให้กับ answer
export const voteAnswer = async (answerId, vote) => {
    const result = await voteRepository.voteAnswer(answerId, vote);
    if(!result) {
        throw new AppError("Answer not found.", 404);
    }
    return result;
}