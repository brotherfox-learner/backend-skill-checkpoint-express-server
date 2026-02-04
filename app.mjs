import express from "express";
// import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./routes/index.js";
dotenv.config();

const app = express();
const port = 4000;

app.use(morgan("dev", {
  stream: { write: (msg) => console.log(msg.trimEnd()) }
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.use("", router);


// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message =
    err.message ||
    (statusCode === 500 ? "Something went wrong!" : err.message);

  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      message,
      stack: err.stack,
      error: err,
    });
  }

  return res.status(statusCode).json({ message });
});


// Export for Vercel serverless
export default app;

// Run server locally (skip on Vercel)
if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });
}
