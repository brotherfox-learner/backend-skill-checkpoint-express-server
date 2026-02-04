import pool from "../utils/db.mjs";

// ดึงข้อมูล questions ทั้งหมด
export const getAllQuestions = async () => {
        const result = await pool.query("SELECT * FROM questions");
        return result.rows;
}

// ดึงข้อมูล question ตาม id
export const getQuestionById = async (id) => {
    const result = await pool.query("SELECT * FROM questions WHERE id = $1", [id]);
    return result.rows[0];
}


// สร้าง question ใหม่
export const createQuestion = async (questionData) => {
    const {title, description, category = null} = questionData;
    const result = await pool.query("INSERT INTO questions (title, description, category) VALUES ($1, $2, $3) RETURNING *", [title, description, category]);
    return result.rows[0];
}

// อัพเดตข้อมูลในตาราง questions ตาม id
export const updateQuestion = async (id, questionData) => {
    const {title, description, category = null} = questionData;
    const result = await pool.query("UPDATE questions SET title = $1, description = $2, category = $3 WHERE id = $4 RETURNING *", [title, description, category, id]);
    return result.rows[0];
}

// ลบข้อมูลในตาราง questions ตาม id
export const deleteQuestion = async (id) => {
    const result = await pool.query("DELETE FROM questions WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
}

//ค้นหา question ตาม title หรือ category
export const searchQuestion = async (title, category) => {
    let query = "SELECT * FROM questions WHERE 1=1";
    const params = [];
    let paramIndex = 1;

    // เพิ่มเงื่อนไข title ถ้ามีค่า
    if (title) {
        query += ` AND title ILIKE $${paramIndex}`;
        params.push(`%${title}%`);
        paramIndex++;
    }

    // เพิ่มเงื่อนไข category ถ้ามีค่า
    if (category) {
        query += ` AND category ILIKE $${paramIndex}`;
        params.push(`%${category}%`);
        paramIndex++;
    }
    const result = await pool.query(query, params);
    return result.rows;
}