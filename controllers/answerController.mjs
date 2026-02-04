import * as answerService from "../services/answerService.mjs";
import { AppError } from "../utils/AppError.js";

// สร้าง answer ใหม่
export const createAnswer = async (req, res, next) => {
    try {
        const {questionId} = req.params;
        const {content} = req.body;
        const result = await answerService.createAnswer(questionId, content);
        return res.status(201).json({
            message: "Answer created successfully",
            answer: result,
        });
    } catch (error) {
        next(new AppError("Unable to create answer.", 500));
    }
}

// ดึงข้อมูล answer ตาม questionId
export const getAnswerByQuestionId = async (req, res, next) => {
    try {
        const {questionId} = req.params;
        const result = await answerService.getAnswerByQuestionId(questionId);
        return res.status(200).json({data: result});
    } catch (error) {
        next(new AppError("Unable to fetch answers.", 500));
    }
}

// ลบข้อมูล answer ทั้งหมดตาม questionId
export const deleteAllAnswersByQuestionId = async (req, res, next) => {
    try {
        const {questionId} = req.params;
        const result = await answerService.deleteAllAnswersByQuestionId(questionId);
        return res.status(200).json({
            message: "All answers deleted successfully",
            data: result,
        });
    } catch (error) {
        next(new AppError("Unable to delete answers.", 500));
    }
}