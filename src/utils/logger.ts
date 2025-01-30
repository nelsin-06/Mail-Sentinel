import winston from "winston";

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create a logger instance
const logger = winston.createLogger({
  level: "info", // Set the default logging level
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.colorize(), // Add colors to logs (for console)
    logFormat // Use custom log format
  ),
  transports: [
    // Log to the console
    new winston.transports.Console(),
    // Log to a file
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Log only errors to this file
    new winston.transports.File({ filename: "logs/combined.log" }), // Log all levels to this file
  ],
});

// Export the logger
export default logger;
