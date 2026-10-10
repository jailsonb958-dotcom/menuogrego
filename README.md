# O Grego — Cardápio digital

Uma versão moderna do cardápio do restaurante O Grego, refeita com **React + TypeScript + Vite** e design responsivo para celular.

## Acesso online

- **Site publicado no Vercel:** https://menuogrego.vercel.app/
- **Repositório público:** https://github.com/jailsonb958-dotcom/menuogrego
- **Site Netlify:** https://menuogrego.netlify.app/

O Netlify é o endereço recomendado para a operação permanente: ele também está conectado à branch `main` do GitHub e será atualizado automaticamente a cada novo push.

## Painel de administração

O projeto inclui um painel **Decap CMS** para gerenciar o cardápio sem editar código:

- **Painel:** https://menuogrego.netlify.app/admin/
- **Gerenciável:** nome, categoria, descrição, preço e foto de cada prato.
- **Como funciona:** cada alteração salva o arquivo `src/menu-data.json` no GitHub e o Netlify publica a nova versão automaticamente.

Para ativar o primeiro acesso no Netlify, habilite **Identity** e o provedor **Git Gateway/GitHub** nas configurações do site. Depois convide o administrador em **Identity → Invite users**. O login protege a área `/admin/`; o cardápio público continua aberto para os clientes.

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
- Painel administrativo no navegador para atualizar pratos, preços, categorias, descrições e imagens.

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
src/menu-data.json # Catálogo editável de pratos
public/assets/     # Imagens servidas pelo Vite
public/admin/      # Painel Decap CMS e configuração do editor
```
