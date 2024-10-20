import connectDB from "@/lib/dbConnect";
import Book from "@/models/Books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get('query')?.trim();
    const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10');

    const query = searchQuery
        ? { name: { $regex: searchQuery, $options: "i" } }
        : {};

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
