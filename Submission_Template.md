# University Library Management System - Backend API

## 1. Source Code

### server.js
```javascript
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const books = require('./routes/books');

const app = express();

// Body parser
app.use(express.json());

// Mount routers
app.use('/books', books);

// Error handler middleware (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
```

### config/db.js
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### models/Book.js
```javascript
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  author: { type: String, required: [true, 'Author is required'] },
  isbn: { type: String, required: [true, 'ISBN is required'], unique: true },
  genre: { type: String, required: [true, 'Genre/Category is required'] },
  publisher: { type: String, required: [true, 'Publisher is required'] },
  totalCopies: { type: Number, required: [true, 'Total Copies is required'], min: [0, 'Must be positive'] },
  status: { type: String, default: 'Available' },
  bookId: { type: String, unique: true, default: () => `BOOK-${Date.now()}` },
  publicationYear: { type: Number },
  availableCopies: { type: Number, default: function() { return this.totalCopies; } },
  shelfLocation: { type: String },
  bookType: { type: String, enum: ['Reference', 'Circulating'], default: 'Circulating' }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
```

### controllers/bookController.js
*(Code included in project files - paste here if required by instructor)*

### routes/books.js
*(Code included in project files - paste here if required by instructor)*

### middleware/errorHandler.js
*(Code included in project files - paste here if required by instructor)*

---

## 2. Server Terminal Output

**(📸 ADD YOUR SCREENSHOT HERE: Terminal showing `Server running on port 5000` and `MongoDB Connected`)**

---

## 3. Postman API Tests

### a) POST /books (Add a New Book)
```json
// POST Request Body
{"title":"Introduction to Algorithms","author":"Thomas H. Cormen","isbn":"978-0262033848","genre":"Computer Science","publisher":"MIT Press","totalCopies":10}
```
```json
// Response Status: 201
{
  "success": true,
  "data": {
    "title": "Introduction to Algorithms",
    "author": "Thomas H. Cormen",
    "isbn": "978-0262033848",
    "genre": "Computer Science",
    "publisher": "MIT Press",
    "totalCopies": 10,
    "status": "Available",
    "bookType": "Circulating",
    "_id": "69b24c3e1fdde2520372dc08",
    "bookId": "BOOK-1773292606147174",
    "availableCopies": 10,
    "createdAt": "2026-03-12T05:16:46.148Z",
    "updatedAt": "2026-03-12T05:16:46.148Z",
    "__v": 0
  }
}
```

### b) GET /books (Get All Books)
```json
// Response Status: 200
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "69b24ba5ba6dedee829bdd78",
      "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
      "author": "Robert C. Martin",
      "isbn": "978-0132350884",
      "genre": "Computer Science",
      "publisher": "Prentice Hall",
      "totalCopies": 5,
      "status": "Available",
      "publicationYear": 2008,
      "shelfLocation": "A1-Rack1",
      "bookType": "Circulating",
      "bookId": "BOOK-177329245307818",
      "availableCopies": 5,
      "__v": 0,
      "createdAt": "2026-03-12T05:14:13.081Z",
      "updatedAt": "2026-03-12T05:14:13.081Z"
    },
    {
      "_id": "69b24ba5ba6dedee829bdd79",
      "title": "The Pragmatic Programmer",
      "author": "David Thomas, Andrew Hunt",
      "isbn": "978-0135957059",
      "genre": "Software Engineering",
      "publisher": "Addison-Wesley Professional",
      "totalCopies": 3,
      "status": "Available",
      "publicationYear": 2019,
      "shelfLocation": "A1-Rack2",
      "bookType": "Reference",
      "bookId": "BOOK-1773292453079204",
      "availableCopies": 3,
      "__v": 0,
      "createdAt": "2026-03-12T05:14:13.082Z",
      "updatedAt": "2026-03-12T05:14:13.082Z"
    },
    {
      "_id": "69b24c3e1fdde2520372dc08",
      "title": "Introduction to Algorithms",
      "author": "Thomas H. Cormen",
      "isbn": "978-0262033848",
      "genre": "Computer Science",
      "publisher": "MIT Press",
      "totalCopies": 10,
      "status": "Available",
      "bookType": "Circulating",
      "bookId": "BOOK-1773292606147174",
      "availableCopies": 10,
      "createdAt": "2026-03-12T05:16:46.148Z",
      "updatedAt": "2026-03-12T05:16:46.148Z",
      "__v": 0
    }
  ]
}
```

### c) GET /books/:id (Get Single Book)
```json
// GET /books/69b24c3e1fdde2520372dc08
// Response Status: 200
{
  "success": true,
  "data": {
    "_id": "69b24c3e1fdde2520372dc08",
    "title": "Introduction to Algorithms",
    "author": "Thomas H. Cormen",
    "isbn": "978-0262033848",
    "genre": "Computer Science",
    "publisher": "MIT Press",
    "totalCopies": 10,
    "status": "Available",
    "bookType": "Circulating",
    "bookId": "BOOK-1773292606147174",
    "availableCopies": 10,
    "createdAt": "2026-03-12T05:16:46.148Z",
    "updatedAt": "2026-03-12T05:16:46.148Z",
    "__v": 0
  }
}
```

### d) PUT /books/:id (Update Book)
```json
// PUT Request Body
{"totalCopies":15}
```
```json
// Response Status: 200
{
  "success": true,
  "data": {
    "_id": "69b24c3e1fdde2520372dc08",
    "title": "Introduction to Algorithms",
    "author": "Thomas H. Cormen",
    "isbn": "978-0262033848",
    "genre": "Computer Science",
    "publisher": "MIT Press",
    "totalCopies": 15,
    "status": "Available",
    "bookType": "Circulating",
    "bookId": "BOOK-1773292606147174",
    "availableCopies": 10,
    "createdAt": "2026-03-12T05:16:46.148Z",
    "updatedAt": "2026-03-12T05:16:46.392Z",
    "__v": 0
  }
}
```

### e) GET /books/search?title=xyz
```json
// Response Status: 200
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "69b24c3e1fdde2520372dc08",
      "title": "Introduction to Algorithms",
      "author": "Thomas H. Cormen",
      "isbn": "978-0262033848",
      "genre": "Computer Science",
      "publisher": "MIT Press",
      "totalCopies": 15,
      "status": "Available",
      "bookType": "Circulating",
      "bookId": "BOOK-1773292606147174",
      "availableCopies": 10,
      "createdAt": "2026-03-12T05:16:46.148Z",
      "updatedAt": "2026-03-12T05:16:46.392Z",
      "__v": 0
    }
  ]
}
```

### f) DELETE /books/:id (Delete Book)
```json
// Response Status: 200
{
  "success": true,
  "data": {}
}
```


---

## 4. MongoDB Storage (Atlas)

**(📸 ADD YOUR SCREENSHOT HERE: MongoDB Atlas dashboard showing the `books` collection with inserted documents)**

---

## 5. Deployment Links and Render Status

**GitHub Repository URL:** 
https://github.com/0Tusharbhardwaj/mse1FSD

**Render Live API URL:** 
https://mse1fsd.onrender.com/books

**(📸 ADD YOUR SCREENSHOT HERE: Render dashboard showing "Deployed" / "Live" status)**
