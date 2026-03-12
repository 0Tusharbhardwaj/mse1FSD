# University Library Management System - Backend

A production-ready Node.js REST API for a University Library Management System.

## Technologies Used
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL Database
- **Mongoose**: Object Data Modeling (ODM) library
- **Dotenv**: Environment variable management

## Project Structure
```text
/
├── config/
│   └── db.js            # MongoDB connection
├── controllers/
│   └── bookController.js# API Logic for routing
├── middleware/
│   └── errorHandler.js  # Global error handling
├── models/
│   └── Book.js          # Mongoose schema mapping
├── routes/
│   └── books.js         # API endpoint definitions
├── .env                 # Environment variables
├── server.js            # Entry point for the application
├── sample_data.json     # Sample dataset for Postman testing
└── package.json
```

## Features
- Add, read, update, and delete (CRUD) books.
- Search books dynamically by `title` and/or `author`.
- Comprehensive validation and constraint checks on database schema.
- Global, structured error handling including specialized messages for MongoDB validation and Cast errors.

## API Endpoints

### Books
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/books` | Retrieve all books |
| `POST` | `/books` | Add a new book |
| `GET` | `/books/:id` | Retrieve a single book dynamically by ID |
| `PUT` | `/books/:id` | Update existing book details |
| `DELETE` | `/books/:id` | Request deletion of a single book |
| `GET` | `/books/search?title=...&author=...` | Search for books by title or author |

---

## Deployment Instructions

### 1. Pushing to GitHub
1. In your local terminal, initialize git if you haven't yet:
   ```bash
   git init
   ```
2. Create a `.gitignore` file and include:
   ```text
   node_modules/
   .env
   ```
3. Add and commit your changes:
   ```bash
   git add .
   git commit -m "Initial commit for Library Backend API"
   ```
4. Link to your GitHub repository and push:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### 2. Deploying to Render
1. Go to [Render.com](https://render.com/) and connect your GitHub account.
2. Select **New** > **Web Service**.
3. Choose the GitHub repository you just pushed.
4. Fill in the deployment details:
   - **Name**: e.g., `library-management-backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. At the bottom, click **Advanced** or **Environment Variables**, and add your variables:
   - `PORT`: `5000` (Optional, Render dynamically assigns ports as well)
   - `MONGO_URI`: Enter your MongoDB Atlas connection string (e.g., `mongodb+srv://<user>:<password>@cluster...`).
6. Click **Create Web Service**. Wait a few minutes and Render will provide a live URL for your backend API!

## Testing with Postman
1. Setup a dummy MongoDB cluster and populate your `MONGO_URI` in `.env`.
2. Start the server locally: `node server.js`
3. In Postman, set method to **POST**, and url to `http://localhost:5000/books`.
4. Go to **Body** > **raw** > **JSON**, and use one of the records from `sample_data.json` attached in this project.
