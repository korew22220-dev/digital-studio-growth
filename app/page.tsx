import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Layers3, MapPin, MousePointer2 } from "lucide-react";
import Link from "@/app/components/SiteLink";
import { StudioHeader } from "@/app/components/StudioHeader";
import { Brand } from "@/app/components/Brand";
import { MercedesProjectCard } from "@/app/components/MercedesProjectCard";
import { adsTariff, bundleSaving, bundleSeparatePrice, bundleTariff, contactHref, formatPrice, mapTariffs, siteTariffs, tariffPrice } from "@/app/data/tariffs";

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`reveal ${className}`}>{children}</div>; }
const services = [
  { n: "01", title: "Разработка сайтов", text: "Создаём современные сайты для компаний: от компактной визитки до многостраничного проекта.", price: tariffPrice(siteTariffs[0]), href: "/uslugi/sozdanie-saitov/", icon: Layers3, theme: "green" },
  { n: "02", title: "Упаковка и продвижение на картах", text: "Готовим карточки компаний в 2ГИС и Яндекс Картах, помогаем поддерживать их актуальность и развивать присутствие.", price: `от ${formatPrice(mapTariffs[0].price)}`, href: "/uslugi/#map-tariffs", icon: Compass, theme: "cream" },
  { n: "03", title: "Платное продвижение на картах", text: "Сопровождаем рекламные размещения в 2ГИС и Яндекс Картах, анализируем доступную статистику.", price: tariffPrice(adsTariff), note: "Рекламный бюджет оплачивается отдельно", href: "/uslugi/reklama/", icon: MousePointer2, theme: "blue" },
];
const steps = [
  ["01", "Знакомство", "Обсуждаем компанию, задачи и желаемый результат"],
  ["02", "Анализ", "Изучаем исходные материалы и текущую ситуацию"],
  ["03", "Предложение", "Согласуем состав работ, стоимость и сроки"],
  ["04", "Реализация", "Разрабатываем сайт или работаем с карточками организации"],
  ["05", "Передача результата", "Проверяем выполненную работу, передаём результат и согласованный отчёт"],
];
const nav = [["Услуги", "/uslugi/"], ["Кейсы", "/kejsy/"], ["О KOREMO", "/o-kompanii/"], ["Контакты", "/kontakty/"]];
const extraNav = [["Калькулятор лидов", "/kalkulyator/"], ["Этапы работы", "/etapy-raboty/"], ["Вопросы и ответы", "/voprosy/"]];

