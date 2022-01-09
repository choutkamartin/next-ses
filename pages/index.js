import Link from "next/link";

export default function Index() {
  return (
    <div>
      <Link href="/api/email-1">
        <a>Hit API route 1</a>
      </Link>
      <Link href="/api/email-2">
        <a>Hit API route 2</a>
      </Link>
    </div>
  );
}
