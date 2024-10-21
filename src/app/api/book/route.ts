/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/dbConnect";
import Book from "@/models/Books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get('query')?.trim();
    const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '6');
    const publicationDate = req.nextUrl.searchParams.get('publicationDate');
    const authors = req.nextUrl.searchParams.getAll('author');
    const genres = req.nextUrl.searchParams.getAll('genre');

    console.log("🚀 ~ GET ~ authors:", authors);
    console.log("🚀 ~ GET ~ genres:", genres);

    const query: any = {};

    if (searchQuery) {
        query.title = { $regex: searchQuery, $options: "i" };
    }

    if (authors.length > 0) {
        query.author = { $in: authors.map(author => new RegExp(author, "i")) };
    }

    if (genres.length > 0) {
        query.genre = { $in: genres };
    }

    if (publicationDate) {
        const [startYear, endYear] = publicationDate.split('-').map(Number);
        query.publicationDate = { $gte: startYear, $lte: endYear };
    }

    await connectDB();

    try {
        const totalBooks = await Book.countDocuments(query);
        const booksData = await Book.find(query)
            .skip((page - 1) * limit)
            .limit(limit);



        const meta = {
            currentPage: page,
            pageItems: booksData.length,
            totalItems: totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
        };

        return NextResponse.json(
            {
                success: true,
                message: "Books fetched successfully",
                data: booksData,
                pagination: meta,
            }
        );
    } catch (error) {
        console.log("🚀 ~ GET ~ error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error in fetching books",
            },
            { status: 500 }
        );
    }
}
