/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export async function getBooks({
    query,
    page,
    limit,
}: {
    query?: string;
    page?: number;
    limit?: number;
}) {
    const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';

    try {
        const response = await axios.get(`${baseURL}/api/book`, {
            params: { query, page, limit },
        });
        return { data: response.data.data, meta: response.data.pagination };
    } catch (error: any) {
        console.log("🚀 ~ error:", error);
        const errorMessage = error.response?.data?.error || "Failed to fetch books";
        return { error: errorMessage };
    }
}
