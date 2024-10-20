
import { getBooks } from "@/actions/Books-action";
import MainHome from "@/components/layout/HomePage/MainHome";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: number; limit?: number; query?: string };
}) {
  const { error, data, meta } = await getBooks({
    page: searchParams.page,
    limit: searchParams.limit,
    query: searchParams.query,
  });
  if (error) {
    return <div className="min-h-screen w-screen flex items-center justify-center">
      <p className="text-red-500 ">{error && error}</p>
    </div>
  }
  console.log("🚀 ~ meta:", meta)
  console.log("🚀 ~ data:", data)
  return (
    <>
      <MainHome data={data} meta={meta} />
    </>
  );
}
