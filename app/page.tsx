'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  logoImage,
  mePaintingImage,
  // Paintings
  karinganaImage,
  theDisconnectImage,
  quadroNaoTitulado2025Image,
  quadroNaoTitulado2021Image,
  ecosDaMenteImage,
  therapySessionImage,
  metamorfoseImage,
  canYouSeeItImage,
  treeTresTresImage,
  // Commissioned
  hocusPocusImage,
  sinestesiaTheGuyImage,
  bossCunaCoverartImage,
  potestadeFinalImage,
  lazuliJhayImage,
  teen177Image,
  // Digital Art
  lacosEternosImage,
  breakingOutImage,
  amorFatiImage,
} from "../images";
import { scroller } from 'react-scroll';

const flyingButtons = [
  { text: 'PRINTS', color: 'border-purple1 text-purple1 bg-transparent' },
  { text: 'PINTURA', color: 'border-purple1 text-purple1 bg-purple1 text-purple3' },
  { text: 'CAPA', color: 'border-purple2 text-purple2 bg-transparent' },
  { text: 'ARTE DIGITAL', color: 'border-magenta text-magenta bg-transparent' },
  { text: 'VISUAL ARTIST', color: 'border-purple1 text-purple3 bg-purple1' },
  { text: 'EXPOSIÇÕES', color: 'border-purple1 text-purple1 bg-transparent' },
  { text: 'PORTFÓLIO', color: 'border-pink text-pink bg-transparent' },
];

