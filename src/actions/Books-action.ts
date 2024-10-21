/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import qs from 'qs';
export async function getBooks({
    query,
    page,
    limit,
    author,
    genre,
    publicationDate,
}: {
    query?: string;
    genre?: string;
    author?: string;
    page?: number;
    limit?: number;
    publicationDate?: any;
}) {
    console.log("🚀 ~ genre:", genre)
    const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';

    try {
        const response = await axios.get(`${baseURL}/api/book`, {
            params: { query, page, limit, publicationDate, author, genre },
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        });
        return { data: response.data.data, meta: response.data.pagination };
    } catch (error: any) {
        console.log("🚀 ~ error:", error);
        const errorMessage = error.response?.data?.error || "Failed to fetch books";
        return { error: errorMessage };
    }
}
