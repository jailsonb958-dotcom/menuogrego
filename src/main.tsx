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
const highlights = [
  { eyebrow: 'Especialidade para compartilhar', title: 'A mesa grega começa aqui.', image: '/assets/img/pikilia.jpeg' },
  { eyebrow: 'Receitas do mar', title: 'Frescor mediterrâneo em cada garfada.', image: '/assets/img/lagosta-liguine.JPG' },
]
const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
const itemId = (item: MenuItem) => `${item.category}-${item.name}`
const whatsappNumber = '5521981625903'

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
  const buildOrder = () => cartItems.map((item) => `${cart[itemId(item)]}x ${item.name} — ${money(item.price * cart[itemId(item)])}`).join('\n') + `\n\nTotal: ${money(cartTotal)}`
  const checkout = async () => {
    const message = `Olá, O Grego! Gostaria de fazer este pedido:\n\n${buildOrder()}`
    const encodedMessage = encodeURIComponent(message)

    await navigator.clipboard?.writeText(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
  }

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#inicio" aria-label="O Grego início"><span className="brand-mark">OG</span><span><strong>O Grego</strong><small>sabores mediterrâneos</small></span></a>
      <nav className="desktop-nav" aria-label="Navegação principal"><a href="#cardapio">Cardápio</a><a href="#historia">Nossa mesa</a><a href="#contato">Contato</a></nav>
      <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho"><ShoppingBag size={19}/><span>Pedido</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
    </header>

    <main id="inicio">
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(16,45,70,.88), rgba(16,45,70,.15)), url(${highlights[hero].image})` }}>
        <div className="hero-copy"><p className="eyebrow"><Sparkles size={15}/> cozinha grega contemporânea</p><h1>{highlights[hero].title}</h1><p>Um cardápio feito para descobrir, compartilhar e celebrar o melhor da mesa grega.</p><button className="cta" onClick={() => document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' })}>Ver cardápio <ArrowRight size={16}/></button></div>
        <div className="hero-switcher">{highlights.map((slide, index) => <button key={slide.title} className={hero === index ? 'active' : ''} onClick={() => setHero(index)}><span>0{index + 1}</span><strong>{slide.eyebrow}</strong></button>)}</div>
      </section>

      <section className="intro" id="historia"><div><p className="eyebrow dark"><ChefHat size={15}/> da nossa cozinha</p><h2>Feito para colocar a conversa no centro da mesa.</h2></div><p>Do primeiro aperitivo à sobremesa, cada prato é pensado para ser compartilhado, saboreado e lembrado.</p></section>

      <section className="menu-section" id="cardapio"><div className="section-heading"><div><p className="eyebrow dark">o cardápio</p><h2>Escolha seu momento</h2></div><label className="search-box"><Search size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar prato ou ingrediente" /></label></div>
        <div className="category-scroller"><button className={activeCategory === 'TODOS' ? 'selected' : ''} onClick={() => setActiveCategory('TODOS')}>Todos <span>{items.length}</span></button>{categories.map((category) => <button key={category} className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)}>{categoryLabels[category] || category} <span>{items.filter((item) => item.category === category).length}</span></button>)}</div>
        <div className="menu-grid">{visibleItems.map((item) => <article className="dish-card" key={itemId(item)}><div className="dish-image"><img src={item.image} alt={item.name} loading="lazy"/><button className="add-button" onClick={() => add(item)} aria-label={`Adicionar ${item.name}`}><Plus size={16}/></button></div><div className="dish-body"><div className="dish-header"><div><h3>{item.name}</h3><p>{item.description}</p></div><span>{money(item.price)}</span></div><div className="dish-meta"><span>{categoryLabels[item.category] || item.category}</span><button onClick={() => add(item)}>Adicionar</button></div></div></article>)}</div>
        {visibleItems.length === 0 && <div className="empty-state"><Search size={28}/><h3>Nenhum prato encontrado</h3><p>Tente outra busca ou escolha uma categoria.</p></div>}
      </section>
    </main>
    <footer id="contato"><div className="footer-brand"><span className="brand-mark">OG</span><strong>O Grego</strong></div><p>Uma experiência mediterrânea, servida com tempo e afeto.</p><small>Contato · WhatsApp · pedidos@oreggo.com.br</small></footer>

    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow dark">pedido</p><h3>Seu pedido</h3></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fechar carrinho"><X size={18}/></button></div>{cartItems.length === 0 ? <div className="empty-cart"><ShoppingBag size={28}/><p>Seu carrinho está vazio.</p></div> : <ul className="cart-list">{cartItems.map((item) => <li key={itemId(item)}><div><strong>{item.name}</strong><small>{money(item.price)} cada</small></div><div className="cart-controls"><button onClick={() => remove(item)} aria-label={`Remover ${item.name}`}><Minus size={14}/></button><span>{cart[itemId(item)]}</span><button onClick={() => add(item)} aria-label={`Adicionar mais ${item.name}`}><Plus size={14}/></button></div></li>)}</ul>}<div className="cart-footer"><div><span>Total</span><strong>{money(cartTotal)}</strong></div><button className="checkout-button" onClick={checkout} disabled={cartItems.length === 0}>Enviar pelo WhatsApp</button></div></aside></div>}
  </div>
}

createRoot(document.getElementById('root')!).render(<App />)
