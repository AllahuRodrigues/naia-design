# Portfólio de Naia

Este é o portfólio artístico de Shanaia "Naia" de Sousa, desenvolvido com Next.js 14, TailwindCSS, TypeScript e GSAP.

## Stack
- Next.js 14
- React 18
- TailwindCSS
- TypeScript
- GSAP

## Estrutura
- `/app` - Páginas e layouts principais
- `/app/components` - Componentes reutilizáveis
- `/app/api/checkout` - Endpoint que cria a sessão de pagamento no Stripe
- `/images` - Imagens do portfólio
- `/data/shop.ts` - Preços e disponibilidade das obras originais à venda

## Vender uma obra original (Stripe)

1. Copie `.env.local.example` para `.env.local` e cole a sua chave secreta do Stripe
   (Stripe Dashboard > Developers > API keys). Use uma chave `sk_test_...` para testar
   e a `sk_live_...` quando estiver pronta para receber pagamentos reais.
2. Abra `data/shop.ts` e encontre a obra que quer vender. Defina `priceEUR` com o preço
   em euros e `available: true`. O botão "Comprar Original" aparece automaticamente no
   site assim que isto for publicado.
3. Depois de uma obra ser vendida, volte a `data/shop.ts` e mude essa obra para
   `available: false` para que deixe de aparecer como disponível.
4. As tarifas de envio (Portugal / UE / Internacional) e os países aceites no checkout
   estão no mesmo ficheiro, em `SHIPPING_RATES` e `ALLOWED_SHIPPING_COUNTRIES`.

O Stripe envia-lhe automaticamente um email de notificação sempre que uma compra é
concluída. A morada de envio do comprador fica visível no Dashboard do Stripe, dentro
dos detalhes dessa sessão de checkout.