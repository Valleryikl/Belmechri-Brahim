'use client'
import { useEffect, useRef, useState } from 'react'

// --- Навигация ---
const SECTIONS = [
  { id: 'home',    label: 'Home' },
  { id: 'about',   label: 'About' },
  { id: 'works',   label: 'Works' },
  { id: 'contact', label: 'Contact' },
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<string>('home')

  // Колёсико мыши по Y -> горизонтальный скролл (только desktop)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      const isDesktop = window.matchMedia('(min-width:1024px)').matches
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!isDesktop) return
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollBy({ left: e.deltaY, behavior: reduced ? 'auto' : 'smooth' })
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Подсветка активной секции
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const sections = Array.from(el.querySelectorAll<HTMLElement>('section[id]'))
    const isDesktop = window.matchMedia('(min-width:1024px)').matches

    // Область наблюдения: на десктопе ширина экрана = одна секция по X
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        root: el,
        // Берём 60% пересечения для уверенной активации
        threshold: isDesktop ? 0.6 : 0.6,
      }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Скролл к секции по клику в меню
  const scrollToSection = (id: string) => {
    const el = containerRef.current
    if (!el) return
    const target = el.querySelector<HTMLElement>(`#${id}`)
    if (!target) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Горизонтальный контейнер на desktop, вертикальный поток на mobile — оба варианта работают с scrollIntoView
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', inline: 'start', block: 'start' })
  }

  return (
    <div className="relative">
      {/* Навбар */}
      <nav
        className="
          fixed inset-x-0 top-0 z-50
          bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30
          border-b border-white/10
        "
        aria-label="Primary"
      >
        <div className="mx-auto max-w-7xl px-4">
          <ul className="flex items-center gap-4 py-3">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollToSection(s.id)}
                  className={`
                    px-3 py-1.5 rounded-full text-sm
                    transition-colors
                    ${active === s.id
                      ? 'bg-white text-black'
                      : 'text-white/80 hover:text-white hover:bg-white/10'}
                  `}
                  aria-current={active === s.id ? 'page' : undefined}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Контейнер секций */}
      <main
        ref={containerRef}
        className="
          pt-14  /* отступ под фиксированный навбар */
          flex flex-col lg:flex-row lg:h-screen
          overflow-y-auto lg:overflow-y-hidden lg:overflow-x-auto
          snap-none lg:snap-x lg:snap-mandatory motion-reduce:snap-none
        "
        style={{
          scrollBehavior: 'smooth',
          // скрываем горизонтальный скроллбар, но скролл оставляем
          // дополни в globals.css (см. прошлый шаг)
          // @ts-ignore
          overscrollBehaviorInline: 'contain',
        }}
      >
        <Section id="home"    title="Home"    className="bg-neutral-900" />
        <Section id="about"   title="About"   className="bg-zinc-900" />
        <Section id="works"   title="Works"   className="bg-stone-900" />
        <Section id="contact" title="Contact" className="bg-black" />
      </main>
    </div>
  )
}

function Section({
  id,
  title,
  className = '',
}: {
  id: string
  title: string
  className?: string
}) {
  return (
    <section
      id={id}
      className={`
        min-h-[calc(100vh-3.5rem)]  /* на мобиле учитываем высоту навбара (pt-14) */
        lg:min-h-full lg:min-w-[100vw]
        snap-start
        flex items-center justify-center
        p-8 ${className}
      `}
      style={{ scrollSnapStop: 'always' }}
      aria-label={title}
    >
      <h1 className="text-white/95 text-6xl lg:text-8xl font-semibold">{title}</h1>
    </section>
  )
}
