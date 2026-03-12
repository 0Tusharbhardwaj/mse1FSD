const mongoose = require('mongoose');
const Book = require('./models/Book');

const seedDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://admin:Tushar%40123@cluster0.fn39ozw.mongodb.net/libraryDB?retryWrites=true&w=majority");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Clear existing
    await Book.deleteMany({});
    
    const sampleBooks = [
      {
        "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
        "author": "Robert C. Martin",
        "isbn": "978-0132350884",
        "genre": "Computer Science",
        "publisher": "Prentice Hall",
        "totalCopies": 5,
        "publicationYear": 2008,
        "shelfLocation": "A1-Rack1",
        "bookType": "Circulating"
      },
      {
        "title": "The Pragmatic Programmer",
        "author": "David Thomas, Andrew Hunt",
        "isbn": "978-0135957059",
        "genre": "Software Engineering",
        "publisher": "Addison-Wesley Professional",
        "totalCopies": 3,
        "publicationYear": 2019,
        "shelfLocation": "A1-Rack2",
        "bookType": "Reference"
      }
    ];
    
    await Book.insertMany(sampleBooks);
    console.log('Database Seeded Successfully');
    process.exit(0);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

seedDB();
