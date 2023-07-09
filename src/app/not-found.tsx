import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>There is no such page!</h1>
      <Link href="/">GO BACK</Link>
    </div>
  );
}
