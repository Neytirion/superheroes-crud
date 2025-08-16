import fs from "fs/promises";
import path from "path";

export const deleteFile = async (filePath) => {
  if (!filePath) return;
  const absolutePath = path.join(process.cwd(), filePath.replace(/^\/+/, ""));
  try {
    await fs.unlink(absolutePath);
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error("Failed to delete file:", absolutePath, err);
    }
  }
};