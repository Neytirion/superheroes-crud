import multer from "multer";

export default function errorHandler(err, req, res, _next) {
  console.error(err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message, code: err.code });
  }

  if (err?.errors && Array.isArray(err.errors)) {
    return res.status(400).json({ message: "Validation error", details: err.errors });
  }

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ message });
}