import dynamic from "next/dynamic";
import Link from "next/link";

const PushStatus = dynamic(() => import("@/app/components/PushStatus"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <PushStatus />
      <Link href="/push">푸시 보내기</Link>
    </>
  );
}
