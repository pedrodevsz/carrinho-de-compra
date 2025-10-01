import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-y-4 min-h-screen justify-center items-center">
      <h1 className="text-2xl font-bold">Carrinho tutorial</h1>
      <Link href="user/dashboard" className="text-blue-500 font-semibold">Ver itens de loja</Link>
    </main>
  );
}
