# Question & Answer API Server

A RESTful API server built with Express.js and PostgreSQL for managing questions and answers. This application allows users to create, read, update, delete, and search questions, as well as create and manage answers for each question. This project was built as a backend practice to demonstrate RESTful API design, layered architecture, and database relationship handling.

## 🌐 Live Demo (Deployed on Vercel)
The API is deployed on Vercel and available for testing:

- **Base URL:** https://backend-skill-checkpoint-express-se-ten.vercel.app/
- **Swagger Documentation:** https://backend-skill-checkpoint-express-se-ten.vercel.app/api-docs


## 🚀 Features

### Question Management
- ✅ Create questions with title, description, and optional category
- ✅ View all questions
- ✅ View a specific question by ID
- ✅ Update question title and description
- ✅ Delete questions (automatically deletes associated answers)
- ✅ Search questions by title or category

### Answer Management
- ✅ Create answers for questions (max 300 characters)
- ✅ View all answers for a specific question
- ✅ Answers are automatically deleted when their parent question is deleted

## 📋 Prerequisites
Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (local or remote)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend-skill-checkpoint-express-server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
CONNECTION_STRING=postgresql://username:password@host:port/database
NODE_ENV=development
```

4. Make sure your PostgreSQL database has the following tables:
Run the following script on SQL:
https://gist.github.com/napatwongchr/811ef7071003602b94482b3d8c0f32e0

## 🏃 Running the Application
Start the development server:
```bash
npm start
```

The server will run on `http://localhost:4000` by default.

## 📚 API Documentation
This project includes interactive API documentation powered by Swagger UI. After starting the server, you can access the complete API documentation at:

**Swagger UI:** `http://localhost:4000/api-docs`

### Features:
- 📖 **Complete API Reference** - View all available endpoints
- 🧪 **Interactive Testing** - Test API endpoints directly from the browser
- 📋 **Request/Response Examples** - See example requests and responses
- 🔍 **Schema Definitions** - View detailed data models and validation rules
- ✅ **Try It Out** - Execute API calls and see real responses

### Available Endpoints:

#### Questions
- `GET /questions` - Get all questions
- `GET /questions/search` - Search questions by title or category
- `GET /questions/:id` - Get question by ID
- `POST /questions` - Create a new question
- `PUT /questions/:id` - Update a question
- `DELETE /questions/:id` - Delete a question (also deletes associated answers)

#### Answers
- `GET /questions/:questionId/answers` - Get all answers for a question
- `POST /questions/:questionId/answers` - Create an answer (max 300 characters)
- `DELETE /questions/:questionId/answers` - Delete all answers for a question

#### Health Check
- `GET /test` - Check if the server is running

For detailed request/response formats, validation rules, and examples, please visit the Swagger UI documentation at `http://localhost:4000/api-docs`.

## 🏗️ Project Structure

```
backend-skill-checkpoint-express-server/
├── controllers/          # Request handlers
│   ├── answerController.mjs
│   ├── questionController.mjs
│   └── voteController.mjs
├── middlewares/          # Custom middleware
│   └── validation.middleware.js
├── repositories/         # Database queries
│   ├── answerRepository.mjs
│   ├── questionRepository.mjs
│   └── voteRepository.mjs
├── routes/               # API routes
│   ├── answerRouter.mjs
│   ├── questionRouter.mjs
│   ├── voteRouter.mjs
│   └── index.js
├── schemas/              # Validation schemas (Zod)
│   ├── answerSchema.js
│   ├── questionSchema.js
│   └── voteSchema.js
├── services/             # Business logic
│   ├── answerService.mjs
│   ├── questionService.mjs
│   └── voteService.mjs
├── utils/                # Utility functions
│   ├── AppError.js
│   └── db.mjs
├── app.mjs               # Express app configuration
├── .env                  # Environment variables
└── package.json
```

## 🏛️ Architecture
This project follows a **layered architecture** pattern:

1. **Routes Layer** (`routes/`): Defines API endpoints and HTTP methods
2. **Controllers Layer** (`controllers/`): Handles HTTP requests and responses
3. **Services Layer** (`services/`): Contains business logic
4. **Repositories Layer** (`repositories/`): Handles database operations
5. **Models/Schemas Layer** (`schemas/`): Defines data validation schemas
6. **Middlewares Layer** (`middlewares/`): Handles request validation, error handling, and request preprocessing.

## 🔒 Error Handling
The application uses a centralized error handling middleware. Errors are returned in the following format:

```json
{
  "message": "Error message here"
}
```

In development mode, additional error details including stack traces are included.

## 📦 Dependencies
- **express**: Web framework for Node.js
- **pg**: PostgreSQL client for Node.js
- **zod**: Schema validation library
- **helmet**: Security middleware
- **morgan**: HTTP request logger
- **dotenv**: Environment variable management
- **nodemon**: Development server with auto-reload

## 🧪 Testing
The easiest way to test the API is through the **Swagger UI** interface:

1. Start the server: `npm start`
2. Open your browser and navigate to `http://localhost:4000/api-docs`
3. Click on any endpoint to expand it
4. Click the **"Try it out"** button
5. Fill in the required parameters and request body
6. Click **"Execute"** to send the request
7. View the response directly in the browser

Alternatively, you can use other API testing tools:
- **Postman**
- **Thunder Client** (VS Code extension)
- **curl**
- **Insomnia**

## 📝 Notes
- When a question is deleted, all associated answers are automatically deleted (CASCADE delete)
- Search functionality supports partial matching and is case-insensitive
- Answer content is limited to 300 characters maximum
- Category field is optional for questions

## 👨‍💻 Author
- Nitithon (Best)
- Full Stack Developer Student (FSD10)
- TechUp JavaScript Checkpoint Project


## 📄 License
ISC
