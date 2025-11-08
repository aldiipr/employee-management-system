const db = require('../config/db');


exports.getAll = async (req, res, next) => {
    try {
        const [result] = await db.query(`
            SELECT
                l.id,
                e.name AS employee_name,
                d.name AS department_name,
                l.start_date,
                l.end_date,
                l.type,
                l.status
            FROM leave_requests l
            LEFT JOIN employees e ON l.employee_id = e.id
            LEFT JOIN departments d ON e.department_id = d.id
            ORDER BY l.id DESC`);
        res.json(result);
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};

exports.getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const [result] = await db.query(`
            SELECT
                l.id,
                e.name AS employee_name,
                d.name AS department_name,
                l.start_date,
                l.end_date,
                l.type,
                l.status
            FROM leave_requests l
            LEFT JOIN employees e ON l.employee_id = e.id
            LEFT JOIN departments d ON e.department_id = d.id
            WHERE l.id=?`, [id]);
        if(result.length === 0) {
            const err = new Error('Leave request not found');
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
        const {employee_id, start_date, end_date, type = 'annual', status = 'pending'} = req.body;
        
        if (!employee_id || !start_date || !end_date) {
            const err = new Error('Missing required fields');
            err.status = 400;
            return next(err);
        };

        if (new Date(end_date) < new Date(start_date)) {
            const err = new Error('End date cannot be before start date');
            err.status = 400;
            return next(err);
        };
        const [checkEmployee] = await db.query('SELECT * FROM employees WHERE id=?', [employee_id]);
        if (checkEmployee.length === 0) {
            const err = new Error('Employee not found');
            err.status = 404;
            return next(err);
        };

        const [result] = await db.query('INSERT INTO leave_requests (employee_id, start_date, end_date, type, status) VALUES (?, ?, ?, ?, ?)', [employee_id, start_date, end_date, type, status]);
        res.json({
            message: 'Leave request created successfully',
            insertedId: result.insertId
        });
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};

exports.update = async (req,res, next) => {
    try {
        const {status} = req.body;
        const validStatus = ['pending', 'approved', 'rejected'];

        if (!status) {
            const err = new Error(' Status is required');
            err.status = 400;
            return next(err)
        };

        if (!validStatus.includes(status)) {
            const err = new Error(' Invalid status value');
            err.status = 400;
            return next(err)
        };

        const [result] = await db.query('SELECT * FROM leave_requests WHERE id=?', [req.params.id]);
        if (result.length === 0) {
            const err = new Error('Leave request not found');
            err.status = 404;
            return next(err);
        }

       
        const [updateResult] = await db.query('UPDATE leave_requests SET status=? WHERE id=?', [status, req.params.id]);
        res.json({
            message: 'Leave request updated successfully',
            affectedRows: updateResult.affectedRows
        });
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};
