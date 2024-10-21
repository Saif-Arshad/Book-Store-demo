/* eslint-disable @typescript-eslint/no-explicit-any */

import { getBooks } from "@/actions/Books-action";
import MainHome from "@/components/layout/HomePage/MainHome";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: number; limit?: number; query?: string, publicationDate?: any, author?: string, genre?: string };
}) {
  const { error, data, meta } = await getBooks({
    page: searchParams.page,
    limit: searchParams.limit,
    query: searchParams.query,
    publicationDate: searchParams.publicationDate,
    author: searchParams.author,
    genre: searchParams.genre,
  });
  if (error) {
    return <div className="min-h-screen w-screen flex items-center justify-center">
      <p className="text-red-500 ">{error && error}</p>
    </div>
  }
  return (
    <>
      <MainHome data={data} meta={meta} />
    </>
  );
}
