'use client';


import { useRef } from 'react';

export default function ContatoPage() {
  const formRef = useRef<HTMLFormElement>(null);

  // For now, just a placeholder for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, integrate with an email service (e.g., EmailJS, Formspree, or custom API)
    alert('Mensagem enviada!');
    formRef.current?.reset();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-purple3 px-4 py-16">
      <div className="w-full max-w-lg bg-purple2 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-purple1 mb-6 text-center">Contato</h1>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="text-purple1 font-semibold">Seu email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-lg border-2 border-purple1 px-4 py-2 bg-purple3 text-white focus:outline-none focus:ring-2 focus:ring-purple1"
            aria-label="Seu email"
            tabIndex={0}
          />
          <label htmlFor="subject" className="text-purple1 font-semibold">Assunto</label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className="rounded-lg border-2 border-purple1 px-4 py-2 bg-purple3 text-white focus:outline-none focus:ring-2 focus:ring-purple1"
            aria-label="Assunto"
            tabIndex={0}
          />
          <label htmlFor="message" className="text-purple1 font-semibold">Mensagem</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="rounded-lg border-2 border-purple1 px-4 py-2 bg-purple3 text-white focus:outline-none focus:ring-2 focus:ring-purple1"
            aria-label="Mensagem"
            tabIndex={0}
          />
          <button
            type="submit"
            className="mt-4 rounded-full border-2 border-purple1 px-6 py-2 text-purple1 bg-purple3 font-bold hover:bg-purple1 hover:text-purple3 transition-colors"
            aria-label="Enviar mensagem"
            tabIndex={0}
          >
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
} 