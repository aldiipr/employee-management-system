const db = require('../config/db');


exports.getAll = async (req, res, next) => {
    try {
        const [result] = await db.query(`
            SELECT 
            e.id,
            e.name,
            e.position,
            d.name AS department
            FROM employees e
            LEFT JOIN departments d ON e.department_id = d.id`);
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
            e.id,
            e.name,
            e.email,
            e.gender,
            e.phone,
            e.address,
            e.position,
            e.hire_date,
            e.salary,
            d.name AS department
            FROM employees e
            LEFT JOIN departments d ON e.department_id = d.id
            WHERE e.id=?`, [req.params.id]);
        if (result.length === 0) {
            const err = new Error('Employee not found');
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
        const {name, email, gender, phone, address, department_id, position, hire_date, salary} = req.body;
        if (!name || !email || !department_id) {
            const err = new Error('Missing required fields')
            err.status = 400;
            return next(err);
        }
        const [result] = await db.query('INSERT INTO employees (name, email, gender, phone, address, department_id, position, hire_date, salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, email, gender, phone, address, department_id, position, hire_date, salary]
        )
        res.json({
            message: 'Employee added successfully',
            insertedId: result.insertId
        });
        const validPositions = ['Manager', 'Assistant Manager', 'Supervisor', 'Assistant Supervisor', 'Staff', 'Intern']

        if(!validPositions.includes(req.body.position)) {
            return res.status(400).json({message: 'Invalid position value'})
        }
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};

exports.update = async (req, res, next) => {
    try {
        const [result] = await db.query(`
            SELECT 
            e.id,
            e.name,
            e.email,
            e.gender,
            e.phone,
            e.address,
            e.position,
            e.hire_date,
            e.salary,
            d.name AS department
            FROM employees e
            LEFT JOIN departments d ON e.department_id = d.id
            WHERE e.id=?`, [req.params.id]);
        if (result.length === 0) {
            const err = new Error('Employee not found')
            err.status = 404;
            return next(err)
        };

        const fields = req.body;

        delete fields.department;

        if (fields.hire_date && fields.hire_date.includes("T")) {
            fields.hire_date = fields.hire_date.split("T")[0]};

        const keys = Object.keys(fields);
        const values = Object.values(fields);

        if (keys.length === 0) {
            const err = new Error('No data to update')
            err.status = 400;
            return next(err);
        };
        
        const setClause = keys.map(key => `${key}=?`).join(`, `);
        const sql = `UPDATE employees SET ${setClause} WHERE id=?`;

        const [updateResult] = await db.query(sql, [...values, req.params.id]);
        res.json({
            message: 'Employee updated successfully',
            affectedRows: updateResult.affectedRows
        });
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};

exports.delete = async (req, res, next) => {
    try {
        const [result] = await db.query('SELECT * FROM employees WHERE id=?', [req.params.id]);
        if (result.length === 0 ) {
            const err = new Error('Employee not found');
            err.status = 404;
            return next(err)
        };
         await db.query('DELETE FROM employees WHERE id=?', [req.params.id]);
         res.json({message: 'Employee deleted successfully'})
    } catch (err) {
        err.status = 500;
        return next(err);
    };
};