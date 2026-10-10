# O Grego — Cardápio digital

Uma versão moderna do cardápio do restaurante O Grego, refeita com **React + TypeScript + Vite** e design responsivo para celular.

## Acesso online

- **Site publicado no Vercel:** https://menuogrego.vercel.app/
- **Repositório público:** https://github.com/jailsonb958-dotcom/menuogrego
- **Site Netlify anterior:** https://menuogrego.netlify.app/

O endereço recomendado para compartilhar com os clientes é o do Vercel. Ele está conectado à branch `main` do GitHub e será atualizado automaticamente a cada novo push.

### Pedidos pelo WhatsApp

O botão **Enviar pedido pelo WhatsApp** abre a conversa do restaurante com o pedido e o total preenchidos automaticamente.

- WhatsApp: **(21) 98162-5903**
- Link direto: https://wa.me/5521981625903

## Stack

- React
- TypeScript
- Vite
- CSS responsivo sem framework visual pesado
- Lucide React para ícones

## Funcionalidades

- Hero editorial com destaques do restaurante.
- Busca por nome e descrição dos pratos.
- Filtros por categoria com contagem de itens.
- Fotos dos pratos reaproveitadas do acervo original.
- Carrinho lateral com quantidade, remoção e total.
- Pedido enviado diretamente pelo WhatsApp com itens, quantidades e total.
- Layout adaptado para celular, tablet e desktop.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

O número configurado no checkout é `5521981625903`, correspondente ao WhatsApp **(21) 98162-5903**.

## Estrutura

```text
src/main.tsx       # Aplicação React e estado do carrinho
src/styles.css     # Design system e responsividade
src/menu-data.json # Catálogo de pratos
public/assets/     # Imagens servidas pelo Vite
```
