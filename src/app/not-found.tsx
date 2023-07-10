import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-auto flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-bold">Error 404</h1>
      <button
        type="button"
        className="py-2 px-4 border-[1px] border-gray-400 rounded-md"
      >
        <Link href="/">GO BACK</Link>
      </button>
    </div>
  );
}