export default function HomePage() {
  const buttonsRef = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [form, setForm] = useState({ email: '', subject: '', message: '', captcha: '' });

  // Parallax GSAP effect on section scroll
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    commissioned: useRef<HTMLDivElement>(null),
    portfolio: useRef<HTMLDivElement>(null),
    other: useRef<HTMLDivElement>(null),
    prints: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.to(buttonsRef.current, {
        y: 'random(-30, 30)',
        x: 'random(-40, 40)',
        rotate: 'random(-10, 10)',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2,
      });
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          gsap.set(ref.current, { opacity: 0, y: 60, scale: 0.98 });
        }
      });
      const reveal = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
          gsap.to(ref.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
          });
        }
      };
      // Intersection Observer for parallax reveal
      const observers: IntersectionObserver[] = [];
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          const observer = new window.IntersectionObserver(
            (entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  reveal(ref);
                  observer.disconnect();
                }
              });
            },
            { threshold: 0.2 }
          );
          observer.observe(ref.current);
          observers.push(observer);
        }
      });
      return () => observers.forEach(o => o.disconnect());
    }
  }, []);

  // Simple math captcha: 3 + 4
  useEffect(() => {
    setCaptcha('7');
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(form.email)) {
      setError('Por favor, insira um email válido.');
      return;
    }
    if (form.captcha.trim() !== captcha) {
      setError('Captcha incorreto.');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      const mailto = `mailto:naia.visua7s@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`De: ${form.email}\n\n${form.message}`)}`;
      window.location.href = mailto;
      setForm({ email: '', subject: '', message: '', captcha: '' });
    }, 1000);
  };

  // Scroll to section and close nav with react-scroll + GSAP parallax
  const handleNavClick = (id: keyof typeof sectionRefs) => {
    setNavOpen(false);
    scroller.scrollTo(id, {
      duration: 900,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -40,
    });
    // Optionally, trigger GSAP effect immediately (for fast nav)
    if (sectionRefs[id].current) {
      gsap.to(sectionRefs[id].current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
      });
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center bg-purple3 overflow-x-hidden">
      {/* Grainy background overlay */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{background: 'url(/images/grain-img.avif), #262254', opacity: 0.25, mixBlendMode: 'overlay'}} aria-hidden="true" />
      {/* Header & Navigation */}
      <header className="w-full flex justify-between items-center px-4 md:px-8 py-6 z-10 relative">
        <div className="flex items-center gap-2">
          <Image src={logoImage} alt="Logo Naia" width={60} height={60} priority />
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4">
          <button onClick={() => handleNavClick('about')} className="rounded-full border-2 border-purple1 px-6 py-2 text-purple1 hover:bg-purple1 hover:text-purple3 transition-colors font-spacemono text-base" tabIndex={0} aria-label="Sobre mim">Sobre mim</button>
          <button onClick={() => handleNavClick('commissioned')} className="rounded-full border-2 border-purple2 px-6 py-2 text-purple2 hover:bg-purple2 hover:text-purple3 transition-colors font-spacemono text-base" tabIndex={0} aria-label="Comissões">Comissões</button>
          <button onClick={() => handleNavClick('portfolio')} className="rounded-full border-2 border-magenta px-6 py-2 text-magenta hover:bg-magenta hover:text-purple3 transition-colors font-spacemono text-base" tabIndex={0} aria-label="Portfólio">Portfólio</button>
          <button onClick={() => handleNavClick('other')} className="rounded-full border-2 border-pink px-6 py-2 text-pink hover:bg-pink hover:text-purple3 transition-colors font-spacemono text-base" tabIndex={0} aria-label="Outros Trabalhos">Outros Trabalhos</button>
          <button onClick={() => handleNavClick('prints')} className="rounded-full border-2 border-peach px-6 py-2 text-peach hover:bg-peach hover:text-purple3 transition-colors font-spacemono text-base" tabIndex={0} aria-label="Compre Prints">Compre Prints</button>
          <button onClick={() => handleNavClick('contact')} className="rounded-full border-2 border-white px-6 py-2 text-white hover:bg-white hover:text-purple3 transition-colors font-spacemono text-base" tabIndex={0} aria-label="Contato">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline align-middle"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.25V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25v-1.5M16.5 12l-4.5 4.5m0 0l-4.5-4.5m4.5 4.5V6" /></svg>
          </button>
        </nav>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border-2 border-purple1 text-purple1 focus:outline-none focus:ring-2 focus:ring-purple1"
          aria-label="Abrir menu"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span className={`block w-6 h-0.5 bg-purple1 mb-1 transition-all ${navOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-purple1 mb-1 transition-all ${navOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-purple1 transition-all ${navOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        {/* Mobile Nav Drawer */}
        {navOpen && (
          <nav className="md:hidden absolute top-full right-4 bg-purple2/95 border-2 border-purple1 rounded-xl shadow-lg flex flex-col gap-2 p-4 z-50 animate-fade-in">
            <button onClick={() => handleNavClick('about')} className="rounded-full border-2 border-purple1 px-4 py-2 text-purple1 bg-purple3 hover:bg-purple1 hover:text-purple3 transition-colors font-spacemono text-base" tabIndex={0} aria-label="Sobre mim">Sobre mim</button>
            <button onClick={() => handleNavClick('commissioned')} className="rounded-full border-2 border-purple2 px-4 py-2 text-purple2 bg-purple3 hover:bg-purple2 hover:text-purple3 transition-colors font-spacemono text-base" tabIndex={0} aria-label="Comissões">Comissões</button>
            <button onClick={() => handleNavClick('portfolio')} className="rounded-full border-2 border-magenta px-4 py-2 text-magenta bg-purple3 hover:bg-magenta hover:text-purple3 transition-colors font-spacemono text-base" tabIndex={0} aria-label="Portfólio">Portfólio</button>
            <button onClick={() => handleNavClick('other')} className="rounded-full border-2 border-pink px-4 py-2 text-pink bg-purple3 hover:bg-pink hover:text-purple3 transition-colors font-spacemono text-base" tabIndex={0} aria-label="Outros Trabalhos">Outros Trabalhos</button>
            <button onClick={() => handleNavClick('prints')} className="rounded-full border-2 border-peach px-4 py-2 text-peach bg-purple3 hover:bg-peach hover:text-purple3 transition-colors font-spacemono text-base" tabIndex={0} aria-label="Compre Prints">Compre Prints</button>
            <button onClick={() => handleNavClick('contact')} className="rounded-full border-2 border-white px-4 py-2 text-white bg-purple3 hover:bg-white hover:text-purple3 transition-colors font-spacemono text-base" tabIndex={0} aria-label="Contato">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline align-middle"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.25V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75v10.5A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25v-1.5M16.5 12l-4.5 4.5m0 0l-4.5-4.5m4.5 4.5V6" /></svg>
            </button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 w-full z-10 relative">
        <h1 className="text-[3.5rem] md:text-[6rem] font-bold text-purple1 text-center leading-none mb-4" style={{letterSpacing: '-0.04em'}}>PORTFOLIO<br />WEBSITE</h1>
        <div className="text-center text-lg text-purple1 mb-2 font-spacemono">
          <span className="block">Shanaia de Sousa</span>
          <span className="block">Artista Visual</span>
          <span className="block">Porto, Portugal</span>

        </div>
        <div className="relative flex flex-wrap justify-center gap-4 mt-8 mb-4 w-full max-w-3xl">
          {flyingButtons.map((btn, i) => (
            <div
              key={btn.text}
              ref={el => { buttonsRef.current[i] = el!; }}
              className={`rounded-full border-2 px-8 py-3 font-spacemono text-lg shadow-lg cursor-pointer select-none transition-colors ${btn.color}`}
              tabIndex={0}
              aria-label={btn.text}
            >
              {btn.text}
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full max-w-4xl px-4 py-12 z-10 relative flex flex-col items-center">
        <h2 className="text-3xl font-bold text-purple1 mb-8">Skills</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="rounded-xl bg-purple2/80 p-4 flex items-center gap-3 shadow-md">
              <span className="inline-block w-3 h-3 rounded-full bg-purple1"></span>
              <span className="text-lg font-semibold text-white font-spacemono">Acrílico sobre tela</span>
            </div>
            <div className="rounded-xl bg-magenta/80 p-4 flex items-center gap-3 shadow-md">
              <span className="inline-block w-3 h-3 rounded-full bg-magenta"></span>
              <span className="text-lg font-semibold text-white font-spacemono">Arte Digital</span>
            </div>
            <div className="rounded-xl bg-pink/80 p-4 flex items-center gap-3 shadow-md">
              <span className="inline-block w-3 h-3 rounded-full bg-pink"></span>
              <span className="text-lg font-semibold text-white font-spacemono">Ilustração</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-xl bg-peach/80 p-4 flex items-center gap-3 shadow-md">
              <span className="inline-block w-3 h-3 rounded-full bg-peach"></span>
              <span className="text-lg font-semibold text-purple3 font-spacemono">Adobe Illustrator CC</span>
            </div>
            <div className="rounded-xl bg-purple1/80 p-4 flex items-center gap-3 shadow-md">
              <span className="inline-block w-3 h-3 rounded-full bg-purple1"></span>
              <span className="text-lg font-semibold text-white font-spacemono">Adobe Photoshop CC</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" ref={sectionRefs.about} className="w-full max-w-4xl px-4 py-16 flex flex-col md:flex-row items-center gap-10 z-10 relative">
        <div className="flex-shrink-0">
          <Image src={mePaintingImage} alt="Retrato de Naia" width={260} height={340} className="rounded-2xl object-cover shadow-xl" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-purple1 mb-4">Sobre mim</h2>
          <p className="text-lg text-white mb-2 italic">Naia é uma artista visual que explora a condição humana. O seu trabalho é eclético e simbólico, misturando semi-realismo e abstracionismo para apresentar narrativas que procuram conectar e motivar.<br />"A arte é como eu expresso o que está na minha mente quando as palavras falham."</p>
          <p className="text-base text-purple1 mt-6">O meu nome é Naia, sou uma artista autodidata, nascida e criada em Moçambique, e atualmente baseada em Portugal. Desde sempre fui atraída pelo lápis e pelo papel, seja para tentar desenhar a minha boneca favorita ou para rabiscar nas paredes. À medida que cresci, segui o caminho da arte tradicional e pratiquei-a até sentir a necessidade de tomar as minhas próprias liberdades com o meu trabalho, ter ideias e conseguir colocá-las no papel sem problemas. Até hoje, o meu ambiente ainda é um grande fator contribuinte para a arte que crio, mas atualmente os meus meios são acrílico sobre tela e arte digital. Tenho grande interesse e inspiração nas obras do Renascimento e do movimento abstracionista, por isso, certamente encontrará uma semelhança disso no meu trabalho. Sinto a necessidade de misturar os dois. Nesta busca, o meu trabalho pode tomar rumos inesperados, mas não menos frutíferos. O aspeto da narrativa na arte é algo que está sempre muito presente no meu trabalho, seja ficcional ou não, e a história não termina com a atração principal da obra; a história é enriquecida por detalhes simbólicos que amplificam a narrativa e ajudam a transmitir a mensagem. O meu trabalho é motivacional e introspectivo e, com a ajuda de cores vibrantes e uma mistura de estilos, espero cumprir o objetivo de evocar emoção no meu público.</p>
        </div>
      </section>

      {/* Commissioned Works Section */}
      <section id="commissioned" ref={sectionRefs.commissioned} className="w-full max-w-5xl px-4 py-16 z-10 relative">
        <h2 className="text-3xl font-bold text-purple2 mb-8">Comissões</h2>
        <p className="text-base text-purple1 mb-8">Artes para capa que materializam histórias. Cada trabalho é meticulosamente criado para traduzir a essência e a visão do projeto.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Image src={hocusPocusImage} alt="Hocus Pocus The Guy" width={320} height={320} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-purple1 font-spacemono text-sm italic">Hocus Pocus The Guy</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={sinestesiaTheGuyImage} alt="Sinestesia The Guy" width={320} height={320} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-purple1 font-spacemono text-sm italic">Sinestesia The Guy</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={bossCunaCoverartImage} alt="Boss Cuna" width={320} height={320} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-purple1 font-spacemono text-sm italic">Boss Cuna</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={potestadeFinalImage} alt="Potestade" width={320} height={320} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-purple1 font-spacemono text-sm italic">Potestade</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={lazuliJhayImage} alt="Lazuli Jhay" width={320} height={320} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-purple1 font-spacemono text-sm italic">Lazuli Jhay</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={teen177Image} alt="Teen 177" width={320} height={320} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-purple1 font-spacemono text-sm italic">Teen 177</span>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" ref={sectionRefs.portfolio} className="w-full max-w-5xl px-4 py-16 z-10 relative">
        <h2 className="text-3xl font-bold text-magenta mb-8">Portfólio de Telas</h2>
        <p className="text-base text-white mb-8">Coleção de pinturas originais em acrílico e obras de técnica mista que exploram a condição humana, combinando semi-realismo e abstracionismo.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Image src={karinganaImage} alt="Karingana wa karingana" width={320} height={400} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-pink font-spacemono text-sm italic">Karingana wa karingana / Era uma vez (2025)</span>
            <span className="text-xs text-neutral-100">Acrílico em tela - 70x50cm</span>
            <span className="text-xs text-neutral-100">Esta obra foca-se em representar a identidade africana e a cultura africana. Com o uso de cores vibrantes e figuras excêntricas explorei o quão vasto este tema é, tentando trazer ao de cima o coração disto tudo.</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={theDisconnectImage} alt="A desconexão" width={320} height={400} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-pink font-spacemono text-sm italic">A desconexão / The disconnect (2024)</span>
            <span className="text-xs text-neutral-100">Acrílico em tela - 16x20cm </span>
            <span className="text-xs text-neutral-100">Neste conjunto de quadros explorei a desconexão entre as pessoas em comunidade. O porquê de não perpetuarmos um ciclo de amor mas sim quase sempre um ciclo de ódio.</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={quadroNaoTitulado2025Image} alt="Quadro não-titulado 2025" width={320} height={400} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-pink font-spacemono text-sm italic">Quadro não-titulado (2025)</span>
            <span className="text-xs text-neutral-100">Acrílico em tela - 40x50cm</span>
            <span className="text-xs text-neutral-100">Este quadro desvenda um diálogo íntimo com o eu. A dança entre o azul e o amarelo não é apenas uma escolha cromática, mas a linguagem que uso para explorar as dualidades e a essência da minha própria existência.</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={quadroNaoTitulado2021Image} alt="Quadro não-titulado 2021" width={320} height={400} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-pink font-spacemono text-sm italic">Quadro não-titulado (2021)</span>
            <span className="text-xs text-neutral-100">Acrílico em tela - 50x50cm</span>
            <span className="text-xs text-neutral-100">Nesta obra exploro a conexão com a ancestralidade e a essência do ser. As texturas orgânicas e os contrastes visuais convidam a uma profunda reflexão sobre o que nos une e nos diferencia.</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={ecosDaMenteImage} alt="Ecos da mente" width={320} height={400} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-pink font-spacemono text-sm italic">Ecos da mente / Echoes of the mind</span>
            <span className="text-xs text-neutral-100">Acrílico em tela - 50x70cm</span>
            <span className="text-xs text-neutral-100">Esta é a minha tentativa de traduzir o fluxo de pensamentos e sensações num código visual. Cada traço e símbolo representa uma ideia ou emoção, construindo um mapa abstrato da minha própria mente. Uma janela para o subconsciente, convidando o observador a decifrar os seus próprios ecos.</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={therapySessionImage} alt="Uma sessão terapêutica com Poseidon" width={320} height={400} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-pink font-spacemono text-sm italic">Uma sessão terapêutica com Poseidon</span>
            <span className="text-xs text-neutral-100">Acrílico em tela - 30x36cm</span>
            <span className="text-xs text-neutral-100">A imensidão azul representa o vasto oceano da nossa psique, onde figuras flutuantes se libertam e encontram um espaço de cura. É um convite à introspeção, a lidar com as marés internas e a encontrar serenidade nas águas da própria alma.</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={metamorfoseImage} alt="Metamorfose" width={320} height={400} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-pink font-spacemono text-sm italic">Metamorfose (conjunto)</span>
            <span className="text-xs text-neutral-100">Acrílico em tela - 32x40cm</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={canYouSeeItImage} alt="Consegues vê-lo?" width={320} height={400} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-pink font-spacemono text-sm italic">Consegues vê-lo?</span>
            <span className="text-xs text-neutral-100">Acrílico em tela - 16x20cm</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={treeTresTresImage} alt="33.3" width={320} height={400} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-pink font-spacemono text-sm italic">33.3</span>
            <span className="text-xs text-neutral-100">Acrílico em tela - 16x20cm</span>
            <span className="text-xs text-neutral-100">Uma representação visual do verso 3 do capítulo 33 do livro de Jeremias.</span>
          </div>
        </div>
      </section>

      {/* Other Works Section */}
      <section id="other" ref={sectionRefs.other} className="w-full max-w-5xl px-4 py-16 z-10 relative">
        <h2 className="text-3xl font-bold text-pink mb-8">Outros Trabalhos</h2>
        <p className="text-base text-purple1 mb-8">Projetos pessoais e trabalhos de arte digital que exploram diferentes temas, técnicas e expressões criativas para além do trabalho por encomenda.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Image src={lacosEternosImage} alt="Laços eternos" width={320} height={320} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-purple1 font-spacemono text-sm italic">Laços eternos / Eternal bonds (2023)</span>
            <span className="text-xs text-neutral-100">Arte digital</span>
            <span className="text-xs text-neutral-400">Pintura digital inspirada no poema intitulado "Silogismos" de Ana Luísa Amaral. Explorei o sentimento de amor maternal, a vontade de passar uma eternidade uma com a outra.</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={breakingOutImage} alt="O despertar" width={320} height={320} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-purple1 font-spacemono text-sm italic">O despertar / Breaking out (2024)</span>
            <span className="text-xs text-neutral-100">Arte digital</span>
            <span className="text-xs text-neutral-400">É um desafio ser você mesmo numa sociedade que ainda não o/a compreende, mas a sua autenticidade é certamente contagiosa e inspiradora, e, com o tempo, você inspirará mudança neles também.</span>
          </div>
          <div className="flex flex-col items-center">
            <Image src={amorFatiImage} alt="Amor fati" width={320} height={320} className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-200" />
            <span className="mt-2 text-purple1 font-spacemono text-sm italic">Amor fati (2024)</span>
            <span className="text-xs text-neutral-100">Arte digital</span>
            <span className="text-xs text-neutral-400">Obra baseada na crença com raízes estoicas que defende que Abraçar o emaranhado da existência com todo o coração.</span>
          </div>
        </div>
      </section>

      {/* Prints Section */}
      <section id="prints" ref={sectionRefs.prints} className="w-full max-w-3xl px-4 py-16 z-10 relative text-center">
        <h2 className="text-3xl font-bold text-peach mb-8">Compre Prints</h2>
        <p className="text-base text-purple1 mb-6">Traga a arte da Naia para o seu espaço. Impressões de alta qualidade de pinturas originais e obras de arte digital, disponíveis através do nosso parceiro de confiança.</p>
        <a href="https://www.finemoz.co.mz/pt-pt/search?q=naia&options%5Bprefix%5D=last" target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border-2 border-peach px-8 py-3 text-peach hover:bg-peach hover:text-purple3 transition-colors font-bold text-lg">Comprar na FineMoz</a>
      </section>

      {/* Contact Section (with form) */}
      <section id="contact" ref={sectionRefs.contact} className="w-full max-w-3xl px-4 py-16 z-10 relative text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Interessado em trabalhar comigo?</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center max-w-lg mx-auto mb-8">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Seu email"
            value={form.email}
            onChange={handleInputChange}
            className="rounded-lg border-2 border-purple1 px-4 py-2 bg-purple3 text-white focus:outline-none focus:ring-2 focus:ring-purple1 w-full"
            aria-label="Seu email"
            tabIndex={0}
          />
          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="Assunto"
            value={form.subject}
            onChange={handleInputChange}
            className="rounded-lg border-2 border-purple1 px-4 py-2 bg-purple3 text-white focus:outline-none focus:ring-2 focus:ring-purple1 w-full"
            aria-label="Assunto"
            tabIndex={0}
          />
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Mensagem"
            value={form.message}
            onChange={handleInputChange}
            className="rounded-lg border-2 border-purple1 px-4 py-2 bg-purple3 text-white focus:outline-none focus:ring-2 focus:ring-purple1 w-full"
            aria-label="Mensagem"
            tabIndex={0}
          />
          <div className="flex items-center gap-2 w-full">
            <input
              id="captcha"
              name="captcha"
              type="text"
              required
              placeholder="Quanto é 3 + 4?"
              value={form.captcha}
              onChange={handleInputChange}
              className="rounded-lg border-2 border-purple1 px-4 py-2 bg-purple3 text-white focus:outline-none focus:ring-2 focus:ring-purple1 flex-1"
              aria-label="Captcha"
              tabIndex={0}
            />
            <span className="text-purple1 font-spacemono text-sm">Captcha</span>
          </div>
          {error && <div className="text-pink font-bold text-sm mt-2">{error}</div>}
          <button
            type="submit"
            className="mt-4 rounded-full border-2 border-purple1 px-6 py-2 text-purple1 bg-purple3 font-bold hover:bg-purple1 hover:text-purple3 transition-colors flex items-center justify-center min-w-[120px]"
            aria-label="Enviar mensagem"
            tabIndex={0}
            disabled={sending}
          >
            {sending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-purple1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                Enviando...
              </span>
            ) : (
              'Enviar'
            )}
          </button>
        </form>
        <Link href="/contato" className="inline-block rounded-full border-2 border-purple1 px-8 py-3 text-purple1 hover:bg-purple1 hover:text-purple3 transition-colors font-bold text-lg mb-6">Vamos trabalhar juntos</Link>
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-purple1">Contacte-me também em:</span>
          <div className="flex gap-4 mt-2">
            <a href="https://www.instagram.com/naia.dot/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border-2 border-purple1 px-4 py-2 text-purple1 hover:bg-purple1 hover:text-purple3 transition-colors">Instagram</a>
            <a href="https://www.behance.net/shanaiasousa" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="rounded-full border-2 border-purple2 px-4 py-2 text-purple2 hover:bg-purple2 hover:text-purple3 transition-colors">Behance</a>
            <a href="https://www.tiktok.com/@naiadotcom" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="rounded-full border-2 border-pink px-4 py-2 text-pink hover:bg-pink hover:text-purple3 transition-colors">TikTok</a>
            <a href="mailto:naia.visua7s@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="rounded-full border-2 border-pink px-4 py-2 text-pink hover:bg-pink hover:text-purple3 transition-colors">Email</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-12 text-purple1 font-spacemono text-lg z-10 relative">

        <div className="mt-8 flex flex-col items-center gap-1 text-base text-purple2">
          <span>
            Site desenvolvido por <a href="https://www.allahurodrigues.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-pink">Allahu Rodrigues</a>
          </span>
          <span>
            Todos os direitos e licença pertencem a <a href="http://naiasousa.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-peach">Naia Sousa</a>
          </span>
        </div>
      </footer>
    </main>
  );
} 