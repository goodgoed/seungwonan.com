"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-auto flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-bold">Error!</h1>
      <button
        type="button"
        onClick={reset}
        className="py-2 px-4 border-[1px] border-gray-400 rounded-md"
      >
        TRY AGAIN
      </button>
    </div>
  );
}