export default function Home() {
  return <main id="main-content" className="studio-home">
    <StudioHeader/>
    <section className="studio-hero">
      <div className="studio-hero-top"><span className="eyebrow"><i/> KOREMO / DIGITAL STUDIO</span><span className="eyebrow">САЙТЫ И ПРОДВИЖЕНИЕ<br/>ДЛЯ ЛОКАЛЬНОГО БИЗНЕСА</span></div>
      <div className="studio-hero-grid">
        <div className="studio-hero-copy"><h1><span>Создаём</span><span><em>сайты.</em></span><span className="hero-subline">Помогаем бизнесу<br/>находить клиентов.</span></h1><p>Разрабатываем сайты под ключ, упаковываем и продвигаем компании в 2ГИС и Яндекс Картах.</p><div className="hero-actions"><Link className="button button-lime" href="/kontakty/">Обсудить проект <ArrowUpRight size={19}/></Link><Link className="button button-ghost" href="/kejsy/mercedes-amg/">Посмотреть работы <ArrowRight size={18}/></Link></div></div>
        <div className="digital-scene" aria-hidden="true"><div className="scene-orbit"/><div className="scene-orbit scene-orbit-two"/><div className="scene-axis"/><div className="scene-window"><div className="scene-toolbar"><i/><i/><i/><span>koremo / digital</span><ArrowUpRight size={16}/></div><div className="scene-window-content"><span>ВАШ БИЗНЕС</span><b>Ближе<br/>к клиенту<span>.</span></b><div className="scene-bars"><i/><i/><i/></div><div className="scene-pill">САЙТ И КАРТЫ <ArrowUpRight size={16}/></div></div></div><div className="scene-map"><MapPin size={30}/><div><small>ПОИСК РЯДОМ</small><b>Ваша организация</b></div><span className="scene-pulse"/></div><span className="scene-caption">СТРУКТУРА × ДИЗАЙН × РАЗРАБОТКА</span><span className="scene-cross">+</span></div>
      </div>
      <div className="studio-hero-bottom"><a href="#services">Листайте вниз <ArrowDown size={17}/></a><p>Разработка сайтов от <b>{formatPrice(siteTariffs[0].price)}</b></p><p>Упаковка карточек от <b>{formatPrice(mapTariffs[0].price)}</b></p></div>
    </section>
    <section id="services" className="section services"><div className="section-head"><Reveal><span className="eyebrow">НАПРАВЛЕНИЯ / 01</span><h2>Ваш бизнес.<br/><em>Наши инструменты.</em></h2></Reveal><Reveal><p>Выберите задачу — подробности, состав работ и стоимость есть на страницах услуг.</p><Link className="text-link" href="/uslugi/">Все услуги <ArrowRight size={17}/></Link></Reveal></div><div className="service-grid">{services.map(service => { const Icon = service.icon; return <Link className={`service-card ${service.theme}`} href={service.href} key={service.n}><div className="service-top"><span>{service.n} / НАПРАВЛЕНИЕ</span><ArrowUpRight/></div><div className="service-icon"><Icon size={25}/></div><h3>{service.title}</h3><p>{service.text}</p><strong className="service-start-price">{service.price}</strong>{service.note && <small className="service-price-note">{service.note}</small>}<span className="service-link">Подробнее <ArrowRight size={16}/></span></Link>; })}</div></section>
    <section className="home-bundle"><Reveal><span className="eyebrow">КОМПЛЕКСНОЕ ПРЕДЛОЖЕНИЕ / 02</span><h2>Бизнес <em>в онлайне.</em></h2><p>Продающий сайт от {formatPrice(siteTariffs[1].price)} и упаковка карточек одной организации в 2ГИС и Яндекс Картах за {formatPrice(mapTariffs[1].price)}.</p><div className="home-bundle-sums"><strong>{tariffPrice(bundleTariff)}</strong><span>По отдельности — от {formatPrice(bundleSeparatePrice)}<br/>Экономия при базовом составе — {formatPrice(bundleSaving)}</span></div><p className="home-bundle-note">Ежемесячное сопровождение оплачивается отдельно.</p><Link className="button button-lime" href="/uslugi/biznes-v-onlayne/">Подробнее о комплексе <ArrowUpRight size={18}/></Link></Reveal><div className="home-bundle-mark" aria-hidden="true">K<span>↗</span></div></section>
    <section className="section cases home-cases"><div className="section-head"><Reveal><span className="eyebrow">РЕАЛЬНАЯ РАБОТА / 03</span><h2>Не концепция.<br/><em>Работающий сайт.</em></h2></Reveal><Reveal><p>Первый опубликованный клиентский проект KOREMO. Другие работы и демонстрационные концепции находятся в портфолио.</p><Link className="text-link" href="/kejsy/">Все проекты <ArrowRight size={17}/></Link></Reveal></div><Reveal className="home-real-case"><MercedesProjectCard featured/></Reveal></section>
    <section className="home-process"><Reveal><span className="eyebrow">ПОРЯДОК РАБОТЫ / 04</span><h2>Как мы <em>работаем.</em></h2><p>От знакомства с задачей до передачи результата.</p></Reveal><ol className="home-process-grid">{steps.map(([number, title, detail]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol><Link className="text-link" href="/etapy-raboty/">Подробнее о процессе <ArrowUpRight size={17}/></Link></section>
    <section className="home-audit"><Reveal><span className="eyebrow">ПЕРВЫЙ ШАГ / 05</span><h2>Посмотрим, что можно улучшить в присутствии вашей компании <em>в интернете?</em></h2><p>Пришлите ссылку на сайт или карточку организации. Проведём краткий предварительный разбор и предложим следующие шаги.</p><Link className="button button-lime" href={contactHref("Предварительный аудит")}>Получить предварительный аудит <ArrowUpRight size={18}/></Link><small>Короткий ознакомительный разбор, без полной стратегии продвижения.</small></Reveal></section>
    <section className="home-cta"><span className="eyebrow">КОНТАКТЫ / 06</span><h2>ОБСУДИМ<br/><em>ВАШУ ЗАДАЧУ?</em></h2><p>Расскажите, какой сайт нужен или что хотите улучшить на картах.</p><Link className="button button-lime" href="/kontakty/">Обсудить проект <ArrowUpRight size={18}/></Link></section>
    <footer className="footer"><Link href="/" className="brand"><Brand/></Link><span>Сайты и продвижение для локального бизнеса</span><nav>{[...nav, ...extraNav].map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}<Link href="/privacy/">Обработка данных</Link></nav><small>© {new Date().getFullYear()} KOREMO</small></footer>
  </main>;
}
