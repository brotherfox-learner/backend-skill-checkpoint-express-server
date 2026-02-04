import pool from "../utils/db.mjs";

// สร้าง answer ใหม่
export const createAnswer = async (answerData) => {
    const {questionId, content} = answerData;
    const result = await pool.query("INSERT INTO answers (question_id, content) VALUES ($1, $2) RETURNING *", [questionId, content]);
    return result.rows[0];
}

// ดึงข้อมูล answer ตาม questionId
export const getAnswerByQuestionId = async (questionId) => {
    const result = await pool.query("SELECT * FROM answers WHERE question_id = $1", [questionId]);
    return result.rows;
}

// ลบข้อมูล answer ทั้งหมดตาม questionId
export const deleteAllAnswersByQuestionId = async (questionId) => {
    const result = await pool.query("DELETE FROM answers WHERE question_id = $1 RETURNING *", [questionId]);
    return result.rows;
}