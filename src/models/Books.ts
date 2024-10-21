import mongoose, { Schema } from "mongoose";
const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    publicationDate: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    pageCount: {
        type: Number,
        min: 1
    },
    language: {
        type: String,
        trim: true
    },
    publisher: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
export default Book


