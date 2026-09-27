"use client";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Layers3, MapPin, Menu, MousePointer2, X } from "lucide-react";
import Link from "@/app/components/SiteLink";
import { Brand } from "@/app/components/Brand";
import { MercedesProjectCard } from "@/app/components/MercedesProjectCard";
import { adsTariff, bundleSaving, bundleSeparatePrice, bundleTariff, contactHref, formatPrice, mapTariffs, siteTariffs, tariffPrice } from "@/app/data/tariffs";

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`reveal ${className}`}>{children}</div>; }
const services = [
  { n: "01", title: "Разработка сайтов", text: "Создаём современные сайты для компаний: от компактной визитки до многостраничного проекта.", price: tariffPrice(siteTariffs[0]), href: "/uslugi/sozdanie-saitov", icon: Layers3, theme: "green" },
  { n: "02", title: "Упаковка и продвижение на картах", text: "Готовим карточки компаний в 2ГИС и Яндекс Картах, помогаем поддерживать их актуальность и развивать присутствие.", price: `от ${formatPrice(mapTariffs[0].price)}`, href: "/uslugi#map-tariffs", icon: Compass, theme: "cream" },
  { n: "03", title: "Платное продвижение на картах", text: "Сопровождаем рекламные размещения в 2ГИС и Яндекс Картах, анализируем доступную статистику.", price: tariffPrice(adsTariff), note: "Рекламный бюджет оплачивается отдельно", href: "/uslugi/reklama", icon: MousePointer2, theme: "blue" },
];
const steps = [
  ["01", "Знакомство", "Обсуждаем компанию, задачи и желаемый результат"],
  ["02", "Анализ", "Изучаем исходные материалы и текущую ситуацию"],
  ["03", "Предложение", "Согласуем состав работ, стоимость и сроки"],
  ["04", "Реализация", "Разрабатываем сайт или работаем с карточками организации"],
  ["05", "Передача результата", "Проверяем выполненную работу, передаём результат и согласованный отчёт"],
];
const nav = [["Услуги", "/uslugi"], ["Кейсы", "/kejsy"], ["О KOREMO", "/o-kompanii"], ["Контакты", "/kontakty"]];
const extraNav = [["Калькулятор лидов", "/kalkulyator"], ["Этапы работы", "/etapy-raboty"], ["Вопросы и ответы", "/voprosy"]];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenu(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); observer.disconnect(); };
  }, []);
  return <main>
    <header className={`header ${scrolled ? "scrolled" : ""}`}><Link href="/" className="brand"><Brand/></Link><nav className="desktop-nav">{nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav><Link className="header-cta" href="/kontakty">Обсудить проект <ArrowUpRight size={16}/></Link><button className="menu-button" onClick={() => setMenu(!menu)} aria-label={menu ? "Закрыть меню" : "Открыть меню"} aria-expanded={menu}>{menu ? <X/> : <Menu/>}</button></header>
    {menu && <div className="mobile-menu"><button className="menu-close" onClick={() => setMenu(false)} aria-label="Закрыть"><X/></button>{[...nav, ...extraNav].map(([label, href]) => <Link key={href} href={href} onClick={() => setMenu(false)}>{label}<ArrowUpRight/></Link>)}</div>}
    <section className="hero home-hero"><div className="hero-grid"/><div className="hero-copy"><div className="eyebrow hero-tag"><i/> KOREMO / DIGITAL STUDIO</div><h1>СОЗДАЁМ <em>САЙТЫ.</em><br/>ПОМОГАЕМ БИЗНЕСУ<br/>НАХОДИТЬ КЛИЕНТОВ<span className="lime-dot">.</span></h1><p>Разрабатываем сайты под ключ, упаковываем и продвигаем компании в 2ГИС и Яндекс Картах.</p><p className="hero-price-line">Разработка сайтов от {formatPrice(siteTariffs[0].price)} · Упаковка карточек от {formatPrice(mapTariffs[0].price)}</p><div className="hero-actions"><Link className="button button-lime" href="/kontakty">Обсудить проект <ArrowUpRight size={18}/></Link><Link className="button button-ghost" href="/kejsy/mercedes-amg">Посмотреть работы <ArrowRight size={17}/></Link></div></div><div className="hero-visual" aria-hidden="true"><div className="orbit orbit-1"/><div className="orbit orbit-2"/><div className="hero-center"><MapPin size={42}/><span>ВАС<br/>НАХОДЯТ</span></div><div className="orbit-label label-a">САЙТ И КАРТЫ</div><div className="orbit-label label-b">ВАШИ КЛИЕНТЫ</div><div className="metric-card"><span>ПОИСК РЯДОМ</span><b>Ваша организация</b><small><i/> На карте клиента</small></div><div className="hero-coordinate">KOREMO<br/>РОССИЯ</div><div className="hero-index">[ 01—03 ]</div></div><a className="scroll-note" href="#services">ЛИСТАЙТЕ ВНИЗ <ArrowDown size={15}/></a></section>
    <section id="services" className="section services"><div className="section-head"><Reveal><span className="eyebrow">НАПРАВЛЕНИЯ / 01</span><h2>ЧЕМ МОЖЕМ<br/><em>ПОМОЧЬ</em></h2></Reveal><Reveal><p>Выберите задачу — подробности, состав работ и стоимость есть на страницах услуг.</p><Link className="text-link" href="/uslugi">Все услуги <ArrowRight size={17}/></Link></Reveal></div><div className="service-grid">{services.map(service => { const Icon = service.icon; return <Link className={`service-card ${service.theme}`} href={service.href} key={service.n}><div className="service-top"><span>{service.n} / НАПРАВЛЕНИЕ</span><ArrowUpRight/></div><div className="service-icon"><Icon size={25}/></div><h3>{service.title}</h3><p>{service.text}</p><strong className="service-start-price">{service.price}</strong>{service.note && <small className="service-price-note">{service.note}</small>}<span className="service-link">Подробнее <ArrowRight size={16}/></span></Link>; })}</div></section>
    <section className="home-bundle"><Reveal><span className="eyebrow">КОМПЛЕКСНОЕ ПРЕДЛОЖЕНИЕ / 02</span><h2>Бизнес <em>в онлайне.</em></h2><p>Продающий сайт от {formatPrice(siteTariffs[1].price)} и упаковка карточек одной организации в 2ГИС и Яндекс Картах за {formatPrice(mapTariffs[1].price)}.</p><div className="home-bundle-sums"><strong>{tariffPrice(bundleTariff)}</strong><span>По отдельности — от {formatPrice(bundleSeparatePrice)}<br/>Экономия при базовом составе — {formatPrice(bundleSaving)}</span></div><p className="home-bundle-note">Ежемесячное сопровождение оплачивается отдельно.</p><Link className="button button-lime" href="/uslugi/biznes-v-onlayne">Подробнее о комплексе <ArrowUpRight size={18}/></Link></Reveal><div className="home-bundle-mark" aria-hidden="true">K<span>↗</span></div></section>
    <section className="section cases home-cases"><div className="section-head"><Reveal><span className="eyebrow">РЕАЛЬНАЯ РАБОТА / 03</span><h2>ПРОЕКТ<br/><em>В ДЕЛЕ</em></h2></Reveal><Reveal><p>Первый опубликованный клиентский проект KOREMO. Другие работы и демонстрационные концепции находятся в портфолио.</p><Link className="text-link" href="/kejsy">Все проекты <ArrowRight size={17}/></Link></Reveal></div><Reveal className="home-real-case"><MercedesProjectCard featured/></Reveal></section>
    <section className="home-process"><Reveal><span className="eyebrow">ПОРЯДОК РАБОТЫ / 04</span><h2>Как мы <em>работаем.</em></h2><p>От знакомства с задачей до передачи результата.</p></Reveal><ol className="home-process-grid">{steps.map(([number, title, detail]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol><Link className="text-link" href="/etapy-raboty">Подробнее о процессе <ArrowUpRight size={17}/></Link></section>
    <section className="home-audit"><Reveal><span className="eyebrow">ПЕРВЫЙ ШАГ / 05</span><h2>Посмотрим, что можно улучшить в присутствии вашей компании <em>в интернете?</em></h2><p>Пришлите ссылку на сайт или карточку организации. Проведём краткий предварительный разбор и предложим следующие шаги.</p><Link className="button button-lime" href={contactHref("Предварительный аудит")}>Получить предварительный аудит <ArrowUpRight size={18}/></Link><small>Короткий ознакомительный разбор, без полной стратегии продвижения.</small></Reveal></section>
    <section className="home-cta"><span className="eyebrow">КОНТАКТЫ / 06</span><h2>ОБСУДИМ<br/><em>ВАШУ ЗАДАЧУ?</em></h2><p>Расскажите, какой сайт нужен или что хотите улучшить на картах.</p><Link className="button button-lime" href="/kontakty">Обсудить проект <ArrowUpRight size={18}/></Link></section>
    <footer className="footer"><Link href="/" className="brand"><Brand/></Link><span>Сайты и продвижение для локального бизнеса</span><nav>{[...nav, ...extraNav].map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}<Link href="/privacy">Обработка данных</Link></nav><small>© {new Date().getFullYear()} KOREMO</small></footer>
  </main>;
}
