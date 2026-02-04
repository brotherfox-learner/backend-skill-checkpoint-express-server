import pool from "../utils/db.mjs";

// vote ให้กับ question
export const voteQuestion = async (questionId, vote) => {
    const result = await pool.query("INSERT INTO question_votes (question_id, vote) VALUES ($1, $2) RETURNING *", [questionId, vote]);
    return result.rows[0];
}

//vote ให้กับ answer
export const voteAnswer = async (answerId, vote) => {
    const result = await pool.query("INSERT INTO answer_votes (answer_id, vote) VALUES ($1, $2) RETURNING *", [answerId, vote]);
    return result.rows[0];
}