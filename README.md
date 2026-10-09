# O Grego — Cardápio digital

Uma versão moderna do cardápio do restaurante O Grego, refeita com **React + TypeScript + Vite** e design responsivo para celular.

## Demonstração

- **Demonstração moderna:** https://4173-ibzow5gkllquizvx76kzh-bd162090.us4.manus.computer/
- **Site Netlify anterior:** https://menuogrego.netlify.app/
- **Repositório público:** https://github.com/jailsonb958-dotcom/menuogrego

A demonstração moderna inclui busca, filtros por categoria, cards com imagens, carrinho lateral, ajuste de quantidades e resumo pronto para WhatsApp. A URL de demonstração pertence ao ambiente temporário de desenvolvimento.

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
- Resumo do pedido copiado para o WhatsApp.
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

O número real do WhatsApp ainda precisa ser configurado no checkout para transformar o resumo copiado em link direto de conversa.

## Estrutura

```text
src/main.tsx       # Aplicação React e estado do carrinho
src/styles.css     # Design system e responsividade
src/menu-data.json # Catálogo de pratos
public/assets/     # Imagens servidas pelo Vite
```
