'use client';

import { useState } from 'react';
import { SHOP_PAINTINGS, SHIPPING_RATES, ShippingRegion } from '../../data/shop';

export default function ShopButton({ paintingId }: { paintingId: string }) {
  const painting = SHOP_PAINTINGS.find((p) => p.id === paintingId);
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState<ShippingRegion>('PT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!painting || !painting.available || painting.priceEUR == null) {
    return null;
  }

  const handleBuy = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paintingId, region }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Não foi possível iniciar o pagamento.');
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ocorreu um erro. Tente novamente.');
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-3 rounded-full border-2 border-magenta px-5 py-2 text-magenta hover:bg-magenta hover:text-purple3 transition-colors font-spacemono text-sm"
        aria-label={`Comprar obra original ${painting.title}`}
      >
        Comprar Original — €{painting.priceEUR}
      </button>
    );
  }

  return (
    <div className="mt-3 flex flex-col items-center gap-2 w-full max-w-xs">
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value as ShippingRegion)}
        className="rounded-lg border-2 border-magenta px-3 py-2 bg-purple3 text-white text-sm w-full"
        aria-label="Região de envio"
      >
        {Object.entries(SHIPPING_RATES).map(([key, rate]) => (
          <option key={key} value={key}>
            {rate.label} — envio €{(rate.amountCents / 100).toFixed(2)}
          </option>
        ))}
      </select>
      <button
        onClick={handleBuy}
        disabled={loading}
        className="rounded-full border-2 border-magenta px-5 py-2 text-magenta bg-purple3 hover:bg-magenta hover:text-purple3 transition-colors font-spacemono text-sm w-full disabled:opacity-50"
      >
        {loading ? 'A processar...' : 'Continuar para pagamento'}
      </button>
      {error && <span className="text-pink text-xs text-center">{error}</span>}
    </div>
  );
}
