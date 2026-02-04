import * as answerRepository from "../repositories/answerRepository.mjs";
import { AppError } from "../utils/AppError.js";

// สร้าง answer ใหม่
export const createAnswer = async (questionId, content) => {
    const answerData = {questionId, content};
    const result = await answerRepository.createAnswer(answerData);
    if(!result) {
        throw new AppError("Question not found.", 404);
    }
    return result;
}

// ดึงข้อมูล answer ตาม questionId
export const getAnswerByQuestionId = async (questionId) => {
    const result = await answerRepository.getAnswerByQuestionId(questionId);
    if(!result) {
        throw new AppError("Question not found.", 404);
    }
    return result;
}

// ลบข้อมูล answer ทั้งหมดตาม questionId
export const deleteAllAnswersByQuestionId = async (questionId) => {
    const result = await answerRepository.deleteAllAnswersByQuestionId(questionId);
    if(!result) {
        throw new AppError("Question not found.", 404);
    }
    return result;
}