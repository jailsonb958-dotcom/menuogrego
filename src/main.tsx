import { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, ChefHat, ChevronDown, Minus, Plus, Search, ShoppingBag, Sparkles, Trash2, X } from 'lucide-react'
import menu from './menu-data.json'
import './styles.css'

type MenuItem = {
  category: string
  name: string
  description: string
  price: number
  image: string
}
type Cart = Record<string, number>

const items = menu as MenuItem[]
const categoryLabels: Record<string, string> = {
  STARTERS: 'Entradas', SALADS: 'Saladas', 'KIDS MENU': 'Kids', 'PSARIA(FISH)': 'Peixes',
  'KOTOPOULO(CHICKEN)': 'Frango', 'HIRINO(PORK)': 'Porco', 'ARNAKI(LAMB)': 'Cordeiro',
  MEAT: 'Carnes', 'MAKARONADES(PASTA)': 'Massas', COMBOS: 'Combos', DESSERTS: 'Sobremesas',
}
const categories = [...new Set(items.map((item) => item.category))]
const whatsappNumber = '5521981625903'
const highlights = [
  { eyebrow: 'Especialidade para compartilhar', title: 'A mesa grega começa aqui.', image: '/assets/img/pikilia.jpeg' },
  { eyebrow: 'Receitas do mar', title: 'Frescor mediterrâneo em cada garfada.', image: '/assets/img/lagosta-liguine.JPG' },
]
const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
const itemId = (item: MenuItem) => `${item.category}-${item.name}`

