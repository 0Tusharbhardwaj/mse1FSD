const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required']
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true
  },
  genre: {
    type: String,
    required: [true, 'Genre/Category is required']
  },
  publisher: {
    type: String,
    required: [true, 'Publisher is required']
  },
  totalCopies: {
    type: Number,
    required: [true, 'Total Copies is required'],
    min: [0, 'Total Copies must be a positive number']
  },
  status: {
    type: String,
    default: 'Available',
    enum: {
      values: ['Available', 'Checked Out', 'Lost', 'Maintenance'],
      message: 'Status must be Available, Checked Out, Lost, or Maintenance'
    }
  },
  bookId: {
    type: String,
    unique: true,
    default: function() {
      // Auto-generate a unique book ID (e.g., BOOK-123456789)
      return `BOOK-${Date.now()}${Math.floor(Math.random() * 1000)}`;
    }
  },
  publicationYear: {
    type: Number
  },
  availableCopies: {
    type: Number,
    default: function() {
      return this.totalCopies;
    },
    min: [0, 'Available Copies cannot be less than 0']
  },
  shelfLocation: {
    type: String
  },
  bookType: {
    type: String,
    enum: {
      values: ['Reference', 'Circulating'],
      message: 'Book Type must be Reference or Circulating'
    },
    default: 'Circulating'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
