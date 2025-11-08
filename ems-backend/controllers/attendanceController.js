const db = require('../config/db');


exports.getAll = async (req, res, next) => {
    try {
        const [result] = await db.query(`
            SELECT
                a.id,
                e.name AS employee_name,
                d.name AS department_name,
                a.status,
                a.date,
                a.check_in,
                a.check_out
            FROM attendance a
            LEFT JOIN employees e ON a.employee_id = e.id
            LEFT JOIN departments d ON e.department_id = d.id
            ORDER BY a.date DESC
            `);
        res.json(result);
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};

exports.getById = async (req, res, next) => {
    try {
        const [result] = await db.query(`
            SELECT
            a.*,
            e.name AS employee_name,
            e.department_id AS department_name
            FROM attendance a
            JOIN employees e ON a.employee_id = e.id
            WHERE a.id=?`, [req.params.id]);
        if (result.length === 0) {
            const err = new Error('Attendance not found');
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
        const {employee_id, date, status, check_in, check_out} = req.body;

        const [result] = await db.query('INSERT INTO attendance (employee_id, date, status, check_in, check_out) VALUES (?, ?, ?, ?, ?)',
            [employee_id, date, status, check_in, check_out]
        );
        res.json({
            message: 'Attendance added successfully',
            insertedId: result.insertId
        });
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};

exports.update = async (req, res, next) => {
    try {
        const { status } = req.body;

        if(!status) {
            const err = new Error("Status is required");
            err.status = 400;
            return next(err);
        };

        const [result] = await db.query(
            "UPDATE attendance SET status=? WHERE id=?",
            [status, req.params.id]
        );

        if(result.affectedRows === 0) {
            const err = new Error("Attendance not found");
            err.status = 404;
            return nect(err)
        };

        res.json({
            message: "Attendance status updated successfully",
            affectedRows: result.affectedRows,
        });
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};