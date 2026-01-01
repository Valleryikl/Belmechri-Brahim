'use client'
import { useEffect, useRef, useState } from 'react'

import HomeSection from './components/sections/HomeSection'
import AboutSection from './components/sections/AboutSection'
import WorksSection from './components/sections/WorksSection'
import ContactSection from './components/sections/ContactSection'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'works', label: 'Works' },
  { id: 'contact', label: 'Contact' },
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<string>('home')
  const [menuOpen, setMenuOpen] = useState(false)

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id))
      },
      { root: el, threshold: 0.6 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Блокируем скролл фона, когда открыт бургер
  useEffect(() => {
    const original = document.body.style.overflow
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = original || ''
    return () => { document.body.style.overflow = original || '' }
  }, [menuOpen])

  // Закрыть по Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const scrollToSection = (id: string) => {
    const el = containerRef.current
    if (!el) return
    const target = el.querySelector<HTMLElement>(`#${id}`)
    if (!target) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', inline: 'start', block: 'start' })
  }

  const handleNavClick = (id: string) => {
    setMenuOpen(false)
    // Небольшая задержка, чтобы оверлей успел скрыться на слабых девайсах
    setTimeout(() => scrollToSection(id), 10)
  }

  return (
    <div className="relative">
      {/* Навбар */}
      <nav
        className="fixed inset-x-0 top-0 z-50 nav-bar flex justify-between w-[90%] mx-auto"
        aria-label="Primary"
      >
        <div className="px-4 h-14 flex items-center justify-between w-full">
          <button onClick={() => scrollToSection('home')}
            className="text-white cursor-pointer logo"
            aria-label="Go to Home">
            Belmechri Brahim
          </button>

          {/* Desktop меню */}
          <ul className="hidden lg:flex items-center gap-[50px]">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollToSection(s.id)}
                  className={`text-[20px] duration-300 ease-out ${active === s.id
                      ? 'text-white cursor-default font-semibold scale-105'
                      : 'text-white/70 cursor-pointer hover:text-white hover:scale-105 hover:font-semibold'
                    }`}
                  aria-current={active === s.id ? 'page' : undefined}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Burger (mobile) */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-white/90 hover:bg-white/10 focus:outline-none"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            {/* иконка */}
            <span className="relative block w-6 h-0.5 bg-white before:content-[''] before:absolute before:-top-2 before:w-6 before:h-0.5 before:bg-white after:content-[''] after:absolute after:top-2 after:w-6 after:h-0.5 after:bg-white" />
          </button>
        </div>
        <div className="nav-block">hh</div>
      </nav>

      {/* FULLSCREEN Mobile Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden={!menuOpen}
      >
        {/* затемнение */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        {/* контент */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-8 text-3xl font-semibold text-white transition-transform duration-300 ${menuOpen ? 'translate-y-0' : '-translate-y-4'
            }`}
          role="menu"
        >
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              role="menuitem"
              onClick={() => handleNavClick(s.id)}
              className={`px-6 py-3 rounded-full ${active === s.id ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'
                }`}
            >
              {s.label}
            </button>
          ))}

          {/* Кнопка закрыть */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-md text-white/90 hover:bg-white/10"
            aria-label="Close menu"
          >
            <span className="relative block w-6 h-0.5 bg-white rotate-45 before:content-[''] before:absolute before:inset-0 before:rotate-90 before:bg-white before:h-0.5" />
          </button>
        </div>
      </div>

      {/* Контент секций */}
      <main
        ref={containerRef}
        className="pt-14 flex flex-col lg:flex-row lg:h-screen overflow-y-auto lg:overflow-y-hidden lg:overflow-x-auto snap-none lg:snap-x lg:snap-mandatory motion-reduce:snap-none"
        style={{ scrollBehavior: 'smooth', overscrollBehaviorInline: 'contain' as any }}
      >
        <Section id="home" className="bg-black"><HomeSection /></Section>
        <Section id="about" className="bg-black"><AboutSection /></Section>
        <Section id="works" className="bg-black"><WorksSection /></Section>
        <Section id="contact" className="bg-black"><ContactSection /></Section>
      </main>
      <footer className='fixed bottom-0 z-50 pb-[25px] ml-[5%]'>
        <div className="flex w-full gap-[25px]"><a href="">
          <img src="icon/insta.png" alt="Instagram" />
        </a>
        <a href="">
          <img src="icon/faceBook.png" alt="Facebook" />
        </a>
        <a href="">
          <img src="icon/email.png" alt="Email" />
        </a></div>
        <div className="footer-block"></div>
      </footer>
    </div>
  )
}

function Section({
  id,
  className = '',
  children,
}: {
  id: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={`
        lg:min-h-full lg:min-w-[100vw]
        snap-start flex ${className}
      `}
      style={{ scrollSnapStop: 'always' }}
      aria-label={id}
    >
      <div className="w-full">
        {children}
      </div>
    </section>
  )
}