function App() {
  const [activeCategory, setActiveCategory] = useState('TODOS')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<Cart>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [hero, setHero] = useState(0)

  const visibleItems = useMemo(() => items.filter((item) => {
    const matchesCategory = activeCategory === 'TODOS' || item.category === activeCategory
    const term = query.toLowerCase().trim()
    const matchesQuery = !term || `${item.name} ${item.description}`.toLowerCase().includes(term)
    return matchesCategory && matchesQuery
  }), [activeCategory, query])
  const cartItems = items.filter((item) => cart[itemId(item)])
  const cartCount = cartItems.reduce((sum, item) => sum + cart[itemId(item)], 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * cart[itemId(item)], 0)

  const add = (item: MenuItem) => setCart((current) => ({ ...current, [itemId(item)]: (current[itemId(item)] || 0) + 1 }))
  const remove = (item: MenuItem) => setCart((current) => {
    const next = { ...current, [itemId(item)]: (current[itemId(item)] || 0) - 1 }
    if (next[itemId(item)] <= 0) delete next[itemId(item)]
    return next
  })
  const buildOrder = () => cartItems.map((item) => `${cart[itemId(item)]}x ${item.name.replace(/^\d+\s/, '')} — ${money(item.price * cart[itemId(item)])}`).join('\n') + `\n\nTotal: ${money(cartTotal)}`
  const checkout = () => {
    const message = `Olá, O Grego! Gostaria de fazer este pedido:\n\n${buildOrder()}`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#inicio" aria-label="O Grego início"><span className="brand-mark">OG</span><span><strong>O Grego</strong><small>sabores mediterrâneos</small></span></a>
      <nav className="desktop-nav" aria-label="Navegação principal"><a href="#cardapio">Cardápio</a><a href="#historia">Nossa mesa</a><a href="#contato">Contato</a></nav>
      <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho"><ShoppingBag size={19}/><span>Pedido</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
    </header>

    <main id="inicio">
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(16,45,70,.88), rgba(16,45,70,.15)), url(${highlights[hero].image})` }}>
        <div className="hero-copy"><p className="eyebrow"><Sparkles size={15}/> cozinha grega contemporânea</p><h1>{highlights[hero].title}</h1><p>Um cardápio feito para descobrir, compartilhar e voltar. Ingredientes frescos, receitas de família e a energia acolhedora do Mediterrâneo.</p><a className="primary-button" href="#cardapio">Explorar o cardápio <ArrowRight size={18}/></a></div>
        <div className="hero-switcher">{highlights.map((slide, index) => <button key={slide.title} className={hero === index ? 'active' : ''} onClick={() => setHero(index)}><span>0{index + 1}</span>{slide.eyebrow}</button>)}</div>
      </section>

      <section className="intro" id="historia"><div><p className="eyebrow dark"><ChefHat size={15}/> da nossa cozinha</p><h2>Feito para colocar a conversa no centro da mesa.</h2></div><p>Do primeiro pão ao último gole, cada prato celebra a simplicidade generosa da Grécia. Navegue por categoria ou pesquise sua próxima descoberta.</p></section>

      <section className="menu-section" id="cardapio"><div className="menu-filter-panel"><div className="filter-heading"><p className="eyebrow dark">navegue pelo cardápio</p><strong>Escolha uma categoria</strong><span>{visibleItems.length} {visibleItems.length === 1 ? 'prato encontrado' : 'pratos encontrados'}</span></div><div className="category-scroller" role="tablist" aria-label="Categorias do cardápio"><button aria-pressed={activeCategory === 'TODOS'} className={activeCategory === 'TODOS' ? 'selected' : ''} onClick={() => setActiveCategory('TODOS')}>Todos <span>{items.length}</span></button>{categories.map((category) => <button aria-pressed={activeCategory === category} className={activeCategory === category ? 'selected' : ''} key={category} onClick={() => setActiveCategory(category)}>{categoryLabels[category] || category}<span>{items.filter((item) => item.category === category).length}</span></button>)}</div></div>
        <div className="section-heading"><div><p className="eyebrow dark">o cardápio</p><h2>Escolha seu momento</h2></div><label className="search-box"><Search size={18}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar um prato..." aria-label="Buscar um prato"/>{query && <button onClick={() => setQuery('')} aria-label="Limpar busca"><X size={15}/></button>}</label></div>
        <div className="menu-grid">{visibleItems.map((item) => <article className="dish-card" key={itemId(item)}><div className="dish-image"><img src={item.image} alt={item.name} loading="lazy"/><span>{categoryLabels[item.category] || item.category}</span></div><div className="dish-content"><div><h3>{item.name.replace(/^\d+\s/, '')}</h3><p>{item.description.replace(/\s+/g, ' ')}</p></div><div className="dish-footer"><strong>{money(item.price)}</strong><button className="add-button" onClick={() => add(item)}><Plus size={16}/> adicionar</button></div></div></article>)}</div>
        {visibleItems.length === 0 && <div className="empty-state"><Search size={28}/><h3>Nenhum prato encontrado</h3><p>Tente outra busca ou escolha uma categoria.</p></div>}
      </section>
    </main>
    <footer id="contato"><div className="footer-brand"><span className="brand-mark">OG</span><strong>O Grego</strong></div><p>Uma experiência mediterrânea, servida com tempo e afeto.</p><small>Cardápio digital · São Paulo</small></footer>

    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow dark">seu pedido</p><h2>{cartCount ? `${cartCount} ${cartCount === 1 ? 'item' : 'itens'}` : 'Seu carrinho'}</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fechar carrinho"><X/></button></div>{cartItems.length === 0 ? <div className="cart-empty"><ShoppingBag size={38}/><h3>Comece pelos sabores</h3><p>Adicione seus pratos favoritos ao pedido.</p></div> : <><div className="cart-list">{cartItems.map((item) => <div className="cart-line" key={itemId(item)}><img src={item.image} alt=""/><div className="cart-line-info"><h3>{item.name.replace(/^\d+\s/, '')}</h3><strong>{money(item.price * cart[itemId(item)])}</strong><div className="quantity"><button onClick={() => remove(item)} aria-label="Diminuir quantidade"><Minus size={14}/></button><span>{cart[itemId(item)]}</span><button onClick={() => add(item)} aria-label="Aumentar quantidade"><Plus size={14}/></button><button className="delete-button" onClick={() => setCart((current) => { const next={...current}; delete next[itemId(item)]; return next })} aria-label="Remover item"><Trash2 size={14}/></button></div></div></div>)}</div><div className="cart-summary"><div><span>Total</span><strong>{money(cartTotal)}</strong></div><button className="checkout-button" onClick={checkout}>Enviar pedido pelo WhatsApp <ArrowRight size={17}/></button><small>O pedido será aberto no WhatsApp do restaurante: (21) 98162-5903.</small></div></>}</aside></div>}
  </div>
}

createRoot(document.getElementById('root')!).render(<App />)
