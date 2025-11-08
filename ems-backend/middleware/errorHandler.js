const { stack } = require("sequelize/lib/utils");

function errorHandler (err, req, res, next) {
    console.error(err);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    if (process.env.NODE_ENV === 'development'){
        req.status(status).json({
            message,
            stack: err.stack,
            error: err
        });
    } else { res.status(status).json({message})}
};

module.exports = errorHandler;