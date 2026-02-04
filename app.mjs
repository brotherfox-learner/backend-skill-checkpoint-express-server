import express from "express";
// import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load swagger.json
const swaggerDocument = JSON.parse(
  readFileSync(join(__dirname, "./swagger.json"), "utf8")
);

const app = express();
const port = 4000;

//Middleware
app.use(morgan("dev", {
  stream: { write: (msg) => console.log(msg.trimEnd()) }
}));

// Helmet with CSP disabled for Swagger UI
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI via CDN - สำหรับ Vercel serverless
app.get("/api-docs", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skill Checkpoint API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        spec: ${JSON.stringify(swaggerDocument)},
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout",
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        tryItOutEnabled: true,
        docExpansion: "list",
        defaultModelsExpandDepth: 2,
        defaultModelExpandDepth: 2
      });
    };
  </script>
</body>
</html>
  `);
});

// Swagger JSON endpoint
app.get("/api-docs/swagger.json", (req, res) => {
  res.json(swaggerDocument);
});

// Root route - redirect to /home
app.get("/", (req, res) => {
  res.redirect("/home");
});

// Home route
app.get("/home", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Q&A API Server</title>
        <style>
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont;
            max-width: 800px;
            margin: 60px auto;
            padding: 0 20px;
            line-height: 1.6;
            background: #fafafa;
          }
          h1 { font-size: 2rem; }
          .card {
            background: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,.05);
          }
          a {
            display: inline-block;
            margin-right: 14px;
            margin-top: 12px;
            text-decoration: none;
            color: #2563eb;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <h1>Question & Answer API Server</h1>
        <div class="card">
          <p>
            RESTful API built with Express.js and PostgreSQL.
          </p>
          <p>
            <a href="/api-docs">📘 Swagger API Docs</a>
          </p>
        </div>
      </body>
    </html>
  `);
});


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
    (statusCode === 500 ? "Something went wrong!" : "Something went wrong!");

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
