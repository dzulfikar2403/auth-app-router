import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex gap-4">
        <Link href={'/login'} className="bg-slate-700 px-4 py-2 rounded text-white font-bold">Login</Link>
        <Link href={'/register'} className="bg-white border px-4 py-2 rounded text-slate font-bold">Register</Link>
      </div>
    </div>
  );
}
