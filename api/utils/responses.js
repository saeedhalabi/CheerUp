/**
 * Send a consistent error response
 * @param {Response} res - Express response object
 * @param {number} status - HTTP status code
 * @param {string} message - Main error message
 * @param {Error} [error=null] - Optional error object
 */
export const sendError = (res, status, message, error = null) => {
  const response = { message };
  if (error) {
    response.error = error.message;
  }
  return res.status(status).json(response);
};
