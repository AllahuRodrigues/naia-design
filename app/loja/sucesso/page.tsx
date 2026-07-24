import Link from 'next/link';

export default function SucessoPage({
  searchParams,
}: {
  searchParams: { obra?: string };
}) {
  const obra = searchParams.obra ? decodeURIComponent(searchParams.obra) : '';

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-purple3 text-center px-6 py-24">
      <h1 className="text-4xl font-styleScript font-inter text-purple1 mb-4">Obrigada pela sua compra!</h1>
      <p className="text-lg text-white max-w-xl mb-2">
        {obra ? `A sua encomenda de "${obra}" foi confirmada.` : 'A sua encomenda foi confirmada.'}
      </p>
      <p className="text-base text-white/80 max-w-xl mb-8">
        A Naia vai entrar em contacto consigo brevemente por email para combinar os detalhes do envio da obra original.
      </p>
      <Link
        href="/"
        className="rounded-full border-2 border-purple1 px-8 py-3 text-purple1 hover:bg-purple1 hover:text-purple3 transition-colors font-bold text-lg"
      >
        Voltar ao site
      </Link>
    </main>
  );
}
