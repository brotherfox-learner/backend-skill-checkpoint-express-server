import * as questionService from "../services/questionService.mjs";
import { AppError } from "../utils/AppError.js";

// ดึงข้อมูล questions ทั้งหมด
export const getAllQuestions = async (req, res, next) => {
    try {
        const result = await questionService.getAllQuestions();
        return res.status(200).json({data: result});
    } catch (error) {
        console.error("getAllQuestions error:", error);
        next(new AppError(error.message || "Unable to fetch questions.", 500));
    }
}

// ดึงข้อมูล question ตาม id
export const getQuestionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await questionService.getQuestionById(id);
        return res.status(200).json({data: result});
    } catch (error) {
        next(new AppError("Unable to fetch question.", 500));
    }
}

// สร้าง question ใหม่
export const createQuestion = async (req, res, next) => {
    try {
        const result = await questionService.createQuestion(req.body);
        return res.status(201).json({
            message: "Question created successfully",
            question: result,
        });
    } catch (error) {
        next(new AppError("Unable to create question.", 500));
    }
}

// อัพเดตข้อมูลในตาราง questions ตาม id
export const updateQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await questionService.updateQuestion(id, req.body);
        return res.status(200).json({data: result});
    } catch (error) {
        next(new AppError("Unable to update question.", 500));
    }
}


// ลบข้อมูลในตาราง questions ตาม id
export const deleteQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        await questionService.deleteQuestion(id);
        return res.status(200).json({message: "Question post has been deleted successfully."});
    } catch (error) {
        next(new AppError("Unable to delete question.", 500));
    }
}

//ค้นหา question ตาม title หรือ category
export const searchQuestion = async (req, res, next) => {
    try {
        const {title, category} = req.query;
        const result = await questionService.searchQuestion(title, category);
        return res.status(200).json({data: result});
    } catch (error) {
        next(new AppError("Unable to search question.", 500));
    }
}