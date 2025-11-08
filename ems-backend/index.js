require('dotenv').config();

const express = require('express');
const cors = require('cors');

const employeesRouter = require('./routes/employees');
const departmentsRouter = require('./routes/departments');
const attendanceRouter = require('./routes/attendance');
const leaveRequestsRouter = require('./routes/leave_requests');
const errorHandler = require('./middleware/errorHandler');

const app = express();

console.log({
    employeesRouter,
    departmentsRouter,
    attendanceRouter,
    leaveRequestsRouter
})

app.use(cors());
app.use(express.json());

app.use('/employees', employeesRouter);
app.use('/departments', departmentsRouter);
app.use('/attendance', attendanceRouter);
app.use('/leave_requests', leaveRequestsRouter);

app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${process.env.PORT || 5000}`));