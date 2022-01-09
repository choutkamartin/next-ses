import Link from "next/link";

export default function Index() {
  return (
    <div>
      Hit{" "}
      <Link href="/api/email">
        <a>API route</a>
      </Link>
    </div>
  );
}
