/* This example requires Tailwind CSS v2.0+ */
export default function PaginationLink({ page }) {
  return (
    <a
      href={`?_page=${page}`}
      aria-current="page"
      className="z-10 bg-gray-100 border-gray-500 text-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
    >
      {page}
    </a>
  );
}
