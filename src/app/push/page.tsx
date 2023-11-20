import dynamic from "next/dynamic";
import Link from "next/link";

const SendPush = dynamic(() => import("@/app/components/SendPush"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <SendPush />
      <Link href="/">홈으로</Link>
    </>
  );
}
