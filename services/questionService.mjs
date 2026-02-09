import * as questionRepository from "../repositories/questionRepository.mjs";
import * as answerRepository from "../repositories/answerRepository.mjs";
import { AppError } from "../utils/AppError.js";

// ดึงข้อมูล questions ทั้งหมด
export const getAllQuestions = async () => {
    const result = await questionRepository.getAllQuestions();
    return result
}

// ดึงข้อมูล question ตาม id
export const getQuestionById = async (id) => {

    const result = await questionRepository.getQuestionById(id);
    if (!result) {
        throw new AppError("Question not found.", 404);
    }
    return result;
}

// สร้าง question ใหม่
export const createQuestion = async (questionData) => {
    const { title, description, category } = questionData;

    const newQuestionData = {
        title: title.trim(),
        description: description.trim(),
        category: category ? category.trim() : null,
    }
    const result = await questionRepository.createQuestion(newQuestionData);
    return result;
}

// อัพเดตข้อมูลในตาราง questions ตาม id
export const updateQuestion = async (id, questionData) => {
    const result = await questionRepository.updateQuestion(id, questionData);
    if (!result) {
        throw new AppError("Question not found.", 404);
    }
    return result;
}

// ลบข้อมูลในตาราง questions ตาม id
export const deleteQuestion = async (id) => {
    await answerRepository.deleteAllAnswersByQuestionId(id);  // ลบคำตอบก่อน
    const result = await questionRepository.deleteQuestion(id);
    if (!result) {
        throw new AppError("Question not found.", 404);
    }
    return result;
}

//ค้นหา question ตาม title หรือ category
export const searchQuestion = async (title, category) => {
    const result = await questionRepository.searchQuestion(title, category);
    if (result.length === 0) {
        throw new AppError("Question not found.", 404);
    }
    return result;
}