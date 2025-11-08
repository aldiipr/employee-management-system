const db = require('../config/db');


exports.getAll = async (req, res, next) => {
    try {
        const [result] = await db.query(`
            SELECT
                d.id,
                d.name,
                m.name AS manager_name,
                COUNT(e.id) AS total_employee
            FROM departments d
            LEFT JOIN employees m ON d.manager_id = m.id
            LEFT JOIN employees e ON e.department_id = d.id
            GROUP BY d.id, d.name, m.name
            `);
        res.json(result);
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};

exports.getById = async (req, res, next) => {
    try {
        const [result] = await db.query('SELECT * FROM departments WHERE id=?', [req.params.id]);
        if(result.length === 0) {
            const err = new Error('Department not found');
            err.status = 404;
            return next(err);
        };
        res.json(result[0])
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};

exports.create = async (req, res, next) => {
    try {
        const {name, manager_id} = req.body;
        if(!name) {
            const err = new Error("Department name is required");
            err.status = 400;
            return next(err);
        }
        const [result] = await db.query('INSERT INTO departments (name, manager_id) VALUES (?, ?)', [name, manager_id || null]);
        res.json({
            message: 'Department created successfully',
        insertId : result.insertId});
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};

exports.update = async (req,res, next) => {
    try {
        const [result] = await db.query(`SELECT * FROM departments WHERE id=?`, [req.params.id]);
        if (result.length === 0) {
            const err = new Error('Department not found');
            err.status = 404;
            return next(err);
        }

        const fields = req.body;
        const keys = Object.keys(fields);
        const values = Object.values(fields);

        if (keys.length === 0) {
            const err = new Error('No data to update');
            err.status = 400;
            return next(err);
        };

        const setClause = keys.map(key=> `${key}=?`).join(', ');
        const sql = `UPDATE departments SET ${setClause} WHERE id=?`;

        const [updateResult] = await db.query(sql, [...values, req.params.id]);
        
        res.json({
            message: 'Departments updated successfully',
            affectedRows: updateResult.affectedRows
        });
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};

exports.delete = async (req, res, next) => {
    try {
        const [result] = await db.query('SELECT * FROM departments WHERE id=?', [req.params.id]);
        if (result.length === 0) {
            const err = new Error('Department not found');
            err.status = 404;
            return next(err);
        };
        await db.query('DELETE FROM departments WHERE id=?', [req.params.id]);
        res.json({message: 'Department deleted successfully'})
    } catch (err) {
        err.status =500;
        return next(err);
    };
};