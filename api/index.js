// Vercel serverless function entry point
import app from "../app.mjs";

// Export the Express app as default handler
export default app;

// Also export as handler for Vercel compatibility
export const handler = app;
