import env from "dotenv";
import winston from "winston"; // Ensure winston is imported

env.config();

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
};

const productionLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({ level: "info" }), 
        new winston.transports.File({ filename: './errors.log', level: 'error' }) 
    ]
});

const developmentLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({ level: "debug" }) 
    ]
});

export const addLogger = (req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        req.logger = productionLogger;
    } else {
        req.logger = developmentLogger;
    }
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`);
    next();
};